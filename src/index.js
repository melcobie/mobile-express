require("dotenv").config();


const express = require("express");
const cors = require("cors");

const mongoDb = require("./util/database");
const authenticationRouter = require("./routes/authentication-route");
const categorieRouter = require("./routes/router");

const app = new express();
mongoDb.connect();
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    credentials : true,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin : "*",
}));

app.use("/api", authenticationRouter);
app.use("/lecons", categorieRouter);


app.listen(process.env.PORT);