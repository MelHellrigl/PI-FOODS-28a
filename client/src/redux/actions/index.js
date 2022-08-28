import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_ID = "GET_RECIPES_ID";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA";
export const ORDER_SCORE_ASC = "ORDER_SCORE_ASC";
export const ORDER_SCORE_DESC = "ORDER_SCORE_DESC";
export const FILTER_DIETS = "FILTER_DIETS";

export function getRecipes() {
  return async function (dispatch) {
    const recipes = await axios("http://localhost:3001/recipes");
    return dispatch({ type: GET_RECIPES, payload: recipes.data });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const diets = await axios("http://localhost:3001/diets");
    return dispatch({ type: GET_DIETS, payload: diets.data });
  };
}

export function getRecipesId(id) {
  return async function (dispatch) {
    const recipeID = await axios(`http://localhost:3001/recipes/${id}`);
    return dispatch({ type: GET_RECIPES_ID, payload: recipeID.data });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      const recipeName = await axios(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({ type: GET_RECIPES_NAME, payload: recipeName.data });
    } catch (error) {
      alert("The Recipe not exist, but you can Create.");
    }
  };
}

export function createRecipe(value) {
  return async function (dispatch) {
    const createRecipe = await axios.post("http://localhost:3001/recipes", value);
    return dispatch({ type: CREATE_RECIPE, payload: createRecipe.value });
  };
}

export function orderByAZ() {
  return { type: ORDER_AZ };
}

export function orderByZA() {
  return { type: ORDER_ZA };
}

export function orderScoreAsc() {
  return { type: ORDER_SCORE_ASC };
}

export function orderScoreDesc() {
  return { type: ORDER_SCORE_DESC };
}

export function filterDiets(payload) {
  return { type: FILTER_DIETS, payload };
}
