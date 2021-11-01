const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

const Controller = require('../models/controllers');

const controllerRouter = express.Router();
controllerRouter.use(bodyParser.json());

controllerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.corsWithOptions, (req, res, next) => {
    Controller.findOne({serial: req.body.serial, password: req.body.password})
        .then(controller => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(controller);
        }, err => next(err))
        .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Controller.findOne({serial: req.body.serial, password: req.body.password})
        .then(controller => {
            if (!controller) {
                Controller.create(req.body)
                    .then(controller => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(controller);
                    }, err => next(err))
                    .catch(err => next(err));
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(controller);
            }
        }, err => next(err))
        .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
    Controller.findOne({serial: req.body.serial, password: req.body.password})
        .then(controller => {
            if (controller) {
                for (let index in controller.relays)
                    controller.relays[index] = req.body.relays[index];
            }

            controller.save();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(controller);
        }, err => next(err))
        .catch(err => next(err));
});

controllerRouter.route('/:serial')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.corsWithOptions, (req, res, next) => {
    Controller.findOne({serial: req.params.serial})
        .then(controller => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(controller);
        }, err => next(err))
        .catch(err => next(err));
})

module.exports = controllerRouter;