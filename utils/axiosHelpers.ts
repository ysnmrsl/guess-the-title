import axios from "axios";

export const fetchPopularMovies = async (setMovies: any) => {
    const res = await axios.get("/api/popularMovies");
    setMovies(res.data);
};

export const fetchEmojiTitle = async (setIsFetchingEmoji:any, setEmojiTitle: any, selectedMovie: String) => {
    setIsFetchingEmoji(true);
    const res = await axios.post("/api/titleToEmoji", {
      movie: selectedMovie,
    });
    setEmojiTitle(res.data.result);
    setIsFetchingEmoji(false);
};