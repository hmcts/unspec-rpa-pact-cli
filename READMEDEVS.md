# rpa-contract-test-rpa-contract

## Getting Started
This tool is used to verify pacts using the Pactflow platform, a public pact broker. Upon verification, an email with details of the pact is sent to an email, provided by the user.

The Pactflow portal can be accessed via the following link: https://civil-damages-claims.pactflow.io

To access the portal, credentials are required which can be acquired by contacting the Civil Damages team.

To use the command line interface, the API token for the platform is required, which can also be retrieved from the Civil Damages team.
### Prerequisites

Running the application requires the following tools to be installed in your environment:

  * [Node.js](https://nodejs.org/) v12.0.0 or later
  * [yarn](https://yarnpkg.com/)
  * [Docker](https://www.docker.com)

### Running the application

Install dependencies by executing the following command:

```bash
$ yarn install
```

Run the fake endpoint:

```bash
$ yarn start
```
The applications's home page will be available at https://localhost:3200

### Running the pact verifier with application

Run application and pact verifier. This will:
 * start the application at https://localhost:3200
 * run the pact verifier against the pacts fetched from the pact broker configured with env variable
 * and will send email to `RPA_TO_EMAIL` address configured

These are the environment variables required to set before running.
| Env Variable             | Default                             | Mandatory |
| ---------------------    | ----------------------------------- | --------- |
| RPA_SENDGRID_API_KEY     |                                     |    Yes    |
| RPA_FROM_EMAIL           |   civilunspecified@gmail.com        |    Yes    |
| RPA_TO_EMAIL             |                                     |    Yes    |
| RPA_PACT_BROKER_URL      |   http://localhost:80               |    Yes    |
| RPA_CONSUMER_VERSION_TAG |   latest                            |    Yes    |

```bash
export RPA_SENDGRID_API_KEY= XXXXX
export RPA_FROM_EMAIL='civilunspecified@gmail.com'
export RPA_TO_EMAIL=<email address to receive rpa json>

export RPA_PACT_BROKER_URL='http://localhost:80'
export RPA_CONSUMER_VERSION_TAG=<tag from pact to run against>
```

Then run:
```bash
$ yarn test:pact
```
### Running with Docker

Create docker image:

```bash
  docker-compose build
```

Run the application by executing the following command:

```bash
  docker-compose up
```

This will start the frontend container exposing the application's port
(set to `3200` in this template app).

In order to test if the application is up, you can visit https://localhost:3200 in your browser.
You should get a very basic home page (no styles, etc.).

## Developing

### Code style

We use [ESLint](https://github.com/typescript-eslint/typescript-eslint)
alongside [sass-lint](https://github.com/sasstools/sass-lint)

Running the linting with auto fix:
```bash
$ yarn lint --fix
```

### Running the tests

This template app uses [Jest](https://jestjs.io//) as the test engine. You can run unit tests by executing
the following command:

```bash
$ yarn test
```

Here's how to run functional tests (the template contains just one sample test):

```bash
$ yarn test:routes
```

Running accessibility tests:

```bash
$ yarn test:a11y
```

Make sure all the paths in your application are covered by accessibility tests (see [a11y.ts](src/test/a11y/a11y.ts)).

### Security

#### CSRF prevention

[Cross-Site Request Forgery](https://github.com/pillarjs/understanding-csrf) prevention has already been
set up in this template, at the application level. However, you need to make sure that CSRF token
is present in every HTML form that requires it. For that purpose you can use the `csrfProtection` macro,
included in this template app. Your njk file would look like this:

```
{% from "macros/csrf.njk" import csrfProtection %}
...
<form ...>
  ...
    {{ csrfProtection(csrfToken) }}
  ...
</form>
...
```

#### Helmet

This application uses [Helmet](https://helmetjs.github.io/), which adds various security-related HTTP headers
to the responses. Apart from default Helmet functions, following headers are set:

* [Referrer-Policy](https://helmetjs.github.io/docs/referrer-policy/)
* [Content-Security-Policy](https://helmetjs.github.io/docs/csp/)

There is a configuration section related with those headers, where you can specify:
* `referrerPolicy` - value of the `Referrer-Policy` header


Here's an example setup:

```json
    "security": {
      "referrerPolicy": "origin",
    }
```

Make sure you have those values set correctly for your application.

### Healthcheck

The application exposes a health endpoint (https://localhost:3200/health), created with the use of
[Nodejs Healthcheck](https://github.com/hmcts/nodejs-healthcheck) library. This endpoint is defined
in [health.ts](src/main/routes/health.ts) file. Make sure you adjust it correctly in your application.
In particular, remember to replace the sample check with checks specific to your frontend app,
e.g. the ones verifying the state of each service it depends on.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
