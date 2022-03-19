const { ValidationError} = require('sequelize');

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
        return res.status(output.statusCode).json(output.payload);
    }
    next(err);
}
function ormErrorHandler(err, req, res, next){
  if(err instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors
    });
  }
  next(err);
}
module.exports = {errorHandler, boomErrorHandler, ormErrorHandler};
