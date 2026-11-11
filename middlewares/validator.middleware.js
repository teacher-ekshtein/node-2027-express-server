import { AppError } from "../utils/AppError.js";
import { productSchema } from "../validations/product.validation.js";

// עבור סכמה של מוצר
export const joiValidator = (schema) => {
    return (req, res, next) => {
        // כברירת מחדל עוצר בשגיאה הראשונה
        // validate-אם רוצים שיחזיר את כל השגיאות - צריך לשלוח אוביקט של הגדרות ל
        const { error, value } = schema.validate(req.body);

        // היתה שגיאה
        if (error) {
            throw new AppError(error, 'validation', 409);
        }
        else {
            // value - אם לא היתה שגיאה, חוזר האוביקט התקין אחרי כל ההמרות
            // מעבירים את הבאדי התקין הלאה
            req.body = value;
            next();
        }
    };
}