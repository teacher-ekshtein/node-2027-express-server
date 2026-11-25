import Joi from "joi";

// Joi
// req.body מתבצעות על
// ללא קשר לדטהבייס
// כניסה למערכת - ללא הוספה ולכן לא נבדקות עליה הבדיקות תקינות של מונגוס

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
    repeatPassword: Joi.ref('password'),
});