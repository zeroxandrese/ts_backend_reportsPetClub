import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mediaDataService = async () => {
    try {
        const dataToSync = await prisma.mediaData.findMany({})

        return dataToSync

    } catch (error) {
        throw new Error("Error al sincronizar user. Consulta al administrador.");

    }
};

export { mediaDataService };