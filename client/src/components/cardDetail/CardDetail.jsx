import React from "react";
import { useParams } from "react-router-dom";
import { getRecipesId } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../navbar/Navbar";

export default function CardDetail() {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesId(id));
  }, [dispatch, id]);

  //<Link to="/recipes">Home</Link>
  return (
    <div key={id}>
      <div>
        <Navbar />
      </div>
      <h1>Recipe Detail</h1>
      <h3>{recipeDetail.title}</h3>
      <img src={recipeDetail.img} alt="Img not found" width="300px" height="250px" />
      {recipeDetail.diets ? (
        <>
          <h3>Diets Type: </h3>
          {recipeDetail.diets.map((d) => {
            return <h4 key={d}>{d}</h4>;
          })}
        </>
      ) : (
        <h4>Not diets</h4>
      )}
      {recipeDetail.dishTypes ? (
        <div>
          <h3>Dish Type: </h3>
          {recipeDetail.dishTypes?.map((e) => {
            return <h4 key={e}>{e}</h4>;
          })}
        </div>
      ) : (
        <br />
      )}
      <h3>Summary: </h3>
      <p>{recipeDetail.summary}</p>
      <h3>Health Score: {recipeDetail.healthScore}</h3>
      <h3>Analyzed Instructions: </h3>
    </div>
  );
}
