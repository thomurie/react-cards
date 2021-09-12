import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Card from "./card";

const TimeDeck = ({ deckId }) => {
  const INITALSTATE = {
    face: "https://c4.wallpaperflare.com/wallpaper/359/158/446/anime-kakegurui-yumeko-jabami-wallpaper-preview.jpg",
    id: 1,
  };

  const [card, setCard] = useState(INITALSTATE);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    async function getDeckID() {
      const resp = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      if (resp.data.remaining === 0) {
        return alert(`Error: no cards remaining!`);
      } else {
        let img = resp.data.cards[0].image;
        return setCard({ face: img, id: uuidv4() });
      }
    }
    console.log(drawing);
    if (drawing) {
      const cardInterval = setInterval(() => {
        getDeckID();
      }, 1000);
      return () => clearInterval(cardInterval);
    }
  }, [drawing, deckId]);

  return (
    <div>
      <button onClick={() => setDrawing((data) => !data)}>
        {drawing ? "Stop Drawing A Card" : "Start Drawing a Card"}
      </button>

      <Card face={card.face} id={card.id} key={card.id} />
    </div>
  );
};

export default TimeDeck;
