import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAllPosts} from './Models/Server/DataLoader.js';
//import { Initiliaze_DB_Manager} from './Models/Server/DataLoader.js';
import 'dotenv/config';
import userRoutes from "./Routes/userRoutes.js"
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





// getting the posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// Adding a new post
app.post('/api/create_post', async (req,res) => {
    try {
        const {title, poster, description, likes, link} = req.body;
        const newPost = new Post({title, poster, description, likes, link});
        await newPost.save();
        res.status(201).json({ message: "User saved successfully", user: newUser });
    } catch (err){
        res.status(500).json({ error: "Failed to save user", details: error.message });
    }
});