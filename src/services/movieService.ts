import axios from "axios";
import type { Movie } from "../types/movie.ts";

const token = import.meta.env.VITE_APP_API_KEY;

interface FetchMovieResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<FetchMovieResponse> {
  const { data } = await axios.get<FetchMovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}