const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send({
      error: {
        status: 400,
        message: error?.details?.[0]?.message.replace(/"/g, ''),
      },
    });
  } else {
    next();
  }
};

module.exports = validate;
