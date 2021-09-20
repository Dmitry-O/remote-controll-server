const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Controller = require('../models/controllers');

const controllerRouter = express.Router();
controllerRouter.use(bodyParser.json());

controllerRouter.route('/')
.get((req, res, next) => {
    Controller.findOne({serial: req.body.serial, password: req.body.password})
        .then(controller => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(controller);
        }, err => next(err))
        .catch(err => next(err));
})
.post((req, res, next) => {
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
            }
        }, err => next(err))
        .catch(err => next(err));
})
.put((req, res, next) => {
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

module.exports = controllerRouter;