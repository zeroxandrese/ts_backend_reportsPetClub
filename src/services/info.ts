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

            //Actualizacion, borrado e insercion de la tabla multimedia
            const collectionMultimedia = db.collection('images');
            const responseOriginMultimedia = await collectionMultimedia.find({}).toArray();

            for (const media of responseOriginMultimedia) {
                await prisma.mediaData.upsert({
                    where: { idTBImageOrigin: media._id.toString() },
                    create: {
                        idTBImageOrigin: media._id.toString(),
                        uidUser: media.user,
                        img: media.img,
                        charged: media.charged,
                        actionPlan: media.actionPlan,
                        status: media.status,
                        updated: new Date()
                    },
                    update: {
                        img: media.img,
                        status: media.status,
                        updated: new Date()
                    },
                });
            };

            const responseOriginImages = await collectionMultimedia.countDocuments({
                img: { $regex: "image", $options: "i" }
            });
            const responseOriginImagesActive = await collectionMultimedia.countDocuments({
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

            const responseOriginVideos = await collectionMultimedia.countDocuments({
                img: { $regex: "video", $options: "i" }
            });
            const responseOriginVideosActive = await collectionMultimedia.countDocuments({
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

            //Actualizacion, borrado e insercion de la tabla users
            const collectionUsers = db.collection('users');
            const responseOriginUsers = await collectionUsers.find({}).toArray();

            for (const user of responseOriginUsers) {
                await prisma.userData.upsert({
                    where: { idTBUserOrigin: user._id.toString() },
                    create: {
                        idTBUserOrigin: user._id.toString(),
                        nombre: user.nombre,
                        sexo: user.sexo,
                        email: user.email,
                        latitude: user.latitude,
                        longitude: user.longitude,
                        edad: user.edad,
                        role: user.role,
                        status: user.status,
                        google: user.google,
                        created: user.created,
                        googleUserId: user.googleUserId,
                        updated: new Date(),
                    },
                    update: {
                        nombre: user.nombre,
                        sexo: user.sexo,
                        email: user.email,
                        latitude: user.latitude,
                        longitude: user.longitude,
                        edad: user.edad,
                        role: user.role,
                        status: user.status,
                        google: user.google,
                        updated: new Date(),
                    },
                });
            };

            const responseOriginUsersCount = await collectionUsers.countDocuments();
            const responseOriginUsersActive = await collectionUsers.countDocuments({
                status: true
            });
            await prisma.countUsers.deleteMany();
            await prisma.countUsers.create({
                data: {
                    count: responseOriginUsersCount,
                    statusCount: false
                }
            });
            await prisma.countUsers.create({
                data: {
                    count: responseOriginUsersActive,
                    statusCount: true
                }
            });

            //Actualizacion, borrado e insercion de la tabla likes
            const collectionLikes = db.collection('likes');
            const responseOriginLikes = await collectionLikes.find({}).toArray();

            for (const like of responseOriginLikes) {
                await prisma.likeData.upsert({
                    where: { idTBLikeOrigin: like._id.toString() },
                    create: {
                        idTBLikeOrigin: like._id.toString(),
                        uidUser: like.user,
                        uidImg: like.uidImg,
                        like: like.like,
                        charged: like.charged,
                        status: like.status,
                        updated: new Date()
                    },
                    update: {
                        like: like.like,
                        status: like.status,
                        updated: new Date()
                    },
                });
            };

            const responseOriginLikesCount = await collectionLikes.countDocuments();
            await prisma.countLikes.deleteMany();
            await prisma.countLikes.create({
                data: {
                    count: responseOriginLikesCount
                }
            });

            //Actualizacion, borrado e insercion de la tabla PETS
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

            //Actualizacion, borrado e insercion de la tabla PAWSCOUNT
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

            for (const paws of responseOriginPointsArray) {
                await prisma.pawsCount.upsert({
                    where: { idTBPwsCountOrigin: paws._id.toString() },
                    create: {
                        idTBPwsCountOrigin: paws._id.toString(),
                        uidUser: paws.user,
                        paws: paws.paws,
                        lastUpdated: paws.lastUpdate,
                        status: paws.status,
                        updated: new Date()
                    },
                    update: {
                        paws: paws.paws,
                        status: paws.status,
                        lastUpdated: paws.lastUpdate,
                        updated: new Date()
                    },
                });
            };

            //Actualizacion, borrado e insercion de la tabla REPORTS
            const collectionReports = db.collection('reports');
            const responseOriginReports = await collectionReports.countDocuments();
            await prisma.countReports.deleteMany();
            await prisma.countReports.create({
                data: {
                    count: responseOriginReports
                }
            });

            //Actualizacion, borrado e insercion de la tabla ALERTS
            const collectionAlerts = db.collection('alerts');
            const responseOriginAlerts = await collectionAlerts.countDocuments();
            await prisma.countAlerts.deleteMany();
            await prisma.countAlerts.create({
                data: {
                    count: responseOriginAlerts
                }
            });

            //Actualizacion, borrado e insercion de la tabla COMMENTS
            const collectionComments = db.collection('comments');
            const responseOriginComments = await collectionComments.countDocuments();
            await prisma.countComments.deleteMany();
            await prisma.countComments.create({
                data: {
                    count: responseOriginComments
                }
            });

            //Actualizacion, borrado e insercion de la tabla INTERACTIONS WHATSAPP
            const collectionWhatsappInteraction = db.collection('whatsAppRedirectsCenterVet');
            const collectionWhatsappInteraction2 = db.collection('whatsAppRedirectsRefugios');
            const collectionWhatsappInteraction3 = db.collection('whatsAppRedirectsEvent');
            const collectionWhatsappInteraction4 = db.collection('whatsAppRedirectsPetshops');
            const responseOriginWhatsappInteraction = await collectionWhatsappInteraction.find({}).toArray();
            const responseOriginWhatsappInteraction2 = await collectionWhatsappInteraction2.find({}).toArray();
            const responseOriginWhatsappInteraction3 = await collectionWhatsappInteraction3.find({}).toArray();
            const responseOriginWhatsappInteraction4 = await collectionWhatsappInteraction4.find({}).toArray();

            const combinedResponsesWhatsapp = [
                ...responseOriginWhatsappInteraction.map(item => ({
                    idTBWhatsappInteractioOrigin: item._id.toString(),
                    BusinessId: item.centerVetId, // Para `centerVet`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
                ...responseOriginWhatsappInteraction2.map(item => ({
                    idTBWhatsappInteractioOrigin: item._id.toString(),
                    BusinessId: item.refugioId, // Para `refugios`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
                ...responseOriginWhatsappInteraction3.map(item => ({
                    idTBWhatsappInteractioOrigin: item._id.toString(),
                    BusinessId: item.eventId, // Para `event`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
                ...responseOriginWhatsappInteraction4.map(item => ({
                    idTBWhatsappInteractioOrigin: item._id.toString(),
                    BusinessId: item.petshopId, // Para `petshop`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
            ];

            for (const item of combinedResponsesWhatsapp) {
                await prisma.whatsappInteractionData.upsert({
                    where: { idTBWhatsappInteractioOrigin: item.idTBWhatsappInteractioOrigin },
                    create: {
                        idTBWhatsappInteractioOrigin: item.idTBWhatsappInteractioOrigin,
                        BusinessId: item.BusinessId,
                        uidUser: item.uidUser,
                        interaction: item.interaction,
                        charged: item.charged,
                        status: item.status,
                        updated: new Date(),
                    },
                    update: {
                        interaction: item.interaction,
                        status: item.status,
                        updated: new Date(),
                    },
                });
            };

            //Actualizacion, borrado e insercion de la tabla INTERACTION CARDS OPENING
            const collectionMapInteraction = db.collection('cardOpeningsCenterVet');
            const collectionMapInteraction2 = db.collection('cardOpeningsRefugios');
            const collectionMapInteraction3 = db.collection('cardOpeningsEvent');
            const collectionMapInteraction4 = db.collection('cardOpeningsPetshops');
            const responseOriginMapInteraction = await collectionMapInteraction.find({}).toArray();
            const responseOriginMapInteraction2 = await collectionMapInteraction2.find({}).toArray();
            const responseOriginMapInteraction3 = await collectionMapInteraction3.find({}).toArray();
            const responseOriginMapInteractionn4 = await collectionMapInteraction4.find({}).toArray();

            const combinedResponsesMap = [
                ...responseOriginMapInteraction.map(item => ({
                    idTBMapInteractionOrigin: item._id.toString(),
                    BusinessId: item.centerVetId, // Para `centerVet`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
                ...responseOriginMapInteraction2.map(item => ({
                    idTBMapInteractionOrigin: item._id.toString(),
                    BusinessId: item.refugioId, // Para `refugios`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
                ...responseOriginMapInteraction3.map(item => ({
                    idTBMapInteractionOrigin: item._id.toString(),
                    BusinessId: item.eventId, // Para `event`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
                ...responseOriginMapInteractionn4.map(item => ({
                    idTBMapInteractionOrigin: item._id.toString(),
                    BusinessId: item.petshopId, // Para `petshop`
                    uidUser: item.user,
                    interaction: item.interaction ?? 0,
                    charged: item.charged,
                    status: item.status,
                })),
            ];

            for (const item of combinedResponsesMap) {
                await prisma.mapInteractionData.upsert({
                    where: { idTBMapInteractionOrigin: item.idTBMapInteractionOrigin },
                    create: {
                        idTBMapInteractionOrigin: item.idTBMapInteractionOrigin,
                        BusinessId: item.BusinessId,
                        uidUser: item.uidUser,
                        interaction: item.interaction,
                        charged: item.charged,
                        status: item.status,
                        updated: new Date(),
                    },
                    update: {
                        interaction: item.interaction,
                        status: item.status,
                        updated: new Date(),
                    },
                });
            };

           //Actualizacion, borrado e insercion de la tabla USERS CONNECTS
            const collectionUserConnection = db.collection('userconnects');
            const responseOriginConnection = await collectionUserConnection.find({}).toArray();

            for (const item of responseOriginConnection) {
                await prisma.usersConnectionData.upsert({
                    where: { idTBUsersConnectionOrigin: item._id.toString() },
                    create: {
                        idTBUsersConnectionOrigin: item._id.toString(),
                        uidUser: item.user,
                        created: item.created,
                        statusConnect: item.statusConnect,
                        updated: new Date()
                    },
                    update: {
                        created: item.created,
                        statusConnect: item.statusConnect,
                        updated: new Date()
                    },
                });
            };

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
        loadingGetData = false;
        await origin.close();
    }
}

export { infoService };