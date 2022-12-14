import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  orderByAZ,
  orderByZA,
  orderScoreAsc,
  orderScoreDesc,
  filterDiets,
  loadingAction,
} from "../../redux/actions";
import Card from "../card/Card";
import Navbar from "../navbar/Navbar";
import Paginado from "../paginado/Paginado";
import style from "./Home.module.css";
import Gif from "../../Image/1484.gif";
import Refreash from "../../Image/redo__1_-removebg-preview.png";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getRecipes());
    setTimeout(() => {
      dispatch(loadingAction(false));
    }, 3000);
  }, [dispatch]);

  /* ************ PAGINADO ************ */
  const [page, setPage] = useState(1); //defino en qué página va a estar inicialmente
  const recipePage = 9;
  const lastPage = page * recipePage;
  const firstPage = lastPage - recipePage;
  const currentRecipes = recipes.slice(firstPage, lastPage); //defino cuantas cards va a mostrar por página
  const paginado = (numPage) => {
    //seteo en la página que elijo
    setPage(numPage);
  };

  /* ************ ORDENAMIENTO ************ */
  const [refreshState, setRefreshState] = useState(false);

  const handleSortTitle = (e) => {
    if (e.target.value === "orderAZ") {
      dispatch(orderByAZ(refreshState));
      setRefreshState(true);
      setPage(1);
    } else if (e.target.value === "orderZA") {
      dispatch(orderByZA(refreshState));
      setRefreshState((prevState) => !prevState);
      setPage(1);
    }
  };

  const handleSortScore = (e) => {
    if (e.target.value === "ascScore") {
      dispatch(orderScoreAsc(refreshState));
      setRefreshState((prevState) => !prevState);
      setPage(1);
    } else if (e.target.value === "descScore") {
      dispatch(orderScoreDesc(refreshState));
      setRefreshState((prevState) => !prevState);
      setPage(1);
    }
  };

  const handleFilter = (e) => {
    dispatch(filterDiets(e.target.value));
    setPage(1);
  };

  function handleRecipes(e) {
    e.preventDefault();
    dispatch(getRecipes());
    paginado(1);
    dispatch(loadingAction(true));
    setTimeout(() => {
      dispatch(loadingAction(false));
    }, 3000);
  }

  /* ---------------- RENDER ------------------ */

  return (
    <div className={style.img}>
      <div className={style.bg}>
        <div className={style.navBar}>
          <Navbar paginado={paginado} />
        </div>
        <div z-index="60">
          <div className={style.filtroPaginado}>
            <div className={style.sortFilter}>
              <div className={style.refreash}>
                <img src={Refreash} alt="Refreash" onClick={(e) => handleRecipes(e)} />
              </div>
              <select onChange={handleSortTitle} defaultValue="default">
                <option default>Sort Title</option>
                <option value="orderAZ">Recipes A-Z</option>
                <option value="orderZA">Recipes Z-A</option>
              </select>
              <select onChange={handleSortScore} defaultValue="default">
                <option default>Sort Score</option>
                <option value="ascScore">Ascendente</option>
                <option value="descScore">Descendente</option>
              </select>
              <select onChange={handleFilter} defaultValue="default">
                <option value="all">All Diets</option>
                <option value="dairy free">Dairy Free</option>
                <option value="fodmap friendly">Fodmap Friendly</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="lacto - vegetarian">Lacto Vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                <option value="low FODMAP">Low FODMAP</option>
                <option value="ovo - vegetarian">Ovo Vegetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="primal">Primal</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="whole 30">Whole 30</option>
              </select>
            </div>
            <div className={style.paginado}>
              <Paginado
                recipePage={recipePage} //el nº de recetas por pagina
                recipes={recipes.length} //el total de recipes
                paginado={paginado} //setea el estado de page
                page={page} //la pagina
              />
            </div>
          </div>
          <div className={style.card}>
            {loading ? (
              <div className={style.gif}>
                <img src={Gif} alt="Loading" />
              </div>
            ) : (
              <div className={style.card1}>
                {currentRecipes?.map((r) => {
                  return (
                    <div key={r.id}>
                      <Card
                        id={r.id}
                        title={r.title}
                        img={r.img}
                        diets={r.diets}
                        healthScore={r.healthScore}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
