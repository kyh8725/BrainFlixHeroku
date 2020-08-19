import React from "react";
import faceImage from "../assets/Images/face.png";
import axios from "axios";

export default function conversation(props) {
  const commentHandler = event => {
    event.preventDefault();
    const comments = event.target.commentInput.value;
    if (comments !== "") {
      axios
        .post(`/comments/${props.mainVideoId}`, {
          comment: comments
        })
        .then(response => {
          props.getMainVideo();
        });
      event.target.reset();
    } else {
      window.alert("Please type comments");
    }
  };
  return (
    <div className="conv">
      <h1 className="conv__title">{`${props.commentCount} Comments`}</h1>
      <form
        onSubmit={commentHandler}
        id="comments"
        className="conv__join"
        name="comment-form"
      >
        <div className="conv__join-left">
          <img src={faceImage} alt="user-face" />
        </div>
        <div className="conv__join-right">
          <p className="conv__join-right-title">JOIN THE CONVERSATION</p>
          <input
            className="conv__join-right-input"
            name="commentInput"
            placeholder="your comments"
          ></input>
          <button className="conv__join-right-button">COMMENT</button>
        </div>
      </form>
    </div>
  );
}
