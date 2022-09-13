var express = require('express');
var router = express.Router();
var AdoptionApplication = require('../models/adoptionApplication');

//create an adoption application
router.post('/api/adoption-applications', function(req, res, next) {
    var adoptionApplication = new AdoptionApplication(req.body);
    adoptionApplication.save(function (err, adoptionApplication) {
        if (err) { return next(err); }
        res.status(201).json(adoptionApplication);
    });
});

//get all adoption applications
router.get('/api/adoption-applications', function (req, res, next) {
    AdoptionApplication.find(function (err, adoptionApplications) {
        if (err) { return next(err); }
        res.json({ 'adoptionApplications': adoptionApplications })
    });
});

//get adoption application by id
router.get('/api/adoption-applications/:id', function(req, res, next) {
    var id = req.params.id;
    AdoptionApplication.findById(id, function (err, adoptionApplication) {
        if (err) { return next(err); }
        if (adoptionApplication === null) {
            return res.status(404).json({ 'message': 'Adoption application not found'});
        }
        res.status(200).json(adoptionApplication);
    });
});

//update adoption application by id
router.put('/api/adoption-applications/:id', function(req, res, next) {
    var id = req.params.id;
    AdoptionApplication.findByIdAndUpdate(id, {$set: req.body}, {new:true}, function(err, adoptionApplication) {
        if (err) {return next(err);}
        if (adoptionApplication === null) {
            return res.status(404).json({ 'message': 'Adoption application not found' })
        }
        res.status(200).json(adoptionApplication);
    });
});

//delete adoption application by id
router.delete('/api/adoption-applications/:id', function(req, res, next) {
    var id = req.params.id;
    AdoptionApplication.findByIdAndDelete(id, function(err, adoptionApplication) {
        if(err) { return next(err); }
        if (adoptionApplication === null) {
            return res.status(404).json({ 'message': 'Adoption application not found'});
        }
        res.json(adoptionApplication);
    });
});

module.exports = router;