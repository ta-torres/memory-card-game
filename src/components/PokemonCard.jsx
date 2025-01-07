import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const PokemonCard = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const NUM_CARDS_SHOWN = 4;
  const NUM_POKEMON = 151;

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
    };
  };

  const getRandomPokemonIds = (count) => {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * NUM_POKEMON) + 1);
    }
    return Array.from(ids);
  };

  const loadNewCards = async () => {
    setIsLoading(true);
    try {
      const pokemonIds = getRandomPokemonIds(NUM_CARDS_SHOWN);
      const pokemonData = await Promise.all(pokemonIds.map(fetchPokemon));
      setCards(pokemonData);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadNewCards();
  }, []);

  const handleCardClick = (id) => {
    if (selectedCards.has(id)) {
      setIsGameOver(true);
      if (currentScore > bestScore) setBestScore(currentScore);
    } else {
      setSelectedCards(new Set([...selectedCards, id]));
      setCurrentScore(currentScore + 1);
      console.log(currentScore);
      console.log(bestScore);
      loadNewCards();
    }
  };

  const resetGame = () => {
    setSelectedCards(new Set());
    setCurrentScore(0);
    setIsGameOver(false);
    loadNewCards();
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-10">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-slate-800">
              Game Over!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Final Score</span>
              <span className="text-2xl font-bold text-slate-800">
                {currentScore}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Best Score</span>
              <span className="text-2xl font-bold text-slate-800">
                {bestScore}
              </span>
            </div>

            <Button
              onClick={resetGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg shadow-md p-4">
          <div className="space-y-1">
            <span className="text-md text-slate-500">Current Score</span>
            <div className="text-2xl font-bold text-slate-800">
              {currentScore}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-md text-slate-500">Best Score</span>
            <div className="text-2xl font-bold text-slate-800">{bestScore}</div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-32 h-32 object-contain"
                  />
                  <p className="mt-2 capitalize">{card.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
