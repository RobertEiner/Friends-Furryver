var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var animalSchema = new Schema({
  size: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  personality: { type: String },
  healthStatus: { type: String },
  gender: { type: String },
  age: { type: Number },
  hours: { type: Number, required: true },
  otherNeeds: { type: String },
  adoptionCenter: { type: Schema.Types.ObjectId, ref: 'adoptionCenters'}
  
});

module.exports = mongoose.model("animals", animalSchema);
