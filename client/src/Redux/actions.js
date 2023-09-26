import axios from "axios";
import { FILTER_BY_TYPEDIET, GET_BY_ID, GET_BY_NAME, GET_RECIPES, GET_TYPE_DIETS, ORDER_BY_NAME, ORDER_BY_PUNTUATION } from "./constant";


export function getRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes`);
      return dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error in getRecipes: " + error);
    }
  };
}






export function filterRecipesByTypeDiet(type) {
  return {
    type: FILTER_BY_TYPEDIET,
    payload: type,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPuntuation(payload) {
  return {
    type: ORDER_BY_PUNTUATION,
    payload,
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: json.data,
    });
    } catch (error) {
      return dispatch({
        type: GET_BY_NAME,
        payload: error.data,
      });
    }
    
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: json.data,
    });
  };
}

export function getTypeDiets() {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/diets`);
    return dispatch({
      type: GET_TYPE_DIETS,
      payload: json.data,
    });
  };
}
export function postRecipes(recipe) {
  return async function (dispatch) {
    try {
      console.log(recipe.diets);
      const response = await axios.post(`http://localhost:3001/recipes`, recipe);
      
      return response; 
    } catch (error) {
      // Manejar el error, por ejemplo, mostrando un mensaje de error o registrándolo
      console.error("Error al enviar la receta:", error);
    }
  };
}


