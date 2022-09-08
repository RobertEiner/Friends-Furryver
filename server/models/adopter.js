var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adopterSchema = new Schema({
    ssn: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number },
    petPreferences: {
        species: { type: String },
        size: { type: String },
        hours: { type: Number, required: true },
        personality: { type: String }
    }
})

var Adopter = mongoose.model('adopters', adopterSchema);
