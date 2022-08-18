const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipes-router");
const dietsRouter = require("./diet-router");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(recipesRouter);
router.use(dietsRouter);

module.exports = router;
