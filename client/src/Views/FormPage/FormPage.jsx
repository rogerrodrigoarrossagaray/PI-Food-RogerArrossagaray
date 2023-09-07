import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postRecipes } from "../../Redux/actions";
import validation from "./Validation";
import styles from "./FormPage.module.css";
import {  useNavigate } from "react-router-dom";

export default function FormPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructionsList: [],
    instructions: "",
    diets: [],
    created: true,
  });
const navigate = useNavigate();

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // Realiza la validación para el campo actual
    const validationErrors = validation({ ...recipe, [property]: value });
    setError({ ...error, [property]: validationErrors[property] });

    setRecipe({ ...recipe, [property]: value });
  };

  const handleChangeDiets = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setRecipe((prevState) => ({
        ...prevState,
        diets: [...prevState.diets, value],
        
      }));
      console.log(recipe.diets);
    } else {
      setRecipe((prevState) => ({
        ...prevState,
        diets: prevState.diets.filter((diet) => diet !== value),
      }));
    }
  };

  const handleAddInstruction = () => {
    if (recipe.instructionsList.length < 10) {
      const newInstruction = recipe.instructions;
      if (newInstruction.length > 1) {
        setRecipe({
          ...recipe,
          instructionsList: [...recipe.instructionsList, newInstruction],
          instructions: "",
        });
      }
    }
  };

  const formatInstructions = () => {
    return recipe.instructionsList.map((instruction, index) => (
      <li key={index}>
        <b>{index + 1}.</b> {instruction}
      </li>
    ));
  };
  const hasValidationErrors = Object.values(error).includes(true);


  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(recipe);
    setError(validationErrors);
    console.log(recipe);
    

    if (Object.keys(validationErrors).length === 0) {
      dispatch(postRecipes(recipe));
       navigate("/home")
    }
  };

  return (
    <div className={styles.bkg}>
    <div className={styles.formContainer}>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="title">Name: </label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
          {error.title && <p>{error.title}</p>}
        </div>

        <div className={styles.formField}>
          <label htmlFor="summary">Summary: </label>
          <input
            type="text"
            name="summary"
            value={recipe.summary}
            onChange={handleChange}
          />
          {error.summary && <p>{error.summary}</p>}
        </div>

        <div className={styles.formField}>
          <label htmlFor="healthScore">HealthScore: </label>
          <input
            type="number"
            name="healthScore"
            value={recipe.healthScore}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="instructions">Instructions: </label>
          <input
            type="text"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
          {error.instructions && <p>{error.instructions}</p>}
          <button type="button" onClick={handleAddInstruction}>
            Add Instruction
          </button>
        </div>

        <ol className={styles.Lista}>{formatInstructions()}</ol>

        <div className={styles.formField}>
          <div className={styles.checkboxContainer}>
          <label>Select Diet(s):</label>
          <input
            type="checkbox"
            name="diets"
            value="gluten free"
            checked={recipe.diets.includes("gluten free")}
            onChange={handleChangeDiets}
          />
          <label>Gluten Free</label>
          <input
            type="checkbox"
            name="diets"
            value="ketogenic"
            checked={recipe.diets.includes("ketogenic")}
            onChange={handleChangeDiets}
          />
          <label>Ketogenic</label>
          <input
            type="checkbox"
            name="diets"
            value="vegetarian"
            checked={recipe.diets.includes("vegetarian")}
            onChange={handleChangeDiets}
          />
          <label>Vegetarian</label>
          <input
            type="checkbox"
            name="diets"
            value="lacto-vegetarian"
            checked={recipe.diets.includes("lacto-vegetarian")}
            onChange={handleChangeDiets}
          />
          <label>Lacto-Vegetarian</label>
          <input
            type="checkbox"
            name="diets"
            value="lacto ovo vegetarian"
            checked={recipe.diets.includes("lacto ovo vegetarian")}
            onChange={handleChangeDiets}
          />
          <label>Lacto Ovo-Vegetarian</label>
          <input
            type="checkbox"
            name="diets"
            value="vegan"
            checked={recipe.diets.includes("vegan")}
            onChange={handleChangeDiets}
          />
          <label>Vegan</label>
          <input
            type="checkbox"
            name="diets"
            value="pescatarian"
            checked={recipe.diets.includes("pescatarian")}
            onChange={handleChangeDiets}
          />
          <label>Pescatarian</label>
          <input
            type="checkbox"
            name="diets"
            value="paleolithic"
            checked={recipe.diets.includes("paleolithic")}
            onChange={handleChangeDiets}
          />
          <label>Paleolithic</label>
          <input
            type="checkbox"
            name="diets"
            value="primal"
            checked={recipe.diets.includes("primal")}
            onChange={handleChangeDiets}
          />
          <label>Primal</label>
          <input
            type="checkbox"
            name="diets"
            value="whole 30"
            checked={recipe.diets.includes("whole 30")}
            onChange={handleChangeDiets}
          />
          <label>Whole 30</label>
          </div>
        </div>
      
        <button type="submit" disabled={hasValidationErrors}>
            Create
          </button>
      </form>
    </div>
    </div>
  );
}
