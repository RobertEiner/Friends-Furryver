var express = require('express');
var router = express.Router();
const animal = require('../models/animal');

router.post('/animals', function(req, res, next) {
    var newAnimal = new animal(req.body);
    newAnimal.save(function(err, newAnimal) {
        if(err) { return next(err); }
        res.status(201).json(newAnimal);
    })
});


//get animal by filter
router.get('/animals', function(req, res, next) {
    var filter = req.query.species;
     animal.find(function (err, animal) {
        if(err) {return next(err); }
        if(filter) {
            res.json(animal.filter(function (e){
                return filter === e.species;
            }))
        } res.json({'animals': animal});
     })      
});


router.get('/animals/:id', function(req, res, next){
    var id = req.params.id;
    animal.findById(id, function(err, animal) {
        if(err) { return next(err); }
        if(animal == null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});

router.get('/animals/species/:species', function(req, res, next){
    var Species = req.params.species;
    animal.find({species: Species.toString() }, function(err, animal) {
        if(err) { return next(err); }
        if(animal == null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});

router.get('/animals/age/:age', function(req, res, next){
    var ageOfAnimal = req.params.age;
    animal.find({age: ageOfAnimal}, function(err, animal) {
        if(err) { return next(err); }
        if(animal == null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});




router.put('/animals/:id', function(req, res, next) {
    var id = req.params.id;
    animal.findById(id, function(err, animal) {
        if(err) {return next(err); }
        if(animal == null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        animal.size = req.body.size;
        animal.species = req.body.species;
        animal.breed = req.body.breed;
        animal.personality = req.body.personality;
        animal.healthStatus = req.body.healthStatus;
        animal.gender = req.body.gender;
        animal.age = req.body.age;
        animal.hours = req.body.hours;
        animal.otherNeeds = req.body.otherNeeds;
        animal.save();
        res.json(animal);
    });
});

router.patch('/animals/:id', function(req, res, next) {
    var id = req.params.id;
    animal.findById(id, function(err, animal) {
        if(err) { return next(err); }
        if(animal == null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        animal.size = (req.body.size || animal.size);
        animal.species = (req.body.species || animal.species);
        animal.breed = (req.body.breed || animal.breed);
        animal.personality = (req.body.personality || animal.personality);
        animal.healtStatus = (req.body.healthStatus || animal.healtStatus) ;
        animal.gender = (req.body.gender || animal.gender);
        animal.age = (req.body.age || animal.age);
        animal.hours = (req.body.hours || animal.hours);
        animal.otherNeeds = (req.body.otherNeeds || animal.otherNeeds);
        animal.save();
        res.json(animal);
    });
});

router.delete('/animals/:id', function(req, res, next){
    var id = req.params.id;
    animal.findOneAndDelete({_id: id}, function(err, animal) {
        if(err) { return next(err); }
        if(animal == null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    })
})

module.exports = router;

 