// VALIDATION
const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number().required(),
    role: Joi.string().default('user').required(),
    password: Joi.string().min(6).required(),
    cpassword: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
