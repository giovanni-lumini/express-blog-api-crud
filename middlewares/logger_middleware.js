const logger_middleware = (req, res, next) => {
    const now = new Date();
    console.error(`
        Date: ${now}
        Method: ${req.method}
        url: ${req.baseUrl}
    `)
    next()
}

module.exports = logger_middleware