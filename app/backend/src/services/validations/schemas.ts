import Joi from 'joi';

const nameSchemaRequired = Joi.required();
const nameSchemaString = Joi.string();
const nameSchemaStringMin = Joi.string().min(3).messages({
  'string.min': '"name" length must be at least 3 characters long',
});

const priceSchemaRequired = Joi.required();
const priceSchemaString = Joi.string();
const priceSchemaStringMin = Joi.string().min(3).messages({
  'string.min': '"price" length must be at least 3 characters long',
});

export default {
  nameSchemaRequired,
  nameSchemaString,
  nameSchemaStringMin,
  priceSchemaRequired,
  priceSchemaString,
  priceSchemaStringMin,
};