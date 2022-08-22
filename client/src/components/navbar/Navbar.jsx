import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Navbar.module.css";

export default function Navbar({ paginado }) {
  return (
    <div className={style.App}>
      <div>
        <Link to="/recipes">
          <button>Home</button>
        </Link>
        <Link to="/createRecipe">
          <button>Create Recipe</button>
        </Link>
      </div>
      <div>
        <SearchBar paginado={paginado} />
      </div>
    </div>
  );
}
