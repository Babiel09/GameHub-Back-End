import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { userRoutes } from "./userRouter";
import { gamesRoutes } from "./gamesRoutes";
export const router = (fastify:FastifyInstance, optios:FastifyPluginOptions) => {
    fastify.register(userRoutes, {prefix:"/users"});
    fastify.register(gamesRoutes, {prefix:"/games"});
};