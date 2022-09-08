var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adopterSchema = new Schema({
    ssn: { type: String },
    name: { type: String },
    age: { type: Number },
    petPreferences: {
        species: { type: String },
        size: { type: String },
        hours: { type: Number },
        personality: { type: String }
    }
})

var Adopter = mongoose.model('adopters', adopterSchema);
