import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

interface Card {
  id: number;
  number: number;
}

const Game = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState<Card[]>([]);

  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; //16
    const pairCount: number = Math.floor(totalCards / 2); //8
    const numbers = Array.from({ length: pairCount }, (_, index) => index + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({
        id: index,
        number,
      }));

    console.log(shuffledCards);
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const isFlipped = (id: number) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id: number) => solved.includes(id);

  const checkMatch = (secondId: number) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };
  const handleClick = (id: number) => {
    if (disabled || won) return;
    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);

        //check match logic
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);
  return (
    <div className="m-auto flex flex-col gap-2 w-4/5 xl:w-3/5">
      <h2 className="text-md font-semibold text-white p-2">Memory Game</h2>
      <Separator className="mb-2 bg-secondary" />
      <div className="mx-auto items-center justify-center gap-2 flex flex-col">
        <label htmlFor="gridSize"> Grid size : (max 10)</label>
        <Input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-1 border-gray-300 rounded px-1 py-1 text-black"
        />
      </div>

      <div
        className={`grid gap-2 mb-4 items-center`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `80%`,
          margin: "auto",
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 
                ${
                  isFlipped(card.id)
                    ? isSolved(card.id)
                      ? "bg-primary text-white"
                      : "bg-muted text-gray-500"
                    : "bg-gray-300 text-gray-400"
                }`}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>
      <div className="items-center flex flex-col gap-2 mb-2">
        {won && (
          <h2 className="m-2 font-bold text-2xl animate-bounce">You won!</h2>
        )}
        <Button
          className="bg-muted hover:border w-1/3"
          onClick={initializeGame}
        >
          {won ? "Play again" : "Reset"}
        </Button>
      </div>
    </div>
  );
};

export default Game;
