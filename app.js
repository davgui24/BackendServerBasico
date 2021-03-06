//1. Requieres
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//6. importar rutas
const appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');




//2. Inicializar variables
const app = express();




//8 Boby Parser  Resibe los parametros del body y los convierte en un Json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())




//4. Rutas  --> esta el archivo de rutas
// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         ok: true,
//         mensaje: 'Peticion realizada correctamente'
//     });
// });


//7. Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//5. conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'ONLINE');
});



//3. Escucuchar peticiones
// : \x1b[32m % s\x1b[0m  --> para que la palabra "online" se coloque en verde
app.listen(3000, () => {
    console.log('Express server, puerto 3000: \x1b[32m%s\x1b[0m', ' online');
});