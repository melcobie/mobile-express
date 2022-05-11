require("dotenv").config();

const mongoose = require("mongoose");

const mongoDbUrl = process.env.DATABASE_URL;
let mongodb;

function connect(){
    mongoose.connect(mongoDbUrl, { useNewUrlParser : true});
    mongodb = mongoose.connection;
    mongodb.on('error', (err) => console.log(err));
    mongodb.once("open", ()=> console.log("Database opened"));
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};
