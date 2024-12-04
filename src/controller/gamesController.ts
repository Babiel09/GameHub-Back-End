import { FastifyRequest, FastifyReply } from "fastify";
import { Insert, Delete, ShowAll, ShowOne, Update, BuscaNome, BuscaTag } from "../service/gamesService";
import { Tags } from "@prisma/client";

export interface GeralProps {
    req:FastifyRequest;
    reply:FastifyReply;
}

export abstract class GamesController{
    static async get(req:FastifyRequest,  reply:FastifyReply){
        const mostrar = new ShowAll();
        try{
            const findedGame = await mostrar.execute();
            
            if(!findedGame){
                return reply.status(500).send({server:"We can't get the elements in the DB!"});
            };

            reply.status(200).send(findedGame);

        } catch(err){
            return console.log(`We can't do the GET method!, because: ${err}`);
        };
    };

    static async post(req:FastifyRequest,  reply:FastifyReply){
        const inserir = new Insert();
        try{
            const {name, description, type, createdById} = req.body as {name:string,description:string, type:Tags, createdById:string};
            
            if(!name){
                return reply.status(400).send({server:"You need to pass the name!"})
            };
            if(!description){
                return reply.status(400).send({server:"You need to pass the description!"})
            };
            if(!type){
                return reply.status(400).send({server:"You need to pass the type!"})
            };
            if(!createdById){
                return reply.status(400).send({server:"You need to pass the createdById!"})
            };

            const postedGame = await inserir.execute(name,description, type, createdById);
            
            if(!postedGame){
                return reply.status(500).send({server:"Internal server during the POST method!"});
            };
            
            reply.status(201).send(postedGame);
        }catch(err){
            return console.log(`We can't do the POST method!, because: ${err}`);
        };
    };
    static async getById(req:FastifyRequest,  reply:FastifyReply){
        const buscaUm = new ShowOne();
        try{
            const {id} = req.params as {id:string};
            if(!id){
                return console.log("You need to pass the id!");
            };
            const findedById = await buscaUm.execute(id);

            if(!findedById){
                return reply.status(500).send({server:"Fudeu legal!"})
            }; 

            reply.status(200).send(findedById);

        } catch(err){
            return console.log(`We can't do the POST method!, because: ${err}`);
        };
    };

    static async delete(req:FastifyRequest,  reply:FastifyReply){
        const deletar = new Delete();
        try{
            const {id} = req.params as {id:string};

            if(!id){
                return console.log("You need to pass the id!");
            };

            await deletar.execute(id);

            reply.status(204).send({server:"The content is sucefullt deleted!"})

        }catch(err){
            return console.log(`We can't do the DELETE method!, because: ${err}`);
        };
    };

    static async searchByName(req:FastifyRequest,  reply:FastifyReply) {
        const buscadorPelonome = new BuscaNome();
        try{
            const {name} = req.query as {name:string};
            if(!name){
                return  reply.status(400).send({server:"You need to pass the name!"});
            };
            const gameName = await buscadorPelonome.execute(name);
            if(!gameName){
                return  reply.status(500).send({server:"Mano fudeu de verdade, fudeu muito!"});
            };
            reply.status(200).send(gameName);
        }catch(err){
            return console.log(`We can't do the SEARCH in the games!, because: ${err}`);
        };
    };
    static async searchByTag(req:FastifyRequest,  reply:FastifyReply) {
        const buscadorPelaTag = new BuscaTag(); 
        try{
            const {type} = req.query as {type:Tags};
            if(!type){
                return  reply.status(400).send({server:"You need to pass the type!"});
            };
            const gameTag = await buscadorPelaTag.execute(type);
            if(!gameTag){
                return  reply.status(500).send({server:"Mano fudeu de verdade, fudeu muito!"});
            };
            reply.status(200).send(gameTag);
        }catch(err){
            return console.log(`We can't do the SEARCH in the games!, because: ${err}`);
        };
    };

    static async put(req:FastifyRequest,  reply:FastifyReply) {
        const atualizar = new Update();
        try{
            const {id} = req.params as {id:string};

            if(!id){
                return reply.status(400).send({server:"You need to pass the id!"})
            }

            const {name, description, type, createdById} = req.body as {name:string,description:string, type:Tags, createdById:string};
            
            if(!createdById){
                return reply.status(400).send({server:"You need to pass the createdById!"})
            };

            const gameAtualizado = await atualizar.execute(id,name,description,type,createdById);

            if(!gameAtualizado){
                return reply.status(500).send({server:"Fudeu legal amigo!"})
            };

            reply.status(202).send(gameAtualizado)


        } catch(err){
            return console.log(`We can't do the PUT method!, because: ${err}`);
        };
    };
};