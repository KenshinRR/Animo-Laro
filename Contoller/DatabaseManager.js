// db.js
import { MongoClient } from "mongodb";
import {uri, dbName} from "./app.js"

const client = new MongoClient(uri);

const db = client.db(dbName);

export async function getAllPosts() {
  const posts = await db.collection("Posts").find().toArray();
  return posts;
}