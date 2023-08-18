require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

module.exports = async (req, res) => {
  const id = req.params.idRecipe;
  try {
    if (id.length < 10) {
      const apiId = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
      );
      const result = {
        id: apiId.data.id,
        title: apiId.data.title,
        image: apiId.data.image,
        summary: apiId.data.summary,
        diets: apiId.data.diets,
        spoonacularScore: apiId.data.spoonacularScore,
        healthScore: apiId.data.healthScore,
        instructions: apiId.data.instructions,
      };
      return res.status(200).send(result);
    } else {
      const recipeDb = await Recipe.findByPk(id, { include: Diet });
      const recipeDbFound = {
        title: recipeDb.title,
        image: recipeDb.image,
        summary: recipeDb.summary,
        diets: recipeDb.diets.map((d) => d.name),
        spoonacularScore: recipeDb.spoonacularScore,
        healthScore: recipeDb.healthScore,
        instructions: recipeDb.instructions,
        created: recipeDb.created,
      };

      recipeDbFound
        ? res.status(200).send(recipeDbFound)
        : res.status(404).send("the ID doesnt exists");
    }
  } catch (error) {
    console.log("IdRecipes", error);
  }
};
