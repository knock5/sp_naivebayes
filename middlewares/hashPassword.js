const bcrypt = require('bcrypt');

const hashPasswordMiddleware = async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data.password) {
        const hashedPassword = await bcrypt.hash(params.args.data.password, 10);
        params.args.data.password = hashedPassword;
      }
    }
  }
  return next(params);
};

module.exports = hashPasswordMiddleware;
