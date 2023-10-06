import { Express } from "express";

const routes = (server: Express) => {
  server.get('/health', (req, res) => {
    res.sendStatus(200)
  })
}

export default routes
