import { FastifyReply, FastifyRequest } from "fastify";
import { Insert, Delete, ShowAll, ShowOne, Update, BuscaNome } from "../service/userService";
import bcrypt from "bcrypt";
import { Gender } from "@prisma/client";
import { GeralProps } from "./gamesController";

export class UserController{
    static async get(req:FastifyRequest,  reply:FastifyReply){
        const mostra = new ShowAll();
        try{
            const user = await mostra.execute();
            if(!user){
                reply.status(500).send({server:"Erro interno do servidor"});
                throw new Error("GET method have failed!");
            };
            reply.status(200).send(user);
        } catch(err){
            return console.log(err);
        };
    };

    static async searchByName(req:FastifyRequest,  reply:FastifyReply){
        const buscado = new BuscaNome();
        try{
            const {name} = req.query as {name:string};

            if(!name){
                return reply.status(400).send({server:"You need to pass the name!"});
            };

            const userName = await buscado.execute(name);
            if(!userName){
                return reply.status(500).send({server:"Namo FUDEU MUITO!"});
            };
            reply.status(200).send(userName);

        }catch(err){
            return console.log(err);
        };
    };

    static async post(req:FastifyRequest,  reply:FastifyReply){
        const inserir = new Insert();
        try{
            const {name, email, pass, gender} = req.body as {name:string, email:string, pass:string, gender:Gender};
            if(!name){
                reply.status(400).send({server:"You missed the name"});
                return
            };
            if(!email){
                reply.status(400).send({server:"You missed the email"});
                return
            };
            if(!pass){
                reply.status(400).send({server:"You missed the pass"});
                return
            };
            if(!gender){
                reply.status(400).send({server:"You missed the gender"});
                return
            };
            
            const securityPass = await bcrypt.hash(pass,10)

            const newuser = await inserir.execute({name, email, pass:securityPass, gender});

            if(!newuser){
                reply.status(500).send({server:"Ow shit, everithing is fucked!"});
                return
            };

            reply.status(201).send(newuser);

        }catch(err){
            return console.log(err);
        };
    }

    static async put(req:FastifyRequest,  reply:FastifyReply){
        const autalizar = new Update();
        try{
            const {id} = req.params as {id:string};
            const {name, email, pass, gender} = req.body as {name:string, email:string, pass:string, gender:Gender};

            if(!id){
                reply.status(400).send({server:"You missed the id"});
                return
            };

            const safePassword = await bcrypt.hash(pass, 10);

            const updatedUser = await autalizar.execute(name,email,safePassword,gender,id);

            reply.status(202).send(updatedUser);


        }catch(err){
            return console.log(err);
        };
    };

    static async getId(req:FastifyRequest,  reply:FastifyReply) {
        const mostraUm = new ShowOne();
        try{
            const {id} = req.params as {id:string};
            if(!id){
                return reply.status(400).send({server:"Put the id in the URL"});
            };

            const user = await mostraUm.execute(id);
            if(!user){
                return reply.status(500).send({server:"Internal Server Error"});
            };
            reply.status(200).send(user);

        } catch(err){
            return console.log(err);
        };
    };

    static async delete(req:FastifyRequest,  reply:FastifyReply) {
        const deleta = new Delete();
        try{
            const {id} = req.params as {id:string};
            if(!id){
                return reply.status(400).send({server:"Put the id in the URL"});
            };
            await deleta.execute(id);
            reply.status(204).send({server:"No content"});
        } catch(err){
            return console.log(err);
        };
    }
};