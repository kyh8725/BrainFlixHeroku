import React from "react";
import uuid from "uuid/v1";
import axios from "axios";
import uploadImage from "../assets/Images/Upload-video-preview.jpg";

export default function upload(props) {
  const uploadHandler = (event) => {
    event.preventDefault();

    if (event.target.name === "cancel") {
      event.target.reset();
    } else {
      const title = event.target.videoTitle.value;
      const description = event.target.videoDesc.value;
      if (title !== "" && description !== "") {
        axios
          .post(`/videos/`, {
            title: title,
            description: description,
            image: uploadImage,
          })
          .then((response) => {
            props.getVideoList();
            props.getMainVideo();
          });
        event.target.reset();
        window.alert("video successfully uploaded");
      } else {
        window.alert("Please provide both title and description of video");
      }
    }
  };

  return (
    <div className="upload">
      <div className="upload__header">
        <h1>Upload Video</h1>
      </div>
      <div className="upload__contents">
        <div className="upload__thumbnail">
          <p className="upload__thumbnail-title">VIDEO THUMBNAIL</p>
          <div className="upload__thumbnail-image">
            <img src={uploadImage} alt="upload" />
          </div>
        </div>
        <div className="upload__video">
          <form id={uuid()} onSubmit={uploadHandler}>
            <p className="upload__video-title">TITLE YOUR VIDEO</p>
            <input
              className="upload__video-title-input"
              name="videoTitle"
              type="/text"
              placeholder="Add a title to your video"
            ></input>
            <p className="upload__video-desc-title">ADD A VIDEO DESCRIPTION</p>
            <textarea
              className="upload__video-desc-input"
              name="videoDesc"
              type="/text"
              placeholder="Add a description of your video"
            ></textarea>
            <div className="upload__buttons">
              <button className="upload__buttons-publish" name="publish">
                PUBLISH
              </button>
              <button className="upload__buttons-cancel" name="cancel">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
