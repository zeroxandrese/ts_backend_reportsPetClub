import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countImagesService = async ()=>{
    try {

        const result = await prisma.countImages.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countImagesService };