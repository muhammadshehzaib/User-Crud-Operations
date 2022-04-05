const express = require("express");
require("./src/db/mongoose");
const userRouter = require("./src/routers/User_routers");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log("Server is up and running on port " + PORT);
})