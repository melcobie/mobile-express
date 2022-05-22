const mongoose = require('mongoose');

const details=mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    genre:String,
    description:String,
    image:Image,
    
});

module.exports= mongoose.model('Details',details);