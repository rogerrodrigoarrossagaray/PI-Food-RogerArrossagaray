import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

// URL de la imagen por defecto
const defaultImageURL = "https://www.ormistonhospital.co.nz/wp-content/uploads/2016/05/No-Image.jpg";

export default function Card({ id, name, image, diets }) {
  // Usar la URL de la imagen por defecto si 'image' es null o undefined
  const backgroundImageURL = image ? image : defaultImageURL;

  return (
    <div className={style.card} style={{ backgroundImage: `url("${backgroundImageURL}")` }}>
      <div className={style.cardContent}>
        <h3 className={style.cardName}>{name}</h3>
        <div className={style.contCard}>
          <h4 className={style.cardDish}>h</h4>
          {diets.map(element =>{
            if(typeof element === "object"){
              return(<h5 className={style.cardTypes}>{element.name}</h5>)
            }else{
              return (<h5 className={style.cardTypes}>{element}</h5>)
            }
          })}
        </div>
      </div>
      <button>X</button>
    </div>
  );
}


