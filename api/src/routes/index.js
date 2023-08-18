const { Router } = require('express');
const getRecipebyID = require("../controllers/getRecipebyId");
const getRecipebyName = require("../Controllers/getRecipebyName");
const postRecipe= require("../Controllers/postRecipe");
const getDiets = require('../controllers/getDiets');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:idRecipe", getRecipebyID);
router.get("/recipes",getRecipebyName);
router.post("/recipes",postRecipe);
router.get("/diets",getDiets);


module.exports = router;
