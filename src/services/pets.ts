import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countPetsService = async ()=>{
    try {

        const result = await prisma.countPets.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countPetsService };