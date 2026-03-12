// db.js
// import { MongoClient } from "mongodb";
import {uri, dbName} from '../index.js'
import User from '../Models/Schemas/User.js';
import crypto from 'crypto';

// const client = new MongoClient(uri);

// const db = client.db(dbName);
// export const connectToMongo = async () => {
//     await mongoose.connect(uri, { dbName: 'AnimoLaroDB' });
//     console.log("Connected to MongoDB!");
// };

export async function getAllPosts() {
  const posts = await db.collection("Posts").find().toArray();
  return posts;
}

export async function getUser(username, password) {
    const user = await User.findOne({ username, password });
    return user;
}


