// 1. התקנה+ייבוא
import createApp, { json, urlencoded, static as static_ } from 'express';
import productRouter from './routes/product.router.js';
import morgan from 'morgan';
import cors from 'cors';

// 2. יצירת שרת משוכלל
const app = createApp();

// הוספת הגדרות על השרת

// לא מפעילים את הפונקציה
// שולחים מצביע לפונקציה
// והיא מופעלת אוטומטית לפני כל בקשה
// app.use(printDate);

// הרשאה לכל הקליינטים
app.use(cors());

// הרשאה לקליינט ספציפי
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// app.use(blockDay);

// לוגים
app.use(morgan('dev'));


// השרת יכול לקבל באדי
// 1. בתור אוביקט גייסון
app.use(json());
// 2. FormData מתוך טופס, למשל כשמעלים קובץ ועובדים עם
app.use(urlencoded({ extended: true }));

// static_('public') - וקורא את כל הקבצים שבה public הולך לתיקיה
// בכל גישה לשרת יחפש קודם קובץ מתאים בתיקיה
app.use(static_('public'));

app.get('/', (req, res) => {
    // כך מחזירים טקסט באקספרס
    res.send('Hello World');
});

// חיבור של הראוטרים לשרת
// '/products' - כל הבקשות שמתחילות ב
// חותך תחילית ואז הולך לראוטר
app.use('/products', productRouter);

// 3. הרצת השרת על כתובת מסוימת
const port = process.env.PORT ?? 5000;
app.listen(port, () => {
    // פונקציה שמתבצעת פעם אחת שהשרת עולה
    console.log(`Server is running on http://localhost:${port}`);
    console.log('hello');
    console.log('bye');
});