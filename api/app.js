import express from "express";
import cors from "cors";
import authrouter from "./routes/auth.route.js";
import postrouter from "./routes/post.route.js";
import cookieParser from "cookie-parser";
const port=3000;

const app=express();

app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postrouter);
app.use("/api/auth", authrouter);


app.listen(port, ()=>{
     console.log(`server is running on ${port}`);
})