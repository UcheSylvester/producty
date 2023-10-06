import { Express } from "express";
import { createUserHanlder } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";

const routes = (server: Express) => {
  server.get('/health', (req, res) => res.sendStatus(200))

  server.post('/api/users', validateResource(createUserSchema), createUserHanlder)

  server.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler)
}

export default routes
