/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Statistics ProjectTypeAmout
 * Version: 3.0
 */
$().ready(function() {
	
	[#-- 统计项目类型金额 --]
	$('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '金额分类占比'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '金额分类占比',
            data: [
                ['信用认证标', creditAmts],
                ['机构担保标', guaranteeAmts],
                ['抵押质押标', mortgageAmts]
            ]
        }]
    });
    
});