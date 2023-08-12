import { Response, Request } from "express";
import Deck from "../models/DeckModel";

export async function getDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  res.json(deck);
}
