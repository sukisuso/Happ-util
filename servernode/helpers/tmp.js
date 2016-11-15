var PATH_TO_CLEAN = __dirname + "/../tmp/*";
var PATH = __dirname + "/../tmp/";
var del = require('del');

exports.tmpClean = function (logger){
	del([PATH_TO_CLEAN, '!'+ PATH]).then(function (paths) {
	    logger.info('Cleaner tmp folder:\n', paths.join('\n'));
	});
}