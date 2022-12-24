import React, { useState, useEffect } from "react";
import { fetchEmojiTitle, fetchPopularMovies } from "../utils/axiosHelpers";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface Movie {
  title: string;
  cover: string;
}

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
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
      fetchEmojiTitle(setIsFetchingEmoji, setEmojiTitle, selectedMovie.title);
    }
  }, [selectedMovie]);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div
        className={`absolute inset-0 -z-10 `}
        style={{
          background: selectedMovie
            ? `url(${selectedMovie?.cover})`
            : "#171717",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: showTitle || !selectedMovie ? "none" : "blur(30px)",
        }}
      />
      <div className="rounded-xl bg-neutral-900 p-10">
        <h1 className="mb-6 text-3xl text-neutral-50">Guess The Title</h1>
        {selectedMovie ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-neutral-800 p-5">
            {showTitle ? (
              <h1 className="text-lg text-neutral-50">{selectedMovie.title}</h1>
            ) : (
              <button
                onClick={() => setShowTitle(true)}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-neutral-50 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reveal
              </button>
            )}
            {isFetchingEmoji ? (
              <h1 className="text-neutral-50">Thinking...</h1>
            ) : (
              emojiTitle && (
                <h1 className="rounded-lg bg-white p-2 text-4xl">
                  {emojiTitle}
                </h1>
              )
            )}
            <ArrowPathIcon
              onClick={handleClick}
              className="h-6 w-6 cursor-pointer text-neutral-50"
            />
          </div>
        ) : (
          <button
            onClick={handleClick}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Start 🏁
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
