var express = require('express');
var Task = require('../models/task');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        Task.find(function(err, tasks) {
            if (err) return res.status(500).send(err);

            return res.send(tasks);
        });
    })
    .post(function(req, res) {
        Task.create(req.body, function(err, task) {
            if (err) return res.status(500).send(err);

            return res.send(task);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        Task.findById(req.params.id, function(err, task) {
            if (err) return res.status(500).send(err);

            return res.send(task);
        });
    })
    .put(function(req, res) {
        Task.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    })
    .delete(function(req, res) {
        Task.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    });

module.exports = router;
