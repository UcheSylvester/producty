import { Express } from "express";
import { createUser } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";

const routes = (server: Express) => {
  server.get('/health', (req, res) => res.sendStatus(200))

  server.post('/api/users', validateResource(createUserSchema), createUser)
}

export default routes
