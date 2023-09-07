import React from "react";
import styles from "./LandingPage.module.css";
import llema from"../../../icons/llema.svg"
import { Link } from "react-router-dom";
const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <div className={styles.backgroundImage}></div>
            <Link to="/home">
            <img src={llema} alt="Botón de tenedor" className={styles.enterButtonImage} />
            </Link>
        
        </div>
    );
};

export default LandingPage;