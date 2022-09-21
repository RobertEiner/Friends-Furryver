var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adoptionApplicationSchema = new Schema({
    status: { type: Number },
    adoptionCenter: { type: Schema.Types.ObjectId, ref: 'adoptionCenter'},
    animal: { type: Schema.Types.ObjectId, ref: 'animal'},
    adopter: { type: Schema.Types.ObjectId, ref: 'adopter'}
})

module.exports = mongoose.model('adoptionApplications', adoptionApplicationSchema);
