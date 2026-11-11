// מידלוואר שתופס את כל השגיאות במערכת
// catch כמו
// יתרונות
// 1. try-catch לא צריך לכתוב בכל פונקציה

import { AppError } from "../utils/AppError.js";

// 2. כל השגיאות נראות באותו פורמט
export const errorHandler = (err, req, res, next) => {
    // err = new AppError(....)
    console.log(err);
    
    return res.status(err.status).json({ error: err });
};

export const pathNotFound = (req, res, next) => {
    throw new AppError(`path ${req.url} with method: ${req.method} not found`, 'page-not-found', 404);    
};