import { API_URL } from "./config";

//interface @TDeck
export interface TDeck {
  title?: string;
  _id?: string;
  cards?: string[];
  description?: string;
}

// CREATE DECK | POST
export async function createDeck(title: string) {
  const response = await fetch(`${API_URL}/decks`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title,
    }),
  });
  return response.json();
}

//READ ALL THE DECKS | GET
export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
}

//DELETE DECK | DELETE
export async function deleteDeck(deckId: string) {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}

//Create CARD | POST
export async function createCard(description: string, deckId: string) {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      description,
    }),
  });
  return response.json();
}

//READ A SINGLE DECK | GET
export async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
}

export async function deleteCard(
  cardIndex: number,
  deckId: string
): Promise<TDeck> {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards/${cardIndex}`, {
    method: "DELETE",
  });
  return res.json();
}
