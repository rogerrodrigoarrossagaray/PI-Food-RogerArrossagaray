require("dotenv").config();
const axios = require("axios");
const getAllrecipes = require("./getAllrecipes");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");


module.exports = async (req, res) => {
  try {
    let { title, summary, healthScore, instructions, diets, created ,image } =
      req.body;
      console.log(diets);
  
   
    //campos obligatorios
    if (!title || !summary || !healthScore) {
      return res.status(400).json({ error: "Missing required fields" });
    }


    //receta en la base de datos
    const recipeCreated = await Recipe.create({
      title,
      summary,
      healthScore,
      instructions,
      diets,
      image,
      created,
    });

    if (diets && diets.length > 0) {
      for (const dietName of diets) {
        const [diet, created] = await Diet.findOrCreate({
          where: { name: dietName },
        });
        await recipeCreated.addDiet(diet);
      }
    }

    res.status(201).json({ message: "Your recipe was successfully created" });
  } catch (error) {
    console.error("createRecipe", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the recipe" });
  }
};
