import React from "react";
export default function video(props) {
  return (
    <div className="video">
      <video className="video__playing" poster={props.mainVideo.image}></video>
    </div>
  );
}
