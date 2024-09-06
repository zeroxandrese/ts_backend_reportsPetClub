import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConection2 } from "./config/dbcontection";
import { router } from "./routes";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
dbConection2().then(()=>console.log('BD2 Conectada al Server Reporteria😎'));
app.listen(PORT,()=> console.log(`Conectados desde el puerto ${PORT}`))
