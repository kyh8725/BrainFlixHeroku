import React from "react";
import { Link } from "react-router-dom";

export default function videoList(props) {
  const videoList = props.videoList.map(video => {
    if (video.id !== props.mainVideoId) {
      return (
        <div key={video.id} className="video-list__single">
          <Link
            to={`/${video.id}`}
            key={video.id}
            className="video-list__single-img"
          >
            <img src={video.image} alt={video.title} />
          </Link>
          <div className="video-list__single-info">
            <p className="video-list__single-info-title">{video.title}</p>
            <p className="video-list__single-info-channel">{video.channel}</p>
          </div>
        </div>
      );
    }
    return true;
  });

  return (
    <div className="video-list">
      <h1 className="video-list__heading">NEXT VIDEO</h1>
      {videoList}
    </div>
  );
}
