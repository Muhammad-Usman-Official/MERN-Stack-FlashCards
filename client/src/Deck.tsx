import React, { useEffect, useState } from "react";
import { TDeck, createCard, getDeck } from "./api/deck";
import { Link, useParams } from "react-router-dom";
import { Loading } from "./App";
import { deleteCard } from "./api/deck";

const Deck = () => {
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // @param deckId
  const { deckId } = useParams();

  //INFO: Fetch cards data first time when page loads and on change of deckId
  useEffect(() => {
    (async function () {
      setLoading(true);
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards!);
      setLoading(false);
    })();
  }, [deckId]);

  //INFO: Handles creating the cards
  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(description, deckId!);
    setDescription("");
    setCards(serverCards);
  };

  //INFO: Handles deleting the cards
  const handleDeleteCard = async (cardIndex: number) => {
    const updatedCards = await deleteCard(cardIndex, deckId!);
    setDeck(updatedCards);
    setCards(updatedCards.cards!);
  };

  return (
    <div className="min-h-screen bg-teal-950 text-slate-200">
      <div className="container flex flex-col items-center justify-center pt-4 mx-auto gap-x-8 gap-y-5 lg:justify-between">
        <form
          action=""
          translate="yes"
          onSubmit={(e) => handleCreateCard(e)}
          className="flex lg: flex-col lg:flex-[30%]"
        >
          <h1 className="pb-4 space-x-2 text-4xl text-center">
            <Link className="hover:underline underline-offset-8" to={"/"}>
              decks
            </Link>
            <span>/</span>
            <b>{loading ? <Loading /> : deck?.title}</b>
          </h1>
          <label
            className="mb-2 text-3xl font-semibold"
            htmlFor="deck-descriptoin"
          >
            Card Description
          </label>
          <input
            className=" max-w-[37rem] w-[88dvw] px-2 py-1 text-2xl text-black border-none rounded-md outline-none h-14 focus:ring-2 ring-emerald-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            value={description}
            type="text"
            id="deck-descriptoin"
          />
          <input
            className="self-end px-3 py-1 mt-2 border rounded-md w-fit hover:bg-slate-900"
            type="submit"
            value={"Create Card"}
          />
        </form>
        <ul className="flex  flex-col scrollbar flex-wrap flex-[60%] gap-4 overflow-x-hidden lg:max-h-screen lg:overflow-y-auto w-fit lg:flex-row">
          {loading ? (
            <Loading />
          ) : (
            cards?.map((text: string, cardIndex: number) => (
              <li
                key={`${text}-${cardIndex}`}
                tabIndex={cardIndex}
                className={`relative h-64 items-center flex flex-col justify-center px-4 py-1 overflow-y-auto border w-72 rounded-xl`}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteCard(cardIndex)}
                  className="absolute top-0 self-end px-4 py-1 mt-2 border rounded-md z-10a right-2 w-fit hover:bg-slate-900"
                >
                  X
                </button>
                <p className="w-fit h-fit">{text}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Deck;
