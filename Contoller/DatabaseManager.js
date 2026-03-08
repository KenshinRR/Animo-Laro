// db.js
import { MongoClient } from "mongodb";
import {uri, dbName} from "./app.js"

const client = new MongoClient(uri);

const db = client.db(dbName);

export async function getAllUsers() {
  const users = await db.collection("users").find().toArray();
  return users;
}