import React from "react";
import { motion } from "framer-motion";

interface TitleProps {
  showTitle: boolean;
  selectedMovie: { title: string; cover: string } | null;
  isFetchingEmoji: boolean;
  emojiTitle?: string | null;
}

const Title: React.FC<TitleProps> = ({
  showTitle,
  selectedMovie,
  isFetchingEmoji,
  emojiTitle,
}) => {
  return (
    <>
      <motion.h1
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.07,
        }}
        layoutId="title"
        className="text-center text-lg text-neutral-50"
      >
        {showTitle ? selectedMovie?.title : "Guess The Title"}
      </motion.h1>
      {isFetchingEmoji ? (
        <h1 className="text-neutral-50">Thinking...</h1>
      ) : (
        emojiTitle && (
          <motion.h1
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.07,
            }}
            className="space overflow-hidden rounded-lg bg-white p-2 text-4xl tracking-[0.2em]"
          >
            {emojiTitle}
          </motion.h1>
        )
      )}
    </>
  );
};

export default Title;
