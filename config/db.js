import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        // 1. התחברות למסד הנתונים
        //    הכתובת של השרת + השם של הדטהבייס
        const MONGODB_URI = process.env.MONGODB_URI;
        await connect(`${MONGODB_URI}/storeDB`);
        console.log('mongo connected successfuly');        
    } catch (error) {
        console.log(error.message);

        // סגירת השרת אם לא הצליח להתחבר למונגו
        process.exit(1);
    }
};