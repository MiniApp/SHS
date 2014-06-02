/**
 * 报表测试DEMO
 * @author DuanYong
 * @Since:2012-11-12
 * @Update:2012-11-12
 */
ObjectUtil.define("crm.pages.ocrm.common.report.CorpEmployee004", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/report/CorpEmployee004.html",
	initCmp : function() {
		var owner = this;
		this.createOrgSelectTree({
					renderTo : this.ids.ReportSearchContentPanelDiv_nodeTree,
					codeDomId : this.ids.ReportSearchContentPanelDiv_node,
					textDomId : this.ids.ReportSearchContentPanelDiv_nodename,
					width : 350,
					onlyLeafSelect : false
				});
		this.create("component.Selector", {
						id : 'reportQuarter',
						renderTo : this.ids.reportQuarter,
						jsonData : [{
							"category" : "reportQuarter",
							"code" : 1,
							"enumList" : [],
							"label" : "第一季度"
						}, {
							"category" : "reportQuarter",
							"code" : 2,
							"enumList" : [],
							"label" : "第二季度"
						}, {
							"category" : "reportQuarter",
							"code" : 3,
							"enumList" : [],
							"label" : "第三季度"
						}, {
							"category" : "reportQuarter",
							"code" : 4,
							"enumList" : [],
							"label" : "第四季度"
						}]
					});	
		this.create('component.DateField', {
					renderTo : this.ids.reportYear,
					format : 'Y',
					special :'Y'
				    });
	},
	/**
	 * 取得搜索区域值
	 * @return {}
	 */
	getData : function() {
		return DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv);
	},
	/**
	 * 取得搜索区域的高
	 * @return {Number}
	 */
	getHeight : function(){
		return 150;
	}
})
