#!/bin/bash

echo "Please enter the consumer pact tag version:"
read versionTag

echo "Please enter the robotics email address"
read emailAddress

export RPA_SENDGRID_API_KEY=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
export RPA_FROM_EMAIL=civilunspecified@gmail.com
export RPA_PACT_BROKER_URL='http://localhost:80'

export RPA_CONSUMER_VERSION_TAG=$versionTag
export RPA_TO_EMAIL=$emailAddress

yarn install
yarn test:pact

