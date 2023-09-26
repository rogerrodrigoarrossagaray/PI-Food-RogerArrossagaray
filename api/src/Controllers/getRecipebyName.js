require("dotenv").config();
const axios = require("axios");
const getAllrecipes = require("./getAllrecipes");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

module.exports = async (req, res) => {
  let name = req.query.name;
  let allInfo = await getAllrecipes();
  
  try {
    if (name) {
      // Si se proporciona un nombre en la consulta
      let recipesName = allInfo.filter((element) =>
        element.title.toLowerCase().includes(name.toString().toLowerCase())
      );

      if (recipesName.length > 0) {
        res.status(200).send(recipesName);
      } else {
        res.status(404).send("No se encontraron recetas con ese nombre.");
      }
    } else {
      // Si no se proporciona un nombre en la consulta, envía todas las recetas
      res.status(200).send(allInfo);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};
