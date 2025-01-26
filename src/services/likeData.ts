import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const likeDataService = async () => {
    try {
        const dataToSync = await prisma.likeData.findMany({})

        return dataToSync

    } catch (error) {
        throw new Error("Error al sincronizar likes. Consulta al administrador.");

    }
};

export { likeDataService };