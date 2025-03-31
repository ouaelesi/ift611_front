"use client";
import { StarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<any>(null);

  const getmovies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    !movies && getmovies();
  }, []);

  const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Documentary",
    "Sci-Fi",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 py-4 px-6 fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CineStream</h1>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Movies
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              TV Shows
            </a>
            <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent">
          <img
            src="https://source.unsplash.com/random/1920x1080/?movie-theater"
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Unlimited Movies & TV Shows
            </h1>
            <p className="text-xl mb-8">
              Watch anywhere. Stream timeless classics and exciting new
              releases.
            </p>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => router.push("/movies")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg flex items-center transition-colors"
              >
                <PlayIcon className="h-6 w-6 mr-2" />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies?.map((movie:any) => (
              <div
                key={movie.id}
                className="group relative bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{movie.name}</h3>
                    <span className="bg-blue-600 text-sm px-2 py-1 rounded">
                      {movie.date_de_sortie}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{movie.langue}</span>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter for new releases and recommendations
          </p>
          <div className="flex justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-96 px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CineStream</h3>
            <p className="text-gray-400">
              Your gateway to endless entertainment
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
