const mongoose = require('mongoose');

const items=mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    name:String,
    description:String,
    genre:String,
    urlVideo:String,
    details:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Details"
      },
    },{
        collation: { locale: "en", strength:2}
    });

module.exports= mongoose.model('Items',items);