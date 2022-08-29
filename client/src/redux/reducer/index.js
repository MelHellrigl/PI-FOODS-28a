import {
  GET_RECIPES,
  GET_DIETS,
  GET_RECIPES_ID,
  GET_RECIPES_NAME,
  CREATE_RECIPE,
  ORDER_AZ,
  ORDER_ZA,
  ORDER_SCORE_ASC,
  ORDER_SCORE_DESC,
  FILTER_DIETS,
  CLEAR,
  LOADING,
} from "../actions";

const initialState = {
  recipe: [],
  recipesAll: [],
  diets: [],
  recipeDetail: {},
  loading: true,
};

const rootRouter = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipe: action.payload,
        recipesAll: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPES_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_RECIPES_NAME:
      return {
        ...state,
        recipe: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
      };
    case ORDER_AZ:
      let resultAZ = state.recipe.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        recipe: resultAZ,
      };
    case ORDER_ZA:
      let resultZA = state.recipe.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        return 0;
      });
      return {
        ...state,
        recipe: resultZA,
      };
    case ORDER_SCORE_ASC:
      let resultAsc = state.recipe.sort(function (a, b) {
        if (a.healthScore > b.healthScore) return -1;
        if (a.healthScore < b.healthScore) return 1;
        return 0;
      });
      return {
        ...state,
        recipe: resultAsc,
      };
    case ORDER_SCORE_DESC:
      let resultDesc = state.recipe.sort(function (a, b) {
        if (a.healthScore > b.healthScore) return 1;
        if (a.healthScore < b.healthScore) return -1;
        return 0;
      });
      return {
        ...state,
        recipe: resultDesc,
      };
    case FILTER_DIETS:
      let dietFilter = [];
      let allRecipesAux = state.recipesAll;
      if (action.payload === "all") {
        dietFilter = allRecipesAux;
      } else {
        dietFilter = allRecipesAux.filter((r) =>
          r.diets?.some((d) => d.name.toLowerCase() === action.payload.toLowerCase())
        );
      }
      return {
        ...state,
        recipe: dietFilter,
      };
    case CLEAR:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootRouter;
