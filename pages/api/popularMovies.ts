import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.TMDB_API_KEY

interface Movie {
  title: string,
  poster_path: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
    res.json(
      data.results.slice(0, 20).map((movie:Movie) => ({
        title: movie.title,
        cover: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }))
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while fetching movies' })
  }
}

