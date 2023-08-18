require("dotenv").config();
const axios = require("axios");
const getAllrecipes = require("./getAllrecipes");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

module.exports=async (req, res)=>{
    console.log(req.body);
    const {title, summary, spoonacularScore, healthScore, instructions, diets, created} = req.body   
     try {
        const recipeCreated = await Recipe.create({
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            diets,
            created
        })
        
      
        
        res.status(200).send('your recipe was successfully created')
    } catch (error) {
        console.log("createRecipe", error)
    }
    
}