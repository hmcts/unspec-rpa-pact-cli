const { Verifier } = require('@pact-foundation/pact');
let opts = {
  providerBaseUrl: process.env.PROVIDER_BASE_URL || 'http://localhost:3200',
  provider: 'rpa_api',
  pactBrokerUrl: process.env.BROKER_URL || 'http://localhost:80',
  publishVerificationResult: true,
  providerVersion: '1.0',
};

return new Verifier(opts).verifyProvider().then(output => {
  console.log('Pacts successfully verified!');
  console.log(output);
}).finally(() => {
  console.log('Completed verification');
});

