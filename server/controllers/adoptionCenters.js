var express = require('express');
var router = express.Router();
var Animal = require('../models/animal');
var AdoptionCenter = require('../models/adoptionCenter');

//create an adoption center
router.post('/api/AdoptionCenters', function(req, res, next) {
    var newAdoptionCenter = new AdoptionCenter(req.body);
    newAdoptionCenter.save(function(err, newAdoptionCenter) {
        if (err) { return next (err);}
        res.status(201).json(newAdoptionCenter);
    });
});



//retrieve all adoption centers
router.get('/api/AdoptionCenters', function (req, res, next){
    AdoptionCenter.find(function(err,AdoptionCenters) {
        if (err) { return next (err); }
        res.json({"AdoptionCenters": AdoptionCenters});
    });
});

//retrieve one adoption center
router.get('/api/AdoptionCenters/:id', function (req, res, next) {
    var id = req.params.id;

    AdoptionCenter.findById(id, function(err, AdoptionCenter) {
        if (err) { return next(err); }
        if (AdoptionCenter === null) {
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
        res.status(200).json({"Animals": animals});

    })
});

router.post('/api/adoptionCenters/:id/animals', function(req, res, next) {
    var adoptionCenterId = req.params.id;
    var animalInfo = req.body;
    var newAnimal = new Animal({...animalInfo, adoptionCenter: adoptionCenterId});
    newAnimal.save(function(err, newAnimal) {
        if(err) { return next(err); }
        res.status(201).json(newAnimal);
    });
});

//update an adoption center
router.put('/api/adoptionCenters/:id', function(req, res, next) {
    var id = req.params.id;
    AdoptionCenter.findById(id, function(err, adoptionCenter) {
        if (err) { return next(err); }
        if (adoptionCenter === null) {
            return res.status(404).json({"message" : "Adoption center not found"});
        }
        adoptionCenter.name = req.body.name;
        adoptionCenter.address = req.body.address;
        adoptionCenter.save();
        res.json(adoptionCenter);
    });
   });
   
//partially update an adoption center
router.patch('/api/adoptionCenters/:id', function(req, res, next) {
    var id = req.params.id;
    AdoptionCenter.findById(id, function(err, adoptionCenter) {
    if (err) { return next(err); }
    if(adoptionCenter === null) {
        return res.status(404).json({"message" : "Adoption center not found"});
    }
    adoptionCenter.name = (req.body.name || adoptionCenter.name); 
    adoptionCenter.address = (req.body.address || adoptionCenter.address);
    adoptionCenter.save();
    res.json(adoptionCenter);
    });
});

//delete adoption center by id
router.delete('/api/AdoptionCenters/:id', function(req, res, next) {
    var id = req.params.id;
    AdoptionCenter.findOneAndDelete({ _id: id }, function(err, adoptionCenter) {
        if (err) { return next (err) }
        if (adoptionCenter === null) {
            return res.status(404).json({"message" : "Adoption center not found"});
        }
        Animal.deleteMany({"adoptionCenter": id}, function(err, animal){
            if (err) { return next(err) }
        });
        res.json(adoptionCenter);
    });
});

module.exports = router;