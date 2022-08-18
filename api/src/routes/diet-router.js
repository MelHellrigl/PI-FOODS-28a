const router = require("express").Router();
const { getDiets } = require("../controllers/getDiet");

router.get("/diets", getDiets);

module.exports = router;
