// מידלוואר שתופס את כל השגיאות במערכת
// catch כמו
// יתרונות
// 1. try-catch לא צריך לכתוב בכל פונקציה
// 2. כל השגיאות נראות באותו פורמט
export const errorHandler = (err, req, res, next) => {
    // err = new AppError(....)
    console.log(err);
    
    return res.status(err.status).json({ error: err });
};