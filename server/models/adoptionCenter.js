var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adoptionCenterSchema = new Schema({
    name: { type: String },
    address: { type: String }
})

module.exports = mongoose.model('adoptionCenters', adoptionCenterSchema);
