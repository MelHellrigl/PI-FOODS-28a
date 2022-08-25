import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";

export default function Navbar({ paginado }) {
  const dispatch = useDispatch();

  function handleRecipes(e) {
    e.preventDefault();
    dispatch(getRecipes());
    paginado(1);
  }
  return (
    <div className={style.App}>
      <div className={style.App1}>
        <Link to="/recipes">
          <button>Home</button>
        </Link>
        <Link to="/createRecipe">
          <button>Create</button>
        </Link>
        <button onClick={(e) => handleRecipes(e)}>Refreash</button>
      </div>
      <div className={style.App2}>
        <SearchBar paginado={paginado} />
      </div>
    </div>
  );
}
