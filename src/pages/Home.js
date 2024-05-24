import useFetch from "../Hooks/hooks/useFetch";
import BannerHome from "../components/BannerHome";
import HorizentalScrollCard from "../components/HorizentalScrollCard";
import { useSelector } from "react-redux";

const Home = () => {
  const trendingMovieData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: popularData } = useFetch("/movie/popular");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: upComingData } = useFetch("/movie/upcoming");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: todayArrivingTvShowData } = useFetch("/tv/airing_today");
  const { data: weekendTvShowData } = useFetch("/tv/on_the_air");

  // console.log(nowPlayingData);
  return (
    <div>
      <BannerHome />
      <HorizentalScrollCard
        data={trendingMovieData}
        heading={"Trending Shows"}
        trending={true}
      />
      <HorizentalScrollCard data={nowPlayingData} heading={"Now Playing"} />
      <HorizentalScrollCard
        data={popularData}
        heading={"Popular"}
        media_type={"movie"}
      />
      <HorizentalScrollCard
        data={topRatedData}
        heading={"Top Rated Movies"}
        media_type={"movie"}
      />
      <HorizentalScrollCard
        data={upComingData}
        heading={"Up Coming"}
        media_type={"movie"}
      />
      <HorizentalScrollCard
        data={popularTvShowData}
        heading={"Popular Tv Shows"}
        media_type={"tv"}
      />
      <HorizentalScrollCard
        data={todayArrivingTvShowData}
        heading={"Today Arriving"}
        media_type={"tv"}
      />
      <HorizentalScrollCard
        data={weekendTvShowData}
        heading={"On The Air"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
