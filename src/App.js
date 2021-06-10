import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

import MoviesList from "./components/MoviesList";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: "Some Dummy Movie",
  //     openingText: "This is the opening text of the movie",
  //     releaseDate: "2021-05-18",
  //   },
  //   {
  //     id: 2,
  //     title: "Some Dummy Movie 2",
  //     openingText: "This is the second opening text of the movie",
  //     releaseDate: "2021-05-19",
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/", {
        method: "GET",
      });
      // .then((response) => {
      //   return response.json();
      // })
      // .then((data) => {
      //   const transformedMovies = data.results.map((movieDate) => {
      //     return {
      //       id: movieDate.episode_id,
      //       title: movieDate.title,
      //       openingText: movieDate.opening_crawl,
      //       releaseDate: movieDate.release_date,
      //     };
      //   });
      //   setMovies(transformedMovies);
      // });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieDate) => {
        return {
          id: movieDate.episode_id,
          title: movieDate.title,
          openingText: movieDate.opening_crawl,
          releaseDate: movieDate.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
