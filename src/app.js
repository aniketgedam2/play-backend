import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// allowing cors_origin resources sharing.
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

// limit the json request to 16 kb to avoid server load
app.use(express.json({limit:"16kb"}));

// URL contains "%20" or "+" to handle this we use urlEncoded (extended for nexted objects)
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes imports
import userRouter from "./routes/user.router.js"

//routes declaration
app.use("/api/v1/users",userRouter)


export {app}