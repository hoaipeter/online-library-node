// VALIDATION
const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(6).required(),
    lastname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number().required(),
    role: Joi.string().default('user').required(),
    password: Joi.string().min(6).required(),
    cpassword: Joi.ref('password')
  }).with('password', 'cpassword');

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
