import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct, getProductById } from "../controllers/product.controller.js";
import { blockDay, isAdmin, printDate } from "../middlewares/print.middleware.js";
import { joiValidator } from "../middlewares/validator.middleware.js";
import { productSchema } from "../validations/product.validation.js";

const productRouter = Router();

// יזמן רק כשמגיעים לראוטר של מוצרים
// products רק כתובות שמתחילות ב
// מידלוואר רגיל - בלי לזמן
productRouter.use(printDate);

// קבלת כל המוצרים
// :נוסיף פרמטרים אופציונליים
// sort - מיון לפי
// page, limit - עימוד
productRouter.get('/', isAdmin, getProducts);

productRouter.get('/:id', getProductById);

// הוספת מוצר
// אפשר להפעיל מידלוואר על ניתוב ספציפי
// מידלוואר קריאטור - עם זימון/סוגריים
const x = blockDay([3, 7]);
productRouter.post('/', x, joiValidator(productSchema), addProduct);

// עדכון מוצר
productRouter.put('/:id', blockDay([7]), joiValidator(productSchema), updateProduct);

// מחיקת מוצר
productRouter.delete('/:iddddd', deleteProduct);

export default productRouter;