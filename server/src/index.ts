import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { getDecksController } from "./controllers/getDecksController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardController } from "./controllers/deleteCardController";
import DeckModel from "./models/DeckModel";
console.log("pending startation of server...");
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  res.send(await DeckModel.findOne());
});
// GET ALL THE DECKS
app.get("/decks", getDecksController);
// CREATE NEW DECK
app.post("/decks", createDeckController);
// DELETE AN DECK
app.delete("/decks/:deckId", deleteDeckController);
// CREATE AN CARD
app.post("/decks/:deckId/cards", createCardForDeckController);
// GET A DECK WITH ID
app.get("/decks/:deckId", getDeckController);
// DELETE A CARD
app.delete("/decks/:deckId/cards/:cardIndex", deleteCardController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`APP IS LISTENING ON PORT ${PORT}`);
  app.listen(PORT);
});
