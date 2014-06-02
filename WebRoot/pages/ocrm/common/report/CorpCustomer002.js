/**
 * 报表测试DEMO
 * @author DuanYong
 * @Since:2012-11-12
 * @Update:2012-11-12
 */
ObjectUtil.define("crm.pages.ocrm.common.report.CorpCustomer002", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/report/CorpCustomer002.html",
	initCmp : function() {
		var owner = this;
		this.createOrgSelectTree({
					renderTo : this.ids.ReportSearchContentPanelDiv_nodeTree,
					codeDomId : this.ids.ReportSearchContentPanelDiv_node,
					textDomId : this.ids.ReportSearchContentPanelDiv_nodename,
					width : 350,
					onlyLeafSelect : false
				});
		this.create('component.DateField', {
					renderTo : this.ids.time,
					format : 'Y-m',
					special :'Y-m'
				    });
	},
	initEvent : function() {
	
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
