const mongoose = require("mongoose");

const tokensSchema = mongoose.Schema({
    token : {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("tokens", tokensSchema);