var express = require('express');
var router = express.Router();
var Animal = require('../models/animal');
var AdoptionCenter = require('../models/adoptionCenter');
var auth = require('../config/auth');
var AdoptionApplication = require('../models/adoptionApplication');

//create an adoption center

registerNewAdoptionCenter = async (req, res) => {
    try {
     let isAdoptionCenter = await AdoptionCenter.find({ email: req.body.email });
     console.log(isAdoptionCenter);
      if (isAdoptionCenter.length >= 1) {
        return res.status(400).json({
          message: "email already in use"
        });
      }
      const adoptionCenter = new AdoptionCenter(req.body);
      let data = await adoptionCenter.save();
      const token = await adoptionCenter.generateAuthToken(); // here it is calling the method that we created in the model
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
router.post('/api/adoptionCenters/register', registerNewAdoptionCenter);

 //login as adoption center
loginAdoptionCenter = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const adoptionCenter = await AdoptionCenter.findByCredentials(email, password);
      const token = await adoptionCenter.generateAuthToken();
      res.status(201).json({ adoptionCenter, token });
    } catch (err) {
        if (err.message === "Invalid login details") {
            res.status(401).json(err);
        } else {
            res.status(400).json(err);
        }
    }
  };
  router.post('/api/adoptionCenters/login')

//login auth for postman
getUserDetails = async (req, res) => {
    await res.json(req.userData);
  };
router.get('/api/adoptionCenters/me', auth, getUserDetails);
router.post('/api/adoptionCenters/login', loginAdoptionCenter);


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

// Get all applications of a specific adoption center
router.get('/api/AdoptionCenters/:id/adoptionApplications', function (req, res, next) {
    var id = req.params.id;

        AdoptionApplication.find({adoptionCenter: id})
        .populate('adopter')
        .populate('animal')
        .exec(function(err, applications)  {
            if(err) {return next(err); }
            res.status(200).json({'Applications': applications})
        })
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
        AdoptionApplication.deleteMany({"adoptionCenter": id}, function(err, adoptionApplication){
            if (err) { return next(err) }
        });
        res.json(adoptionCenter);
    });
});


//Delete a specific adoption application from a specific adoption center
router.delete('/api/adoptionCenters/:adoptionCenterId/adoptionApplications/:applicationId', function(req, res, next) {
    var adoptionCenterId = req.params.adoptionCenterId;
    var applicationId = req.params.applicationId;
    AdoptionCenter.findById(adoptionCenterId, function(err, adoptionCenter) {
        if (err) { return next (err) }
        if (adoptionCenter === null) {
            return res.status(404).json({"Message" : "adoption center not found"});
        }
        AdoptionApplication.findByIdAndDelete(applicationId, function(err, adoptionApplication) {
            if (err) { return next (err) }
            if (adoptionApplication === null) {
            return res.status(404).json({"Message" : "application not found"});
            }
            res.json(adoptionApplication);

        })
    })

})





module.exports = router;