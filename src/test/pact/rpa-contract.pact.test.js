const { Verifier } = require('@pact-foundation/pact');
let opts = {
  providerBaseUrl: process.env.PROVIDER_BASE_URL || 'http://localhost:3200',
  provider: 'rpa_api',
  pactBrokerUrl: process.env.RPA_PACT_BROKER_URL || 'http://localhost:80',
  publishVerificationResult: true,
  providerVersion: '1.0.0',
  consumerVersionSelectors: [
    {
      tag: process.env.RPA_CONSUMER_VERSION_TAG || 'latest',
    },
  ],
};

return new Verifier(opts).verifyProvider().then(output => {
  console.log('Pacts successfully verified!');
  console.log(output);
}).finally(() => {
  console.log('Completed verification');
});

