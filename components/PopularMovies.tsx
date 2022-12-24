import React, { useState, useEffect } from "react";
import { fetchEmojiTitle, fetchPopularMovies } from "../utils/axiosHelpers";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Cover from "./Cover";
import Title from "./Title";
import Controls from "./Controls";

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

  const [ref, { width, height }] = useMeasure();

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
      className={`relative  flex min-h-screen items-center justify-center  p-8`}
    >
      <Cover selectedMovie={selectedMovie} showTitle={showTitle} />
      <motion.div
        animate={{ width }}
        transition={{ duration: 0.07 }}
        className="relative z-20  flex min-w-max items-center justify-center rounded-xl bg-neutral-900"
      >
        {selectedMovie ? (
          <div
            ref={ref}
            className="relative flex flex-col items-center justify-center gap-7  p-6"
          >
            <Title
              isFetchingEmoji={isFetchingEmoji}
              selectedMovie={selectedMovie}
              showTitle={showTitle}
              emojiTitle={emojiTitle}
            />
            {!showTitle ? (
              <Controls
                onClick={() => setShowTitle(true)}
                showTitle={showTitle}
              />
            ) : (
              <Controls onClick={handleClick} showTitle={showTitle} />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-7 p-6">
            <motion.h1
              layoutId="title"
              className="mb-6  text-center text-3xl text-neutral-50"
            >
              Guess The Title
            </motion.h1>
            <button
              onClick={handleClick}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Start 🏁
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PopularMovies;
