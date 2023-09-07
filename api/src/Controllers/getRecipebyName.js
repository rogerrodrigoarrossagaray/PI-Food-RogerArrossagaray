require("dotenv").config();
const axios = require("axios");
const getAllrecipes = require("./getAllrecipes");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

module.exports = async(req,res)=>{
const name = req.query.name
const allInfo = await getAllrecipes();
try {
    
    if(name){
        const allRecipe = allInfo.filter((rec)=> rec.title.toLowerCase().includes(name.toLowerCase()))
        if(allRecipe.length){
            const result = allRecipe.map((rec)=>{
                return {
                    id: rec.id,
                    image: rec.image,
                    title: rec. title,
                    diets: rec.diets.map((d)=>d),
                    score: rec.spoonacularScore ,
                    healthScore: rec.healthScore 
                }
            })
            return res.status(200).send(result)
        }
        res.status(404).send('There is no recipe with this name');
    }else{
        const info = allInfo.map((rec)=>{
            return {
                image: rec.image,
                title: rec. title,
                id: rec.id,
                diets: rec.diets.map((d)=>d),
                score: rec.spoonacularScore,
                healthScore: rec.healthScore,
                created: rec.created
            }
        })
        res.status(200).send(info)
    } 
} catch (error) {
    console.log("routeRecipes", error)
} 
}
