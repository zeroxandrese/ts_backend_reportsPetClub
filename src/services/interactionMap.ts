import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let load

const mapInteractionDataService = async () => {
    try {
        const dataToSync = await prisma.mapInteractionData.findMany({})

        return dataToSync

    } catch (error) {
        throw new Error("Error al sincronizar interationc map. Consulta al administrador.");

    }
};

export { mapInteractionDataService };