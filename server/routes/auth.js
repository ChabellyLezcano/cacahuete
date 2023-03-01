const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");
const {pool} = require("../db/config");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear Usuario
router.post(
  "/add",
  [
    check("nombre", "El campo del nombre está vacío").notEmpty(),
    check("email", "El campo del email está vacío").notEmpty(),
    check("email", "El formato del email es incorrecto").isEmail(),
    check("password", "El campo de la contraseña está vacío").notEmpty(),
    check(
      "password",
      "La contraseña debe tener longitud de 8, tener una mayúscula, una minúscula y un carácter especial"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    validarCampos
  ],
  check("validatePassword", "El campo de la contraseña está vacío").notEmpty(),
  check(
    "validatePassword",
    "La contraseña debe tener longitud de 8, tener una mayúscula, una minúscula y un carácter especial"
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  crearUsuario
);

//Login Usuario
router.post(
  "/",
  [
    check("email", "El campo del email está vacío").notEmpty(),
    check("email", "El formato del email es incorrecto").isEmail(),
    check("password", "El campo de la contraseña está vacío").notEmpty(),
    check(
      "password",
      "La contraseña debe tener longitud8, tener una mayúscula, una minúscula y un carácter especial"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    validarCampos
  ],
  loginUsuario
);

//Validar y revalidar Token
router.get("/renew", validarJWT , revalidarToken);

module.exports = router;
