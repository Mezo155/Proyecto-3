require("dotenv").config();

const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const createError = require('http-errors');

require("./config/db.config");

const app = express();

// Configurar CORS
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

// Middleware para logs, parseo de JSON y URL-encoded data
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas
const router = require("./router/router");
app.use("/", router);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err); // Imprimir el error para depuración

    // Verificar y establecer un código de estado válido
    if (!err.status) {
        err.status = 500;
    }

    res.status(err.status).json({
        message: err.message,
        status: err.status
    });
});

// Configuración del puerto
const port = process.env.PORT || 3000; // Asegúrate de que la variable de entorno se llama PORT

app.listen(port, () => console.log(`App running at port ${port} 🚀🚀`));
