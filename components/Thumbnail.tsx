import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/utils/type";
import React from "react";
import { useRecoilState } from "recoil";

interface ThumbnailProps {
  movie: Movie;
  // when using firebase
  //   movie: Movie | DcoumentData;
}

const Thumbnail = ({ movie }: ThumbnailProps) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className="group relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setShowModal(true);
        setCurrentMovie(movie);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className=" h-[100%] w-[100%] rounded-sm object-cover md:rounded object-cover"
        alt=""
      />
      <h2 className="absolute bottom-1 md:bottom-2 lg:bottom-2 text-sm text-shadow-md  px-2">
        {movie.title}
      </h2>
    </div>
  );
};

export default Thumbnail;
