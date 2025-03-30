
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { 
  fetchTrending, 
  fetchPopular, 
  fetchTopRated, 
  fetchNowPlaying, 
  fetchUpcoming 
} from "@/lib/tmdb";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = searchParams.get("section") || "popular";
  const [section, setSection] = useState(initialSection);
  const [page, setPage] = useState(1);

  // Sync URL with selected section
  useEffect(() => {
    setSearchParams({ section });
  }, [section, setSearchParams]);

  // Reset page when section changes
  useEffect(() => {
    setPage(1);
  }, [section]);

  // Function to fetch movies based on selected section
  const fetchMoviesBySection = async () => {
    switch (section) {
      case "trending":
        return fetchTrending("week", page);
      case "popular":
        return fetchPopular(page);
      case "top_rated":
        return fetchTopRated(page);
      case "now_playing":
        return fetchNowPlaying(page);
      case "upcoming":
        return fetchUpcoming(page);
      default:
        return fetchPopular(page);
    }
  };

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", section, page],
    queryFn: fetchMoviesBySection,
  });

  const totalPages = data?.total_pages || 0;

  // Format movie data for the movie grid
  const movies = data?.results?.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
  })) || [];

  // Section titles for display
  const sectionTitles = {
    trending: "Trending Movies",
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    now_playing: "Now Playing",
    upcoming: "Upcoming Movies",
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">{sectionTitles[section]}</h1>

      {/* Category Tabs */}
      <Tabs defaultValue={section} value={section} onValueChange={setSection} className="mb-8">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="popular" className="data-[state=active]:bg-cine-gold data-[state=active]:text-black">
            Popular
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-cine-gold data-[state=active]:text-black">
            Trending
          </TabsTrigger>
          <TabsTrigger value="top_rated" className="data-[state=active]:bg-cine-gold data-[state=active]:text-black">
            Top Rated
          </TabsTrigger>
          <TabsTrigger value="now_playing" className="data-[state=active]:bg-cine-gold data-[state=active]:text-black">
            Now Playing
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-cine-gold data-[state=active]:text-black">
            Upcoming
          </TabsTrigger>
        </TabsList>

        {/* Movie Grid for each tab */}
        {Object.keys(sectionTitles).map((key) => (
          <TabsContent key={key} value={key} className="pt-4">
            <MovieGrid movies={movies} isLoading={isLoading} error={error} />
          </TabsContent>
        ))}
      </Tabs>

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
            Page {page} of {Math.min(totalPages, 500)}
          </div>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(p + 1, Math.min(totalPages, 500)))}
            disabled={page === Math.min(totalPages, 500) || isLoading}
            className="text-white border-gray-700 hover:bg-gray-800"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Movies;
