import React from 'react';

interface MovieCardProps {
    title: string;
    description?: string;
    rating: number;
    releaseDate: string;
    genre: string;
    image?: string;

}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, description, rating, releaseDate, genre }) => {
    return (
        <div className="fade-in-up flex flex-col gap-4 max-w-sm p-4 bg-background-card rounded-lg shadow-lg cursor-pointer  hover:shadow-zinc-600  hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center h-60 bg-background-card-light">
                {
                    image ? <img src={image} alt={title} /> : <p className='text-5xl'>{title[0]}</p>
                }
            </div>

            <div className='flex items-center justify-between'>
                <h2>{title}</h2>
                <p>{releaseDate}</p>
            </div>

            <div className='max-w-md'>
                <p className='line-clamp-3'>{description}</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='bg-primary-light rounded-lg py-1 px-2'> {genre}</p>
                <p className='text-primary'>{rating}</p>
            </div>
        </div>
    );
};

export default MovieCard;

