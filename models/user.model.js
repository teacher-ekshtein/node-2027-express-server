import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

// אסור לשמור בדטהבייס סיסמא כמו שהיא
// חייבים להצפין אותה
const userSchema = new Schema({
    // _id אם לא כתבנו ייצור אוטומטית
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: String, // admin/user
});

// פונקציה שמתבצעת לפני שמירה/עדכון בטבלת משתמשים
userSchema.pre(['save', /update/i], async function () {
    // אם לא עדכנו סיסמא - נצא מכאן
    if (!this.isModified('password')) return;

    // function הפונקציה הזו חייבת להיות עם
    // this - האוביקט שהולך להישמר בדטהבייס

    // כמה סיבובים לאלגוריתם
    const salt = await bcrypt.genSalt(12);

    // הצפנת סיסמא
    this.password = await bcrypt.hash(this.password, salt);

    // אוטומטית בסוף הפונקציה מפעיל את הפונקציה המקורית
    // ולכן אוטומטית תישמר הסיסמא המוצפנת בדטהבייס    
});

// מחבר את הסכמה לשם של אוסף
const User = model('User', userSchema);

export default User;