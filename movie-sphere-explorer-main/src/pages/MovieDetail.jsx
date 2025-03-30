
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  getImageUrl,
  BACKDROP_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  formatRuntime,
  formatDate,
  formatCurrency,
} from "@/lib/tmdb";
import { Loader2, Star, Calendar, Clock, Ticket, DollarSign, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const [showFullOverview, setShowFullOverview] = useState(false);

  // Fetch movie details
  const {
    data: movie,
    isLoading: isLoadingMovie,
    error: movieError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });

  // Fetch movie credits
  const {
    data: credits,
    isLoading: isLoadingCredits,
    error: creditsError,
  } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => fetchMovieCredits(id),
    enabled: !!id,
  });

  // Fetch similar movies
  const {
    data: similarMovies,
    isLoading: isLoadingSimilar,
    error: similarError,
  } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: () => fetchSimilarMovies(id),
    enabled: !!id,
  });

  const isLoading = isLoadingMovie || isLoadingCredits || isLoadingSimilar;
  const error = movieError || creditsError || similarError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-cine-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-secondary p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-cine-accent">Error Loading Movie</h2>
          <p className="mb-6">{error.message}</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, BACKDROP_SIZES.original);
  const posterUrl = getImageUrl(movie.poster_path, POSTER_SIZES.large);
  const placeholderUrl = "https://via.placeholder.com/342x513?text=No+Image";

  // Format movie data for similar movies
  const formattedSimilarMovies = similarMovies?.results
    .slice(0, 10)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genreIds: movie.genre_ids,
    }));

  // Get directors and main cast
  const directors = credits?.crew?.filter((person) => person.job === "Director") || [];
  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <main>
      {/* Backdrop and Movie Info */}
      <div className="relative">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="absolute inset-0 h-[70vh] overflow-hidden">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cine-dark via-cine-dark/70 to-transparent"></div>
            <div className="absolute inset-0 backdrop-gradient"></div>
          </div>
        )}

        {/* Movie Details */}
        <div className="container mx-auto px-4 pt-32 pb-16 relative z-10 min-h-[70vh] flex items-end">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full max-w-[300px] mx-auto md:mx-0">
              <img
                src={posterUrl || placeholderUrl}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-lg movie-poster"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}{" "}
                {movie.release_date && (
                  <span className="text-gray-400 font-normal">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                )}
              </h1>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map((genre) => (
                  <Badge key={genre.id} variant="outline" className="border-cine-gold text-cine-gold">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* Rating and Facts */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm md:text-base">
                {movie.vote_average > 0 && (
                  <div className="flex items-center">
                    <Star className="text-cine-gold fill-cine-gold mr-1 h-5 w-5" />
                    <span>
                      {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                    </span>
                  </div>
                )}

                {movie.release_date && (
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 mr-1 h-4 w-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                )}

                {movie.runtime > 0 && (
                  <div className="flex items-center">
                    <Clock className="text-gray-400 mr-1 h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
              </div>

              {/* Overview */}
              {movie.overview && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className={showFullOverview ? "" : "truncate-3"}>
                    {movie.overview}
                  </p>
                  {movie.overview.length > 200 && (
                    <button
                      onClick={() => setShowFullOverview(!showFullOverview)}
                      className="text-cine-gold hover:underline mt-2 text-sm font-medium"
                    >
                      {showFullOverview ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {movie.budget > 0 && (
                  <div>
                    <div className="flex items-center text-gray-400 mb-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="text-sm">Budget</span>
                    </div>
                    <div className="font-medium">{formatCurrency(movie.budget)}</div>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div>
                    <div className="flex items-center text-gray-400 mb-1">
                      <Ticket className="h-4 w-4 mr-1" />
                      <span className="text-sm">Revenue</span>
                    </div>
                    <div className="font-medium">{formatCurrency(movie.revenue)}</div>
                  </div>
                )}

                {movie.production_companies?.length > 0 && (
                  <div>
                    <div className="flex items-center text-gray-400 mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Production</span>
                    </div>
                    <div className="font-medium">
                      {movie.production_companies.slice(0, 2).map((company) => company.name).join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast and Crew */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Cast & Crew</h2>
        
        {/* Directors */}
        {directors.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Director{directors.length > 1 ? 's' : ''}</h3>
            <div className="flex flex-wrap gap-6">
              {directors.map((director) => (
                <div key={director.id} className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-secondary">
                    {director.profile_path ? (
                      <img
                        src={getImageUrl(director.profile_path, PROFILE_SIZES.small)}
                        alt={director.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-500">
                        {director.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{director.name}</p>
                    <p className="text-sm text-gray-400">Director</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Top Cast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.map((person) => (
                <div key={person.id} className="bg-secondary rounded-lg overflow-hidden transition hover:bg-secondary/80">
                  <div className="aspect-[2/3] overflow-hidden bg-gray-800">
                    {person.profile_path ? (
                      <img
                        src={getImageUrl(person.profile_path, PROFILE_SIZES.medium)}
                        alt={person.name}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-white truncate">{person.name}</p>
                    <p className="text-sm text-gray-400 truncate">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Separator className="bg-gray-800" />

      {/* Similar Movies */}
      {formattedSimilarMovies?.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Similar Movies</h2>
          <MovieGrid
            movies={formattedSimilarMovies}
            isLoading={isLoadingSimilar}
            error={similarError}
          />
        </section>
      )}
    </main>
  );
};

export default MovieDetail;
