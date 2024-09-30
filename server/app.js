import { config } from "dotenv";
config();
import "express-async-errors";

// express
import express, { json } from "express";
import session from "express-session";
import { createServer } from "http";
import cron from "node-cron";

const app = express();
const server = createServer(app);

// helper security packages
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";

// database
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/auth.js";
import carRouter from "./routes/cars.js";
import bikeRouter from "./routes/bikes.js";
import blogRouter from "./routes/blogs.js";
import locationRouter from "./routes/locations.js";
import dashboardRouter from "./dashboard.js";

// middleware
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
      },
    },
  })
);
app.use(cors());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/admin", dashboardRouter);
app.use(json());
if (!process.env.PORT) app.use(morgan("dev"));
// app.use(fileUpload({ useTempFiles: true }));

//  routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Cars & Cars Backend</h1>");
});

app.use("/api/v1/cars", carRouter);
app.use("/api/v1/bikes", bikeRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}

// Schedule the cron job to run every 5 minutes
cron.schedule("*/5 * * * *", () => {
  logMessage();
});


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
