import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../Hooks/hooks/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );
  console.log("videoData", videoData);

  return (
    <section className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded  relative">
        <button
          onClick={close}
          className="absolute -top-6 -right-1 text-3xl z-50"
        >
          <IoClose />
        </button>

        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
        />
      </div>
    </section>
  );
};

export default VideoPlay;
