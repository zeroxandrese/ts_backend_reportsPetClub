import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countLikesService = async ()=>{
    try {

        const result = await prisma.countLikes.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countLikesService };