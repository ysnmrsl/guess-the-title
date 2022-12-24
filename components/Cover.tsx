import React from "react";

interface CoverProps {
  selectedMovie: { cover: string; title: string } | null;
  showTitle: boolean;
  className?: string;
}

const Cover: React.FC<CoverProps> = ({
  selectedMovie,
  showTitle,
  className,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${selectedMovie?.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: showTitle || !selectedMovie ? "none" : "blur(30px)",
      }}
      className={`absolute inset-0 z-10 ${className}`}
    />
  );
};

export default Cover;
