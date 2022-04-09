const express = require("express");
require("./src/db/mongoose");
const user = require("./src/routers/User_routers");
const app = express();
const PORT = 2012;

// app.use((req, res, next) => {
//  if(req.method==="GET"){
//     res.send("Get request are disabled")
//  }else{
//      next()
//  }
// })
// app.use((req, res, next) => {
//     if(req.method==="GET" || req.method==="POST" || req.method==="PATCH" || req.method==="DELETE"){
//         res.status(503).send("Maintance Mode");
//     }else{
//         next()
//     }
// })


app.use(express.json());
app.use(user);

app.listen(PORT, () => {
    console.log("Server is up and running on port " + PORT);
})
const jwt = require('jsonwebtoken');
const myFunction = async ()=>{
// const token = jwt.sign({_id:"abc123"},"shehzaib",{expiresIn:"7 days"})
// console.log(token);
// const data = jwt.verify(token,"shehzaib")
// console.log(data);
}
myFunction();