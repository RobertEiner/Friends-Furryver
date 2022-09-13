var express = require('express');
var router = express.Router();
var Adopter = require('../models/adopter');


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
            return res.status(404).json({ 'message': 'Adopter not found!' })
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