var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adoptionCenterSchema = new Schema({
    name: { type: String },
    address: { type: String }
})

var AdoptionCenter = mongoose.model('adopters', adopterSchema);
