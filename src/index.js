require("dotenv").config();
const express = require("express");

const mongoDb = require("./util/database");
const authenticationRouter = require("./routes/authentication-route");


const app = new express();
mongoDb.connect();

app.use(cors({
    credentials : true,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin : "*",
}));

app.use("/api", authenticationRouter);

app.listen(process.env.PORT);