import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, img, diets, id }) {
  return (
    <div key={id}>
      <Link to={`/recipes/${id}`}>
        <button>i</button>
      </Link>
      <h3>{title}</h3>
      <img src={img} alt="Img not found" width="200px" height="250px" />
      <h5>Diets: </h5>
      {diets ? diets.map((t) => <h5>{t.name}</h5>) : <h5>Not Diets</h5>}
    </div>
  );
}
