import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const whatsappInteractionDataService = async () => {
    try {
        const dataToSync = await prisma.whatsappInteractionData.findMany({})

        return dataToSync

    } catch (error) {
        throw new Error("Error al sincronizar whatsappInteraction. Consulta al administrador.");

    }
};

export { whatsappInteractionDataService };