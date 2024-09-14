import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from 'mongodb';

const prisma = new PrismaClient();
const origin = new MongoClient(process.env.MONGODB_CNN!);

let loadingGetData = false;

// Database Name
const dbName = 'petclubdb';

const infoService = async () => {
    try {
        if (!loadingGetData) {
            loadingGetData = true;
            await origin.connect();
            const db = origin.db(dbName);

            const collectionUsers = db.collection('users');
            const responseOriginUsers = await collectionUsers.countDocuments();
            const responseOriginUsersActive = await collectionUsers.countDocuments({
                    status: true
            });
            await prisma.countUsers.deleteMany();
            await prisma.countUsers.create({
                data: {
                    count: responseOriginUsers,
                    statusCount: false
                }
            });
            await prisma.countUsers.create({
                data: {
                    count: responseOriginUsersActive,
                    statusCount: true
                }
            });

            const collectionLikes = db.collection('likes');
            const responseOriginLikes = await collectionLikes.countDocuments();
            await prisma.countLikes.deleteMany();
            await prisma.countLikes.create({
                data: {
                    count: responseOriginLikes
                }
            });

            const collectionPets = db.collection('pets');
            const responseOriginPets = await collectionPets.countDocuments();
            const responseOriginPetsActive = await collectionPets.countDocuments({
                    status: true
            });
            await prisma.countPets.deleteMany();
            await prisma.countPets.create({
                data: {
                    count: responseOriginPets,
                    statusCount: false
                }
            });
            await prisma.countPets.create({
                data: {
                    count: responseOriginPetsActive,
                    statusCount: true
                }
            });
            //Seccion observada(Andres Lopez)
            /*const collectionImages = db.collection('countimage');
                         const responseOriginImagesArray = await collectionImages.find({}).toArray();
                        await prisma.countImages.deleteMany();
                        const countWithImg = responseOriginImagesArray.reduce((acc, item) => {
                            return acc + item.images
                        }, 0) */

            const collectionImages = db.collection('images');
            const responseOriginImages = await collectionImages.countDocuments({
                    img: { $regex: "image", $options: "i" }
            });
            const responseOriginImagesActive = await collectionImages.countDocuments({
                    status: true,
                    img: { $regex: "image", $options: "i" }
            });
            await prisma.countImages.deleteMany();
            await prisma.countImages.create({
                data: {
                    count: responseOriginImages,
                    statusCount: false
                }
            });
            await prisma.countImages.create({
                data: {
                    count: responseOriginImagesActive,
                    statusCount: true
                }
            });

            const collectionVideos = db.collection('images');
            const responseOriginVideos = await collectionVideos.countDocuments({
                    img: { $regex: "video", $options: "i" }
            });
            const responseOriginVideosActive = await collectionVideos.countDocuments({
                    status: true,
                    img: { $regex: "video", $options: "i" }
            });
            await prisma.countVideos.deleteMany();
            await prisma.countVideos.create({
                data: {
                    count: responseOriginVideos,
                    statusCount: false
                }
            });
            await prisma.countVideos.create({
                data: {
                    count: responseOriginVideosActive,
                    statusCount: true
                }
            });

            const collectionPoints = db.collection('pawscounts');
            const responseOriginPointsArray = await collectionPoints.find({}).toArray();
            await prisma.countPoints.deleteMany();
            const countPoints = responseOriginPointsArray.reduce((acc, item) => {
                return acc + item.paws
            }, 0)
            await prisma.countPoints.create({
                data: {
                    count: countPoints
                }
            });

            const collectionReports = db.collection('reports');
            const responseOriginReports = await collectionReports.countDocuments();
            await prisma.countReports.deleteMany();
            await prisma.countReports.create({
                data: {
                    count: responseOriginReports
                }
            });

            const collectionAlerts = db.collection('alerts');
            const responseOriginAlerts = await collectionAlerts.countDocuments();
            await prisma.countAlerts.deleteMany();
            await prisma.countAlerts.create({
                data: {
                    count: responseOriginAlerts
                }
            });

            const collectionComments = db.collection('comments');
            const responseOriginComments = await collectionComments.countDocuments();
            await prisma.countComments.deleteMany();
            await prisma.countComments.create({
                data: {
                    count: responseOriginComments
                }
            });

            loadingGetData = false;

            return "DATA_SUCCESSFUL";

            //codigo solo para validacion, afecta el rendimiento mas que las funciones superiores(ANDRES LOPEZ)
            /*             const collectionImages = db.collection('images');
                        const responseOriginImagesArray = await collectionImages.find({}).toArray();
                        await prisma.countImages.deleteMany();
                        const countWithImg = responseOriginImagesArray.filter(i => i.img && i.img.includes('image')).length;
                        await prisma.countVideos.create({
                            data: {
                                count: countWithImg
                            }
                        });
             */
        }

    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");

    } finally {
        await origin.close();
    }
}

export { infoService };