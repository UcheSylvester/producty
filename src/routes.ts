import { Express } from "express";
import { createUserHanlder } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import { createProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/prduct.controller";

const routes = (server: Express) => {
  server.get('/health', (req, res) => res.sendStatus(200))

  server.post('/api/users', validateResource(createUserSchema), createUserHanlder)

  server.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler)

  server.get('/api/sessions', requireUser, getUserSessionsHandler)

  server.delete('/api/sessions', requireUser, deleteSessionHandler)

  server.post('/api/products', validateResource(createProductSchema), createProductHandler)

  server.put('/api/products/:id', validateResource(createProductSchema), updateProductHandler)

  server.get('/api/products/:id', getProductHandler)

  server.delete('/api/products/:id', deleteProductHandler)
}

export default routes
