import React, { useEffect, useState } from "react";

const Homepage = () => {
  const API_KEY = "CHeuvC0jF2z4XQReQXW7b7zPtTmJIOeh";
  const [gifs, setGifs] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchData = async () => {
    try {
      const requests = Array.from({ length: 12 }, () =>
        fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=g`
        )
      );

      const responses = await Promise.all(requests);
      const results = await Promise.all(responses.map((res) => res.json()));
      const gifsData = results.map((r) => ({
        ...r.data,
        uniqueId: crypto.randomUUID(),
      }));

      setGifs(gifsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (gifId) => {
    if (clickedIds.includes(gifId)) {
      setScore(0);
      setClickedIds([]);
    } else {
      setClickedIds((prev) => [...prev, gifId]);
      setScore((prev) => prev + 1);
      setBestScore((prev) => Math.max(prev, score + 1));
    }

    setGifs((prev) => shuffleArray([...prev]));
  };

  return (
    <div className="p-6 text-center bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-white">
        🎲 Amphibia Memory Game
      </h1>

      <div className="mb-6">
        <span className="text-lg font-semibold mr-4 text-white">
          Score: {score}
        </span>
        <span className="text-lg font-semibold text-white">
          Best Score: {bestScore}
        </span>
      </div>

      <div className="flex gap-3 flex-wrap justify-center items-center lg:gap-7">
        {gifs.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          gifs.map((gif) => (
            <button
              key={gif.uniqueId}
              className="focus:outline-none rounded-md hover:scale-105 transition-transform hover:border-white hover:shadow-lg hover:shadow-white/30"
              onClick={() => handleClick(gif.id)}
            >
              <img
                className="w-48 h-48 object-cover rounded-md shadow-md lg:w-70 lg:h-70"
                src={gif.images.fixed_height.url}
                alt={gif.title || "Random Gif"}
              />
              <p className="text-sm text-white">{gif.title || "Random Gif"}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
