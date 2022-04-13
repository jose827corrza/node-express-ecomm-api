const express = require('express');
const routerApi = require('./routes');
const {errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/errorHandler');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load('./nodeDoc.yaml');


const app = express();
const port = process.env.PORT || 3000;

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());//Este es un middleware muy importante, es para que pueda recibir los json
const whitelist = []//Esta lista seria de los dominios de donde aceptariamos las peticiones

// const options = {
//   origin : (origin, callBack) => {
//     if(whitelist.includes(origin) || origin){
//       callBack(null, true);
//     }else{
//       callBack(new Error('No permitido'));
//     }
//   }
// }
// app.use(cors(options));

//---------------
//lo comentado arriba seria la conf para determinar los origenes


app.use(cors());//Si se deja asi va a recibir de cualquier dominio

app.get('/', (req, res) =>{
  res.send('API mock joseDev');
});

routerApi(app);
require('./utils/auth');
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  console.log(port + " Es el que escucha");
})
// app.get('/category/:categoryId/products/:productId', (req, res) =>{
//   const { categoryId,  productId} = req.params;
//   res.json({
//     categoryId,
//     productId,
//     title: "Titulo",
//     descrip: "descripcion"
//   })
// });

// app.get('/users',(req, res) => {
//   const { limit, offset } = req.query;
//   if(limit && offset){
//       res.json({
//         limit,
//         offset
//       })
//   }else{
//     res.send('papi, sea serio');
//   }

// })


