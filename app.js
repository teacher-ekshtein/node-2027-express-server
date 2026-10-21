// 1. התקנה+ייבוא
import createApp from 'express';

// 2. יצירת שרת משוכלל
const app = createApp();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// 3. הרצת השרת על כתובת מסוימת
const port = 5000;
app.listen(port, () => {
    // פונקציה שמתבצעת פעם אחת שהשרת עולה
    console.log(`Server is running on http://localhost:${port}`)
});