import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../../redux/actions";

/* ************ VALIDATION ************ */

function validation(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "The title is required.";
  }
  if (!input.summary) {
    errors.summary = "The summary is required.";
  }
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "The score must be a number between 1 and 100.";
  }
  if (!input.img) {
    errors.img = "The image is required.";
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
    if (input.title && input.img && input.summary) {
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

  // FALTA SCORE??????
  return (
    <div>
      <Link to="/recipes">
        <button>Home</button>
      </Link>
      <h1>Create New Recipe</h1>
      <form onSubmit={(e) => handleChangeSubmit(e)}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div>
          <label>Image url: </label>
          <input type="text" name="img" value={input.img} onChange={(e) => handleChangeInput(e)} />
          <br />
          {errors.img && <span>{errors.img}</span>}
        </div>
        <div>
          <label>Health Score: </label>
          <input
            type="number"
            name="healthScore"
            value={input.healthScore}
            onChange={handleChangeInput}
          />
          <br />
          {errors.healthScore && <span>{errors.healthScore}</span>}
        </div>
        <div>
          <label>Summary: </label>
          <textarea
            type="text"
            name="summary"
            value={input.summary}
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          {errors.summary && <span>{errors.summary}</span>}
        </div>
        <div>
          <label>Analyzed Instructions: </label>
          <textarea
            type="text"
            name="analyzedInstructions"
            value={input.analyzedInstructions}
            onChange={(e) => handleChangeInput(e)}
          />
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
          <ul>
            {input.diets.map((e) => (
              <div>
                <li>{e}</li>
                <button value={e} onClick={(e) => handleDelete(e)}>
                  x
                </button>
              </div>
            ))}
          </ul>
        </div>

        <div>
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
}
