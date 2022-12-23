import React, { useState, useEffect } from "react";
import { fetchEmojiTitle, fetchPopularMovies } from "../utils/axiosHelpers";

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [emojiTitle, setEmojiTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [isFetchingEmoji, setIsFetchingEmoji] = useState(false);

  useEffect(() => {
    fetchPopularMovies(setMovies);
  }, []);

  const handleClick = () => {
    setShowTitle(false);
    const randomIndex = Math.floor(Math.random() * movies.length);
    setSelectedMovie(movies[randomIndex]);
  };

  useEffect(() => {
    if (selectedMovie) {
      fetchEmojiTitle(setIsFetchingEmoji, setEmojiTitle, selectedMovie);
    }
  }, [selectedMovie]);

  return (
    <div>
      {selectedMovie ? (
        <div>
          {showTitle ? (
            <h1>{selectedMovie}</h1>
          ) : (
            <button onClick={() => setShowTitle(true)}>Show Movie Title</button>
          )}
          {isFetchingEmoji ? (
            <h1>Loading...</h1>
          ) : (
            emojiTitle && <h1>{emojiTitle}</h1>
          )}
          <button onClick={handleClick}>Another Movie</button>
        </div>
      ) : (
        <button onClick={handleClick}>Select Movie</button>
      )}
    </div>
  );
};

export default PopularMovies;
