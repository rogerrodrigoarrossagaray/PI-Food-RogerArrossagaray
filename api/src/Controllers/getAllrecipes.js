require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

module.exports = async () => {
  const dbRecipes = await Recipe.findAll({
    attributes: ['id', 'title', 'summary', 'healthScore', 'instructions', 'image'], // Seleccionar las columnas de receta que necesites
    include: [{ model: Diet, attributes: ['name'], through: { attributes: [] } }], // Incluye solo el atributo 'name' de las dietas sin la tabla de relación
  });


  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );

    // Luego, agregamos las recetas de la API a la lista final
    const apiRecipes = response.data.results.map((rec) => {
      return {
        image: rec.image,
        id: rec.id,
        title: rec.title,
        summary: rec.summary,
        spoonacularScore: rec.spoonacularScore,
        healthScore: rec.healthScore,
        diets: rec.diets,
      };
    });

    const allRecipes = [...dbRecipes, ...apiRecipes];
    return allRecipes;
  } catch (error) {
    console.error("Error in getRecipes: " + error);
  }

  
};
