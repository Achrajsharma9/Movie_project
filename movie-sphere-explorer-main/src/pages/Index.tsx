
import { useQuery } from "@tanstack/react-query";
import { fetchTrending, fetchNowPlaying, fetchTopRated } from "@/lib/tmdb";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { Loader2, Film, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: trendingData, isLoading: isLoadingTrending } = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending("day"),
  });

  const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: () => fetchNowPlaying(),
  });

  const { data: topRatedData, isLoading: isLoadingTopRated } = useQuery({
    queryKey: ["topRated"],
    queryFn: () => fetchTopRated(),
  });

  const isLoading = isLoadingTrending || isLoadingNowPlaying || isLoadingTopRated;

  const formatMovieData = (movies = []) => {
    return movies.slice(0, 10).map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genreIds: movie.genre_ids,
    }));
  };

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-10 space-y-12">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <TrendingUp className="text-cine-gold mr-2" size={24} />
              <h2 className="text-2xl font-bold text-white">Trending Today</h2>
            </div>
            <Link 
              to="/movies?section=trending" 
              className="text-cine-gold hover:underline font-medium text-sm"
            >
              View All
            </Link>
          </div>
          {isLoadingTrending ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-cine-gold" />
            </div>
          ) : (
            <MovieGrid 
              movies={formatMovieData(trendingData?.results)} 
              isLoading={isLoadingTrending} 
            />
          )}
        </section>

        {/* Now Playing Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Film className="text-cine-gold mr-2" size={24} />
              <h2 className="text-2xl font-bold text-white">Now Playing</h2>
            </div>
            <Link 
              to="/movies?section=now_playing" 
              className="text-cine-gold hover:underline font-medium text-sm"
            >
              View All
            </Link>
          </div>
          {isLoadingNowPlaying ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-cine-gold" />
            </div>
          ) : (
            <MovieGrid 
              movies={formatMovieData(nowPlayingData?.results)} 
              isLoading={isLoadingNowPlaying} 
            />
          )}
        </section>

        {/* Top Rated Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Star className="text-cine-gold mr-2" size={24} />
              <h2 className="text-2xl font-bold text-white">Top Rated</h2>
            </div>
            <Link 
              to="/movies?section=top_rated" 
              className="text-cine-gold hover:underline font-medium text-sm"
            >
              View All
            </Link>
          </div>
          {isLoadingTopRated ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-cine-gold" />
            </div>
          ) : (
            <MovieGrid 
              movies={formatMovieData(topRatedData?.results)} 
              isLoading={isLoadingTopRated} 
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Index;
