
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [page, setPage] = useState(1);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
    setSearchTerm(query);
  }, [query]);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ query: searchTerm.trim() });
    }
  };

  const totalPages = data?.total_pages || 0;
  const totalResults = data?.total_results || 0;

  // Format movie data for the movie grid
  const movies = data?.results?.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Movie Search</h1>
        
        <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2 mb-6">
          <Input
            type="search"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-secondary/50 focus:bg-secondary border-0 focus:ring-1 focus:ring-cine-gold"
          />
          <Button type="submit" className="bg-cine-gold hover:bg-cine-gold/80 text-black">
            <Search size={18} className="mr-2" />
            Search
          </Button>
        </form>

        {query && (
          <div className="text-gray-400 mb-6">
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <span>
                Found {totalResults} results for "{query}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Search Results */}
      {query ? (
        <>
          <MovieGrid movies={movies} isLoading={isLoading} error={error} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1 || isLoading}
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                Previous
              </Button>
              <div className="flex items-center px-4 text-gray-400">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || isLoading}
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl">Enter a search term to find movies</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
