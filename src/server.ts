import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { router } from "./routes/router";

dotenv.config();

const app = fastify({logger:true});
const port = 8080;
const jwtSecret = process.env.JWT_SECRET

if(!jwtSecret){
    console.error("JWT_SECRET environment variable is missing!");
    process.exit(1); 
}

const server = async () => {
    app.register(router);
    app.register(fastifyJwt, {
        secret:jwtSecret,
    });
    app.decorate("authenticate", async (req:FastifyRequest, reply:FastifyReply)=>{
        try{
            await req.jwtVerify();
        } catch(err){
            reply.status(401).send({server:"You don't have permission in the JWT secrect!"})
        }
    })
    app.register(cors);
    try{

        const local = await app.listen({port});
         console.log(`Listeng in http://localhost:${local}`);
    } catch(err){
        throw new Error(`Error during the listening part: ${err}`)
    };
};
server();