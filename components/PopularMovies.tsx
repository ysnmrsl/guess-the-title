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
    <div
      className={`relative  flex min-h-screen items-center justify-center ${
        selectedMovie ? "bg-none" : "bg-neutral-900"
      } p-8`}
    >
      <div
        style={{
          backgroundImage: `url(${selectedMovie?.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: showTitle || !selectedMovie ? "none" : "blur(30px)",
        }}
        className={`absolute inset-0 -z-10 `}
      />
      <div className="flex flex-col items-center justify-center gap-7 rounded-xl bg-neutral-900 p-6">
        {selectedMovie ? (
          <>
            <h1 className="text-center text-lg text-neutral-50">
              {showTitle ? selectedMovie.title : "Guess The Title"}
            </h1>
            {isFetchingEmoji ? (
              <h1 className="text-neutral-50">Thinking...</h1>
            ) : (
              emojiTitle && (
                <h1 className="space rounded-lg bg-white p-2 text-4xl tracking-[0.2em]">
                  {emojiTitle}
                </h1>
              )
            )}
            {!showTitle ? (
              <button
                onClick={() => setShowTitle(true)}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-neutral-50 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reveal
              </button>
            ) : (
              <button
                onClick={handleClick}
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next
              </button>
            )}
          </>
        ) : (
          <>
            <h1 className="mb-6  text-center text-3xl text-neutral-50">
              Guess The Title
            </h1>
            <button
              onClick={handleClick}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Start 🏁
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
