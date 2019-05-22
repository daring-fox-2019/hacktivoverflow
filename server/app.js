require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const tagRoutes = require("./routes/tagRoutes");
const APIRoutes = require("./routes/APIRoutes");
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const axios = require("axios");
const cron = require("node-cron");
const _ = require('underscore')
// cron.start()

io.on("connection", socket => {
  console.log("new connection created..");
});

const getJob = cron.schedule("*/15 * * * * *", async () => {
  try {
    console.log("getjob?");

    let { data } = await axios.get(
      `https://jobs.github.com/positions.json?description=developer`
    );
    data = _.shuffle(data).slice(0, 10);
    io.emit("getJobs", data);
  } catch (error) {
    console.log(error);
  }
});

const news = cron.schedule("*/30 * * * * *", async () => {
  try {
    console.log("getNews?");

    let { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${
        process.env.NEWS_API
      }`
    );
    data = data.articles.slice(0,8)
   
    io.emit("getNews", data);
  } catch (error) {
    console.log(error);
  }
});

news.start()
getJob.start();

const mongoose = require("mongoose");
mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true });
// mongoose.connect(`mongodb+srv://martinsuhendra:${process.env.ATLAS}@hacktiv8-martin-jldez.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/tags", tagRoutes);
app.use("/API", APIRoutes);

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
