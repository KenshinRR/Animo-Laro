import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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

//await Initiliaze_DB_Manager();

// Express Setup
const app = express();
const PORT = process.env.SERVER_PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all static files (HTML, JS, CSS, images) from the project folder
app.use(express.json());
app.use(express.static(__dirname));

app.use("/api",userRoutes);
app.use("/api",postRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





