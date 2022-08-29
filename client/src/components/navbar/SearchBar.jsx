import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName, loadingAction } from "../../redux/actions";
import style from "./Navbar.module.css";
import Lupa from "../../Image/magnifying-glass-4186151.png";

export default function SearchBar({ paginado }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    dispatch(getRecipesName(title));
    paginado(1);
    setTitle("");
    dispatch(loadingAction(true));
    setTimeout(() => {
      dispatch(loadingAction(false));
    }, 3000);
  };

  return (
    <div className={style.bgIyBtn}>
      <input type="text" placeholder="Search..." onChange={handleInputChange} value={title} />
      <div>
        {/* <button type="submit" onClick={(e) => handleSubmit(e)}> */}
        <img src={Lupa} alt="Search" onClick={(e) => handleSubmit(e)} />
        {/* </button> */}
      </div>
    </div>
  );
}
