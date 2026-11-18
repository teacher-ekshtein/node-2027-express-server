import Product from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

const productsArr = [
    { id: 1, name: 'milk', price: 7 },
    { id: 2, name: 'chocolate', price: 10.5 },
    { id: 3, name: 'cheese', price: 6 },
];

export const getProducts = async (req, res) => {
    console.log(req.myUser);

    const { page = 1, limit = 10, sort } = req.query;
    // זהה לשורה שלעיל
    // const page = req.query.page ?? 1;
    // const limit = req.query.limit ?? 10;
    // const sort = req.query.sort;

    // slice - חותך את המערך ממיקום עד מיקום
    // const result = productsArr.slice((page - 1) * limit, page * limit);

    const result = await Product.find(); // SELECT * FROM products
    // const result = await Product.find({ amount: 0, price: 5 }); // SELECT * FROM products WHERE amount = 0 AND price = 5

    // SELECT * FROM products WHERE amount = 0 OR price = 5
    // const result = await Product.find({
    //     $or: [
    //         { amount: 0 }, 
    //         { price: 5 }
    //     ]
    // });

    // const inStock = await Product.find({ amount: { $gt: 0 } }); // SELECT * FROM products WHERE amount > 0

    // כשמבצעים עימוד מקובל להחזיר גם כמה נתונים יש בסה"כ
    // בשביל שהקליינט ידע כמה עמודים להציג
    res.json({ data: result, total: productsArr.length });
};

// products/name?search=mi
export const getByName = async (req, res) => {
    // name LIKE '%a%'
    // RegExp = תבנית של מחרוזת
    // const result = await Product.find({ name: /[0-9a-z]/ }); // מכיל אות קטנה או מספר
    const result = await Product.find({ name: new RegExp(req.query.search) }); // מכיל את מה שהיוזר שלח
    res.json(result);
};

// products/121212
export const getProductById = async (req, res, next) => {
    const pr = await Product.findById(req.params.id);

    if (!pr) {
        // 1.
        // next שמקבל פרמטר הולך אוטומטית למידלוואר של השגיאות
        // err את הפרמטר שקיבל ישלח ל
        // return next(new AppError('product not found', 'resource-not-found', 404));
        throw new AppError('product not found', 'resource-not-found', 404);

        // לא נזרוק שגיאות כך אלא כמו השורה שלעיל עם נקסט
        // return res.status(404).json({ error: 'product not found' })
    }
    return res.json(pr);
}

export const addProduct = async (req, res) => {
    const newP = new Product(req.body);
    await newP.save();
    res.status(201).json(newP);
};

export const getByPrice = (req, res) => {
    console.log('get by price');
};

export const updateProduct = async (req, res) => {
    const id = req.params.id;

    const p = await Product.findByIdAndUpdate(
        id,
        {
            $set: req.body, // יעדכן את כל השדות שקיימים בבאדי ואם לא קיימים באוביקט יוסיף חדש
            // $unset: { amount: true }, // מחיקת שדה
            // $rename: { username: 'name' },
            // $addToSet: { categories: 'xxx' } // הוספה למערך בלי כפולים
        },
        {
            new: true, // תחזיר אוביקט מעודכן
            runValidators: true // תבדוק תקינות ע"י סכמה של מונגו
        });

    res.json(p);
};

export const deleteProduct = async (req, res) => {
    // זו הדרך לקבל פרמטרים חובה מהיו-אר-אל
    const id = req.params.iddddd;

    const p = await Product.findByIdAndDelete(id);

    if (!p) {
        throw new AppError('product not found', 'resource-not-found', 404);
    } else {
        res.status(204).json();
    }
};