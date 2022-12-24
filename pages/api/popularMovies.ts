import axios, { all, AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w500';
interface Movie {
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    let allMovies: Movie[] = [];
    
    // Loop through 5 pages for movies
    for (let page = 1; page <= 5; page++) {
      // Send request to API for current page of movies
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&watch_region=US&sort_by=popularity.desc&with_watch_monetization_types=flatrate&page=${page}`);
      // Add results from current page to allMovies array
      allMovies = [...allMovies, ...data.results];
    }

    // Loop through 5 pages for TV shows
    for (let page = 1; page <= 5; page++) {
      // Send request to API for current page of TV shows
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&watch_region=US&sort_by=popularity.desc&with_watch_monetization_types=flatrate&page=${page}`);
      // Add results from current page to allMovies array
      allMovies = [...allMovies, ...data.results];
    }

    const movies = allMovies.map(movie => ({
      title: movie.title || movie.name,
      cover: movie.poster_path ? `${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.poster_path}` : `${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`,
    }));

    res.status(201).json(movies);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error?.message);
      res.status(500).send(error?.message);
    } else {
      console.error(error);
      res.status(500).send({ message: 'An unknown error occurred.' });
    }
  }
};
