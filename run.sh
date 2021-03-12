#!/bin/bash

echo "Please enter the consumer pact tag version:"
read versionTag

echo "Please enter the robotics email address:"
read emailAddress

echo "Please enter Pact broker API Token:"
read pactBrokerToken

export RPA_SENDGRID_API_KEY=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
export RPA_FROM_EMAIL=civilunspecified@gmail.com
export RPA_PACT_BROKER_URL='https://civil-damages-claims.pactflow.io/'
export RPA_PACT_BROKER_TOKEN=$pactBrokerToken

export RPA_CONSUMER_VERSION_TAG=$versionTag
export RPA_TO_EMAIL=$emailAddress

#Hotpatching the library (https://tools.hmcts.net/jira/browse/CMC-1275)
#This needs to be removed once the client has been fixed (https://github.com/pact-foundation/pact-ruby-standalone/issues/55)

if [ -e ./node_modules/@pact-foundation/pact-node/standalone/darwin-1.88.3/pact/lib/ruby/lib ]; then
  cp ./certificate-bundle/ca-bundle.crt ./node_modules/@pact-foundation/pact-node/standalone/darwin-1.88.3/pact/lib/ruby/lib
else
#  the path on the windows
  cp ./certificate-bundle/ca-bundle.crt ./node_modules/@pact-foundation/pact-node/standalone/win32-1.88.3/pact/lib/ruby/lib
fi

yarn install
yarn test:pact
