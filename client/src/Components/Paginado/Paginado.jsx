import React from "react";
import { Link } from "react-router-dom";
import styles from "./Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado, currentPage, setCurrentPage }) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={styles.ul}>
        {pageNumbers.map((n) => (
          <li key={n}>
            <Link
              className={`${styles.container} ${currentPage === n ? styles.highlighted : ""}`}
              onClick={() => {
                paginado(n);
                setCurrentPage(n); // Actualiza la página actual al hacer clic
              }}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}