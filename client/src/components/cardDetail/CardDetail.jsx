import React from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipesId } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import imgNotAvailable from "../../Image/Image_not_available.png";

export default function CardDetail() {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  console.log(recipeDetail);
  const { id } = useParams(); //esto permite ingresar a los parámetros de la ruta actual
  console.log(id);

  useEffect(() => {
    dispatch(getRecipesId(id));
  }, [dispatch, id]);

  //REVISAR POR QUÉ NO MUESTRA DETALLE DE RECETAS CREADAS
  return (
    <div key={id}>
      <div>
        <Link to="/recipes">
          <button>Home</button>
        </Link>
      </div>

      <h1>{recipeDetail.title}</h1>
      <img
        src={recipeDetail.img || imgNotAvailable}
        alt="Img not found"
        width="300px"
        height="250px"
      />
      <h3>Health Score: </h3>
      <h4>{recipeDetail.healthScore}</h4>
      {recipeDetail.diets ? (
        <div>
          <h3>Diets Type: </h3>
          {recipeDetail.diets.map((d) => {
            return <h4 key={d.id}>{d.name}</h4>;
          })}
        </div>
      ) : (
        <h4>Not diets</h4>
      )}
      {recipeDetail.dishTypes ? (
        <div>
          <h3>Dish Type: </h3>
          {recipeDetail.dishTypes.map((e) => {
            return <h4 key={e.id}>{e.name}</h4>;
          })}
        </div>
      ) : (
        <></>
      )}
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
  );
}
