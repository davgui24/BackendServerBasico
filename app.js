//1. Requieres
const express = require('express');
const mongoose = require('mongoose');


//2. Inicializar variables
const app = express();


//4. Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});



//5. conexxion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'ONLINE');
});



//3. Escucuchar peticiones
// : \x1b[32m % s\x1b[0m  --> para que la palabra "online" se coloque en verde
app.listen(3000, () => {
    console.log('Express server, puerto 3000: \x1b[32m%s\x1b[0m', ' online');
});