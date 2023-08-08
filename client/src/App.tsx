import React, { Suspense, useEffect, useState } from "react";

interface TDeck {
  title: string;
  _id: string;
}

const App = () => {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TDeck[]>([]);
  const fetchDecks = async () => {
    const response = await fetch("http://localhost:3000/decks");
    const fetchedDecks = await response.json();
    setDecks(fetchedDecks);
  };
  useEffect(() => {
    fetchDecks();
  }, []);

  const handleDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3000/decks", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    }).then(() => {
      setTitle("");
    });
    fetchDecks();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-slate-800 text-slate-200">
      <form action="" onSubmit={handleDeck} className="flex flex-col">
        <label className="mb-2 text-3xl font-semibold" htmlFor="deck-title">
          Deck Title
        </label>
        <input
          className="px-2 py-1 min-w-[400px] text-2xl h-14 text-black border-none rounded-md outline-none focus:ring-2 ring-emerald-700"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          id="deck-title"
        />
        <input
          className="self-end px-3 py-1 mt-2 border rounded-md w-fit hover:bg-slate-900"
          type="submit"
          value={"Create a deck"}
        />
      </form>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        {decks.map((deck) => (
          <Suspense fallback={<h1>loading...</h1>}>
            <li
              key={deck?._id}
              className="flex items-center justify-center w-40 h-40 p-4 text-center border rounded-xl line-clamp-5"
            >
              {deck?.title}
            </li>
          </Suspense>
        ))}
      </ul>
    </div>
  );
};

export default App;
