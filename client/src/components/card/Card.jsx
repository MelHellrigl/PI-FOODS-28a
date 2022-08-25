import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.Module.css";

export default function Card({ title, img, diets, id }) {
  return (
    <div className={style.card} key={id}>
      <div className={style.btnI}>
        <Link to={`/recipes/${id}`}>
          <button>i</button>
        </Link>
      </div>
      <div className={style.infoCard}>
        <h3>{title}</h3>
        <img src={img} alt="Img not found" />
      </div>
      <h5>Diets: </h5>
      <div className={style.infoCard2}>
        <div>{diets ? diets.map((t) => <h5>{t.name}</h5>) : <h5>Not Diets</h5>}</div>
      </div>
    </div>
  );
}
