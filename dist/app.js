import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
let port = process.env.PORT || 5000;
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
app.post("/register-user", (req, res) => {
});
app.post("/login-user", (req, res) => {
});
app.post("/login-user-api", (req, res) => {
});
app.listen(port, () => console.log('running on http://localhost:' + port));
//# sourceMappingURL=app.js.map