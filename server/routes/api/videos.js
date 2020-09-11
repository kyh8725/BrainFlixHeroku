const express = require("express");
const helper = require("../../helper/helper");
const router = express.Router();
const videoFile = __dirname + "/../../models/mainVideo.json";
const VideoListFile = __dirname + "/../../models/videoList.json";
const videoList = require(VideoListFile);
const videos = require(videoFile);

router.get("/videos", (req, res) => {
  const videoLists = videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.status(200).send(videoLists);
});

router.post("/videos", (req, res) => {
  let newId = helper.getNewId();
  const newVideo = {
    id: newId,
    title: req.body.title,
    channel: "Dainel Kim",
    image: req.body.image,
    description: req.body.description,
    name: "Daniel Kim",
    timestamp: new Date().getTime(),
    views: 0,
    likes: 0,
    duration: "5:00",
    video: "https://project-2-api.herokuapp.com/stream",
    comments: [],
  };
  const newVideoList = {
    id: newId,
    title: req.body.title,
    channel: "Daniel Kim",
    image: req.body.image,
  };

  if (!newVideo.title || !newVideo.description) {
    return res.status(400).json({
      errorMessage: "Please provide video title and description",
    });
  }
  videos.push(newVideo);
  videoList.push(newVideoList);
  helper.writeJSONFile(videoFile, videos);
  helper.writeJSONFile(VideoListFile, videoList);
  res.json(videos);
});

router.get("/videos/:id", (req, res) => {
  const found = videos.some((video) => {
    return video.id === req.params.id;
  });
  if (found) {
    res.json(videos.filter((video) => video.id === req.params.id));
  } else {
    res
      .status(400)
      .json({ errorMessage: `Video with ID: ${req.params.id} not found` });
  }
});

router.put("/videos/:videoId/likes", (req, res) => {
  videos.map((video) => {
    if (video.id === req.params.videoId) {
      if (Number(video.likes) < 1000) {
        video.likes = (Number(video.likes) + 1).toLocaleString();
      } else {
        video.likes = (
          Number(video.likes.replace(/,/g, "")) + 1
        ).toLocaleString();
      }

      helper.writeJSONFile(videoFile, videos);
      res.json(videos);
    }
  });
});

router.put("/videos/:videoId/views", (req, res) => {
  videos.map((video) => {
    if (video.id === req.params.videoId) {
      if (Number(video.views) < 1000) {
        video.views = (Number(video.views) + 1).toLocaleString();
      } else {
        video.views = (
          Number(video.views.replace(/,/g, "")) + 1
        ).toLocaleString();
      }

      helper.writeJSONFile(videoFile, videos);
      res.json(videos);
    }
  });
});

router.post("/comments/:id", (req, res) => {
  const newComment = {
    name: "Daniel Kim",
    comment: req.body.comment,
    id: helper.getNewId(),
    likes: 0,
    timestamp: new Date().getTime(),
  };
  if (!newComment.comment) {
    return res.status(400).json({
      errorMessage: "Please write comments",
    });
  }
  videos.map((video) => {
    if (video.id === req.params.id) {
      video["comments"].push(newComment);
    }
  });
  helper.writeJSONFile(videoFile, videos);
  res.json(videos);
});

router.delete("/comments/:id/:commentId", (req, res) => {
  videos.map((video) => {
    if (req.params.id === video.id) {
      const newComments = video["comments"].filter(
        (comment) => comment.id !== req.params.commentId
      );
      video["comments"] = newComments;
      helper.writeJSONFile(videoFile, videos);
      res.json(videos);
    }
  });
});

module.exports = router;
