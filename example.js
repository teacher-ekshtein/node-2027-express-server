import { connect, model, Schema } from 'mongoose';

// 2. הגדרת האוספים בדטהבייס
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

async function main() {
    try {
        // 1. התחברות למסד הנתונים
        //    הכתובת של השרת + השם של הדטהבייס
        const MONGODB_URI = process.env.MONGODB_URI;
        await connect(`${MONGODB_URI}/storeDB`);



        // 3. שאילתות - CRUD operations
        // Create
        // 1. יצירת אוביקט באויר
        const newP = new Product({ name: 'גבינה', price: 5, categories: ['milk'] });
        // 2. שמירה בדטהבייס
        await newP.save();

        // Read
        const allProducts = await Product.find(); // SELECT * FROM products
        console.log(allProducts);        

        // Update
        // Delete
    } catch (error) {
        console.log(error.message);
    }
}

main();