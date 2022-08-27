import React from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipesId } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import imgNotAvailable from "../../Image/Image_not_available.png";
import style from "./CardDetail.module.css";

export default function CardDetail() {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  console.log(recipeDetail);
  const { id } = useParams(); //esto permite ingresar a los parámetros de la ruta actual
  console.log(id);

  useEffect(() => {
    dispatch(getRecipesId(id));
  }, [dispatch, id]);

  return (
    <div key={id} className={style.bgImg}>
      <div className={style.bg}>
        <div className={style.nav}>
          <Link to="/recipes">
            <button>Home</button>
          </Link>
        </div>

        <div className={style.bgDetail}>
          <h1>{recipeDetail.title}</h1>
          <img
            src={recipeDetail.img || imgNotAvailable}
            alt="Img not found"
            width="300px"
            height="250px"
          />
          <h3>Health Score: </h3>
          <h4>{recipeDetail.healthScore}</h4>
          <h3>Diets Type: </h3>
          {recipeDetail.diets ? (
            <div>
              {recipeDetail.diets.map((d) => {
                if (typeof recipeDetail.diets[0] === "object") {
                  return <h4 key={d.id}>{d.name}</h4>;
                }
                return <h4 key={d}>{d}</h4>;
              })}
            </div>
          ) : (
            <h4>Not diets</h4>
          )}
          <h3>Dish Type: </h3>
          {recipeDetail.dishTypes ? (
            <div>
              {recipeDetail.dishTypes.map((e) => {
                if (typeof recipeDetail.dishTypes[0] === "object") {
                  return <h4 key={e.id}>{e.name}</h4>;
                }
                return <h4 key={e}>{e}</h4>;
              })}
            </div>
          ) : (
            <h4>Not dish</h4>
          )}
        </div>
        <div className={style.bgDetail2}>
          <h3>Summary: </h3>
          <p>{recipeDetail.summary?.replace(/<[^>]*>/g, "")}</p>

          <h3>Instructions:</h3>
          <p>
            {Array.isArray(recipeDetail.analyzedInstructions)
              ? recipeDetail.analyzedInstructions?.map((a) =>
                  a.steps.map((e) => {
                    return <li key={e.number}>{e.step}</li>;
                  })
                )
              : recipeDetail.analyzedInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}
