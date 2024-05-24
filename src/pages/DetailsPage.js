import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../Hooks/hooks/useFetchDetails";
import useFetch from "../Hooks/hooks/useFetch";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import Divider from "../components/Divider";
import HorizentalScrollCard from "../components/HorizentalScrollCard";

const DetailsPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);
  const { data } = useFetchDetails(`/${params.explore}/${params.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recomendedData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  // console.log("data", data);
  // console.log("cast data", castData);

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");

  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageUrl + data?.backdrop_path}
            alt=""
            className="h-full object-cover w-full"
          />
        </div>
        <div className="absolute h-full w-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      <div className="container px-2 mx-auto py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="lg:-mt-28 lg:mx-0 relative mx-auto w-fit min-w-60">
          <img
            src={imageUrl + data?.poster_path}
            alt=""
            className="h-60 w-60 object-cover rounded"
          />
        </div>

        <div className="">
          <h2 className="text-bold text-2xl lg:text-4xl text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400 ">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}hr {duration[1]}mins
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex text-center items-center gap-3 my-3">
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>
          {/* director and Writer  */}
          <div>
            <p className="text-white">
              <span>Director : </span>
              {castData?.crew[0]?.name}
            </p>
            <Divider />
            <p className="text-white">Writer : {writer}</p>
          </div>

          <Divider />
          <h2 className="font-bold text-lg">Star Cast: </h2>
          <div className="castImage text-center gap-5">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              ?.map((cast, index) => {
                return (
                  <div>
                    <div className="">
                      <img
                        className="w-24 h-24 object-cover rounded-full"
                        src={imageUrl + cast?.profile_path}
                        alt=""
                      />
                    </div>
                    <p className="text-sm text-center text-neutral-400 font-bold">
                      {cast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        <HorizentalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizentalScrollCard
          data={recomendedData}
          heading={"recomendation " + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
