import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUser, createUser} from './Models/Server/DataLoader.js';
import { Initiliaze_DB_Manager} from './Models/Server/DataLoader.js';


// MongoDB Setup
export const uri = "mongodb+srv://AnimoLaroADMIN:q9J5bTV2tKGdCcZv@animolarocluster.wou4bjm.mongodb.net/?appName=AnimoLaroCluster";
// export const dbName = "AnimoLaroCluster";
export const dbName = "AnimoLaroDB";

async function connectToMongo(){
    await mongoose.connect(uri, { dbName: "AnimoLaroDB" });
    console.log("Connecteted to MongoDB!");
};

await connectToMongo();

await Initiliaze_DB_Manager();

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