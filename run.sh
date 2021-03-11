#!/bin/bash

echo "Please enter the consumer pact tag version:"
read versionTag

echo "Please enter the robotics email address:"
read emailAddress

echo "Please enter Pact broker API Token:"
read pactBrokerToken

export RPA_SENDGRID_API_KEY=
export RPA_FROM_EMAIL=civilunspecified@gmail.com
export RPA_PACT_BROKER_URL='https://civil-damages-claims.pactflow.io/'
export RPA_PACT_BROKER_TOKEN=$pactBrokerToken

export RPA_CONSUMER_VERSION_TAG=$versionTag
export RPA_TO_EMAIL=$emailAddress


yarn install
yarn test:pact
