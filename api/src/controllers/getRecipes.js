const axios = require("axios");
require("dotenv").config();
const { YOUR_API_KEY7 } = process.env;
const { Recipe, Diet } = require("../db");

//           ----------- API DATA -----------

//Traigo de la API todas las recetas con sus datos necesarios.

const infoAPI = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY7}&addRecipeInformation=true&number=100`
    );
    const apiInfo = await apiUrl.data.results.map((r) => {
      return {
        id: r.id,
        title: r.title,
        img: r.image,
        diets: r.diets.map((e) => {
          //array con los tipos de dieta de esa receta
          return { name: e };
        }),
        dishTypes: r.dishTypes.map((e) => {
          // tipo de plato
          return { name: e };
        }),
        summary: r.summary, //resumen del plato
        healthScore: r.healthScore, //que tan saludable es
        analyzedInstructions: r.analyzedInstructions, //paso a paso de como se hace
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

//           ----------- DB DATA -----------

//Traigo de la Base de Datos toda la info que necesito.

const infoDB = async () => {
  try {
    const dbInfo = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbInfo;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

//           ----------- GET RECIPE & RECIPE FOR NAME -----------

const getRecipes = async (req, res) => {
  const { name } = req.query;
  //const nameQuery = req.query.name;

  try {
    if (!name) {
      try {
        const apiResponse = await infoAPI(); //traigo todo de la api
        const dbResponse = await infoDB(); //traigo todo de la DB
        return res.status(200).send([...apiResponse, ...dbResponse]); //retorno todo concatenado
      } catch (error) {
        res.status(404).send("ERROR: ", error);
      }
    } else {
      let recipeApi = []; //defino un array
      let recipeDB = [];

      const apiResponse = await infoAPI(); //traigo todo de la api
      recipeApi = apiResponse.filter((r) => {
        //filtro el query
        return r.title.toLowerCase().includes(name.toLowerCase());
      });

      const dbResponse = await infoDB(); //traigo todo de la DB
      recipeDB = dbResponse.filter((r) => {
        //filtro el query
        return r.title.toLowerCase().includes(name.toLowerCase());
      });

      //const allResponse = await Promise.all(recipeDB.concat(recipeApi)); //guardo todo concatenado
      if (!recipeDB.length & !recipeApi.length) {
        return res.status(404).send("There are no results in the search");
      }
      return res.status(200).send([...recipeDB, ...recipeApi]);
    }
  } catch (error) {
    return res.status(404).send("ERROR: ", error);
  }
};

//           ----------- GET RECIPE BY ID -----------

const getRecipeById = async (req, res) => {
  const id = req.params.idReceta;

  try {
    if (id.includes("-")) {
      // const aaaa = Recipe.findByPk(id, { include: Diet });
      // aaaa.forEach((r) => {
      //   return res.status(200).json(r);
      // });
      let aaaa = await infoDB(id);
      return res.status(200).send(...aaaa);
    } else {
      const apiResponse = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY7}`
      );
      return res.status(200).json({
        title: apiResponse.data.title,
        vegetarian: apiResponse.data.vegetarian,
        img: apiResponse.data.image,
        dishTypes: apiResponse.data.dishTypes,
        diets: apiResponse.data.diets,
        summary: apiResponse.data.summary,
        healthScore: apiResponse.data.healthScore,
        analyzedInstructions: apiResponse.data.analyzedInstructions,
      });
    }
  } catch (error) {
    return res.status(404).send("There are no results in the search", error);
  }
};

//           ----------- POST CREATE RECIPE -----------

const createRecipe = async (req, res) => {
  const { title, img, diets, summary, healthScore, analyzedInstructions } = req.body;

  if (!title || !summary) return res.status(404).send("The title and summary are required.");

  try {
    let newRecipe = await Recipe.create({
      title,
      img,
      summary,
      healthScore,
      analyzedInstructions,
    });

    let dietitas = await Diet.findAll({ where: { name: diets } });
    newRecipe.addDiet(dietitas);
    return res.status(200).send("Receta creada");
  } catch (error) {
    return res.status(404).send("Failed creation", error);
  }
};

module.exports = { getRecipes, getRecipeById, createRecipe };
