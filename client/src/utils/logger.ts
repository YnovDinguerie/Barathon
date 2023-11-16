import log from 'loglevel'
import * as Sentry from '@sentry/nextjs'

const logger = log.getLogger('NextJSApp')
log.setLevel('info') // Set the default log level

log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = log.methodFactory(methodName, logLevel, loggerName)
  return function (message) {
    const timestamp = new Date().toISOString()
    rawMethod(`[${timestamp}] [${methodName.toUpperCase()}] ${message}`)
  }
}

export default logger