const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const Usuario = require("../models/usuario");

const app = express();


app.post('/', (req, res) => {

    let body = req.body;

    Usuario.findOne({ correo: body.email }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se encontró el usuario',
                err: err
            });
        }

        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                err: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                err: err
            });
        }


        // crear un token
        usuarioBD.password = ":)"; // quitamos la contraseña para no mandarla en el token
        let token = jwt.sign({ usuario: usuarioBD }, SEED, { expiresIn: 14400 });




        return res.status(200).json({
            ok: true,
            mensaje: 'Credenciales correctas',
            usuarioBD: usuarioBD,
            id: usuarioBD._id,
            token: token
        });
    });


    // return res.status(200).json({
    //     ok: true,
    //     mensaje: 'Estas en login',
    //     body: body
    // });
});



module.exports = app;