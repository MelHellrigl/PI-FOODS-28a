import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ recipePage, recipes, paginado, page }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(recipes / recipePage); i++) {
    pages.push(i);
  }

  return (
    <div className={style.bgImg}>
      <h1>Página: </h1>
      <button type="button" onClick={() => paginado(page === 1 ? page : page - 1)}>
        Prev
      </button>
      <div>
        {pages &&
          pages.map((n) => {
            return (
              <div key={n}>
                <button type="button" onClick={() => paginado(n)}>
                  {page === n ? "*" : n}
                </button>
              </div>
            );
          })}
      </div>
      <button type="button" onClick={() => paginado(page === pages.length ? page : page + 1)}>
        Next
      </button>
    </div>
  );
}
