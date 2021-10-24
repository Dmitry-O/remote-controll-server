const express = require('express');
const cors = require('cors');
const app = express();


const whiteList = ['http://localhost:3000', 'https://remote-controllers.web.app'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if(whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true};s
    }
    else {
        corsOptions = {origin: false};
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);