import mongoose from "mongoose";
import dotenv from 'dotenv';
const { Schema } = mongoose;
dotenv.config();
const userApiModel = new Schema({
    username: { type: String, unique: true },
    userid: { type: String, unique: true },
    picurl: { type: String, unique: true },
    groups: { type: Array },
    friends: { type: Array }
});
const userModel = mongoose.model(process.env.DB_API, userApiModel);
export { userModel };
//# sourceMappingURL=user.api.schema.js.map