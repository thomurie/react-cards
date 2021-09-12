import React, { useState, useEffect } from "react";
import axios from "axios";

import Deck from "./deck";
import TimeDeck from "./timeddeck";

function App() {
  const INITALSTATE = 0;

  const [deckId, setDeck] = useState(INITALSTATE);

  useEffect(() => {
    async function getDeckID() {
      const resp = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeck(resp.data.deck_id);
    }
    getDeckID();
  }, []);

  return (
    <div className="App">
      <Deck deckId={deckId} />
      <TimeDeck deckId={deckId} />
    </div>
  );
}

export default App;
