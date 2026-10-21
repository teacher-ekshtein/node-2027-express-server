// 1. התקנה+ייבוא
import createApp, { json } from 'express';

// 2. יצירת שרת משוכלל
const app = createApp();

// הוספת הגדרות על השרת
// השרת יכול לקבל באדי בתור אוביקט גייסון
app.use(json());

const productsArr = [
    { id: 1, name: 'milk', price: 7 },
    { id: 2, name: 'chocolate', price: 10.5 },
    { id: 3, name: 'cheese', price: 6 },
];

app.get('/', (req, res) => {
    // כך מחזירים טקסט באקספרס
    res.send('Hello World');
});

// קבלת כל המוצרים
app.get('/products', (req, res) => {
    // בד"כ נשתמש בפונקציה זו כדי להחזיר אוביקט
    res.json(productsArr);
});

// הוספת מוצר
app.post('/products', (req, res) => {
    console.log(req.body);

    if (req.body.id && req.body.name && req.body.price) {
        productsArr.push(req.body);
        res.status(201).json(req.body);
    } else {
        res.status(409).json({ error: 'missing data' });
    }

});

// עדכון מוצר
app.put('/products/:id', (req, res) => {
    const id = +req.params.id;

    const index = productsArr.findIndex(p => p.id === id);
    
    // TODO: check validations before add
    productsArr[index] = req.body;

    res.json(req.body);
});

// מחיקת מוצר
app.delete('/products/:iddddd', (req, res) => {
    // זו הדרך לקבל פרמטרים חובה מהיו-אר-אל
    const id = +req.params.iddddd; // + ממיר מחרוזת למספר

    const index = productsArr.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'product not found' });
    } else {
        productsArr.splice(index, 1); // מחיקה
        res.status(204).json();
    }
});

// 3. הרצת השרת על כתובת מסוימת
const port = 5000;
app.listen(port, () => {
    // פונקציה שמתבצעת פעם אחת שהשרת עולה
    console.log(`Server is running on http://localhost:${port}`)
});