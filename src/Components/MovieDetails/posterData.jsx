import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faHeart,
  faBookmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use
import CastDetails from "./Castdetails";
import FullCast from "./fullCast";
import { Link, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function MovieDetails() {
  const base_url = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";
  const base_backdrop =
    "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
  const path = useLocation();
  console.log(path);
  const [movieData, setMovieData] = useState();
  async function fetchdata() {
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
        `https://api.themoviedb.org/3${path.pathname}?language=en-US`,
        options
      );
      const data = await response.json();
      setMovieData(data);
      console.log("dattta", data);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  const hours = Math.floor(movieData?.runtime / 60);
  const minutes = movieData?.runtime % 60;
  return (
    <>
      <div
        className=" min-h-[32rem] px-28 py-8 flex gap-4 text-white bg-no-repeat bg-gradient-to-br-[(rgba(31.5, 31.5, 52.5, 1), rgba(31.5, 31.5, 52.5, 0.84)]"
        style={{
          backgroundImage: `url(${base_backdrop}${movieData?.backdrop_path})`,
        }}
      >
        <div className="min-w-[300px] min-h-[450px]">
          <img
            src={`${base_url}${movieData?.poster_path}`}
            alt=""
            className="rounded-lg w-[300px] h-[450px] object-contain"
          />
        </div>
        <div>
          <div>
            <p>
              {movieData?.release_date}
              {"("}
              {movieData?.production_countries[0]?.iso_3166_1}
              {")"}
              {movieData?.genres.map((genre, index) => (
                <span key={genre.id}>
                  {index > 0 && ", "} {genre.name}
                </span>
              ))}{" "}
              {`${hours}h ${minutes}m`}
            </p>
          </div>
          <div className="flex gap-4">
            <p>
              <Tooltip title="Add to list" placement="bottom" color={"#172554"}>
                <Button
                  type="default"
                  className="bg-blue-950 text-white hover:bg-blue-95 w-[52px] border-none p-0"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faList} />}
                  size="large"
                />
              </Tooltip>
            </p>
            <p>
              <Tooltip
                title="Mark as favorite"
                placement="bottom"
                color={"#172554"}
              >
                <Button
                  type="default"
                  className="bg-blue-950 text-white hover:bg-blue-95 border-none w-[52px] p-0"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faHeart} />}
                  size="large"
                />
              </Tooltip>
            </p>
            <p>
              <Tooltip
                title="Add to your watchlist"
                placement="bottom"
                color={"#172554"}
              >
                <Button
                  type="default"
                  className="bg-blue-950 text-white hover:bg-blue-95 border-none w-[52px] p-0"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faBookmark} />}
                  size="large"
                />
              </Tooltip>
            </p>
            <p>
              <Tooltip title="Rate It!" placement="bottom" color={"#172554"}>
                <Button
                  type="default"
                  className="bg-blue-950 text-white hover:bg-blue-95 border-none w-[52px] p-0"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faStar} />}
                  size="large"
                />
              </Tooltip>
            </p>
          </div>
          <div>{movieData?.tagline}</div>
          <div>
            <p className="text-xl font-semibold text-white font-sans">
              Overview
            </p>
            <p className="text-white">{movieData?.overview}</p>
          </div>
        </div>
      </div>
      <CastDetails path={path.pathname}></CastDetails>
    </>
  );
}

export default MovieDetails;
