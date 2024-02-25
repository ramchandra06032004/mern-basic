const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const corse = require("cors");
app.use(corse());

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected to mongodb");
    console.log("Port:", process.env.PORT);
    app.listen(process.env.PORT || 7000, (err) => {
      if (err) {
        console.log("error starting server", err);
      } else {
        console.log("server is running");
      }
    });
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

app.use(userRoutes);
