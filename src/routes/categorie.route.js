require("dotenv").config();
const express = require("express");


const Items = require("../models/items");
const Categorie = require("../models/categorie");
const Score = require("../models/score");
const {getUserByToken} = require("../service/user-service");


exports.createCateg= (req,res) =>{
  CreateCategorie(req.body)
      .then((resultat) => {
        return res.status(201).json({resultat});
    })
    .catch((error) => {
        return res.status(400).json({message: error})
    });
};

exports.GetScore= (req,res) =>{
  Score.findOne({username:req.user.username})
  .then((resultat) => {
      if(!resultat){
        resultat = {
          username: req.user.username,
          score: 0
        }
      }
      return res.status(200).json(resultat);
  })
  .catch((error) => {
      return res.status(400).json({error})
  });
}

exports.Get= (req,res) =>{
  Categorie.find()
  .populate('items')
  .then((resultat) => {
      return res.status(200).json({categorie : resultat});
  })
  .catch((error) => {
      return res.status(400).json({error})
  });
}


exports.Find= (req,res) =>{
  const name = req.body.name;
  const categorie = req.body.categorie;

  // ,"item.description": new RegExp("fkdyt", "i",)
  Categorie.find({nom:categorie})
  .populate('items')
  .then((resultat) => {

      return res.status(200).json({categorie : resultat});
  })
  .catch((error) => {
      return res.status(400).json({error})
  });
}


exports.createItems= (req,res) =>{
  createItems(req.body)
   .then((Items) => {
    AjoutItems(Items._id,req.body.IdCategorie)
     .then((resultat) => {
       return res.status(201).json({resultat});
     })
       .catch((errorg) => {
         return res.status(400).json({message : errorg})
     });
   })
   .catch((error) => {
       return res.status(400).json({message : error})
   });
};

exports.createScore= (req,res) =>{

  let params = {
    username : req.user.username,
    score: req.body.score
  }  
  console.log(params);
  console.log(req.body);
  CreateScores(params)
    .then((resultat) => {
      return res.status(201).json(resultat);
  })
  .catch((error) => {
      return res.status(400).json({message: error})
  });
};

async function CreateCategorie(Params){

  const categorie = new Categorie({
    nom: Params.nomCategorie,
    });
    categorie.save()
    return categorie;
};

async function CreateScores(score){
    return Score.findOneAndUpdate(
      { username: score.username },
      { $set: { score: score.score }},
      { new: true }
    )
};


async function AjoutItems(idItems,IdCategorie){
  return Categorie.findByIdAndUpdate(
    IdCategorie,
    { $push: { items: idItems} },
    { new: true, useFindAndModify: false }
  );
};

async function createItems(ItemsParams) {
     const items = new Items({
      url : ItemsParams.url,
      name: ItemsParams.name,
      description:ItemsParams.description,
      genre: ItemsParams.genre,
      details:null,
      });
      items.save()
      return items;
};




