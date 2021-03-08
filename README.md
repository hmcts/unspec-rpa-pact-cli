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

### Instructions
![The pact portal after sign in.](img/pact_portal.png)

You can view details of the pact by clicking on "View Pact".
To see different versions of pacts that have been published, you can click on the tab "Matrix".

To use this on the command line, run this command on the command line:

```bash
$ ./run.sh
```
After that, you will be asked for the consumer pact tag version:

```bash
Please enter the consumer pact tag version:

```
If you do not specify a consumer pact tag, it will look for the latest pact.
And then you will be asked for the email address that the details of the pact will be sent to:
```bash
Please enter the robotics email address:

```
Using the API token that you've received from the Team, you will then enter this into the program:
```bash
Please enter Pact broker API Token:

```
* If you are verifying Pacts from the HMCTS Pact Broker, please leave this blank.
* If connecting to Pactflow, please disable the HMCTS VPN.

After this the pact verification will be carried out, and the email will be sent.

* For developers, please look at READMEDEVS.md
