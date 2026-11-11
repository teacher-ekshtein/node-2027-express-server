import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().alphanum().lowercase().min(3).required(),
    price: Joi.number().positive().required(),
    amount: Joi.number().positive().default(0)
});