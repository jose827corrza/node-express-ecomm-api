// function errorLogs(err, req, res, next){
//     console.log('Log de error');
//     console.error(err);
// }

function errorHandler(err, req, res, next) {
    console.log('errorLog')
    res.status(500).json({ 
        message: err.message, 
        stack: err.stack 
    });
}

function boomErrorHandler(err, req, res, next){
    console.log('boom');
    if(err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

module.exports = {errorHandler, boomErrorHandler};