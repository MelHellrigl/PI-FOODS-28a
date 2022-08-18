const router = require("express").Router();
const { getRecipes, getRecipeById, createRecipe } = require("../controllers/getRecipes");

router.get("/recipes", getRecipes);
router.get("/recipes/:idReceta", getRecipeById);
router.post("/recipes", createRecipe);

module.exports = router;
