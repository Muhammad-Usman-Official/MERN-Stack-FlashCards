import { Response, Request } from "express";
import Deck from "../models/DeckModel";

export async function getDecksController(req: Request, res: Response) {
  const decks = await Deck.find();
  res.json(decks);
}
