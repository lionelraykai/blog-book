import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import postRouter from "./routes/post.js";
import cors from "cors"
import {fileURLToPath} from "url"
import { dirname,join } from "path";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT;
app.use("/auth", authRouter);
app.use('/',postRouter)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use("/uploads",express.static(join(__dirname,"uploads")))
const connection = process.env.CONNECTION_STRING;

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
