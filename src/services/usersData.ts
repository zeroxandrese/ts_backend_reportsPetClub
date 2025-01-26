import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userAppService = async () => {
    try {
        const dataToSync = await prisma.userData.findMany({})

        return dataToSync

    } catch (error) {
        throw new Error("Error al sincronizar user. Consulta al administrador.");

    }
};

export { userAppService };