import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { UserController } from "../controller/userController";
export const userRoutes = (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get("/", UserController.get);
    fastify.get("/:id", UserController.getId);
    fastify.post("/", UserController.post);
    fastify.put("/:id", UserController.put);
    fastify.delete("/:id", UserController.delete);
};