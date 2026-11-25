import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

// אסור לשמור בדטהבייס סיסמא כמו שהיא
// חייבים להצפין אותה
const userSchema = new Schema({
    // _id אם לא כתבנו ייצור אוטומטית

    // בדיקות תקינות שיתבצעו רק כשמוסיפים/מעדכנים בדטהבייס
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // admin/user
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

// פעולה סטטית = שייכת לכל המחלקה - לא לאובייקט
// userSchema.statics

// פעולה שמופעלת על אובייקט ספציפי
// this בתוכה יש גישה ל
// userSchema.methods
userSchema.methods.checkPasswords = async function (currentPassword) {
    // this - אוביקט של יוזר מתוך הדטהבייס

    // bcrypt.compare - השוואת סיסמא מוצפנת לרגילה
    return await bcrypt.compare(currentPassword, this.password);
};

// userSchema.virtual('isInBB').get(function () {
//     return this.city === "bb";
// });

// toJSON - פונקציה שמורה
// פונקציה שנקראת אוטומטית כשמחזירים אוביקט לקליינט מסוג ג'ייסון
userSchema.set('toJSON', {
    virtuals: true,
    transform (doc, converted) {
        // doc האוביקט המקורי
        // converted האוביקט שחוזר לקליינט

        // כל אלו לא יחזרו לקליינט
        delete converted.password;
        delete converted.__v;

        // id לכל אוביקט של מונגו יש מאפיין מחושב שנקרא - virtual
        // converted.id = converted._id;
        delete converted._id;

        // return converted;
    }
});

// מחבר את הסכמה לשם של אוסף
const User = model('User', userSchema);

export default User;