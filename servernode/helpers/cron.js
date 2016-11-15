var cron = require('node-cron');
var tmp = require('./tmp');
var log = null;

exports.run = function (logger) {
	log = logger;

	cleanTmp ();

log.info('_[CRON]_ Init.');
}

function cleanTmp () {
	log.info('_[CRON]_ Cleaner -- TMP');
	cron.schedule('15 1 * * *', function(){
	  tmp.tmpClean(log);
	});
}