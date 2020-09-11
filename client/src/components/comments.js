import React from "react";
import { v1 as uuidv1 } from "uuid";
import formatDate from "./utils";
import faceImage from "../assets/Images/face.png";
import axios from "axios";

export default function comments(props) {
  const deleteHandler = (event) => {
    axios
      .delete(
        `https://frozen-fjord-12948.herokuapp.com/comments/${props.mainVideoId}/${event.target.id}`
      )
      .then((response) => {
        props.getMainVideo();
      });
  };

  const commentList = props.comments
    .slice(0)
    .reverse()
    .map((com) => {
      return (
        <div key={uuidv1()} className="comment">
          <div className="comment__left">
            <img src={faceImage} alt="user-face" />
          </div>
          <div className="comment__right">
            <div className="comment__right-top">
              <p className="comment__right-top-name">{com.name}</p>
              <p className="comment__right-top-date">
                {formatDate(com.timestamp)}
              </p>
            </div>
            <div className="comment__paragraph">
              <p className="comment__paragraph-text">{com.comment}</p>
              <button
                onClick={deleteHandler}
                id={com.id}
                className="comment__delete-button"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      );
    });

  return <>{commentList}</>;
}
