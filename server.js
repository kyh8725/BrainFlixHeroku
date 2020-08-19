const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const videoRoute = require("./routes/api/videos");

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use("/", videoRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
