import express from "express";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import aiRouter from "./routes/aiRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* =======================
   ✅ GLOBAL MIDDLEWARES
======================= */

app.use(express.json());
app.use(cookieParser());

/* =======================
   ✅ CORS CONFIG (PRODUCTION SAFE)
======================= */

const allowedOrigins = [
    "https://hi-coding-junction.netlify.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: function(origin, callback) {
        // allow server-to-server / postman / mobile apps
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

/* 🔥 PRE-FLIGHT (MOST IMPORTANT FOR VERCEL) */
app.options("*", cors());

/* =======================
   ✅ SAFETY HEADERS (OPTIONAL BUT GOOD)
======================= */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

/* =======================
   ✅ ROUTES
======================= */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);
app.use("/api/review", reviewRouter);

app.get("/", (req, res) => {
    res.send("🚀 LMS Backend Running Successfully");
});

/* =======================
   ✅ START SERVER AFTER DB CONNECT
======================= */

const startServer = async() => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`✅ Server running on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
};

startServer();