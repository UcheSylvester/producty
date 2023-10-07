import { Express } from "express";
import { createUserHanlder } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

const routes = (server: Express) => {
  server.get('/health', (req, res) => res.sendStatus(200))

  server.post('/api/users', validateResource(createUserSchema), createUserHanlder)

  server.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler)

  server.get('/api/sessions', requireUser, getUserSessionsHandler)
}

export default routes
