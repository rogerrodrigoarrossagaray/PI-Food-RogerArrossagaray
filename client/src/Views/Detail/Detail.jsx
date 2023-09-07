import React, { useEffect } from "react";
import { getRecipesById } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export default function Detail() {
    const detailsstate = useSelector((state) => state.details);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
       dispatch(getRecipesById(id));
    }, [dispatch,id]);
   
    const renderListFromArray = (array) => {
        return (
            <ul>
                {array.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    };

    const renderSummaryAsList = (summary) => {
        const parts = summary?.split("<b>").map(part => part.trim());
        return (
            <ul>
                {parts?.map((part, index) => (
                    <li key={index}>{part.replace("</b>", "")}</li>
                ))}
            </ul>
        );
    };
   
    return (
        <div>
       { 
         detailsstate ? 
         <div className={styles.dt}> 
             <Link to='/home'><button className={styles.btn}>Back to main Page </button> </Link>
             <h1 className={styles.title}> {detailsstate.title} </h1>
             <img className={styles.imga} src={detailsstate.image ? detailsstate.image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
             <h3 className={styles.type}>Type Diet:</h3>
             {detailsstate.diets && detailsstate.diets.length > 0 ? (
                 <div className={styles.type}>{renderListFromArray(detailsstate.diets)}</div>
             ) : (
                 <div className={styles.type}>No diet information available</div>
             )}
             <h5 className={styles.type}>summary: {renderSummaryAsList(detailsstate.summary)}</h5>
             <h5 className={styles.type}>healthScore: {detailsstate.healthScore}</h5>
         </div> : 
         <div> <h2> loading... </h2> </div>
      }
          </div>
      )
  }

