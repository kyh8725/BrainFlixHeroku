import React from "react";
import fullScreen from "../assets/Icons/SVG/Icon-fullscreen.svg";
import volume from "../assets/Icons/SVG/Icon-volume.svg";
import playIcon from "../assets/Icons/SVG/Icon-play.svg";

export default function videoContorls(props) {
  return (
    <>
      <div className="control">
        <div className="control__playPause">
          <button className="control__playPause-button" alt="">
            <img src={playIcon} alt=""></img>
          </button>
        </div>
        <div className="control__progressBar">
          <span className="control__progress"></span>
          <span className="control__time">0:00/{props.mainVideo.duration}</span>
        </div>
        <div className="control__volumeScreen">
          <button className="control__volume">
            <img src={fullScreen} alt="" />
          </button>
          <button className="control__fullScreen">
            <img src={volume} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
