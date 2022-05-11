const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
},{
    collation: { locale: "en", strength:2}
});

module.exports = mongoose.model("user", usersSchema);