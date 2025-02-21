/**
 * Test tracer in decorator setup
 *
 * @group e2e/tracer/decorator-async-handler
 */

import path from 'path';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy } from 'aws-cdk-lib';
import { XRayClient } from '@aws-sdk/client-xray';
import { STSClient } from '@aws-sdk/client-sts';
import { v4 } from 'uuid';
import {
  TestStack,
  defaultRuntime,
} from '@aws-lambda-powertools/testing-utils';
import {
  createTracerTestFunction,
  getFirstSubsegment,
  getFunctionArn,
  getInvocationSubsegment,
  getTraces,
  invokeAllTestCases,
  splitSegmentsByName,
} from '../helpers/tracesUtils';
import {
  generateUniqueName,
  isValidRuntimeKey,
} from '../../../commons/tests/utils/e2eUtils';
import {
  expectedCustomAnnotationKey,
  expectedCustomAnnotationValue,
  expectedCustomErrorMessage,
  expectedCustomMetadataKey,
  expectedCustomMetadataValue,
  expectedCustomResponseValue,
  expectedCustomSubSegmentName,
  RESOURCE_NAME_PREFIX,
  SETUP_TIMEOUT,
  TEARDOWN_TIMEOUT,
  TEST_CASE_TIMEOUT,
} from './constants';
import {
  assertAnnotation,
  assertErrorAndFault,
} from '../helpers/traceAssertions';

const runtime: string = process.env.RUNTIME || defaultRuntime;

if (!isValidRuntimeKey(runtime)) {
  throw new Error(`Invalid runtime key value: ${runtime}`);
}

const stackName = generateUniqueName(
  RESOURCE_NAME_PREFIX,
  v4(),
  runtime,
  'AllFeatures-Decorator'
);
const lambdaFunctionCodeFile = 'asyncHandler.decorator.test.functionCode.ts';
let startTime: Date;

/**
 * Function #1 is with all flags enabled.
 */
const uuidFunction1 = v4();
const functionNameWithAllFlagsEnabled = generateUniqueName(
  RESOURCE_NAME_PREFIX,
  uuidFunction1,
  runtime,
  'AllFeatures-Decorator-Async-AllFlagsEnabled'
);
const serviceNameWithAllFlagsEnabled = functionNameWithAllFlagsEnabled;

/**
 * Function #2 sets a custom subsegment name in the decorated method
 */
const uuidFunction2 = v4();
const functionNameWithCustomSubsegmentNameInMethod = generateUniqueName(
  RESOURCE_NAME_PREFIX,
  uuidFunction2,
  runtime,
  'AllFeatures-Decorator-Async-CustomSubsegmentNameInMethod'
);
const serviceNameWithCustomSubsegmentNameInMethod =
  functionNameWithCustomSubsegmentNameInMethod;

const xrayClient = new XRayClient({});
const stsClient = new STSClient({});
const invocations = 3;

const testStack = new TestStack(stackName);

