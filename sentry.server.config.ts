// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV !== 'production') {
  console.log('Sentry désactivé en développement pour éviter les bugs avec --turbo');
} else {
  Sentry.init({
    dsn: 'https://021198346bc06e3a9261d869ffcd295b@o4508805952307200.ingest.de.sentry.io/4508805952700496',

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
