const { rejects } = require("assert")
const jwt = require ("jsonwebtoken")

const generarJWT = (email, nombre) => {

    const payload = { email, nombre }
    
   return new Promise( (resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token)
            }
    
        })
    }) 
}

module.exports = {generarJWT};

