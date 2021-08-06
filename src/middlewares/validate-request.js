const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({
      errors: [errors.array()]
    });
  } else {
    next();
  }
};

module.exports = exports = validateRequest;
