import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let load

const usersConnectionService = async () => {
    try {
        const dataToSync = await prisma.usersConnectionData.findMany({})

        return dataToSync

    } catch (error) {
        throw new Error("Error al sincronizar user connection. Consulta al administrador.");

    }
};

export { usersConnectionService };