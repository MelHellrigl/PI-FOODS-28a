const router = require("express").Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  //   deleteRecipe,
  //   editRecipe,
} = require("../controllers/getRecipes");

router.get("/recipes", getRecipes);
router.get("/recipes/:idReceta", getRecipeById);
router.post("/recipes", createRecipe);
// router.delete("/recipesDlt", deleteRecipe);
// router.put("/recipesEdt/:idReceta", editRecipe);

module.exports = router;
