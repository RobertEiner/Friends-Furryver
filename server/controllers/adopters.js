var express = require('express');
var router = express.Router();
var Adopter = require('../models/adopter');
var AdoptionApplication = require('../models/adoptionApplication');


//crete an adopter
router.post('/api/adopters', function (req, res, next) {
    var adopter = new Adopter(req.body);
    adopter.save(function (err, adopter) {
        if (err) { return next(err); }
        res.status(201).json(adopter);
    });
});

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
        if (err) { return next(err); }
        if (adopter === null) {
            return res.status(404).json({ 'message': 'Adopter not found' })
        }
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

//get all adoption applications for a specific user
router.get('/api/adopters/:id/adoption-applications', function(req, res, next) {
    var adopterId = req.params.id;
    AdoptionApplication.find({adopter: adopterId}).populate('animal').exec(function(err, adoptionApplications) {
        if (err) { return next(err); }
        res.status(200).json({"AdoptionApplications": adoptionApplications})
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
        res.json(adopter);
    });
});

module.exports = router;