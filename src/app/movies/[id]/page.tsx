"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<any>(null);

  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/movies/${id}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  

  const commentMovie = async () => {
    try {
      await fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment, user_id: "67e10ef4b453db4d132e2541", movie_id: id }),
      });
      getComments();
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error commenting movie:", error);
    }
  };

  useEffect(() => {
    if (id) {
      !comments && getComments();
      fetch(`http://localhost:8000/movies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoading(false);
          // Load mock comments (replace with actual API call)
        })
        .catch((error) => console.error("Error fetching movie:", error));
    }
  }, [id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && rating > 0) {
      const newComment = {
        id: comments.length + 1,
        user: "Current User",
        text: comment,
        rating,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([newComment, ...comments]);
      setComment("");
      setRating(0);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Movie not found
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Movie Details Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-1">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105"
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{movie.name}</h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-6 w-6 ${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">4.0/5.0</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-medium">Release Date</p>
                  <p>
                    {new Date(movie.date_de_sortie).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Language</p>
                  <p>{movie.langue}</p>
                </div>
                <div>
                  <p className="font-medium">Directors</p>
                  <p>{movie.auteurs.join(", ")}</p>
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p>2h 15m</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>
        </div>

        {/* Comments & Rating Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Reviews & Ratings
          </h2>

          {/* Rating Form */}
          <form onSubmit={handleSubmitComment} className="mb-12 border-b pb-8">
            <div className="flex items-center mb-4">
              <label className="block text-lg font-medium text-gray-700 mr-4">
                Your Rating:
              </label>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`h-8 w-8 ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <StarIcon className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-black p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Write your review..."
              />
            </div>

            <button
              type="submit"
            
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={commentMovie}
            >
              Submit Review
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-8">
            {comments?.map((c) => (
              <div key={c.id} className="border-b pb-6 last:border-0">
                <div className="flex items-start space-x-4">
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{c.user}</h3>
                      <span className="text-sm text-gray-500">{c.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < c.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
