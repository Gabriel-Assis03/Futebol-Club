import Joi = require('joi');

const passwordSchema = Joi.string().min(6).required();

const emailSchema = Joi.string().email().required();

export default {
  passwordSchema,
  emailSchema,
};
