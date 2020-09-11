import React, { Component } from "react";
import Header from "./components/header";
import Comments from "./components/comments";
import Conversation from "./components/conversation";
import Video from "./components/video";
import VideoInfo from "./components/videoInfo";
import VideoList from "./components/videoList";
import VideoControls from "./components/videoControls";
import Upload from "./components/upload";
import axios from "axios";
import "./styles/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    videoList: [],
    mainVideo: {},
    commentCount: 0,
    comments: [],
    mainVideoId: "1af0jruup5gu",
  };

  componentDidMount() {
    this.getVideoList();
    this.getMainVideo();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.mainVideoId !== this.state.mainVideoId) {
      this.getMainVideo();
    }
  }

  getVideoList = () => {
    axios
      .get("https://frozen-fjord-12948.herokuapp.com/videos")
      .then((response) => {
        this.setState({ videoList: response.data });
      });
  };

  getMainVideo = () => {
    axios
      .get(
        `https://frozen-fjord-12948.herokuapp.com/videos/${this.state.mainVideoId}`
      )
      .then((response) => {
        const mainVideo = response.data[0];
        this.setState({ mainVideo });
        this.setState({ comments: mainVideo.comments });
        this.setState({ commentCount: mainVideo.comments.length });
      });
  };

  likesHandler = () => {
    axios
      .put(
        `https://frozen-fjord-12948.herokuapp.com/videos/${this.state.mainVideoId}/likes`
      )
      .then((response) => {
        this.getMainVideo();
      });
  };

  viewsHandler = () => {
    axios
      .put(
        `https://frozen-fjord-12948.herokuapp.com/videos/${this.state.mainVideoId}/views`
      )
      .then((response) => {
        this.getMainVideo();
      });
  };

  setMainVideoId = (videoId) => {
    this.setState({ mainVideoId: videoId }, this.getMainVideo());
    this.getVideoList();
    this.viewsHandler();
  };

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            path="/upload"
            render={() => {
              return (
                <main>
                  <Upload
                    getMainVideo={this.getMainVideo}
                    getVideoList={this.getVideoList}
                  />
                </main>
              );
            }}
          />
          <Route
            path="/:id"
            render={() => {
              return (
                <main>
                  <div className="mainVideo-container">
                    <Video mainVideo={this.state.mainVideo} />
                    <VideoControls mainVideo={this.state.mainVideo} />
                  </div>
                  <div className="desktop-view">
                    <div className="desktop-view__left">
                      <VideoInfo
                        mainVideo={this.state.mainVideo}
                        likesHandler={this.likesHandler}
                      />
                      <Conversation
                        getMainVideo={this.getMainVideo}
                        mainVideoId={this.state.mainVideoId}
                        commentCount={this.state.commentCount}
                      />
                      <Comments
                        getMainVideo={this.getMainVideo}
                        comments={this.state.comments}
                        mainVideoId={this.state.mainVideoId}
                        deleteHandler={this.getMainVideo}
                      />
                    </div>
                    <div className="desktop-view__right">
                      <VideoList
                        setMainVideoId={this.setMainVideoId}
                        videoList={this.state.videoList}
                        mainVideoId={this.state.mainVideoId}
                      />
                    </div>
                  </div>
                </main>
              );
            }}
          />
          <Route
            path="/"
            exact
            render={() => {
              return (
                <main>
                  <div className="mainVideo-container">
                    <Video mainVideo={this.state.mainVideo} />
                    <VideoControls mainVideo={this.state.mainVideo} />
                  </div>
                  <div className="desktop-view">
                    <div className="desktop-view__left">
                      <VideoInfo
                        mainVideo={this.state.mainVideo}
                        likesHandler={this.likesHandler}
                      />
                      <Conversation
                        getMainVideo={this.getMainVideo}
                        mainVideoId={this.state.mainVideoId}
                        commentCount={this.state.commentCount}
                      />
                      <Comments
                        getMainVideo={this.getMainVideo}
                        comments={this.state.comments}
                        mainVideoId={this.state.mainVideoId}
                        deleteHandler={this.getMainVideo}
                      />
                    </div>
                    <div className="desktop-view__right">
                      <VideoList
                        setMainVideoId={this.setMainVideoId}
                        videoList={this.state.videoList}
                        mainVideoId={this.state.mainVideoId}
                      />
                    </div>
                  </div>
                </main>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
