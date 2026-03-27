import 'dotenv/config';

import express from "express";
import { connectToMongo, getDb } from "./db/conn.js";
import itemsRoutes from "./routes/itemsRoutes.js";

import cors from "cors";

const app = express();


app.use(express.json());
app.use(express.static("public"));

app.use("/api", itemsRoutes);

const allowedOrigins = [
  "http://localhost:3000",              // local dev
  "https://kenshinrr.github.io",         // GitHub Pages frontend
  "https://animo-laro-mngd.onrender.com/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


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
