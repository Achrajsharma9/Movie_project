
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrending } from "@/lib/tmdb";
import { getImageUrl, BACKDROP_SIZES } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

const Hero = () => {
  const [featuredMovie, setFeaturedMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRandomTrendingMovie = async () => {
      try {
        const data = await fetchTrending();
        const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
        setFeaturedMovie(data.results[randomIndex]);
      } catch (error) {
        console.error("Failed to fetch featured movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRandomTrendingMovie();
  }, []);

  if (isLoading || !featuredMovie) {
    return (
      <div className="h-[60vh] bg-gradient-to-b from-cine-navy to-cine-dark flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cine-gold border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(featuredMovie.backdrop_path, BACKDROP_SIZES.original);
  
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Backdrop Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backdropUrl} 
          alt={featuredMovie.title} 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cine-dark via-cine-dark/70 to-transparent"></div>
        <div className="absolute inset-0 backdrop-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-16">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
            {featuredMovie.title}
          </h1>
          
          {featuredMovie.overview && (
            <p className="text-gray-300 mb-6 text-base md:text-lg truncate-3">
              {featuredMovie.overview}
            </p>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-cine-gold hover:bg-cine-gold/80 text-black font-medium">
              <Link to={`/movie/${featuredMovie.id}`}>
                <Info className="mr-2 h-4 w-4" />
                Details
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Play className="mr-2 h-4 w-4 fill-white" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
