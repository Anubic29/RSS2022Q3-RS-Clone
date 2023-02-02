const express = require('express');
const mongoose = require('mongoose');

const users = require('./api/users');
const projects = require('./api/projects');

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/users", users);
app.use("/api/projects", projects);

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb+srv://Lord:v9iYulws1fmGmQ1j@cluster0.y2fi5cq.mongodb.net/rs-clone');

    app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
  } catch (err) {
    console.log(err);
  }
}

start();