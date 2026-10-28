import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct, getProductById } from "../controllers/product.controller.js";

const productRouter = Router();

// קבלת כל המוצרים
// :נוסיף פרמטרים אופציונליים
// sort - מיון לפי
// page, limit - עימוד
productRouter.get('/', getProducts);

productRouter.get('/:id', getProductById);

// הוספת מוצר
productRouter.post('/', addProduct);

// עדכון מוצר
productRouter.put('/:id', updateProduct);

// מחיקת מוצר
productRouter.delete('/:iddddd', deleteProduct);

export default productRouter;