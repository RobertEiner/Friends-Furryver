var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var animalSchema = new Schema({
  size: { type: String },
  species: { type: String },
  breed: { type: String },
  personality: { type: String },
  healthStatus: { type: String },
  gender: { type: String },
  age: { type: Number },
  hours: { type: Number },
  otherNeeds: { type: String },
  adoptionCenter: { type: Schema.Types.ObjectId, ref: 'adoptionCenter'}
  
});

module.exports = mongoose.model("animals", animalSchema);
