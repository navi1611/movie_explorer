import React from 'react';
import MovieCard from '../../components/MovieCard';

const HomePage: React.FC = () => {

  return (
    <div className="fade-in-up">
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-3 gap-6">
        <MovieCard
          title="The Shawshank Redemption"
          description="Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
          rating={9.3}
          releaseDate="1994-09-23"
          genre="Drama" />
      </div>
    </div>

  );
};

export default HomePage;
