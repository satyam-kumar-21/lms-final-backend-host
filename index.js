import express from "express";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import aiRouter from "./routes/aiRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-data parsing
app.use(cookieParser());

// ✅ CORS setup
const allowedOrigins = [
    "http://localhost:5173", // Local dev
    "https://hi-coding-junction.netlify.app" // Production frontend
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS blocked"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors()); // Handle preflight requests

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);
app.use("/api/review", reviewRouter);

// Root test
app.get("/", (req, res) => {
    res.send("Hello From Server");
});

/* ✅ Start server only after DB connect */
const startServer = async() => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log("Failed to start server", error);
    }
};

startServer();