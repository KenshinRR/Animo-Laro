import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// MongoDB Setup
export const uri = "mongodb+srv://AnimoLaroADMIN:q9J5bTV2tKGdCcZv@animolarocluster.wou4bjm.mongodb.net/?appName=AnimoLaroCluster";
export const dbName = "AnimoLaroCluster";

const connectToMongo = async () => {
    await mongoose.connect(uri);
    console.log("Connecteted to MongoDB!");
};

connectToMongo();

// Express Setup
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all static files (HTML, JS, CSS, images) from the project folder
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});