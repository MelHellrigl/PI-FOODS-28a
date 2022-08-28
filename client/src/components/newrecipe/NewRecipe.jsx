import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../../redux/actions";
import style from "./NewRecipe.module.css";

/* ************ VALIDATION ************ */

function validation(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "The title is required.";
  }
  if (input.title.length <= 2 || input.title.length >= 20) {
    errors.title = "The title requires from 2 to 20 letters.";
  }

  if (!input.summary) {
    errors.summary = "The summary is required.";
  } else if (input.summary.length <= 2 || input.summary.length >= 300) {
    errors.summary = "The title requires from 2 to 200 letters.";
  }

  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "The score must be a number between 1 and 100.";
  }

  if (
    !/https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/.test(
      input.img
    )
  ) {
    errors.img = "Url incorrect.";
  }

  return errors;
}

/* ************ NEW RECIPE ************ */

export default function NewRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    img: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  /* ************ HANDLES ************ */

  const handleChangeInput = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      // de esta manera el componente muestra los cambios para poder ir validando
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validations = validation(newInput);
      setErrors(validations);
      return newInput;
    });
    // setErrors(
    //   validation({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const handleChangeSelect = (e) => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
    e.target.value = "default";
  };

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    if (input.title && input.img && input.summary && input.healthScore) {
      dispatch(createRecipe(input));
      alert("Recipe Created");
      setInput({
        title: "",
        img: "",
        summary: "",
        healthScore: "",
        analyzedInstructions: "",
        diets: [],
      });
      history.push("/recipes");
    } else {
      alert("Ops! There is incomplete data");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((dietita) => dietita !== e.target.value),
    });
  };

  /* ---------------------------------- */

  return (
    <div className={style.bgImg}>
      <div className={style.bg}>
        <div className={style.nav}>
          <Link to="/recipes">
            <button>Home</button>
          </Link>
        </div>
        <div className={style.position}>
          <div className={style.bgDetail}>
            <h1>New Recipe</h1>
            <div className={style.contenido}>
              <form onSubmit={(e) => handleChangeSubmit(e)}>
                <div>
                  <label>Title: </label>
                  <input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.title && <span>{errors.title}</span>}
                  <br />
                </div>
                <div>
                  <label>Image url: </label>
                  <input
                    type="text"
                    name="img"
                    value={input.img}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.img && <span>{errors.img}</span>}
                  <br />
                </div>
                <div>
                  <label>Health Score: {`${input.healthScore}%`}</label>
                  <input
                    type="range"
                    name="healthScore"
                    value={input.healthScore}
                    onChange={(e) => handleChangeInput(e)}
                    min={0}
                    max={100}
                  />
                  {errors.healthScore && <span>{errors.healthScore}</span>}
                  <br />
                </div>
                <div>
                  <label>Summary: </label>
                  <textarea
                    type="text"
                    name="summary"
                    value={input.summary}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.summary && <span>{errors.summary}</span>}
                  <br />
                </div>
                <div>
                  <label>Instructions: </label>
                  <textarea
                    type="text"
                    name="analyzedInstructions"
                    value={input.analyzedInstructions}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <br />
                </div>
                <div>
                  <label>Diets: </label>
                  <select onChange={(e) => handleChangeSelect(e)} defaultValue="default">
                    {diets &&
                      diets.map((d) => {
                        return (
                          <option key={d.id} name="diets" value={d.name}>
                            {d.name}
                          </option>
                        );
                      })}
                  </select>
                  <div className={style.dietas}>
                    <div>
                      {input.diets.map((e) => (
                        <div>
                          <button value={e} onClick={(e) => handleDelete(e)}>
                            x
                          </button>
                          <h4>{e}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                  <br />
                </div>

                <div className={style.btnSubmit}>
                  <button type="submit">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
