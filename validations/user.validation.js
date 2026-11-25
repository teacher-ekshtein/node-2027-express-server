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
    email: Joi.string().email().required(),
    repeatPassword: Joi.ref('password')
});