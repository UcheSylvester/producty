import express from "express";
import config from "config";

const PORT = config.get<string>('port')

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})