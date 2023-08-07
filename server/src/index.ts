import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to homepage");
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect("mongodb+srv://usman:musman786@learningdb.78ok7vn.mongodb.net/")
  .then(() => {
    console.log(`APP IS LISTENING ON PORT ${PORT}`);
    app.listen(PORT);
  });