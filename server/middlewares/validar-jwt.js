const { response } = require("express");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/config");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Error en el token",
    });
  }

  try {

    

    const { email} = jwt.verify(token, process.env.SECRET_JWT_SEED);
    const [nom] = await pool.query("SELECT nombre FROM usuario WHERE email = ?", email)
    req.email = email;
    req.nombre = nom.nombre;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
