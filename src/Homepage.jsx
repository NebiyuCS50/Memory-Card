import React, { useEffect, useState } from "react";

const Homepage = () => {
  const API_KEY = "CHeuvC0jF2z4XQReQXW7b7zPtTmJIOeh";
  const [gifs, setGifs] = useState([]);
  const [id, setId] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  //API call to fetch random gifs
  const fetchData = async () => {
    try {
      const requests = Array.from({ length: 12 }, () =>
        fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=g`
        )
      );

      const responses = await Promise.all(requests);

      const results = await Promise.all(responses.map((res) => res.json()));

      const gifsData = results.map((r) => r.data);

      setGifs(gifsData);
      console.log(gifsData);
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

  const addId = (gifId) => {
    if (id.includes(gifId)) {
      setScore(0);
      setId([]);
      return;
    }

    setScore((prev) => prev + 1);
    setId((prev) => [...prev, gifId]);
    if (score + 1 > bestScore) {
      setBestScore(score + 1);
    }
    setGifs((prev) => shuffleArray(prev));
  };

  return (
    <div className="p-6 text-center bg-emerald-400 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🎲 Amphibia Memory Game</h1>
      <div className="mb-6">
        <span className="text-lg font-semibold mr-4">Score: {score}</span>
        <span className="text-lg font-semibold">Best Score: {bestScore}</span>
      </div>

      <div className="flex gap-3 flex-wrap justify-center items-center  lg:gap-7">
        {gifs.length === 0 ? (
          <p>Loading...</p>
        ) : (
          gifs.map((gif) => (
            <button
              key={gif.id}
              className="focus:outline-none  rounded-md hover:scale-105 transition-transform hover:border-blue-500 hover:shadow-lg hover:shadow-blue-400"
              onClick={() => addId(gif.id)}
            >
              <img
                className="w-48 h-48 object-cover rounded-md shadow-md lg:w-70 lg:h-70"
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title || "Random Gif"}
              />
              <p className="text-sm text-black">{gif.title || "Random Gif"}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
