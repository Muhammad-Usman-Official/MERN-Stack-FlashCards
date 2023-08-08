import "dotenv/config";

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to homepage");
});

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`APP IS LISTENING ON PORT ${PORT}`);
  app.listen(PORT);
});
