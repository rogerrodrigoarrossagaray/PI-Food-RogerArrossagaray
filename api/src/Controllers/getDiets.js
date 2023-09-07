require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const getAllrecipes = require("./getAllrecipes");

module.exports = async (req, res) => {
    try {
      const allRecipes = await getAllrecipes();
      const diets = [...new Set(allRecipes.flatMap(obj => obj.diets))];
  
      const createdDiets = [];
  //usando un bucle for-of en lugar del map para 
  //recorrer el array de nombres de dietas
      for (const name of diets) {
        const existingDiet = await Diet.findOne({ where: { name } });
        if (!existingDiet) {
          const newDiet = await Diet.create({ name });
          createdDiets.push(newDiet);
        }
      }
  
      const dietsResponse = createdDiets.map(diet => {
        const { id, name } = diet;
        return { id, name };
      });
  
      return res.status(200).json(dietsResponse);
    } catch (error) {
      res.status(400).end("It was not possible to create the diets");
    }
  };
  