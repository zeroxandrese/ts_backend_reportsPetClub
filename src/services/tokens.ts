import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from 'mongodb';

const prisma = new PrismaClient();
const origin = new MongoClient(process.env.MONGODB_CNN!);

let loadingGetMatriz = false;

// Database Name
const dbName = 'petclubdb';

const tokensService = async () => {

    try {
        if (!loadingGetMatriz) {
            loadingGetMatriz = true;
            await origin.connect();
            const db = origin.db(dbName);
            const collection = db.collection('tokenNotificationsRemote');
            const responseOrigin = await collection.find({}).toArray();
            const dataToInsert = responseOrigin.map(token => ({
                idTBOrigin: token._id.toString(),
                token: token.token,
                created: token.created
            }))

            await prisma.tokens.deleteMany();
            await prisma.tokens.createMany({
                data: dataToInsert
            });

            loadingGetMatriz = false;

            return dataToInsert;
        }

    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");

    } finally {
        await origin.close();
    }
};

export { tokensService }