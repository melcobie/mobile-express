const tokens = require("../models/tokens");
const users = require("../models/users");
const jwt = require("jsonwebtoken");

async function getUser(req, res, next) {
    let user;
    try{
        user = await users.findById(req.params.id);
        if(user == null){
            return res.status(401).json({message : "Could not find user"});
        }
    }catch(err){
        return res.status(500).json({message : err.message});
    }
    res.user = user;
    next();
}

async function getUserByUsername(req, res, next) {
    let user;
    try{
        user = await users.findOne({
            username : req.body.username,
        });
        if(user){
            return res.status(500).json({ message : "Le nom d'utilisateur n'est plus disponible"});
        }
        user = await users.findOne({
            email : req.body.email,
        });
        if(user){
            return res.status(500).json({ message : "L'addresse email n'est plus disponible"});
        }
        else{
            next();
        }
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

async function getUserByToken(req, res, next){
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    try{
        const accessToken = await tokens.find({token});
        if(accessToken.length === 0) return res.sendStatus(403);
        else{
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, user)=>{
                if(err) return res.sendStatus(403);
                req.user = await users.findOne({ email: user.username });
                next();
            })
        } 
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

async function getUsersByData(data){
    let user;
    try{
        user = await users.find(data);
        return user;
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

async function getUsersByType(type){
    return getUsersByData({type});
}

async function newUser(data){
    let user = new users(data);
    try{
        const newUser = await user.save();
        return newUser;
    }catch(err){
        res.status(500).json({ message : err.message });
    }
}

module.exports = {
    getUser,
    getUserByUsername,
    getUserByToken,
    getUsersByType,
    newUser,
    getUsersByData,
}