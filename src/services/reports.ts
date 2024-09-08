import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countReportsService = async ()=>{
    try {

        const result = await prisma.countReports.findMany({})

        return result
        
    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { countReportsService };