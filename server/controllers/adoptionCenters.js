var express = require('express');
var router = express.Router();
var adoptionCenter = require('../models/adoptionCenter');
var Animal = require('../models/animal')

//create an adoption center
router.post('/api/adoptionCenters', function(req, res, next) {
    var newAdoptionCenter = new adoptionCenter(req.body);
    newAdoptionCenter.save(function(err, newAdoptionCenter) {
        if (err) { return next (err);}
        res.status(201).json(newAdoptionCenter);
    });
});



//retrieve all adoption centers
router.get('/api/adoptionCenters', function (req, res, next){
    adoptionCenter.find(function(err,adoptionCenters) {
        if (err) { return next (err); }
        res.json({"adoptionCenters": adoptionCenters});
    });
});

//retrieve one adoption center
router.get('/api/adoptionCenters/:id', function (req, res, next) {
    var id = req.params.id;
    adoptionCenter.findById(id, function(err, AdoptionCenter) {
        if (err) { return next(err); }
        if (adoptionCenter == null) {
            return res.status(404).json({"message": "Adoption center not found"});
        }
        res.json(AdoptionCenter);
    });
});

//get animals of a specific adoption center
router.get('/api/adoptionCenters/:id/animals', function(req, res, next) {
    var adoptionCenterId = req.params.id;
    Animal.find({adoptionCenter: adoptionCenterId}, function(err, animals) {
        if(err) { next(err); }
        res.status(200).json(animals);

    })
});

//update an adoption center
router.put('/api/adoptionCenters/:id', function(req, res, next) {
    var id = req.params.id;
    adoptionCenter.findByIdAndUpdate(id, function(err, adoptionCenter) {
        if (err) { return next(err); }
        if (adoptionCenter == null) {
            return res.status(404).json({"message" : "Adoption center not found"});
        }
        adoptionCenter.name = req.body.name;
        adoptionCenter.address = req.body.address;
        adoptionCenter.save();
        res.json(adoptionCenter);
    });
   });
   
//partially update an adoption center
router.patch('api/adoptionCenters/:name', function(req, res, next) {
    var id = req.params.id;
    adoptionCenter.updateOne({_id: id}, {$set: req.body}, {new: true}, function(err, adoptionCenter) {
    if (err) { return next(err); }
    if(adoptionCenter == null) {
        return res.status(404).json({"message" : "Adoption center not found"});
    }
    adoptionCenter.name = (req.body.name || adoptionCenter.name);
    adoptionCenter.address = (req.body.address || adoptionCenter.address);
    adoptionCenter.save();
    res.json(adoptionCenter);
    });
});

//delete adoption center by id
router.delete('/api/adoptionCenters/:id', function(req, res, next) {
    var id = req.params.id;
    adoptionCenter.findOneAndDelete({ _id: id }, function(err, adoptionCenter) {
        if (err) { return next (err) }
        if (adoptionCenter == null) {
            return res.status(404).json({"message" : "Adoption center not found"});
        }
        res.json(adoptionCenter);
    });
});

module.exports = router;