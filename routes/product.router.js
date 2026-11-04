import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct, getProductById } from "../controllers/product.controller.js";
import { blockDay, printDate } from "../middlewares/print.middleware.js";

const productRouter = Router();

// יזמן רק כשמגיעים לראוטר של מוצרים
// products רק כתובות שמתחילות ב
// מידלוואר רגיל - בלי לזמן
productRouter.use(printDate);

// קבלת כל המוצרים
// :נוסיף פרמטרים אופציונליים
// sort - מיון לפי
// page, limit - עימוד
productRouter.get('/', getProducts);

productRouter.get('/:id', getProductById);

// הוספת מוצר
// אפשר להפעיל מידלוואר על ניתוב ספציפי
// מידלוואר קריאטור - עם זימון/סוגריים
const x = blockDay([4, 7]);
productRouter.post('/', x, addProduct);

// עדכון מוצר
productRouter.put('/:id', blockDay([7]), updateProduct);

// מחיקת מוצר
productRouter.delete('/:iddddd', deleteProduct);

export default productRouter;