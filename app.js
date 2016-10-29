/*
 * index 
 * Jesús Juan Aguilar 12/2015
 * 
 * */


var express = require('express');
var router = require('./servernode/router');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var app = express();
var logger = require('./servernode/helpers/log');


app.use(express.static(__dirname + '/webapp'));
app.use(helmet());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({     
  extended: true
}));

app.disable('x-powered-by');
router.redirect(app);


app.listen(3000);
logger.info('Quevec is listening on 3000');


