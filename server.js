import 'dotenv/config';

import express from "express";
import { connectToMongo, getDb } from "./db/conn.js";
import itemsRoutes from "./routes/itemsRoutes.js";

const app = express();


app.use(express.json());
app.use(express.static("public"));

app.use("/api", itemsRoutes);

connectToMongo((err) => {
    if (err) {
        console.log("error occurred:");
        console.error(err);
        process.exit();
    }

    console.log("Connected to MongoDB server");

    // Do stuff here
    const db = getDb(); // DB instance

    // For a webapp, app.listen could be placed here
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
});