describe(`Tracer E2E tests, asynchronous handler with decorator instantiation for runtime: ${runtime}`, () => {
  beforeAll(async () => {
    // Prepare
    startTime = new Date();
    const ddbTableName = stackName + '-table';

    const ddbTable = new Table(testStack.stack, 'Table', {
      tableName: ddbTableName,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const entry = path.join(__dirname, lambdaFunctionCodeFile);
    const functionWithAllFlagsEnabled = createTracerTestFunction({
      stack: testStack.stack,
      functionName: functionNameWithAllFlagsEnabled,
      entry,
      expectedServiceName: serviceNameWithAllFlagsEnabled,
      environmentParams: {
        TEST_TABLE_NAME: ddbTableName,
        POWERTOOLS_TRACER_CAPTURE_RESPONSE: 'true',
        POWERTOOLS_TRACER_CAPTURE_ERROR: 'true',
        POWERTOOLS_TRACE_ENABLED: 'true',
      },
      runtime,
    });
    ddbTable.grantWriteData(functionWithAllFlagsEnabled);

    const functionWithCustomSubsegmentNameInMethod = createTracerTestFunction({
      stack: testStack.stack,
      functionName: functionNameWithCustomSubsegmentNameInMethod,
      handler: 'handlerWithCustomSubsegmentNameInMethod',
      entry,
      expectedServiceName: serviceNameWithCustomSubsegmentNameInMethod,
      environmentParams: {
        TEST_TABLE_NAME: ddbTableName,
        EXPECTED_CUSTOM_SUBSEGMENT_NAME: expectedCustomSubSegmentName,
        POWERTOOLS_TRACER_CAPTURE_RESPONSE: 'true',
        POWERTOOLS_TRACER_CAPTURE_ERROR: 'true',
        POWERTOOLS_TRACE_ENABLED: 'true',
      },
      runtime,
    });
    ddbTable.grantWriteData(functionWithCustomSubsegmentNameInMethod);

    await testStack.deploy();

    // Act
    await Promise.all([
      invokeAllTestCases(functionNameWithAllFlagsEnabled),
      invokeAllTestCases(functionNameWithCustomSubsegmentNameInMethod),
    ]);
  }, SETUP_TIMEOUT);

  afterAll(async () => {
    if (!process.env.DISABLE_TEARDOWN) {
      await testStack.destroy();
    }
  }, TEARDOWN_TIMEOUT);

  it(
    'should generate all custom traces',
    async () => {
      const tracesWhenAllFlagsEnabled = await getTraces(
        xrayClient,
        startTime,
        await getFunctionArn(stsClient, functionNameWithAllFlagsEnabled),
        invocations,
        4
      );

      expect(tracesWhenAllFlagsEnabled.length).toBe(invocations);

      // Assess
      for (let i = 0; i < invocations; i++) {
        const trace = tracesWhenAllFlagsEnabled[i];

        /**
         * Expect the trace to have 4 segments:
         * 1. Lambda Context (AWS::Lambda)
         * 2. Lambda Function (AWS::Lambda::Function)
         * 3. DynamoDB Table (AWS::DynamoDB::Table)
         * 4. Remote call (docs.powertools.aws.dev)
         */
        expect(trace.Segments.length).toBe(4);
        const invocationSubsegment = getInvocationSubsegment(trace);

        /**
         * Invocation subsegment should have a subsegment '## index.handler' (default behavior for Tracer)
         * '## index.handler' subsegment should have 3 subsegments
         * 1. DynamoDB (PutItem on the table)
         * 2. docs.powertools.aws.dev (Remote call)
         * 3. '### myMethod' (method decorator)
         */
        const handlerSubsegment = getFirstSubsegment(invocationSubsegment);
        expect(handlerSubsegment.name).toBe('## index.handler');
        expect(handlerSubsegment?.subsegments).toHaveLength(3);

        if (!handlerSubsegment.subsegments) {
          fail('"## index.handler" subsegment should have subsegments');
        }
        const subsegments = splitSegmentsByName(handlerSubsegment.subsegments, [
          'DynamoDB',
          'docs.powertools.aws.dev',
          '### myMethod',
        ]);
        expect(subsegments.get('DynamoDB')?.length).toBe(1);
        expect(subsegments.get('docs.powertools.aws.dev')?.length).toBe(1);
        expect(subsegments.get('### myMethod')?.length).toBe(1);
        expect(subsegments.get('other')?.length).toBe(0);

        const shouldThrowAnError = i === invocations - 1;
        if (shouldThrowAnError) {
          assertErrorAndFault(invocationSubsegment, expectedCustomErrorMessage);
        }
      }
    },
    TEST_CASE_TIMEOUT
  );

  it(
    'should have correct annotations and metadata',
    async () => {
      const traces = await getTraces(
        xrayClient,
        startTime,
        await getFunctionArn(stsClient, functionNameWithAllFlagsEnabled),
        invocations,
        4
      );

      for (let i = 0; i < invocations; i++) {
        const trace = traces[i];
        const invocationSubsegment = getInvocationSubsegment(trace);
        const handlerSubsegment = getFirstSubsegment(invocationSubsegment);
        const { annotations, metadata } = handlerSubsegment;

        const isColdStart = i === 0;
        assertAnnotation({
          annotations,
          isColdStart,
          expectedServiceName: serviceNameWithAllFlagsEnabled,
          expectedCustomAnnotationKey,
          expectedCustomAnnotationValue,
        });

        if (!metadata) {
          fail('metadata is missing');
        }
        expect(
          metadata[serviceNameWithAllFlagsEnabled][expectedCustomMetadataKey]
        ).toEqual(expectedCustomMetadataValue);

        const shouldThrowAnError = i === invocations - 1;
        if (!shouldThrowAnError) {
          // Assert that the metadata object contains the response
          expect(
            metadata[serviceNameWithAllFlagsEnabled]['index.handler response']
          ).toEqual(expectedCustomResponseValue);
        }
      }
    },
    TEST_CASE_TIMEOUT
  );

  it(
    'should have a custom name as the subsegment name for the decorated method',
    async () => {
      const tracesWhenCustomSubsegmentNameInMethod = await getTraces(
        xrayClient,
        startTime,
        await getFunctionArn(
          stsClient,
          functionNameWithCustomSubsegmentNameInMethod
        ),
        invocations,
        4
      );

      expect(tracesWhenCustomSubsegmentNameInMethod.length).toBe(invocations);

      // Assess
      for (let i = 0; i < invocations; i++) {
        const trace = tracesWhenCustomSubsegmentNameInMethod[i];

        /**
         * Expect the trace to have 4 segments:
         * 1. Lambda Context (AWS::Lambda)
         * 2. Lambda Function (AWS::Lambda::Function)
         * 3. DynamoDB Table (AWS::DynamoDB::Table)
         * 4. Remote call (docs.powertools.aws.dev)
         */
        expect(trace.Segments.length).toBe(4);
        const invocationSubsegment = getInvocationSubsegment(trace);

        /**
         * Invocation subsegment should have a subsegment '## index.handler' (default behavior for Tracer)
         * '## index.handler' subsegment should have 3 subsegments
         * 1. DynamoDB (PutItem on the table)
         * 2. docs.powertools.aws.dev (Remote call)
         * 3. '### mySubsegment' (method decorator with custom name)
         */
        const handlerSubsegment = getFirstSubsegment(invocationSubsegment);
        expect(handlerSubsegment.name).toBe(
          '## index.handlerWithCustomSubsegmentNameInMethod'
        );
        expect(handlerSubsegment?.subsegments).toHaveLength(3);

        if (!handlerSubsegment.subsegments) {
          fail('"## index.handler" subsegment should have subsegments');
        }
        const subsegments = splitSegmentsByName(handlerSubsegment.subsegments, [
          'DynamoDB',
          'docs.powertools.aws.dev',
          expectedCustomSubSegmentName,
        ]);
        expect(subsegments.get('DynamoDB')?.length).toBe(1);
        expect(subsegments.get('docs.powertools.aws.dev')?.length).toBe(1);
        expect(subsegments.get(expectedCustomSubSegmentName)?.length).toBe(1);
        expect(subsegments.get('other')?.length).toBe(0);

        const shouldThrowAnError = i === invocations - 1;
        if (shouldThrowAnError) {
          assertErrorAndFault(invocationSubsegment, expectedCustomErrorMessage);
        }
      }
    },
    TEST_CASE_TIMEOUT
  );
});
