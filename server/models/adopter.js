var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adopterSchema = new Schema({
    ssn: { type: String },
    name: { type: String },
    age: { type: Number },
    petPreferences: {
        species: { type: Number },
        size: { type: Number },
        hours: { type: Number },
        personality: { type: Number }
    }
})

var Adopter = mongoose.model('adopters', adopterSchema);
