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
  // getDiets,
} from "../../redux/actions";
//import { Link } from "react-router-dom";
import Card from "../card/Card";
import Navbar from "../navbar/Navbar";
import Paginado from "../paginado/Paginado";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipes());
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
  const [, /*refreshState*/ setRefreshState] = useState(false);

  const handleSortTitle = (e) => {
    if (e.target.value === "orderAZ") {
      dispatch(orderByAZ(e.target.value));
      setRefreshState(true);
      setPage(1);
    } else if (e.target.value === "orderZA") {
      dispatch(orderByZA(e.target.value));
      setRefreshState((prevState) => !prevState);
      setPage(1);
    }
  };

  const handleSortScore = (e) => {
    if (e.target.value === "ascScore") {
      dispatch(orderScoreAsc());
      setRefreshState((prevState) => !prevState);
      setPage(1);
    } else if (e.target.value === "descScore") {
      dispatch(orderScoreDesc());
      setRefreshState((prevState) => !prevState);
      setPage(1);
    }
  };

  const handleFilter = (e) => {
    dispatch(filterDiets(e.target.value));
    setPage(1);
  };

  /* ---------------------------------- */

  return (
    <div className={style.img}>
      <div className={style.bg}>
        <div className={style.navBar}>
          <Navbar paginado={paginado} />
        </div>
        <div>
          <div className={style.filtroPaginado}>
            <div>
              <div className={style.sortFilter}>
                <select onChange={handleSortTitle} defaultValue="default">
                  <option value="default" disabled>
                    Sort by Title
                  </option>
                  <option value="orderAZ">Recipes A-Z</option>
                  <option value="orderZA">Recipes Z-A</option>
                </select>
                <select onChange={handleSortScore} defaultValue="default">
                  <option value="default" disabled>
                    Sort by Score
                  </option>
                  <option value="ascScore">Ascendente</option>
                  <option value="descScore">Descendente</option>
                </select>
                <select onChange={handleFilter} defaultValue="default">
                  <option value="default" disabled>
                    Diets
                  </option>
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
          </div>
          <div className={style.card}>
            <div className={style.card1}>
              {currentRecipes?.map((r) => {
                return (
                  <div key={r.id}>
                    <Card id={r.id} title={r.title} img={r.img} diets={r.diets} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}