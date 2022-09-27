var express = require('express');
var router = express.Router();
const Animal = require('../models/animal');


//Create a new animal
router.post('/animals', function(req, res, next) {
    var newAnimal = new Animal(req.body);
    newAnimal.save(function(err, newAnimal) {
        if(err) { return next(err); }
        res.status(201).json(newAnimal);
    })
});

//Get animals by filter: species
router.get('/api/animals', function(req, res, next) {
    var filter = req.query.species;
     Animal.find(function (err, animal) {
        if(err) {return next(err); 
        } else if(filter === null) {
            res.status(404).json({'Message': 'animal not found'});
        } else if(filter) {
            res.json(animal.filter(function (e){
                return filter === e.species;
            }));
        } else {
            res.json({'Animals': animal});
        }
     });      
});

//Get the animal by id and populate it with the adoption center it belongs to
router.get('/animals/:animalId/adoptionCenters', function(req, res, next) {
    var animalId = req.params.animalId;
    Animal.findById({_id: animalId})
    //'adoptionCenter' here is the name of the property (from animal schema) we want to populate the animal with.
    .populate('adoptionCenter')
    .exec(function(err, animal) {
        if(err) {return next(err);} 
        if(animal === null) {
            res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});


//Get animal by ID
router.get('/animals/:id', function(req, res, next){
    var id = req.params.id;
    Animal.findById(id, function(err, animal) {
        if(err) { return next(err); }
        if(animal === null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});

//Get all animals of a certain species
router.get('/animals/species/:species', function(req, res, next){
    var Species = req.params.species;
    Animal.find({species: Species.toString() }, function(err, animal) {
        if(err) { return next(err); }
        if(animal === null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});

//Get all animals of certain age
router.get('/animals/age/:age', function(req, res, next){
    var ageOfAnimal = req.params.age;
    Animal.find({age: ageOfAnimal}, function(err, animal) {
        if(err) { return next(err); }
        if(animal === null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    });
});


//Update the entire animal
router.put('/animals/:id', function(req, res, next) {
    var id = req.params.id;
    Animal.findById(id, function(err, animal) {
        if(err) {return next(err); }
        if(animal === null) {
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

//Update parts of the animal
router.patch('/animals/:id', function(req, res, next) {
    var id = req.params.id;
    Animal.findById(id, function(err, animal) {
        if(err) { return next(err); }
        if(animal === null) {
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



//delete an animal
router.delete('/animals/:id', function(req, res, next){
    var id = req.params.id;
    Animal.findOneAndDelete({_id: id}, function(err, animal) {
        if(err) { return next(err); }
        if(animal === null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        res.json(animal);
    })
})

module.exports = router;

 