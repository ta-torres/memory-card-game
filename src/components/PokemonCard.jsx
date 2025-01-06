import { useEffect, useState } from "react";

const PokemonCard = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

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
      ids.add(Math.floor(Math.random() * 100) + 1);
    }
    return Array.from(ids);
  };

  const loadNewCards = async () => {
    setIsLoading(true);
    try {
      const pokemonIds = getRandomPokemonIds(8);
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-6">
          <h2 className="text-2xl font-semibold text-center">Game Over!</h2>
          <p className="text-xl">Final Score: {currentScore}</p>
          <p className="text-lg">Best Score: {bestScore}</p>
          <button
            onClick={resetGame}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg">Score: {currentScore}</div>
          <div className="text-lg">Best Score: {bestScore}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-32 h-32 object-contain"
                />
                <p className="mt-2 capitalize">{card.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
