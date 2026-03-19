import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUser ,createUser,getUserUseUsername} from './Models/Server/DataLoader.js';
import { getAllPosts} from './Models/Server/DataLoader.js';

// MongoDB Setup
export const uri = "mongodb+srv://AnimoLaroADMIN:q9J5bTV2tKGdCcZv@animolarocluster.wou4bjm.mongodb.net/?appName=AnimoLaroCluster";
// export const dbName = "AnimoLaroCluster";
export const dbName = "AnimoLaroDB";

async function connectToMongo(){
    await mongoose.connect(uri, { dbName: "AnimoLaroDB" });
    console.log("Connecteted to MongoDB!");
};

await connectToMongo();

// Express Setup
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all static files (HTML, JS, CSS, images) from the project folder
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// login
app.post('/api/login', async (req, res) => {
    try {
        // console.log("Request body:", req.body); 
        const { username, password } = req.body;
        const user = await getUser(username, password);
        // console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful!', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// register
app.post('/api/register', async (req, res) => {
    try{
        const {username, password} = req.body;
        const newUser = await createUser(username, password);
        if(!newUser){
            return res.status(400).json({error: 'Username already exists'});
        }
        res.json({message: 'Registered Successfully!', user: newUser}); 
    } catch{
        console.error(err);
        res.status(500).json({ error: err.message });
    }
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

//view profile?
app.get("/getUser", async function(req,res){

    try{

        const { username} = req.query;

        const user = await getUserUseUsername(username);

        if(!user){
            res.status(404).json({error:"User not found"});
            return;
        }

        res.json(user);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
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