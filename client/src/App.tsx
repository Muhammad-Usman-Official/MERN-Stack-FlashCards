import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck, deleteDeck, getDecks } from "./api/deck";
import { TDeck } from "./api/deck";

const App = () => {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch Deck cards data first time when page loads
  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedDecks = await getDecks();
      setDecks(fetchedDecks);
      setLoading(false);
      return fetchedDecks;
    })();
  }, []);

  const handleDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitle("");
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };
  return (
    <div className="min-h-screen overflow-hidden overflow-y-hidden bg-teal-950 text-slate-200">
      <div className="container flex flex-col items-center justify-center gap-8 mx-auto lg:justify-around lg:flex-row">
        <form
          action=""
          translate="yes"
          onSubmit={handleDeck}
          className="flex flex-col"
        >
          <label
            className="mb-3 text-3xl font-semibold text-gray-300 "
            htmlFor="deck-title"
          >
            Deck Title
          </label>
          <input
            className="w-[88dvw] max-w-[37rem] md:w-[30dvw] px-3 py-1 text-2xl text-gray-50 bg-teal-950 ring ring-teal-900 border-none rounded-md outline-none h-14 focus:ring-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            id="deck-title"
          />
          <input
            className="self-end px-4 py-2 mt-4 border rounded-md w-fit hover:bg-teal-900 active:opacity-90"
            type="submit"
            value={"Create a deck"}
          />
        </form>
        <ul className="flex flex-wrap items-stretch justify-center gap-4 pr-3 my-5 lg:justify-end scrollbar lg:max-h-screen lg:overflow-y-auto w-fit ">
          {loading ? (
            <Loading />
          ) : (
            decks.map((deck, index) => (
              <li
                tabIndex={index}
                key={deck?._id}
                className="relative h-64 px-4 py-1 overflow-y-auto border w-72 rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteDeck(deck._id!)}
                  className="absolute top-0 self-end px-4 py-1 mt-2 border rounded-md z-10a right-2 w-fit hover:bg-slate-900"
                >
                  X
                </button>
                <Link to={`/decks/${deck._id}/cards`}>
                  <p className="flex items-center justify-center h-full text-center line-clamp-5">
                    {deck.title}
                  </p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

/*
 * @component <Loading />
 * animation may not work as exprected in development because
 * on first load tailwindcss is being compiled
 */
export function Loading() {
  return (
    <pre className="relative w-fit">
      <span className="pr-1">Loading</span>
      <span className="absolute animate-bounce-slow delay-0 -right-2">.</span>
      <span className="absolute animate-bounce-medium -right-4">.</span>
      <span className="absolute animate-bounce-fast -right-6">.</span>
    </pre>
  );
}

export default App;
