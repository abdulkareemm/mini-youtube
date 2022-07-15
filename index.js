import express from "express";
import mongoose from "mongoose";
import dontenv from "dotenv";
const app = express();
dontenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connect to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
app.use(express.json());

app.use((err, req, res, next) => {
  const status = err.status || 404;
  const msg = err.msg || "Something went wrong";
  return res.status(status).json({ msg: msg, succes: false });
});

app.listen(8080, () => {
  connect();
  console.log("on port 8080");
});
