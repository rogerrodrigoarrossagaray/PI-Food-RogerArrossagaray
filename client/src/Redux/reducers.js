export const initialState = {
  recipes: [],
  allRecipes: [],
  details: {},
  typediets: [],
  errors: ""
};
console.log("esto es el estado type diets", initialState.typediets);

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

      case "FILTER_BY_TYPEDIET":
        const allRecipes1 = state.allRecipes; // Copia de respaldo
        const selectedDiet = action.payload;
      if(selectedDiet === "All"){
        return{...state,
        recipes:allRecipes1}
      }else{
         // Filtrar recetas con "diets" como un array de strings
         const recipesWithArrayStrings = allRecipes1.filter((recipe) => {
          if (Array.isArray(recipe.diets)) {
            return recipe.diets.includes(selectedDiet);
          }
        });
      
        // Filtrar recetas con "diets" como un array de objetos
        const recipesWithArrayObjects = allRecipes1.filter((recipe) => {
          if (Array.isArray(recipe.diets)) {
            return recipe.diets.some((diet) => diet.name === selectedDiet);
          }
        });
      
        // Combinar los resultados de ambas filtraciones
        const dietsFiltered = [...recipesWithArrayStrings, ...recipesWithArrayObjects];
      
        return {
          ...state,
          recipes: dietsFiltered,
        };
      }
      
      
    case "ORDER_BY_NAME":
      let order =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };

    case "ORDER_BY_PUNTUATION":
      let orderpunt =
        action.payload === "menormayor"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderpunt,
      };

    case "GET_BY_NAME":
      if(typeof action.payload === "string"){
        return{
          ...state ,
          errors: action.payload
        }
      }else{
        return {
          ...state,
          recipes: action.payload,
        };
      }
      

    case "GET_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };

    case "GET_TYPE_DIETS":
      return {
        ...state,
        typediets: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
