import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session"
import MongoStore from "connect-mongo"

//import { Initiliaze_DB_Manager} from './Models/Server/DataLoader.js';
import 'dotenv/config';
import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
// import { getUser} from './Models/Server/DataLoader.js';
// import { Initiliaze_DB_Manager} from './Models/Server/DataLoader.js';


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
app.use(express.json({ limit: "10mb" }));
app.use(express.static(__dirname))
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  path: "/",
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: "AnimoLaroDB",
    collectionName: "Sessions",
    ttl: 24 * 60 * 60,
    autoRemove: "native"
  }),
  cookie:{
    httpOnly: true,
    secure: false,
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
  console.log(`Server running on port ${PORT}`);
});
