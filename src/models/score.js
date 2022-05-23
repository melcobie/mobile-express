const mongoose = require('mongoose');

const score=mongoose.Schema({
    score:String,    
    username:String
});

module.exports= mongoose.model('Score',score);
