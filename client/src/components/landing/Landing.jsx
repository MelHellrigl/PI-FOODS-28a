import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={style.bgImg}>
      <div className={style.bgImg2}>
        <div className={style.bgImg3}>
          <h1>HENRY FOOD</h1>

          <Link to="/recipes">
            <button>Welcome</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
