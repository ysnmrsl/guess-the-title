import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Confetti from "../public/confetti.json";

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
        className="z-20 -mb-1  text-center text-lg text-neutral-50"
      >
        {showTitle ? selectedMovie?.title : "Guess The Title"}
      </motion.h1>
      {showTitle ? (
        <Lottie
          animationData={Confetti}
          loop={false}
          className="absolute bottom-1/3 left-1/2 z-10 w-60 -translate-x-1/2 transform "
        />
      ) : null}
      {isFetchingEmoji ? (
        <h1 className="z-20 flex h-[3rem]  items-center text-neutral-50">
          Thinking...
        </h1>
      ) : (
        emojiTitle && (
          <motion.h1
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.07,
            }}
            className="space z-20 h-[3rem] overflow-hidden rounded-lg bg-white p-2 text-2xl tracking-[0.2em]"
          >
            {emojiTitle}
          </motion.h1>
        )
      )}
    </>
  );
};

export default Title;
