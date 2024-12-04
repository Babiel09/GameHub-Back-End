import { PrismaClient, Tags, Users } from "@prisma/client";

const prisma = new PrismaClient();
export class Insert{
    async execute(name:string,description:string, type:Tags, createdById:string){
        try{
            const inserir = await prisma.games.create({
                data:{
                    name:name,
                    description:description,
                    type:type,
                    createdBy:{
                        connect: {id:createdById}
                    }
                }
            });
            if(!inserir){
                return console.log("Unxpected error happen when we try to insert the itens into the DB");
            };
            return inserir;
        } catch(err){
            return console.log(`We can't insert the itens in the DB because: ${err}`);
        };
    };
} ;

export class BuscaNome{
    async execute(name:string){
        try{
            const findedBYName = await prisma.games.findFirst({
                where:{
                    name:name
                }
            });
            if(!findedBYName) {
                return console.log("Mano, deu muita merda interna aqui, chama um médico!");
            };
            return findedBYName
        }catch(err){
            return console.log(`We can't show all the itens in the DB because: ${err}`);
        };
    };
};

export class BuscaTag{
    async execute(type:Tags){
        try{
            const findedBYTag = await prisma.games.findMany({
                where:{
                    type:type
                }
            });
            if(!findedBYTag) {
                return console.log("Mano, deu muita merda interna aqui, chama um médico!");
            };
            return findedBYTag;
        }catch(err){
            return console.log(`We can't show all the itens in the DB because: ${err}`);
        };
    };
};

export class ShowAll{
    async execute(){
        try{
            const all = await prisma.games.findMany();
            if(!all){
                return console.log("Unxpected error happen when we try to show all the itens into the DB");
            }; 
            return all;
        }catch(err){
            return console.log(`We can't show all the itens in the DB because: ${err}`);
        };
    };
};

export class ShowOne{
    async execute(id:string){
        try{
            const one = await prisma.games.findFirst({
                where:{
                    id:id
                }
            });
            if(!one){
                return console.log("Unxpected error happen when we try to show one of the itens into the DB");
            };
            return one;
        }catch(err){
            return console.log(`We can't show all the itens in the DB because: ${err}`);
        };
    };
};

export class Delete{
    async execute(id:string){
        try{
            const deleteGame = await prisma.games.delete({
                where:{
                    id:id
                }
            });
            if(!deleteGame){
                return console.log("Unxpected error happen when we try to delete one of the itens into the DB");
            };
            return deleteGame;
        }catch(err){
            return console.log(`We can't delete one of the itens in the DB because: ${err}`);
        };
    };
};

export class Update{
    async execute(id:string,name:string,description:string, type:Tags, createdById:string){
        try{
            const atualiza = await prisma.games.update({
                where:{
                    id:id
                },
                data:{
                    name,
                    description,
                    type,
                    createdBy:{
                        connect:{id:createdById}
                    }
                }
            });
            if(!atualiza){
                return console.log("Unxpected error happen when we try to update one of the itens into the DB");
            };

            return atualiza

        } catch(err){
            return console.log(`We can't delete one of the itens in the DB because: ${err}`);
        };
    };
};