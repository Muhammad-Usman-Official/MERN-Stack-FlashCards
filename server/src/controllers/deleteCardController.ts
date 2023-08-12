import { Request, Response } from "express";
import DeckModel from "../models/DeckModel";

export async function deleteCardController(req: Request, res: Response) {
  const { cardIndex, deckId } = req.params;
  const index = parseInt(cardIndex);
  const deck = await DeckModel.findById(deckId);
  if (!deck) return;
  deck.cards.splice(index, 1);
  const updatedCards = await deck.save();
  res.json(updatedCards);
}
