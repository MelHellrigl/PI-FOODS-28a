import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.Module.css";

export default function Card({ title, img, diets, id, healthScore }) {
  return (
    <div className={style.card}>
      <div className={style.infoCard}>
        <img src={img} alt="Img not found" />
      </div>
      <div className={style.btnI}>
        <div>
          <h3>{title}</h3>
        </div>
        <Link to={`/recipes/${id}`}>
          <button>i</button>
        </Link>
      </div>
      <br />
      <div className={style.infoCard3}>
        {/* <h5>Diets: </h5> */}
        <div className={style.infoCard2}>
          <div>{diets ? diets.map((t) => <h5 key={t.name}>{t.name}</h5>) : <h5>Not Diets</h5>}</div>
        </div>
      </div>

      <div className={style.h4}>
        <h5>{`Health Score :  ${healthScore}%`}</h5>
      </div>
    </div>
  );
}
