require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

module.exports = async () => {
const {data}= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    try {
        const apiRecipes = await data.results.map((rec)=>{
            return {
                image: rec.image,
                id: rec.id,
                title: rec.title,
                summary: rec.summary,
                spoonacularScore: rec.spoonacularScore,
                healthScore: rec.healthScore,
                diets: rec.diets,
            }
        })
        return apiRecipes;
    } catch (error) {
        console.log("getApiInfo" + error)
    }}
