var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adoptionApplicationSchema = new Schema({
    status: { type: Number },
    adoptionCenter: { type: Schema.Types.ObjectId, ref: 'adoptionCenters'},
    animal: { type: Schema.Types.ObjectId, ref: 'animals'},
    adopter: { type: Schema.Types.ObjectId, ref: 'adopters'}
})

module.exports = mongoose.model('adoptionApplications', adoptionApplicationSchema);
