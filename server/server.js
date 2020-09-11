const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
const videoRoute = require("./routes/api/videos");
app.use("/", videoRoute);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
