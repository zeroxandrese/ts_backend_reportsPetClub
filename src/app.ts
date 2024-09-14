import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConection2 } from "./config/dbcontection";
import { router } from "./routes";
import path from "path";

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta para servir el archivo HTML específico en la ruta '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(cors({
    origin: 'https://petclub.com.pe',
    methods: ['GET', 'POST']
  }));
app.use(express.json());
app.use(router);
dbConection2().then(()=>console.log('BD2 Conectada al Server Reporteria😎'));
app.listen(PORT, ()=> console.log(`Conectados desde el puerto ${PORT}`))
