import log from 'loglevel'
import * as Sentry from '@sentry/nextjs'

const logger = log.getLogger('NextJSApp')
log.setLevel('info') // Set the default log level


// Sentry.init({
//   dsn: 'https://80e2c68e14cba2bceb53a94315877a98@o4506186000498688.ingest.sentry.io/4506186003382272',
//   // https://80e2c68e14cba2bceb53a94315877a98@o4506186000498688.ingest.sentry.io/4506186003382272
// });

log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = log.methodFactory(methodName, logLevel, loggerName)
  return function (message) {
    const timestamp = new Date().toISOString()
    rawMethod(`[${timestamp}] [${methodName.toUpperCase()}] ${message}`)
    if (methodName === 'error') {
      Sentry.captureMessage(message);
      // You can also use Sentry.captureException() for capturing exceptions
    }
  }
}

export default logger


// 