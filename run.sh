#!/bin/bash

echo "Please enter the consumer pact tag version:"
read versionTag



echo "Please enter the robotics email address"
read emailAddress

export RPA_SENDGRID_API_KEY=
export RPA_FROM_EMAIL=civilunspecified@gmail.com
export RPA_PACT_BROKER_URL='https://pact-broker.platform.hmcts.net'

export RPA_CONSUMER_VERSION_TAG=$versionTag
export RPA_TO_EMAIL=$emailAddress



yarn install
#Hotpatching the library (https://tools.hmcts.net/jira/browse/CMC-1275)
#This needs to be removed once the client has been fixed (https://github.com/pact-foundation/pact-ruby-standalone/issues/55)

#This line copies certificates needed to be able to use https://pact-broker.platform.hmcts.net
cp ./certificate-bundle/ca-bundle.crt ./node_modules/@pact-foundation/pact-node/standalone/darwin-1.88.3/pact/lib/ruby/lib
yarn test:pact
