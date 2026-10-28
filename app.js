// 1. התקנה+ייבוא
import createApp, { json } from 'express';
import productRouter from './routes/product.router.js';

// 2. יצירת שרת משוכלל
const app = createApp();

// הוספת הגדרות על השרת
// השרת יכול לקבל באדי בתור אוביקט גייסון
app.use(json());

app.get('/', (req, res) => {
    // כך מחזירים טקסט באקספרס
    res.send('Hello World');
});

// חיבור של הראוטרים לשרת
// '/products' - כל הבקשות שמתחילות ב
// חותך תחילית ואז הולך לראוטר
app.use('/products', productRouter);

// 3. הרצת השרת על כתובת מסוימת
const port = 5000;
app.listen(port, () => {
    // פונקציה שמתבצעת פעם אחת שהשרת עולה
    console.log(`Server is running on http://localhost:${port}`);
    console.log('hello');
    console.log('bye');
});