import { Router } from "express";
import { joiValidator } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../validations/user.validation.js";

const userRouter = Router();

// הרשמה של חדש
userRouter.post('/', joiValidator(registerSchema), (req, res) => {
    res.json({ msg: 'register' });
});

// התחברות של קיים
userRouter.post('/login', joiValidator(loginSchema), (req, res) => {
    res.json({ msg: 'login' });
});

export default userRouter;