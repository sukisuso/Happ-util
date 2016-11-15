var jsreport = require("jsreport");

exports.printPdf = function (res, output, file){
	
	  jsreport.render(output).then(function(out) {
		  res.setHeader('Content-Type', 'application/pdf');
		  res.setHeader('Content-Disposition', 'attachment; filename='+file+'.pdf');
		  out.result.pipe(res);
	  });
};
