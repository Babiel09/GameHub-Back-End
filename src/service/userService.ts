import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface Post{
    name: string 
    email: string 
    pass: string 
    gender: Gender
}
export class Insert{
    async execute({name, email, pass, gender}:Post){
        try{
            const insert = await prisma.users.create({
                data:{
                    name,
                    email,
                    pass,
                    gender,
                }
            });
            if(!insert){
                throw new Error("We can't insert the values into the DB");
            };

            return insert;
        }catch(err){
            throw new Error(`Error to insert values into the DB. Error: ${err}`);
        };
    };
};

export class ShowAll{
    async execute(){
        try{
            const findedUser = await prisma.users.findMany();
            if(!findedUser){
                throw new Error("We can't find the values into the DB");
            };
            return findedUser;
        }catch(err){
            throw new Error(`Error to show all values into the DB. Error: ${err}`);
        };
    };
};

export class ShowOne{
    async execute(id:string){
        try{
            const findedUser = await prisma.users.findFirst({
                where:{
                    id:id
                }
            });
            if(!findedUser){
                throw new Error("We can't find the values into the DB");
            };
            return findedUser;
        }catch(err){
            throw new Error(`Error to show one value into the DB. Error: ${err}`);
        };
    };
};

export class Delete{
    async execute(id:string){
        try{
            const findedUser = await prisma.users.findFirst({
                where:{
                    id:id
                }
            });

            if(!findedUser){
                throw new Error("We can't find the values into the DB");
            };

            const deleteUser = await prisma.users.delete({
                where:{
                    id:findedUser.id
                }
            });
            return  deleteUser;

        }catch(err){
            throw new Error(`Error to show one value into the DB. Error: ${err}`);
        };
    };
};

export class Update{
    async execute(name:string, email:string, pass:string, gender:Gender, id:string){
        try{
            const findedUser = await prisma.users.findFirst({
                where:{
                    id:id
                }
            });

            if(!findedUser){
                throw new Error("We can't find the values into the DB");
            };

            const update = await prisma.users.update({
                where:{
                    id:findedUser.id
                },
                data:{
                    name,
                    email,
                    pass,
                    gender
                }

            });
            return  update;

        }catch(err){
            throw new Error(`Error to show one value into the DB. Error: ${err}`);
        };
    };
};