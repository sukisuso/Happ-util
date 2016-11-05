function newToast(scope, msg){
	scope.show(
      scope.simple()
        .textContent(msg)
        .position("top right")
        .hideDelay(3000)
    );
}


function loadStatsDefault (id, categorias, serie) {
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