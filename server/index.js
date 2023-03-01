const express = require("express");
const cors = require("cors")
require('dotenv').config();

//Initalizations
const app = express();

//Directorio público
app.use(express.static('public'));

//Settings 
app.set('port', process.env.PORT || 4001);


//Middlewares
app.use(cors());
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));


//Starting server
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });



