const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8000",
  "https://brainflixheroku.herokuapp.com/",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

const videoRoute = require("./routes/api/videos");
app.use("/", videoRoute);

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  // add other server routes to path array
  app.use(proxy(["/routes/api/videos"], { target: "http://localhost:8000" }));
};

const port = 8000;
app.listen(process.env.PORT || port, () => {
  console.log(`server is running on port ${port}`);
});
