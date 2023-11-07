import * as Sentry from '@sentry/nextjs'

Sentry.init({
    dsn: 'https://80e2c68e14cba2bceb53a94315877a98@o4506186000498688.ingest.sentry.io/4506186003382272',
    // Replay may only be enabled for the client-side
    integrations: [new Sentry.Replay()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // ...

    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
})
