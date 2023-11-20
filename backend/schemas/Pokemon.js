const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: {
    english: String,
    japanese: String,
    chinese: String,
    french: String,
  },
  type: [String],
  base: {
    Attack: Number,
    Defense: Number,
    HP: Number,
    Speed: Number,
    SpAttack: Number,
    SpDefense: Number,
  },
  imageUrl: String,
  backImageUrl: String,
  matches: Number,
  wins: Number,
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
