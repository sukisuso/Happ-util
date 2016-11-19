function newToast(scope, msg){
	scope.show(
      scope.simple()
        .textContent(msg)
        .position("top right")
        .hideDelay(3000)
    );
}


function loadStatsDefault (id, serie) {
    Highcharts.chart(id, {
         chart: {
                zoomType: 'x'
            },
        title: {
            text: 'Economía temporal',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Saldo (€)'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '€'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [serie]
    });
}


function securitySesionTime (date){
    if(!date){
        return false;
    }
    var actualDate = new Date();
    var sesionDate = new Date(date);

    var diff = Math.abs(sesionDate - actualDate);
    var minutes = Math.floor((diff/1000)/60);

    if(minutes > 15){
        return false;
    }else{
        return true;
    }
}


function downloadPDF ($http, URL, DATA, filename){
    $http({
      url: URL ,method: "POST", data: DATA , responseType:'arraybuffer'
    }).then(function(result) {
        var blob=new Blob([result.data], {type: 'application/pdf'});
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download=filename;
        link.click();
    });
}