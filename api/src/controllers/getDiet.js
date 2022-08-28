require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY7 } = process.env;
const { Diet } = require("../db");

//           ----------- GET DIETS -----------

const getDiets = async (req, res) => {
  try {
    const dietsDB = await Diet.findAll();
    if (dietsDB.length) {
      return res.status(200).json(dietsDB);
    } else {
      let diets = ["vegetarian", "lacto - vegetarian", "ovo - vegetarian", "low FODMAP"];

      const dietsAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY7}&addRecipeInformation=true&number=100`
      );

      dietsAPI.data.results.forEach((e) => {
        e.diets.forEach((d) => {
          diets = [...diets, d];
        });
      });

      const dietsAll = new Set(diets);

      dietsAll.forEach(async (e) => {
        await Diet.findOrCreate({ where: { name: e } });
      });

      const dietsALLFinal = await Diet.findAll({ attributes: ["name"] });

      return res.status(200).send(dietsALLFinal);
    }
  } catch (error) {
    return res.status(404).send("There are no results in the search");
  }
};

module.exports = { getDiets };
