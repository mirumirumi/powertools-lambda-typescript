# Contributing Guidelines <!-- omit in toc -->

Thank you for your interest in contributing to our project. Whether it's a bug report, new feature, correction, or additional
documentation, we greatly value feedback and contributions from our community.

Please read through this document before submitting any issues or pull requests to ensure we have all the necessary
information to effectively respond to your bug report or contribution.

## Table of contents <!-- omit in toc -->

- [Security issue notifications](#security-issue-notifications)
- [Code of Conduct](#code-of-conduct)
- [Reporting Bugs/Feature Requests](#reporting-bugsfeature-requests)
- [Contributing via Pull Requests](#contributing-via-pull-requests)
  - [Summary](#summary)
  - [Step 1: Find something to work on](#step-1-find-something-to-work-on)
  - [Step 2: Design](#step-2-design)
  - [Step 3: Work your Magic](#step-3-work-your-magic)
  - [Step 4: Pull Request](#step-4-pull-request)
  - [Step 5: Merge](#step-5-merge)
- [Setup Development Environment](#setup-development-environment)
  - [Prerequisites](#prerequisites)
  - [Repo Layout](#repo-layout)
  - [Tests](#tests)
    - [Unit tests](#unit-tests)
    - [Integration tests](#integration-tests)
      - [Run e2e tests on your forked project](#run-e2e-tests-on-your-forked-project)
  - [Documentation](#documentation)
    - [API reference](#api-reference)
    - [Docs website](#docs-website)
  - [Build \& Package](#build--package)
  - [Conventions](#conventions)
- [Licensing](#licensing)

## Security issue notifications

If you discover a potential security issue in this project, we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public GitHub issue.

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct).
For more information, see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact opensource-codeofconduct@amazon.com with any additional questions or comments.

## Reporting Bugs/Feature Requests

We welcome you to use the GitHub issue tracker to report bugs or suggest features.

When filing an issue, please check existing open, or recently closed, issues to make sure somebody else hasn't already
reported the issue. Please try to include as much information as you can. Details like these are incredibly useful:

* A reproducible test case or series of steps
* The version of our code being used
* Any modifications you've made relevant to the bug
* Anything unusual about your environment or deployment

## Contributing via Pull Requests

Contributions via pull requests are much appreciated.

### Summary

* This project uses `node@18.x` and `npm@9.x` for development (see [Setup](#setup)).
* Before opening a Pull Request, please find the existing related issue or open a new one to discuss the proposed changes. A PR without a related issue or discussion has a high risk of being rejected. We are very appreciative and thankful for your time and efforts, and we want to make sure they are not wasted.
* After your proposal has been reviewed and accepted by at least one of the project's maintainers, you can submit a pull request.
* When opening a PR, make sure to follow the checklist inside the pull request template.

### Step 1: Find something to work on

If you want to contribute a specific feature or fix you have in mind, look at active [pull
requests](https://github.com/aws-powertools/powertools-lambda-typescript/pulls) to see if someone else is already working on it. If not, you can start designing your changes. 

On the other hand, if you are here looking for an issue to work on, check out our [backlog of
issues](https://github.com/aws-powertools/powertools-lambda-typescript/issues) and find something that piques your interest. Our project, by default, uses the default GitHub issue labels (enhancement/bug/help wanted/invalid/question/documentation), looking at any issue labeled as 'help wanted' or 'good-first-issue' is a great place to start.

It's a good idea to keep the priority of issues in mind when deciding what to
work on. If we have labelled an issue as `priority:medium` or `priority:low`, it means it's something we won't
get to soon while `priority:high` issues have a bigger impact, so we are much more likely to give a PR for those issues prompt attention.

### Step 2: Design

You can start by checking the project's tenets [here](https://docs.powertools.aws.dev/lambda-typescript/latest/#tenets).

We ask you to seek feedback and consensus on your proposed change by iterating on a design document. This is especially useful when you plan a big change or feature, or you want advice on what would be the best path forward.

If you're picking up an existing issue, you can simply post your comment and discuss your proposed changes. If instead you're proposing a new feature, you can start by creating a new [RFC issue](https://github.com/aws-powertools/powertools-lambda-typescript/issues/new?assignees=&labels=RFC%2C+triage&template=rfc.md&title=RFC%3A+) and discuss your proposed change with the maintainers.

This is a great way to get feedback on your proposed change and make sure that it is in line with the project's direction and community needs. You can start working on the change when you've gotten approved by at least one maintainer - we would hate for your time to be wasted.

### Step 3: Work your Magic

Work your magic. Before starting, make sure to check the [Getting Started](#Getting-Started) section to setup your dev environment and familiarize yourself with the project's structure and design. Here are some additional guidelines:

* Working against the latest source on the **main** branch.
* Try to maintain a single feature/bugfix per pull request. It's okay to introduce a little bit of housekeeping
  changes along the way, but try to avoid conflating multiple features. Eventually, all these are going to go into a
  single commit, so you can use that to frame your scope.
* Try to add [unit tests](#Tests) that test your changes when applicable. This is especially important for new features and bug fixes, as it helps you to make sure that your changes are working as intended.
* Lint and test the code. When you've setup the repository with `npm run init-environment`, pre-commit and push-hooks will automatically lint and test the code. Pull request builds will run the same checks as well.

### Step 4: Pull Request

Once you're done with your changes, you can open a pull request. Make sure to follow the checklist inside the pull request template:

* Create a commit with your changes and push them to a
  [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
  > Note: Core members can push directly to a branch on the Powertools for AWS Lambda (TypeScript) repo (following the same conventions detailed below).
* Create a [pull request on GitHub](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

Pull request title and message (and PR title and description) must adhere to [conventionalcommits](https://www.conventionalcommits.org), this is enforced by the CI. This is a summary of the rules:
* The title must begin with `feat(module): title`, `fix(module): title`, `refactor(module): title` or `chore(module): title`, etc.
* Title should be lowercase.
* No period at the end of the title.

The pull request body should describe _motivation_ and follow the template provided as closely as possible. Think about your code reviewers and what information they need in order to understand what you did. If it's a big commit (hopefully not), try to provide some good entry points so it will be easier to follow.

The body should also include a reference to the issue or RFC that this PR is related to in the appropriate section.

Once the pull request is submitted, a reviewer will be assigned by the maintainers.

Discuss review comments and iterate until you get at least one "Approve". When iterating, push new commits to the same branch. Usually, all these are going to be squashed when the maintainers merge to `main`. The commit messages should be hints for you when you finalize your merge commit message.

> **Note**
> Please do not remove the legal notice at the end of the PR message. This is a requirement for any pull request to be reviewed & accepted into the project.

### Step 5: Merge

Once approved and tested, one of the maintainers will squash-merge to `main` and will use your PR title/description will be used as the commit message. Your name will be also added to the Release Notes of the next release.

## Setup Development Environment

The following sections describe how to set up the Powertools for AWS Lambda (TypeScript) repository on your local machine and perform common development tasks.

The alternative is to use a Cloud IDE like [Gitpod](https://www.gitpod.io/) or [GitHub CodeSpaces](https://github.com/features/codespaces) for your development. To quickly get up and running you can click one of these button to open a cloned version of this repo with all of the prerequisites and dependencies installed:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/aws-powertools/powertools-lambda-typescript)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=305501331)

### Prerequisites

#### Required <!-- omit in toc -->

- [Node.js 18.x](https://nodejs.org/download/release/latest-v18.x/)
  - If you use [nvm](https://github.com/nvm-sh/nvm#nvmrc) or [fnm](https://github.com/Schniz/fnm) you can install the version used in the project with `nvm use` or `fnm use` respectively. Both will use the `.nvmrc` file in the project's root.
- [npm 9.x](https://www.npmjs.com/)
  - After installing the Node.js version above, your npm version should be already 9.x as it comes bundled with Node.js.
  
#### Optional <!-- omit in toc -->

- [AWS SAM CLI >= 1.65.0](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
  - AWS SAM CLI is a command line interface for AWS Serverless Application Model (SAM), it's used in one of the examples, and it's part of the pre-push hook.
- [Docker](https://docs.docker.com/get-docker/)
  - Docker is used to build documentation and Layer.

First, [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository, and then run the following commands to clone and initialize the repository locally.

> **Note**
> In order for the commands below to work you need Node.js `18.x` and npm `9.x`

```console
git clone https://github.com/{your-account}/powertools-lambda-typescript.git
cd aws-lambda-powertools-typescript
npm run setup-local
```

We recommend that you use [Visual Studio Code](https://code.visualstudio.com/) to work on the repo. We use `eslint` and `prettier` to keep our code consistent in terms of style and reducing defects, installing [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions will help you to keep the code consistent by highlighting any issues in your code and automatically fixing them.

### Repo Layout

The Powertools for AWS Lambda (TypeScript) is fully written in [TypeScript](https://www.typescriptlang.org/) and uses a monorepo structure [managed using npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces).
If you're unfamiliar with any of these topics, it is useful to learn about them and will make understanding the codebase easier but strictly not necessary for simple contributions.

The repo contains `packages/` directory that contains the Powertools for AWS Lambda (TypeScript) utilities modules. For instance, the source code for the Logger utility can be found at the location `packages/logger` and so on.
The repo also contains a `packages/commons` directory that holds code and logic shared between one or more utilities and that is published as a separate npm package.

There are also other workspaces that are not part of the Powertools for AWS Lambda (TypeScript) utilities modules, but are used for examples (`examples/*`), documentation (`docs/snippets`), and Lambda Layers (`layers`).

### Tests

Unit and integration (e2e) tests can be found under the `tests` folder of each module.

You can run each group separately or all together thanks to [jest-runner-groups](https://www.npmjs.com/package/jest-runner-groups).

Unit tests, under `tests/unit` folder, are standard [Jest](https://jestjs.io) unit tests that aim to test the module features in isolation.

Integration tests, under `tests/e2e` folder, will test the module features by deploying AWS Lambda functions into your AWS Account. We use [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) for creating the infrastructure, and the AWS SDK for invoking the functions.

#### Unit tests

##### Write <!-- omit in toc -->

As mentioned before, tests are split into groups thanks to [jest-runner-groups](https://www.npmjs.com/package/jest-runner-groups), and therefore, each test needs to be tagged properly by adding the following comments in the header of your unit test file:

```typescript
/**
 * Tests metrics
 *
 * @group unit/<YOUR CATEGORY>/<YOUR SUB CATEGORY>
 */
```

##### Run <!-- omit in toc -->

To run unit tests, you can either use:

* `npm test -ws` while in the root folder to run them all
* `npm test -w packages/metrics` while in the root folder to run all the unit tests that belong to an utility

#### Integration tests

> **Note**
> Running teh end-to-end tests will deploy AWS resources in your AWS account, which might incur costs. The cost from **some services** are covered by the [AWS Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) but not all of them. If you don't have an AWS Account, follow [these instructions to create one](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Alternatively, you can we will run the tests for you in CI when you submit a pull request.

##### Set up <!-- omit in toc -->

As mentioned, the integration tests use AWS CDK to create the infrastructure needed for the tests. If this is the first time you use CDK, you need to run [`cdk bootstrap`](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) in the account and region you are going to run e2e tests in.

##### Write <!-- omit in toc -->

Similar to unit tests, e2e tests are split into groups thanks to [jest-runner-groups](https://www.npmjs.com/package/jest-runner-groups), and therefore, each test needs to be tagged properly by adding the following comments in the header of your unit test file:

```typescript
/**
 * Tests data lake catalog
 *
 * @group e2e/<YOUR CATEGORY>/<YOUR SUB CATEGORY>
 */
```

Follow this convention for the test filename: `<TESTED_FEATURE>.<USAGE_TYPE>.test.ts`. (e.g. `sampleRate.decorator.test.ts`, `childLogger.manual.test.ts`)

See `metrics/tests/e2e/basicFeatures.decorator.test.ts` as an example.

##### Run <!-- omit in toc -->

To run e2e tests, you can either use:

* `npm test:e2e -ws` while in the root folder to run them all
* `npm test:e2e -w packages/metrics` while in the root folder to run the module specific ones

Four important environment variables can be used:

* `RUNTIME` to select the runtime to use for the Lambda functions (default: `nodejs18x`)
* `AWS_PROFILE` to use the right AWS credentials
* `AWS_REGION` to select the region to deploy e2e tests infrastructure to
* `DISABLE_TEARDOWN` if you don't want your stack to be destroyed at the end of the test (useful in dev mode when iterating over your code).

Example: `DISABLE_TEARDOWN=true RUNTIME=nodejs18 AWS_PROFILE=dev-account AWS_REGION=eu-west-1 npm test:e2e -w packages/metrics`

Below is a diagram that shows the flow of the integration tests:

```mermaid
sequenceDiagram
    Dev Environment / CI->>+Jest: npm run test:e2e
    Jest-->Jest: Synthetize CloudFormation Stack
    Jest->>+AWS: Deploy Stack
    Jest->>+AWS: Invoke Lambda function
    AWS->>Jest: Report logs / results
    Jest-->Jest: Assert logs/result
    Jest->>+AWS: Destroy Stack
    Jest->>+Dev Environment / CI: show test results
```

##### Run e2e tests on your forked project

You can run the end-to-end tests automatically on your forked project by following these steps:

1. Create an IAM role in your target AWS account, with the least amount of privilege.

    As mentioned above in this page, we are leveraging CDK to deploy and consequently clean-up resources on AWS. Therefore, to run those tests through GitHub actions, you will need to grant specific permissions to your workflow.  

    We recommend following [Amazon IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) for the AWS credentials used in GitHub Actions workflows, including:
    * Do not store credentials in your repository's code.
    * [Grant least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) to the credentials used in GitHub Actions workflows.  Grant only the permissions required to perform the actions in your GitHub Actions workflows.
    * [Monitor the activity](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#keep-a-log) of the credentials used in GitHub Actions workflows.

    For an example of how to create a role in CDK, you can look at [@pahud/cdk-github-oidc](https://constructs.dev/packages/@pahud/cdk-github-oidc) construct.

    More information about:  

    * [GitHub OpenID Connect](https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/)
    * ["Configure AWS Credentials" Action For GitHub Actions](https://github.com/aws-actions/configure-aws-credentials/)

2. Add your new role into your [GitHub fork secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) with name `AWS_ROLE_ARN_TO_ASSUME`.
3. In your forked repository, go to the "Actions" tab and select the `run-e2e-tests` workflow.
4. On the `run-e2e-tests` workflow page, select "Run workflow" and run it on the desired branch.

> :warning: **Don't automatically run end-to-end tests on branch push or PRs**. A malicious attacker can submit a pull request to attack your AWS account. Ideally, use a blank account without any important workload/data, and limit `AWS_ROLE_ARN_TO_ASSUME` permission to least minimum privilege.

### Documentation

You might find useful to run both the documentation website and the API reference locally while contributing.

#### API reference

You can build and start the API reference website by running these two commands in the project's root:

* `npm run docs-generateApiDoc` OR `typedoc .`
* `npm run docs-runLocalApiDoc` OR `npx live-server api`

#### Docs website

You can build and start a local docs website by running:  

`npm run docs-website-build-run`

Alternatively you can run these two commands:

* `npm run docs-buildDockerImage` OR `docker build -t squidfunk/mkdocs-material ./docs/`
* `npm run docs-runLocalDocker` OR `docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material`

### Build & Package

In some cases, you might want to build and package the utilities to test them in a separate project or to make sure that the bundling is working as expected.

Before running the following commands, make sure that you have installed the dependencies for the current branch by running `npm ci` in the root folder:
- `npm run build` to build the project, this will generate a `lib` folder in each one of the packages folders.
- `npm pack -w packages/metrics` to package a specific utility, this will generate a `.tgz` file in the root folder.
- `git restore .` to restore the changes made by the build and package commands.

If you want to package more than one utility, you can append one or more flags to the same command, for example: `npm pack -w packages/metrics -w packages/logger`.

You can then install the package in your project by running `npm install <path-to-tgz-file>`.

### Conventions

| Category          | Convention                                                                                                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Docstring**     | We use [TypeDoc](https://typedoc.org) annotations to provide type information and create API references.                                                                                                                               |
| **Style guide**   | We use `eslint` & `prettier` to keep our code consistent in terms of style and reducing defects.                                                                                                                                       |
| **Test coverage** | We use [Jest](https://jestjs.io/) to test our code and [Codecov](https://codecov.io/) to report test coverage. We aim to have 100% test coverage in our unit tests.                                                                    |
| **Git commits**   | We follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). These are not enforced as we squash and merge PRs, but PR titles are enforced during CI.                                                             |
| **Documentation** | API reference docs are generated from docstrings which should have an Examples section to allow developers to have what they need within their own IDE. Documentation website covers the wider usage, tips, and strives to be concise. |

## Licensing

See the [LICENSE](LICENSE) file for our project's licensing. We will ask you to confirm the licensing of your contribution.

We may ask you to sign a [Contributor License Agreement (CLA)](http://en.wikipedia.org/wiki/Contributor_License_Agreement) for larger changes.
