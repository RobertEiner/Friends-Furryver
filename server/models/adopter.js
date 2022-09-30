var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adopterSchema = new Schema({
    emailAddress: { type: String, required: true },
    password: { type: String, required: true },
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

module.exports = mongoose.model('adopters', adopterSchema);
