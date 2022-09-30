var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adoptionCenterSchema = new Schema({
    //emailAddress: { type: String, required: true},
    //password: { type: String, required: true},
    name: { type: String, required: true },
    address: { type: String }
})

module.exports = mongoose.model('adoptionCenters', adoptionCenterSchema);
