#!/bin/bash
if test -z "$RPA_SENDGRID_API_KEY"
then
  echo "Please enter SendGrid API Token:"
  read sendGridToken
  export RPA_SENDGRID_API_KEY=$sendGridToken
fi

echo "Please enter the consumer pact tag version:"
read versionTag

echo "Please enter the robotics email address:"
read emailAddress

if test -z "$RPA_PACT_BROKER_TOKEN"
then
  echo "Please enter Pact broker API Token:"
  read pactBrokerToken
  export RPA_PACT_BROKER_TOKEN=$pactBrokerToken
fi

echo "(Optional) Please enter the start index for case reference number,
it will override the case reference numbers in JSON attachments:"
read caseReferenceStartIndex

export RPA_FROM_EMAIL=civilunspecified@gmail.com
export RPA_PACT_BROKER_URL='https://civil-damages-claims.pactflow.io/'
export RPA_CONSUMER_VERSION_TAG=$versionTag
export RPA_TO_EMAIL=$emailAddress
export RPA_CASE_REFERENCE_START_INDEX=$caseReferenceStartIndex

yarn install

#Hotpatching the library (https://tools.hmcts.net/jira/browse/CMC-1275)
#This needs to be removed once the client has been fixed (https://github.com/pact-foundation/pact-ruby-standalone/issues/55)

#if [ -e ./node_modules/@pact-foundation/pact-node/standalone/darwin-1.88.3/pact/lib/ruby/lib ]; then
#  cp ./certificate-bundle/ca-bundle.crt ./node_modules/@pact-foundation/pact-node/standalone/darwin-1.88.3/pact/lib/ruby/lib
#fi

yarn test:pact
