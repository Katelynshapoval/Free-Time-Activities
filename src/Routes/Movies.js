import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    Name: "",
    Description: "",
    Image: "",
    creator: "", // We'll use this field for Katya or Polina
    Watched: false,
  });
  const [editingMovieId, setEditingMovieId] = useState(null); // To track the movie being edited

  // Fetch movies from Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const movieList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieList);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle adding or updating a movie in Firestore
  const handleAddOrUpdateMovie = async (e) => {
    e.preventDefault();
    if (
      !newMovie.Name ||
      !newMovie.Description ||
      !newMovie.Image ||
      !newMovie.creator
    ) {
      alert("Please fill out all fields, including the creator!");
      return;
    }

    if (editingMovieId) {
      // Update existing movie
      try {
        const movieRef = doc(db, "movies", editingMovieId);
        await updateDoc(movieRef, newMovie);
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === editingMovieId ? { ...movie, ...newMovie } : movie
          )
        );
        setEditingMovieId(null); // Reset editing state
        setNewMovie({
          Name: "",
          Description: "",
          Image: "",
          creator: "",
          Watched: false,
        });
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    } else {
      // Add new movie
      try {
        const docRef = await addDoc(collection(db, "movies"), newMovie);
        setMovies((prev) => [...prev, { id: docRef.id, ...newMovie }]);
        setNewMovie({
          Name: "",
          Description: "",
          Image: "",
          creator: "",
          Watched: false,
        });
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    }
  };

  // Handle updating the "Watched" status of a movie
  const handleWatchedChange = async (movieId, watchedStatus) => {
    try {
      const movieRef = doc(db, "movies", movieId);
      await updateDoc(movieRef, { Watched: watchedStatus });
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, Watched: watchedStatus } : movie
        )
      );
    } catch (error) {
      console.error("Error updating movie: ", error);
    }
  };

  // Handle deleting a movie
  const handleDeleteMovie = async (movieId) => {
    try {
      const movieRef = doc(db, "movies", movieId);
      await deleteDoc(movieRef);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Handle editing a movie
  const handleEditMovie = (movie) => {
    setEditingMovieId(movie.id);
    setNewMovie({
      Name: movie.Name,
      Description: movie.Description,
      Image: movie.Image,
      creator: movie.creator,
      Watched: movie.Watched,
    });
  };

  return (
    <div className="movies">
      <h1>Movies</h1>

      {/* Movie List */}
      <div className="movieList">
        {movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movieCard">
              <h2>{movie.Name}</h2>
              <p>{movie.Description}</p>
              <img src={movie.Image} alt={movie.Name} />
              <p>
                Watched:
                <input
                  type="checkbox"
                  checked={movie.Watched}
                  onChange={() => handleWatchedChange(movie.id, !movie.Watched)}
                />
              </p>
              <p>Created by: {movie.creator}</p>
              <button onClick={() => handleEditMovie(movie)}>Edit</button>
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Delete
              </button>
            </div>
          ))
        )}
        {/* Add or Edit Movie Form */}
        <div className="addMovie">
          <h2>{editingMovieId ? "Edit Movie" : "Add a New Movie"}</h2>
          <form onSubmit={handleAddOrUpdateMovie}>
            <input
              type="text"
              name="Name"
              placeholder="Movie Name"
              value={newMovie.Name}
              onChange={handleInputChange}
            />
            <textarea
              name="Description"
              placeholder="Movie Description"
              value={newMovie.Description}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              name="Image"
              placeholder="Movie Image URL"
              value={newMovie.Image}
              onChange={handleInputChange}
            />

            {/* Radio Buttons for Katya and Polina - Only one can be selected */}
            <label>
              Katya:
              <input
                type="radio"
                name="creator"
                value="Katya"
                checked={newMovie.creator === "Katya"}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Polina:
              <input
                type="radio"
                name="creator"
                value="Polina"
                checked={newMovie.creator === "Polina"}
                onChange={handleInputChange}
              />
            </label>

            <button type="submit">
              {editingMovieId ? "Update Movie" : "Add Movie"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Movies;
