import React from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipesId, clearDetail } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import imgNotAvailable from "../../Image/Image_not_available.png";
import style from "./CardDetail.module.css";
import Logo from "../../Image/natural-1281596-removebg-preview (1).png";

export default function CardDetail() {
  const dispatch = useDispatch();

  const recipeDetail = useSelector((state) => state.recipeDetail);
  const { id } = useParams(); //esto permite ingresar a los parámetros de la ruta actual

  useEffect(() => {
    dispatch(getRecipesId(id));
    return () => {
      // esto limpia el componente de los detalles anteriores que se hayan cargado
      dispatch(clearDetail([]));
    };
  }, [dispatch, id]);

  return (
    <div className={style.bgImg}>
      <div className={style.bg}>
        <div className={style.nav}>
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <Link to="/recipes">
              <button>Back</button>
            </Link>
          </div>
        </div>
        <div className={style.position}>
          <div className={style.bgDetail}>
            <h1>{recipeDetail.title}</h1>
            <div className={style.contenido}>
              <img src={recipeDetail.img || imgNotAvailable} alt="Img not found" />
              <div className={style.contenido2}>
                <h3>Health Score: </h3>
                <h4>{`${recipeDetail.healthScore}%`}</h4>
                <h3>Diets Type: </h3>
                {recipeDetail.diets ? (
                  <div>
                    {recipeDetail.diets.map((d) => {
                      if (typeof recipeDetail.diets[0] === "object") {
                        return <h4 key={d.name}>{d.name}</h4>;
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
            </div>
          </div>
          <div className={style.bgDetail2}>
            <div className={style.contenido3}>
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
      </div>
    </div>
  );
}
