import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { getRecipes, loadingAction } from "../../redux/actions";
import Logo from "../../Image/natural-1281596-removebg-preview (1).png";
import Refreash from "../../Image/redo__1_-removebg-preview.png";

export default function Navbar({ paginado }) {
  const dispatch = useDispatch();

  function handleRecipes(e) {
    e.preventDefault();
    dispatch(getRecipes());
    paginado(1);
    dispatch(loadingAction(true));
    setTimeout(() => {
      dispatch(loadingAction(false));
    }, 3000);
  }

  return (
    <div className={style.bg}>
      <div className={style.bgHyC}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
          {/* <button>Home</button> */}
        </Link>
        <div className={style.refreash}>
          <img src={Refreash} alt="Refreash" onClick={(e) => handleRecipes(e)} />
        </div>
        <Link to="/createRecipe">
          <button>Create</button>
        </Link>
      </div>
      <div className={style.bgSearch}>
        <SearchBar paginado={paginado} />
      </div>
    </div>
  );
}
