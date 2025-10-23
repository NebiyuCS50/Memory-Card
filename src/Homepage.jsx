import React, { useEffect, useState } from "react";

const Homepage = () => {
  const API_KEY = "CHeuvC0jF2z4XQReQXW7b7zPtTmJIOeh";
  const [gifs, setGifs] = useState([]);
  const [id, setId] = useState([]);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 text-center ">
      <h1 className="text-3xl font-bold mb-6">🎲 Amphibia Memory Game</h1>

      <div className="flex gap-3 flex-wrap justify-center items-center  lg:gap-7">
        {gifs.length === 0 ? (
          <p>Loading...</p>
        ) : (
          gifs.map((gif) => (
            <button>
              <img
                className="w-48 h-48 object-cover rounded-md shadow-md lg:w-70 lg:h-70"
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title || "Random Gif"}
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
