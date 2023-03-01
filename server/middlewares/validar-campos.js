const { response } = require('express');
const { validationResult } = require('express-validator');
const { nextTick } = require('process');

const validarCampos = (req, res = response, next) => {
    //Mapeo de errores
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }
    next();
}


module.exports = {validarCampos}