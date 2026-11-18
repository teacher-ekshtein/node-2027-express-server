import multer from 'multer';
import { mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

// dest - תיקית יעד, הגדרות בסיסיות
// export const upload = multer({ 
//     dest: 'public/uploads/',
//  });

// הגדרות מורכבות
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // יעד לא כמחרוזת אלא בהתאמה לתנאי/בצורה דינאמית
        const now = new Date();
        const destination = `public/uploads/${now.getFullYear()}-${now.getMonth() + 1}`;

        // שימי ❤️ - כאן התיקון של השגיאה שהיתה בשיעור
        // בגלל שרצינו לשמור בתיקיה שלא קיימת - נצטרך ליצור אותה
        try {
            // אם התיקיה לא קיימת - תיצור אותה
            await mkdir(destination, { recursive: true });            
        } catch (err) {
        }

        // שגיאה אם היתה
        // נתון רלוונטי - שם התיקיה
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        // שגיאה אם היתה
        // נתון רלוונטי - שם הקובץ
        // בד"כ כדאי להשתמש כאן במשהו אקראי/מזהה ייחודי כדי למנוע התנגשויות שמות קבצים
        cb(null, `${file.originalname}`);
    }
});

export const upload = multer({ storage: storage })