import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countVideosService = async ()=>{
    try {

        const result = await prisma.countVideos.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countVideosService };