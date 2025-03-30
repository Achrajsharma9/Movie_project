
// TMDB API Constants
const TMDB_API_KEY = "a15ddb2fea4ca302672b148a22d5b529"; // This is a public key used for demo
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Image sizes
export const POSTER_SIZES = {
  tiny: "w92",
  small: "w154",
  medium: "w185",
  large: "w342",
  xlarge: "w500",
  xxlarge: "w780",
  original: "original",
};

export const BACKDROP_SIZES = {
  small: "w300",
  medium: "w780",
  large: "w1280",
  original: "original",
};

export const PROFILE_SIZES = {
  small: "w45",
  medium: "w185",
  large: "h632",
  original: "original",
};

// Helper function to build image URLs
export const getImageUrl = (
  path: string | null,
  size: string = POSTER_SIZES.large
) => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// API request helper
const fetchFromTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY);
  
  // Add additional params if any
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// Fetch trending movies
export const fetchTrending = (timeWindow = "day", page = 1) => {
  return fetchFromTMDB(`/trending/movie/${timeWindow}`, { page: page.toString() });
};

// Fetch popular movies
export const fetchPopular = (page = 1) => {
  return fetchFromTMDB("/movie/popular", { page: page.toString() });
};

// Fetch top-rated movies
export const fetchTopRated = (page = 1) => {
  return fetchFromTMDB("/movie/top_rated", { page: page.toString() });
};

// Fetch now playing movies
export const fetchNowPlaying = (page = 1) => {
  return fetchFromTMDB("/movie/now_playing", { page: page.toString() });
};

// Fetch upcoming movies
export const fetchUpcoming = (page = 1) => {
  return fetchFromTMDB("/movie/upcoming", { page: page.toString() });
};

// Fetch movie details
export const fetchMovieDetails = (movieId: string | number) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};

// Fetch movie credits
export const fetchMovieCredits = (movieId: string | number) => {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
};

// Fetch movie videos
export const fetchMovieVideos = (movieId: string | number) => {
  return fetchFromTMDB(`/movie/${movieId}/videos`);
};

// Fetch similar movies
export const fetchSimilarMovies = (movieId: string | number) => {
  return fetchFromTMDB(`/movie/${movieId}/similar`);
};

// Fetch movie recommendations
export const fetchMovieRecommendations = (movieId: string | number) => {
  return fetchFromTMDB(`/movie/${movieId}/recommendations`);
};

// Fetch person details
export const fetchPersonDetails = (personId: string | number) => {
  return fetchFromTMDB(`/person/${personId}`);
};

// Fetch person movie credits
export const fetchPersonMovieCredits = (personId: string | number) => {
  return fetchFromTMDB(`/person/${personId}/movie_credits`);
};

// Fetch genres
export const fetchGenres = () => {
  return fetchFromTMDB("/genre/movie/list");
};

// Search movies
export const searchMovies = (query: string, page = 1) => {
  return fetchFromTMDB("/search/movie", { 
    query, 
    page: page.toString(),
    include_adult: "false"
  });
};

// Discover movies (with filters)
export const discoverMovies = (params: Record<string, string> = {}, page = 1) => {
  return fetchFromTMDB("/discover/movie", { 
    ...params,
    page: page.toString(),
    include_adult: "false"
  });
};

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
};

// Format date to readable format
export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Format currency
export const formatCurrency = (amount: number) => {
  if (!amount) return "N/A";
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};
