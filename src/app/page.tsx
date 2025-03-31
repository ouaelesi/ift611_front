"use client"
import { useEffect, useState } from "react";
import axios from "axios"

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/movies").then((res) => setMovies(res.data));
  }, []);


  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">🎬 Liste des Films</h1>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie:any) => (
          <div key={movie._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-bold">{movie.name}</h2>
            <img src={movie.image} alt={movie.name} className="w-full h-40 object-cover mt-2 mb-2" />
            <p>{movie.description}</p>
            <p className="text-sm text-gray-500">{movie.date_de_sortie}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
