import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import type { Movie } from "../../types/movie.ts";
import ErrorMessage from "../Error/ErrorMessage.tsx";
import Loader from "../Loader/Loader.tsx";
import { fetchMovies } from "../../services/movieService.ts";
import css from "./App.module.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = async (query: string) => {
    try {
      setHasSearched(true);
      setError(false);
      setLoading(true);

      const data = await fetchMovies(query);
      setMovies(data.results ?? []);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (e) {
      console.error(e);
      setError(true);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <p className={css.message}></p>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster />
    </div>
  );
}
