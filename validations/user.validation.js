import Joi from "joi";

// התחברות אם קיים
export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


// הרשמה משתמש חדש
export const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.ref('password')
});