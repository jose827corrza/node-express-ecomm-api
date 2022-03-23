const boom = require('@hapi/boom');

function checkForRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if(!roles.includes(user.role)){
      next(boom.forbidden(`Tu rol actual ${user.role} no tiene acceso :c`));
    }
    next();
  };
};

module.exports = checkForRoles;
