import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import {GamesController} from "../controller/gamesController";

export const gamesRoutes = (fastify:FastifyInstance, options:FastifyPluginOptions) => {
    fastify.get("/",GamesController.get);
    fastify.get("/queryName",GamesController.searchByName);
    fastify.get("/queryTag",GamesController.searchByTag);
    fastify.get("/:id",GamesController.getById);
    fastify.post("/",GamesController.post);
    fastify.put("/:id",GamesController.put);
    fastify.delete("/:id",GamesController.delete);
};