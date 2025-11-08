import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies, searchPopularMovies } from "../services/api";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (e) {
        console.error("Error fetching popular movies:", e);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return; //make sure user not searching for empty string
    if (loading) return; //prevent searching while loading
    setLoading(true);
    try {
      const searchResults = await searchPopularMovies(searchTerm);
      setMovies(searchResults);
      setError(null);
    } catch (e) {
      setError("Error searching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchTerm}
          onChange={function (e) {
            setSearchTerm(e.target.value);
          }}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().includes(searchTerm.toLowerCase()) && (
                <MovieCard key={movie.id} movie={movie} />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
