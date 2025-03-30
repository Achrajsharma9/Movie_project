
// API constants
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "2dca580c2a14b55200e784d157207b4d"; // Public TMDB API key for demo purposes
const IMG_BASE_URL = "https://image.tmdb.org/t/p";

// Image sizes
export const POSTER_SIZES = {
  small: "w154",
  medium: "w342",
  large: "w500",
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

// Helper function to construct image URLs
export const getImageUrl = (path, size) => {
  if (!path) return null;
  return `${IMG_BASE_URL}/${size}${path}`;
};

// Helper function to create API URLs with query parameters
const createApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  
  // Add additional query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

// Fetch helpers
const fetchData = async (url) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }
  
  return response.json();
};

// API functions

// Get trending movies or TV shows
export const fetchTrending = async (timeWindow = "day", page = 1) => {
  const url = createApiUrl(`/trending/movie/${timeWindow}`, { page });
  return fetchData(url);
};

// Get popular movies
export const fetchPopular = async (page = 1) => {
  const url = createApiUrl("/movie/popular", { page });
  return fetchData(url);
};

// Get top-rated movies
export const fetchTopRated = async (page = 1) => {
  const url = createApiUrl("/movie/top_rated", { page });
  return fetchData(url);
};

// Get now playing movies
export const fetchNowPlaying = async (page = 1) => {
  const url = createApiUrl("/movie/now_playing", { page });
  return fetchData(url);
};

// Get upcoming movies
export const fetchUpcoming = async (page = 1) => {
  const url = createApiUrl("/movie/upcoming", { page });
  return fetchData(url);
};

// Get movie details
export const fetchMovieDetails = async (movieId) => {
  const url = createApiUrl(`/movie/${movieId}`);
  return fetchData(url);
};

// Get movie credits (cast and crew)
export const fetchMovieCredits = async (movieId) => {
  const url = createApiUrl(`/movie/${movieId}/credits`);
  return fetchData(url);
};

// Get similar movies
export const fetchSimilarMovies = async (movieId, page = 1) => {
  const url = createApiUrl(`/movie/${movieId}/similar`, { page });
  return fetchData(url);
};

// Get movie recommendations
export const fetchRecommendations = async (movieId, page = 1) => {
  const url = createApiUrl(`/movie/${movieId}/recommendations`, { page });
  return fetchData(url);
};

// Search for movies
export const searchMovies = async (query, page = 1) => {
  const url = createApiUrl("/search/movie", { query, page });
  return fetchData(url);
};

// Get movie genres
export const fetchGenres = async () => {
  const url = createApiUrl("/genre/movie/list");
  return fetchData(url);
};

// Discover movies by parameters (useful for filtering)
export const discoverMovies = async (params = {}, page = 1) => {
  const url = createApiUrl("/discover/movie", { ...params, page });
  return fetchData(url);
};

// Helper functions for formatting data
export const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};
