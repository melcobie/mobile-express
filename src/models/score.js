const mongoose = require('mongoose');

const score=mongoose.Schema({
    score:String,    
    Username:String
});

module.exports= mongoose.model('Score',score);
