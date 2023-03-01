const { response } = require("express");
const { pool } = require("../db/config");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
  const { nombre, email, password, validatePassword } = req.body;

  try {
    //Verificar si el email existe
    const prueba = await pool.query(
      "SELECT COUNT(*) as total FROM Usuario WHERE email = ?",
      [email]
    );
    if (prueba[0].total > 0) {
      //Mensaje de fallo ya que el usuario existe en la base de datos
      return res.status(400).json({
        ok: false,
        msg: "El email del usuario que intenta registrar ya existe",
      });
    } else {
      if (validatePassword != password) {
        //Mensaje de fallo que indica que las contraseñas no coinciden
        res.status(400).json({
          ok: false,
          msg: "Las contraseñas no coinciden",
        });
      } else {
        //Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Guardar Usuario en la base de datos
        const insertResult = await pool.query("INSERT INTO Usuario SET ?", {
          nombre,
          email,
          password: hashedPassword,
          validatePassword: hashedPassword,
        });

        //Generación del JWT

        const token = await generarJWT(email, nombre);

        //Mensaje de éxito que indica que se ha creado el usuario
        res.status(201).json({
          ok: true,
          email: email,
          msg: "Usuario registrado",
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con el administrador",
    });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { email, password } = req.body;

    const [user] = await pool.query("SELECT * FROM Usuario WHERE email = ?", [
      email,
    ]);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    //Validar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        ok: false,
        msg: "Contraseña inválida",
      });
    }

    //Generar JWT
    const [nom] = await pool.query("SELECT nombre FROM usuario WHERE email = ?", email);
    const name = nom.nombre;
    const token = await generarJWT(email, name);

    //Respuesta exitosa
    return res.json({
      ok: true,
      msg: "Inicio de sesión exitoso",
      nombre: name,
      email: email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con el administrador",
    });
  }
};

const revalidarToken = async (req, res) => {

  const { nombre, email } = req;
  const token = await generarJWT(email, nombre);
  return res.json({
    ok: true,
    msg: "Renew Usuario",
    nombre: nombre,
    email: email,
    token

  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
