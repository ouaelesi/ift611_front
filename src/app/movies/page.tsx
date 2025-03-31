"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎬 Collection Cinématographique</h1>
          <p className="text-gray-600 text-lg">Découvrez notre sélection de films exclusifs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie: any) => (
            <div
              key={movie._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => router.push(`/movies/${movie._id}`)}
            >
              <div className="relative aspect-[2/3]">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                  {new Date(movie.date_de_sortie).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">{movie.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{movie.description}</p>
                <div className="flex justify-end">
                  <button
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/movies/${movie._id}`);
                    }}
                  >
                    Voir les détails →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}