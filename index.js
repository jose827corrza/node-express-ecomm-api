const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
  res.send('Hola gonorrea');
});

routerApi(app);


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


