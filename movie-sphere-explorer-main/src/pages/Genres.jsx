
import { useQuery } from "@tanstack/react-query";
import { fetchGenres, discoverMovies } from "@/lib/tmdb";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenreId = searchParams.get("id") || "";
  const [selectedGenreId, setSelectedGenreId] = useState(initialGenreId);
  const [page, setPage] = useState(1);

  // Fetch all genres
  const {
    data: genresData,
    isLoading: isLoadingGenres,
    error: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const genres = genresData?.genres || [];

  // Sync URL with selected genre
  useEffect(() => {
    if (selectedGenreId) {
      setSearchParams({ id: selectedGenreId });
    } else {
      setSearchParams({});
    }
  }, [selectedGenreId, setSearchParams]);

  // Reset page when genre changes
  useEffect(() => {
    setPage(1);
  }, [selectedGenreId]);

  // Find selected genre name
  const selectedGenre = genres.find((genre) => genre.id.toString() === selectedGenreId);

  // Fetch movies by genre
  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: moviesError,
  } = useQuery({
    queryKey: ["genreMovies", selectedGenreId, page],
    queryFn: () => discoverMovies({ with_genres: selectedGenreId }, page),
    enabled: !!selectedGenreId,
  });

  const totalPages = moviesData?.total_pages || 0;

  // Format movie data for the movie grid
  const movies = moviesData?.results?.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
  })) || [];

  const handleGenreClick = (genreId) => {
    setSelectedGenreId(genreId.toString());
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">
        {selectedGenre ? `${selectedGenre.name} Movies` : "Browse by Genre"}
      </h1>

      {/* Genres List */}
      <div className="mb-8">
        {isLoadingGenres ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cine-gold" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenreId === genre.id.toString() ? "default" : "outline"}
                className={
                  selectedGenreId === genre.id.toString()
                    ? "bg-cine-gold hover:bg-cine-gold/80 text-black"
                    : "border-gray-700 text-white hover:bg-gray-800"
                }
                onClick={() => handleGenreClick(genre.id)}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Genre Movies */}
      {selectedGenreId ? (
        <>
          <MovieGrid 
            movies={movies} 
            isLoading={isLoadingMovies} 
            error={moviesError} 
          />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1 || isLoadingMovies}
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                Previous
              </Button>
              <div className="flex items-center px-4 text-gray-400">
                Page {page} of {Math.min(totalPages, 500)}
              </div>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, Math.min(totalPages, 500)))}
                disabled={page === Math.min(totalPages, 500) || isLoadingMovies}
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-xl">Select a genre to browse movies</p>
        </div>
      )}
    </div>
  );
};

export default Genres;
