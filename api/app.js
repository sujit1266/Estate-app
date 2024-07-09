import express from "express";
import cors from "cors";
import authrouter from "./routes/auth.route.js";
import postrouter from "./routes/post.route.js";
import cookieParser from "cookie-parser";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
const port=3000;

const app=express();

app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());


app.use("/api/auth", authrouter);
app.use("/api/users", userRoute);
app.use("/api/posts", postrouter);
app.use("/api/test", testRoute);



app.listen(port, ()=>{
     console.log(`server is running on ${port}`);
})