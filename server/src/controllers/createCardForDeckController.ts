import { Request, Response } from "express";
import Deck from "../models/DeckModel";

export async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exists");
  const { description } = await req.body;
  deck.cards.push(description);
  await deck.save();
  res.json(deck);
}
