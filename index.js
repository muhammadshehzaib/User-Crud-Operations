const express = require("express");
require("./src/db/mongoose");
const user = require("./src/routers/User_routers");
// const task = require("./src/routers/task");
const app = express();
const PORT = 3000;



app.use(express.json());
app.use(user);
// app.use(task)

app.listen(PORT, () => {
    console.log("Server is up and running on port " + PORT);
})
