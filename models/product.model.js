// 2. הגדרת האוספים בדטהבייס

import { model, Schema } from "mongoose";

// { id: 1, name: 'milk', price: 7 },
const productSchema = new Schema({
    // _id אם לא כתבנו ייצור אוטומטית
    name: String,
    price: Number,
    amount: Number,
    categories: [String], // מערך קטגוריות
});

// מחבר את הסכמה לשם של אוסף
const Product = model('Product', productSchema);
// השורה שלעיל הופכת לזו
// const Product = model('products', productSchema);

export default Product;