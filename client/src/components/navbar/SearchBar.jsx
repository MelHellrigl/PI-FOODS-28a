import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../redux/actions";
import style from "./Navbar.module.css";

export default function SearchBar({ paginado }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    try {
      dispatch(getRecipesName(title));
      paginado(1);
      setTitle("");
    } catch (error) {
      return error;
    }
  };

  return (
    <div className={style.bgIyBtn}>
      <input type="text" placeholder="Search..." onChange={handleInputChange} value={title} />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
