const { Router } = require('express');
const getRecipebyID = require("../controllers/getRecipebyId");
const getRecipebyName = require("../Controllers/getRecipebyName");
const postRecipe= require("../Controllers/postRecipe");
const getDiets = require('../controllers/getDiets');
const getAllRecipesCon = require("../Controllers/getAllrecipesCon")


const router = Router();

// Configurar los routers
router.get("/recipes", getAllRecipesCon)
router.get("/recipes/:idRecipe", getRecipebyID);
router.get("/",getRecipebyName);
router.post("/recipes",postRecipe);
router.get("/diets",getDiets);


module.exports = router;
