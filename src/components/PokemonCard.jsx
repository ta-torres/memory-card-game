import { useState } from "react";

const PokemonCard = () => {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg">Score: {currentScore}</div>
          <div className="text-lg">Best Score: {bestScore}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png?raw=true" />
          <img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/2.png?raw=true" />
          <img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/3.png?raw=true" />
          <img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/4.png?raw=true" />
          <img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/5.png?raw=true" />
          <img src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/6.png?raw=true" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
