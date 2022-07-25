import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import register from "./routes/register.user.js";
import login from "./routes/login.users.js";
import update from "./routes/update.user.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(register);
app.use(login);
app.use(update);
app.listen(port, () => console.log("http://localhost:" + port));
//# sourceMappingURL=app.js.map