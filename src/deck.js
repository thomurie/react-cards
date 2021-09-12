import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Card from "./card";

const Deck = ({ deckId }) => {
  const INITALSTATE = {
    face: "https://c4.wallpaperflare.com/wallpaper/359/158/446/anime-kakegurui-yumeko-jabami-wallpaper-preview.jpg",
    id: 1,
  };

  const [cardCount, setCardCount] = useState(1);
  const [card, setCard] = useState(INITALSTATE);

  useEffect(() => {
    async function getDeckID() {
      const resp = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      if (cardCount > 52) {
        return alert(`Error: no cards remaining!`);
      } else {
        console.log(cardCount);
        let img = resp.data.cards[0].image;
        return setCard({ face: img, id: uuidv4() });
      }
    }
    getDeckID();
  }, [cardCount, deckId]);

  return (
    <div>
      <button onClick={() => setCardCount(cardCount + 1)}>Draw A Card</button>

      <Card face={card.face} id={card.id} key={card.id} />
    </div>
  );
};

export default Deck;
