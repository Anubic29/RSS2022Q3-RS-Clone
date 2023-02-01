const express = require('express');
const mongoose = require('mongoose');

const users = require('./api/users');

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use("/api/users", users);

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