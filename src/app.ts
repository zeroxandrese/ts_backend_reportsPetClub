import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConection2 } from "./config/dbcontection";
import { router } from "./routes";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
  }));
app.use(express.json());
app.use(router);
dbConection2().then(()=>console.log('BD2 Conectada al Server Reporteria😎'));
app.listen(PORT, HOST, ()=> console.log(`Conectados desde el puerto ${PORT}`))
