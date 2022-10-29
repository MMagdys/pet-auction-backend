import mongoose from "mongoose";

export class DBHelper {

    public static async setupDatabase() {
        const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/camlist_challenge-test";
        await mongoose.connect(mongoUrl);
        await mongoose.connection.db.dropDatabase();
    }


    public static async tearDownDatabase() {
        await mongoose.disconnect();
    }



}