import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countAlertsService = async ()=>{
    try {

        const result = await prisma.countAlerts.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countAlertsService };