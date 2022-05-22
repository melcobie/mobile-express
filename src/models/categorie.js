const mongoose = require('mongoose');

const categorie=mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    items:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
      }],
    },{
        collation: { locale: "en", strength:2}
    });

module.exports= mongoose.model('Categorie',categorie);