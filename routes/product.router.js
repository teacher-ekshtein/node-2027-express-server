import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const productRouter = Router();

// קבלת כל המוצרים
// :נוסיף פרמטרים אופציונליים
// sort - מיון לפי
// page, limit - עימוד
productRouter.get('/', getProducts);

// הוספת מוצר
productRouter.post('/', addProduct);

// עדכון מוצר
productRouter.put('/:id', updateProduct);

// מחיקת מוצר
productRouter.delete('/:iddddd', deleteProduct);

export default productRouter;