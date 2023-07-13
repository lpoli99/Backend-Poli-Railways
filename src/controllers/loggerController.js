import { request } from "express"

class LoggerController{
    loggerTest = async (req = request, res) => {
        req.logger.debug('This is a debug level Log')
        req.logger.http('This is a http level Log')
        req.logger.info('This is a info level Log')
        req.logger.warning('This is a warning level Log')
        req.logger.error('This is a error level Log')
        req.logger.fatal('This is a fatal level Log')

        res.send('Logger Test')
    }
}

export default LoggerController