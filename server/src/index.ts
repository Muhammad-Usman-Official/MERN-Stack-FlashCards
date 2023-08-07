// import "dotenv/config";
require("dotenv").config({
  debug: true,
  // path: "/server/src/.env",
});

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import { env } from "process";

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

mongoose.connect(`${process.env.MONGO_URL ?? ""}`).then(() => {
  console.log(`APP IS LISTENING ON PORT ${PORT}`);
  app.listen(PORT);
});
