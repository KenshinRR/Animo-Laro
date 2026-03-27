import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session"
import MongoStore from "connect-mongo"

import 'dotenv/config';
import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"

import cors from "cors";

// MongoDB Setup
export const uri = process.env.MONGODB_URI;
// export const dbName = "AnimoLaroCluster";
export const dbName = "AnimoLaroDB";

async function connectToMongo(){
    await mongoose.connect(uri, { dbName: "AnimoLaroDB" });
    console.log("Connecteted to MongoDB!");
};

await connectToMongo();

// Express Setup
const app = express();
const PORT = process.env.SERVER_PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all static files (HTML, JS, CSS, images) from the project folder
app.set('trust proxy', 1);
app.use(express.json({ limit: "10mb" }));
app.use(express.static(__dirname))
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const allowedOrigins = [
  "http://localhost:3000",              // local dev
  "https://kenshinrr.github.io",         // GitHub Pages frontend
  "https://animo-laro-mngd.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "jdoiajoiejroeiwj",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: "AnimoLaroDB",
    collectionName: "Sessions",
    ttl: 24 * 60 * 60,
    autoRemove: "native"
  }),
  cookie:{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
    // maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

app.use("/api",userRoutes);
app.use("/api",postRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const _PORT = process.env.PORT || 3000;

app.listen(_PORT, () => {
  console.log(`Server running on port ${_PORT}`);
});
