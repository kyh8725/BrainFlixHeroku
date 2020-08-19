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

const $homeKey = "1af0jruup5gu";

class App extends Component {
  state = {
    videoList: [],
    mainVideo: {},
    commentCount: 0,
    comments: [],
    mainVideoId: $homeKey,
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
    axios.get("/videos/").then((response) => {
      this.setState({ videoList: response.data });
    });
  };

  getMainVideo = () => {
    axios.get(`/videos/${this.state.mainVideoId}`).then((response) => {
      const mainVideo = response.data[0];
      this.setState({ mainVideo });
      this.setState({ comments: mainVideo.comments });
      this.setState({ commentCount: mainVideo.comments.length });
    });
  };

  likesHandler = () => {
    axios.put(`/videos/${this.state.mainVideoId}/likes`).then((response) => {
      this.getMainVideo();
    });
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
            render={(props) => {
              if (props.match.params.id !== this.state.mainVideoId) {
                this.setState({ mainVideoId: props.match.params.id });
              }
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
              if ($homeKey !== this.state.mainVideoId) {
                this.setState({ mainVideoId: $homeKey });
              }
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
