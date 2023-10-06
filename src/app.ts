import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";

const PORT = config.get<string>('port')

const app = express();

app.listen(PORT, async() => {
  logger.info(`Server is running on port ${PORT}`)
  await connect()
})