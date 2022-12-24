import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w500';
interface Movie {
  title: string;
  poster_path: string;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    let allMovies: Movie[] = [];
    let page = 1;

    // Make requests until all pages are fetched
    while (true) {
      const { data } = await axios.get<{ results: Movie[], total_pages: number }>(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_companies=2|3&page_limit=20`
      );
      allMovies = allMovies.concat(data.results);

      if (page === 5) {
        break;
      }

      page++;
    }

    const movies = allMovies.map(movie => ({
      title: movie.title,
      cover: `${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.poster_path}`,
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
