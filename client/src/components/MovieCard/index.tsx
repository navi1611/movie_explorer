import { Film, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id?: number;
  title: string;
  description?: string;
  rating?: number;
  releaseDate: string;
  genre?: string;
  image?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  image,
  title,
  description,
  rating,
  releaseDate,
  genre,
}) => {
  const cardContent = (
    <div className="fade-in-up flex flex-col gap-4 w-full max-w-sm h-[420px] p-4 bg-background-card rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">


      <div className="flex items-center justify-center h-48 bg-background-card rounded-md overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-background-card-light">
            <Film className="w-24 h-24 text-white/20" />
            {/* <p className="text-5xl font-semibold">
              {title[0]}
            </p> */}
          </div>
        )}
      </div>


      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold line-clamp-2">
          {title}
        </h2>
        <p className="text-sm whitespace-nowrap">
          {releaseDate}
        </p>
      </div>


      <p className="text-sm text-muted line-clamp-3">
        {description}
      </p>


      <div className="mt-auto flex items-center justify-between">
        {genre && (
          <p className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors">
            {genre}
          </p>
        )}
        <div className="flex items-center gap-2 px-3 py-1 bg-background-card rounded-lg">
          <Star className="w-4 h-4 text-primary fill-primary" /> {rating}
        </div>
      </div>
    </div>
  );

  if (id) {
    return (
      <Link to={`/movie/${id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default MovieCard;

