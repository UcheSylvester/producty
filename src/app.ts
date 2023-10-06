import express from "express";

const app = express();

app.listen('5050', () => {
  console.log({ message: 'Server is running on port 5000'})
})