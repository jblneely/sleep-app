var express = require('express');
var Recipe = require('../models/time');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        time.find(function(err, chart) {
            if (err) return res.status(500).send(err);

            return res.send(chart);
        });
    })
    .post(function(req, res) {
        time.create(req.body, function(err, time) {
            if (err) return res.status(500).send(err);

            return res.send(time);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        time.findById(req.params.id, function(err, time) {
            if (err) return res.status(500).send(err);

            return res.send(time);
        });
    })
    .put(function(req, res) {
        time.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    })
    .delete(function(req, res) {
        time.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    });

module.exports = router;
