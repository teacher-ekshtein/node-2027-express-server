import { AppError } from "../utils/AppError.js";
import User from '../models/user.model.js';

export const register = async (req, res) => {
    // שמירה של סיסמא מוצפנת בדטהבייס
    const u = new User(req.body);
    await u.save();

    res.json(u);
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    // חיפוש לפי ערך ייחודי
    const user = await User.findOne({ username: username });

    if (!user) {
        // לא מגלים איזה פריט שגוי - כדי להקשות על פריצה
        throw new AppError('invalid username or password', 'auth', 401);
    }

    // השוואה של הסיסמא שהמשתמש הכניס מול הסיסמא המוצפנת בדטהבייס
    if (await user.checkPasswords(password)) {
        res.json(user);
    } else {
        throw new AppError('invalid username or password', 'auth', 401);
    }
};

// updatePassword
// updateDetails