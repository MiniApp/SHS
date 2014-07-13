Ext.define('Ext.chart.theme.CustomCharTheme', {
	extend : 'Ext.chart.theme.Base',

	constructor : function(config) {
		var titleLabel = {
			font : 'bold 18px Arial'
		}, axisLabel = {
			fill : 'rgb(1,72,126)',
			font : 'bold 12px Arial',
			spacing : 2,
			padding : 5
		};

		this.callParent([ Ext.apply({
			axis : {
				stroke : '#084594'
			},
			axisLabelLeft : axisLabel,
			axisLabelBottom : axisLabel,
			axisTitleLeft : titleLabel,
			axisTitleBottom : titleLabel
		}, config) ]);
	}
});