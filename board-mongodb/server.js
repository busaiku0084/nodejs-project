require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const Thread = require('./models/Thread');
const env = process.env;

app.use(express.static("public"));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://" + env.ID + ":" + env.PASS + "@cluster0.gux6rhy.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
  console.log("DB connect!")
}).catch((e) => {
  console.log(e)
});

// GET
app.get("/api/v1/threads", async(req, res) => {
  try {
    const allThreads = await Thread.find({});
    res.status(200).json(allThreads);
  } catch(e) {
    console.log(e);
  }
});

// POST
app.post("/api/v1/thread", async(req, res) => {
  try {
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread);
  } catch(e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("server running!");
});
