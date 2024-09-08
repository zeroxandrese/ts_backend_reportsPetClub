import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countUserService = async ()=>{
    try {

        const result = await prisma.countUsers.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countUserService };