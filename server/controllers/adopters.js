var express = require('express');
var router = express.Router();
var AdoptionApplication = require('../models/adoptionApplication');
const animal = require('../models/animal');
var Animal = require('../models/animal')
var Adopter = require('../models/adopter');
var auth = require('../config/auth');

//create an adopter
registerNewAdopter = async (req, res) => {
    try {
     let isAdopter = await Adopter.find({ email: req.body.email });
     console.log(isAdopter);
      if (isAdopter.length >= 1) {
        return res.status(400).json({
          message: "email already in use"
        });
      }
      const adopter = new Adopter(req.body);
      let data = await adopter.save();
      const token = await adopter.generateAuthToken(); // here it is calling the method that we created in the model
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
 router.post('/api/adopters/register', registerNewAdopter);

 //login as adopter
 loginAdopter = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const adopter = await Adopter.findByCredentials(email, password);
      const token = await adopter.generateAuthToken();
      res.status(201).json({ adopter, token });
    } catch (err) {
        if (err.message === "Invalid login details") {
            res.status(401).json(err);
        } else {
            res.status(400).json(err);
        }
    }
  };
  router.post('/api/adopters/login', loginAdopter);

//login auth for postman
getUserDetails = async (req, res) => {
    await res.json(req.userData);
  };
router.get('/api/adopters/me', auth, getUserDetails);

//get all adopters
router.get('/api/adopters', function (req, res, next) {
    Adopter.find(function (err, adopters) {
        if (err) { return next(err); }
        res.json({ 'adopters': adopters })
    });
});

//get adopter by id
router.get('/api/adopters/:id', function (req, res, next) {
    var id = req.params.id;
    Adopter.findById(id, function (err, adopter) {
        if (adopter === null) {
            return res.status(404).json({ 'message': 'Adopter not found' })
        }
        if (err) { return next(err); }
        res.json(adopter);
    });
});

//update adopter
router.put('/api/adopters/:id', function(req, res, next) {
    var id = req.params.id;
    Adopter.findByIdAndUpdate(id, {$set: req.body}, {new: true}, function(err, adopter) {
        if (err) {return next(err);}
        if (adopter === null) {
            res.status(404).json({'message': 'Adopter not found'});
        }
        res.status(200).json(adopter);
    });
});

//update some of the adopter's attributes
router.patch('/api/adopters/:id', function(req, res, next){
    var id = req.params.id;
    Adopter.findById(id, function(err, adopter) {
        if(err) { return next(err); }
        if(adopter === null) {
            return res.status(404).json({'Message': 'adopter not found'})
        }
        adopter.name = (req.body.name || adopter.name);
        adopter.username = (req.body.name || adopter.username);
        if (req.body.petPreferences) {
            adopter.petPreferences.species = (req.body.petPreferences.species ||  adopter.petPreferences.species);
            adopter.petPreferences.size = (req.body.petPreferences.size ||  adopter.petPreferences.size);
            adopter.petPreferences.hours = (req.body.petPreferences.hours ||  adopter.petPreferences.hours);
            adopter.petPreferences.personality = (req.body.petPreferences.personality ||  adopter.petPreferences.personality);
        }

        adopter.save();
        res.json(adopter)
    });
});

//get all adoption applications for a specific user
router.get('/api/adopters/:id/adoption-applications', function(req, res, next) {
    var adopterId = req.params.id;
    AdoptionApplication.find({adopter: adopterId}).populate('animal').exec(function(err, adoptionApplications) {
        if (err) { return next(err); }
        res.status(200).json({"AdoptionApplications": adoptionApplications})
    })
});

//get all animals that the user hasn't made an application yet
router.get('/api/adopters/:id/animals', function(req, res, next) {
    var adopterId = req.params.id;
    var adopterApplications;
    var alreadyAppliedAnimalsId;
    AdoptionApplication.find({adopter: adopterId}, (err, adoptionApplications) => {
        if (err) {return next(err)}
        adopterApplications = adoptionApplications
        alreadyAppliedAnimalsId = adopterApplications.map((application) => application.animal )

        if (Object.keys(req.query).length === 0) {
            Animal.find({_id: {$nin: alreadyAppliedAnimalsId}}, (err, animals) => {
                if (err) { return next(err) }
                res.json({"Animals": animals})
            })
        } else {
            var animals = Animal.find({_id: {$nin: alreadyAppliedAnimalsId}})
            const filters = Object.getOwnPropertyNames(req.query)
            filters.map((field) => {
                animals = animals.where(field).in(req.query[field])
            })
            animals.exec((err, animals) => {
                res.json({"Animals": animals})
                if (err) { return next(err) }
            })
        }
    })

});

//get specific adoption application for a specific user
router.get('/api/adopters/:id/adoption-applications/:adoptionApplicationId', function(req, res, next) {
    var adopterId = req.params.id;
    var adoptionApplicationId = req.params.adoptionApplicationId;
    Adopter.findById(adopterId, function (err, adopter) {
        if (err) { return next(err); }
        if (adopter === null) {
            return res.status(404).json({ 'message': 'Adopter not found' })
        }
    });
    AdoptionApplication.findById(adoptionApplicationId, function(err, adoptionApplication) {
        if(err) { next(err); }
        if (adoptionApplication === null) {
            return res.status(404).json({ 'message': 'Adoption application not found' })
        }
        res.status(200).json(adoptionApplication);
    });
});

//delete specific adoption application of a specific user
router.delete('/api/adopters/:id/adoption-applications/:adoptionApplicationId', function(req, res, next) {
    var adopterId = req.params.id;
    var adoptionApplicationId = req.params.adoptionApplicationId;
    Adopter.findById(adopterId, function (err, adopter) {
        if (err) { return next(err); }
        if (adopter === null) {
            return res.status(404).json({ 'message': 'Adopter not found' });
        }
    });
    AdoptionApplication.findByIdAndDelete(adoptionApplicationId, function (err, adoptionApplication) {
        if (err) { return next(err); }
        if (adoptionApplication === null) {
            return res.status(404).json({ 'message': 'Adoption application not found' });
        }
        res.status(200).json(adoptionApplication);
    });
});

//delete adopter by id
router.delete('/api/adopters/:id', function (req, res, next) {
    var id = req.params.id;
    Adopter.findOneAndDelete({ _id: id }, function (err, adopter) {
        if (err) { return next(err); }
        if (adopter === null) {
            return res.status(404).json({ 'message': 'Adopter not found' })
        }
        AdoptionApplication.deleteMany({"adopter": id}, function(err){
            if (err) { return next(err) }
        });
        res.json(adopter);
    });
});

module.exports = router;