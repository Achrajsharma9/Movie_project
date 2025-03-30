
import { getImageUrl, POSTER_SIZES } from "@/lib/tmdb";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate?: string;
  voteAverage?: number;
  genreIds?: number[];
  genres?: { id: number; name: string }[];
}

const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  voteAverage,
  genreIds,
  genres,
}: MovieCardProps) => {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const posterUrl = getImageUrl(posterPath, POSTER_SIZES.large);
  const placeholderUrl = "https://via.placeholder.com/342x513?text=No+Image";

  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="movie-card flex flex-col h-full">
        <div className="movie-poster poster-hover rounded-md overflow-hidden mb-2">
          <img
            src={posterUrl || placeholderUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="movie-info flex-grow">
          <h3 className="font-medium text-sm md:text-base text-white group-hover:text-cine-gold transition-colors truncate">
            {title}
          </h3>
          <div className="flex items-center mt-1 text-xs text-gray-400">
            {year && <span className="mr-2">{year}</span>}
            {voteAverage ? (
              <div className="flex items-center">
                <Star size={12} className="text-cine-gold fill-cine-gold mr-1" />
                <span>{voteAverage.toFixed(1)}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
