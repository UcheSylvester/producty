import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const PORT = config.get<string>("port");

const server = express();

server.use(deserializeUser);

server.use(express.json());

server.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
  await connect();

  routes(server);
});
