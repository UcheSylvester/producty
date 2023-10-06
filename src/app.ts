import express from "express";
import config from "config";
import connect from "./utils/connect";

const PORT = config.get<string>('port')

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connect()
})