import axios, {AxiosError} from "axios";

export const fetchPopularMovies = async (setMovies: any) => {
  try {
    const res = await axios.get("/api/popularMovies");
    setMovies(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      setMovies([]);
    } else {
      console.error(error);
    }
  }
};

export const fetchEmojiTitle = async (setIsFetchingEmoji:any, setEmojiTitle: any, selectedMovie: String) => {
    setIsFetchingEmoji(true);
    const res = await axios.post("/api/titleToEmoji", {
      movie: selectedMovie,
    });
    setEmojiTitle(res.data.result);
    setIsFetchingEmoji(false);
};