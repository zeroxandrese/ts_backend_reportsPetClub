import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countCommentsService = async ()=>{
    try {

        const result = await prisma.countComments.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countCommentsService };