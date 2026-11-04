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
// middleware creator - פונקציה שיוצרת מידלוואר לפי פרמטרים שקבלה
export const blockDay = (days = []) => {
    // פונקצית מידלוואר
    function mdl(req, res, next) {
        const now = new Date();

        // בודק במערך האם היום הנוכחי קיים בו
        // אם כן - לא נמשיך הלאה
        if (days.includes(now.getDay() + 1)) {
            res.status(400).json({ error: "האתר חסום היום, נסה ביום אחר..." });
        } else { // אחרת - נמשיך
            next();
        }
    };

    // החזרנו פונקצית מידלוואר מותאמת אישית
    return mdl;
};