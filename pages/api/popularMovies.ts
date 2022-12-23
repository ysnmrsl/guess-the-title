import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.TMDB_API_KEY

interface Movie {
  title: string
}

interface MovieResult {
  results: Movie[]
}

export default async (req: NextApiRequest, res: NextApiResponse<String[]>) => {
  const { data } = await axios.get<MovieResult>(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  )
  res.json(data.results.slice(0, 20).map(movie => movie.title))
}
