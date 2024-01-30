import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const path = useLocation();
  cosnt[(Result, setResult)] = useState([]);
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzQxMmU4YTIzZTdhNjA3ZmEzOGZmYzE4ZjMwMmRmOSIsInN1YiI6IjY1YWZkNTEyNjdiNjEzMDBhZmYwYTYwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q26i66D6UDNHaJIdSnCDEHcPjZj8Qh6QBLiZi0Th9B4",
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3${path.pathname}`,
        options
      );
      const data = await response.json();
      setResult(data.results);
      console.log(data.results.length);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <div>Hello</div>
    </>
  );
}
export default SearchResults;
