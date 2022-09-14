var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adoptionCenterSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String }
})

module.exports = mongoose.model('adoptionCenters', adoptionCenterSchema);
