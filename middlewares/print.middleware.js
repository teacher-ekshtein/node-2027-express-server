// פונקציית מידלוואר מקבלת אוטומטית 3 פרמטרים
// req  - בקשה
// res  - תגובה
// next - פונקציה שעוברת למידלוואר הבא
export const printDate = (req, res, next) => {
    console.log('hello from printDate');
    console.log(new Date());

    // לא נתקע אלא עובר למידלוואר הבא
    next();
};

// דוגמאות שימוש
// 1. בדיקת הרשאות - מנהל/מורה/תלמיד
// 2. בדיקת תקינות קלט
// 3. טיפול בשגיאות - { error: { msg: "....", code: 1000 } }
// 4. הוספת באדי
// 5. העלאת קבצים

// 6. חסימת שרת בשעות/בימים מסוימים
export const blockDay = (req, res, next) => {
    const now = new Date();

    // אם שבת - לא נמשיך הלאה
    if (now.getDay() === 6) {
        res.status(400).json({ error: "שבת שלום" });
    } else { // אחרת - נמשיך
        next();
    }
};