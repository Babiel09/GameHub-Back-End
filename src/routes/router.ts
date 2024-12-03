import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { userRoutes } from "./userRouter";
export const router = (fastify:FastifyInstance, optios:FastifyPluginOptions) => {
    fastify.register(userRoutes, {prefix:"/users"});
};