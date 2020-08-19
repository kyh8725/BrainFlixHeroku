import React from "react";
import viewIcon from "../assets/Icons/SVG/Icon-views.svg";
import likeIcon from "../assets/Icons/SVG/Icon-likes.svg";
import formatDate from "./utils";

export default function videoInfo(props) {
  return (
    <div className="video__info">
      <h1 className="video__title">{props.mainVideo.title}</h1>
      <div className="video__details">
        <div className="video__channel-timestamp">
          <p className="video__channel">{props.mainVideo.channel}</p>
          <p className="video__timestamp">
            {formatDate(props.mainVideo.timestamp)}
          </p>
        </div>
        <div className="video__views-likes">
          <p className="video__views">
            <img src={viewIcon} alt="view-icon" />
            {props.mainVideo.views}
          </p>
          <p className="video__likes">
            <img onClick={props.likesHandler} src={likeIcon} alt="like-icon" />
            {props.mainVideo.likes}
          </p>
        </div>
      </div>
      <p className="video__description">{props.mainVideo.description}</p>
    </div>
  );
}
