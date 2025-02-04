"use client"

import { useWatchContext } from "@/context/Watch";
import EpInfo from "./EpInfo";
import Option from "./Option"
import Server from "./Server";
import { findMovieFromCollection } from "@/firebase/movies";
import { useEffect, useState } from "react";
import { useUserInfoContext } from "@/context/UserInfoContext";

const MainVideo = () => {
  const { MovieInfo, watchInfo, episode } = useWatchContext();
  const { userInfo } = useUserInfoContext()
  const [isMovieExists, setIsMovieExists] = useState({})

  useEffect(() => {
    const getdata = async () => {
      const uid = userInfo?.uid
      const isExists = await findMovieFromCollection(uid, MovieInfo?.id)

      // console.log(isExists)
      setIsMovieExists(isExists)
    }

    getdata()
  }, [userInfo])


  return (
    <div className="w-full bg-[#22212c] rounded-md p-2 !pb-0 flex flex-col">

      <iframe
        src={watchInfo?.url}
        className="aspect-video"
        allowFullScreen
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={MovieInfo?.title || MovieInfo?.name || MovieInfo?.original_name || MovieInfo?.original_title}
      />

      <Option isMovieExists={isMovieExists} />

      <div className="h-full min-h-[124px] bg-[#484460] text-slate-100 flex rounded-md overflow-hidden mt-4 shadow-[3px_13px_29px_0px_#48455fbd] max-[880px]:flex-col">
        <EpInfo episode={episode} />
        <Server />
      </div>

    </div>
  )
}

export default MainVideo