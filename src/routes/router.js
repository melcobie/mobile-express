let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const {createCateg,createItems,Get,Find,createScore,GetScore} = require("./categorie.route");
const { getUserByToken } = require("../service/user-service");


router.post('/newCategory',createCateg);
router.post('/newItems',createItems);
router.post('/newScore',getUserByToken,createScore);
router.get('/GetScore',getUserByToken,GetScore);
router.get('/Items',Get);

router.get('/FindItems',Find);


module.exports = router;