import User from '../models/user.model.js';

export const register = async (req, res) => {
    // שמירה של סיסמא מוצפנת בדטהבייס
    const u = new User(req.body);
    await u.save();

    res.json(u);
};

export const login = (req, res) => {
    res.json({ msg: 'login' });
};

// updatePassword
// updateDetails