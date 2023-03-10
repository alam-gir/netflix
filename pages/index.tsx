import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import requests from "@/utils/requests";
import { Movie } from "@/utils/type";
import Row from "@/components/Row";
import { useAuth } from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import VideoModal from "@/components/VideoModal";
interface HomeProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export default function Home({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: HomeProps) {
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) {
    return <h1>loading.........</h1>;
  }

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Netflix</title>
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-4 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="flex flex-col md:gap-12 lg:gap-14">
          <Row title={"netflixOriginals"} movies={netflixOriginals} />
          <Row title={"Trending Now"} movies={trendingNow} />
          <Row title={"Top Rated"} movies={topRated} />
          <Row title={"Action Movies"} movies={actionMovies} />
          <Row title={"Comedy Movies"} movies={comedyMovies} />
          <Row title={"Horror Movies"} movies={horrorMovies} />
          <Row title={"Romance Movies"} movies={romanceMovies} />
          <Row title={"Documentaries"} movies={documentaries} />
        </section>
      </main>
      {showModal && <VideoModal />}
    </div>
  );
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
