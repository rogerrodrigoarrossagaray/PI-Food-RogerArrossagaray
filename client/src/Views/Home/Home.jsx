import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipesByTypeDiet,
  orderByName,
  orderByPuntuation,
  getRecipesByName,
} from "../../Redux/actions";
import Card from "../../Components/Card/Card";
import Paginado from "../../Components/Paginado/Paginado";
import styles from "./Home.module.css";

export default function Home() {
  // Inicialización de estados
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const errorSearch = useSelector((state) => state.errors);
  const [search, setSearch] = useState("");
  const [orden, setOrden] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  // Cálculo de índices para paginación
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;

  // Función para cambiar de página
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Efecto para cargar recetas según la búsqueda
  useEffect(() => {
    if (search) {
      dispatch(getRecipesByName(search));
    } else {
      dispatch(getRecipes());
    }
  }, [dispatch, search]);

  // Función para manejar el envío del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipesByName(search));
    // No restablecemos currentPage aquí
  };

  // Función para manejar cambios en el campo de búsqueda
  const handleInputName = (e) => {
    setSearch(e.target.value);
  };

  // Restablecer currentPage a 1 cuando se cambia el filtro de tipo de dieta o la ordenación
  const handleFilterTypeDiet = (event) => {
    setCurrentPage(1);
    dispatch(filterRecipesByTypeDiet(event.target.value));
  };

  const handleSortByName = (e) => {
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleSortByPuntuation = (e) => {
    setCurrentPage(1);
    dispatch(orderByPuntuation(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  };
  const handleRefreshRecipes = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
  };

  return (
    <div className={styles.bkg}>
      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={handleInputName}
            className={styles.input}
          />
          <button type="submit" className={styles.btnsearch}>
            Buscar
          </button>
        </form>
      </div>
      <div className={styles.filterC}>
        <Link to="/createRecipe">
          <button className={styles.create}>Crear Receta</button>
        </Link>
        <button onClick={handleRefreshRecipes} className={styles.refresh}>
          Refrescar Recetas
        </button>
        <div className={styles.filt}>
          <select onChange={handleSortByName} className={styles.select}>
            <option value="asc">Ascendente (A-Z)</option>
            <option value="des">Descendente (Z-A)</option>
          </select>
        </div>
        <div>
          <select onChange={handleSortByPuntuation} className={styles.select}>
            <option value="mayormenor">Mayor a Menor Puntuación</option>
            <option value="menormayor">Menor a Mayor Puntuación</option>
          </select>
        </div>
        <div>
          <select onChange={handleFilterTypeDiet} className={styles.select}>
            <option value="All">All recipes</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto-vegetarian">Lacto-Vegetarian</option>
            <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
          </select>
        </div>
      </div>
      <div className={styles.paginado}>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes ? allRecipes.length : 0}
          paginado={paginado}
          currentPage={currentPage} // Pasa el estado currentPage
          setCurrentPage={setCurrentPage} // Pasa la función setCurrentPage
        />
      </div>
      <div className={styles.cards}>
      {allRecipes && allRecipes.length > 0 ? (
          allRecipes
            .slice(indexFirstRecipe, indexLastRecipe)
            .map((e) => (
              <Link to={`/recipes/${e.id}`} key={e.id}>
                <Card name={e.title} image={e.image} diets={e.diets} />
              </Link>
            ))
        ) : (
          <h2 className={styles.erro}>
            El estado de recetas está vacío. Añade recetas o realiza una
            búsqueda.
          </h2>
        )}
      </div>
    </div>
  );
}
