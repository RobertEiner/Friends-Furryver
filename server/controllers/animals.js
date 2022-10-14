var express = require('express');
var router = express.Router();
const Animal = require('../models/animal');
const multer = require('multer');
const AdoptionApplication = require('../models/adoptionApplication');


// Code related to multer and image uploads are left for a potential future 
// implementation of uploading images to animals 
const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './imageUploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})


//initialize multer and store all files in imageUploads
const upload = multer({storage: Storage});

//Create a new animal
//calling upload.single() before the handler, the file will be parsed
router.post('/api/animals', upload.single('animalImage'), function(req, res, next) {
    console.log(req.file);
    var newAnimal = new Animal({
        size: req.body.size,
        species: req.body.species,
        breed: req.body.breed,
        personality: req.body.personality,
        healthStatus: req.body.healthStatus,
        gender: req.body.gender,
        age: req.body.age,
        hours: req.body.hours,
        otherNeeds: req.body.otherNeeds,
        //animalImage: req.file.path,
        adoptionCenter: req.body.adoptionCenter
    });
    newAnimal.save(function(err, newAnimal) {
        if(err) { return next(err); }
        res.status(201).json(newAnimal);
    })
});

//Get animals by filter: species. If no filter is specified, all animals will be returned.
router.get('/api/animals', function(req, res, next) {
    if(!Object.keys(req.query).length == 0){
        var speciesFilter = req.query.species;
        Animal.find({species: speciesFilter}, function (err, animals) {
           if(err) {return next(err);}
           else if(speciesFilter === undefined) {
              return res.status(404).json({'Message': 'animal not found'});
           } else {
               res.status(200).json(animals);
           }
        });    
    } else {
        Animal.find(function(err, animals) {
            if(err) {return next(err);}
            res.status(200).json({'Animals': animals})
        })
    }
    
});

//Get the animal by id and populate it with the adoption center it belongs to
router.get('/api/animals/:animalId/adoptionCenters', function(req, res, next) {
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
router.get('/api/animals/:id', function(req, res, next){
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
router.get('/api/animals/species/:species', function(req, res, next){
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
router.get('/api/animals/age/:age', function(req, res, next){
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
router.put('/api/animals/:id', function(req, res, next) {
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
router.patch('/api/animals/:id', function(req, res, next) {
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
        animal.healthStatus = (req.body.healthStatus || animal.healthStatus) ;
        animal.gender = (req.body.gender || animal.gender);
        animal.age = (req.body.age || animal.age);
        animal.hours = (req.body.hours || animal.hours);
        animal.otherNeeds = (req.body.otherNeeds || animal.otherNeeds);
        animal.save();
        res.json(animal);
    });
});



//delete an animal
router.delete('/api/animals/:id', function(req, res, next){
    var id = req.params.id;
    Animal.findOneAndDelete({_id: id}, function(err, animal) {
        if(err) { return next(err); }
        if(animal === null) {
            return res.status(404).json({'Message': 'animal not found'});
        }
        AdoptionApplication.deleteMany({"animal": id}, function(error) {
            if(err) {return next(err)}
        });
        res.json(animal);
    })
})

module.exports = router;

 