import { Request, Response } from "express";
import Deck from "../models/DeckModel";

export async function deleteDeckController(req: Request, res: Response) {
  //TODO:
  const deckId = req.params.deckId;
  const delDeckId = await Deck.findByIdAndDelete(deckId);
  res.json(delDeckId);
}
