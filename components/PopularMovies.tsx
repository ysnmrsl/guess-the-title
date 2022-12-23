import React from "react";
import axios from "axios";

interface Movie {
  title: string;
}

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<Movie[]>("/api/popularMovies");
      setMovies(res.data);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setSelectedMovie(movies[randomIndex]);
  };

  return (
    <div>
      {selectedMovie ? (
        <div>
          <h1>{selectedMovie}</h1>
          <button onClick={handleClick}>Another Movie</button>
        </div>
      ) : (
        <button onClick={handleClick}>Select Movie</button>
      )}
    </div>
  );
};

export default PopularMovies;
