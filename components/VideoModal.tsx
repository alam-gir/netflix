import { useEffect, useState } from "react";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "@mui/material/Modal";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Element, Genres } from "@/utils/type";
import ReactPlayer from "react-player/lazy";
import {
  FaPlay,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
const VideoModal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genres[]>([]);
  const handleClose = () => {
    setShowModal(false);
  };
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;
    const fetchTrailer = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.videos) {
            const trailerIndex = data.videos.results.findIndex(
              (element: Element) => {
                return element.type === "Trailer";
              }
            );
            setTrailer(data.videos?.results[trailerIndex]?.key);
          }
          if (data?.genres) {
            setGenres(data.genres);
          }
        });
    };
    fetchTrailer();
  }, [movie]);

  console.log("from modals", trailer, genres);
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalBtn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              `https://www.youtube.com/watch?v=${trailer}` |
              "https://www.youtube.com/watch?v=N_yu136hKMQ"
            }
            muted={muted}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10 ">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" /> Play
              </button>

              <button className="modalBtn">
                <PlusIcon className="h-7 w-7 text-white" />
              </button>

              <button className="modalBtn">
                <HandThumbUpIcon className="h-7 w-7 py-1 px-1 text-white" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)}>
              {muted ? (
                <FaVolumeMute className="modalBtn h-7 w-7 py-.5 px-1" />
              ) : (
                <FaVolumeDown className="modalBtn h-7 w-7 py-.5 px-1" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {(movie?.vote_average * 10).toFixed(2)}% Match
              </p>
              <p className="font-light  ">{movie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-5xs">
                {" "}
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total vote: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default VideoModal;
