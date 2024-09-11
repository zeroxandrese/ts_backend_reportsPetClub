import "dotenv/config";
import mongoose from "mongoose";

let conectionDB2 = false;

const dbConection2 = async (): Promise<void> =>{
    try {
        if (!conectionDB2) {
            mongoose.set('strictQuery', true);
            await mongoose.connect(process.env.MONGODB_CNN2!);
            conectionDB2 = true
            console.log('Conectado a la DB2 desde Server reporteria hijo😎');
        }
    } catch (error) {
        throw new Error("Error al iniciar la conexion con la DB2 desde Server reporteria");
        
    }

};
export { dbConection2 };
