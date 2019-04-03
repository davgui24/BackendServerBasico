const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;


// ==============================================
// Verificar el Token   (Los métodos que estan abajo no funcionarán sin el token)
// ==============================================
exports.verificaToken = function(req, res, next) {

    let token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: "El usuario no tiene permiso, verifique el token",
                errors: err
            });
        }

        // devolvemos el usuario que hizo la solicitud, es decir que usuario al cual le pertenece el token (el usuario que esta logueado)
        req.usuario = decoded.usuario;
        next();
    });
}