/**
 * 报表测试DEMO
 * @author DuanYong
 * @Since:2012-11-12
 * @Update:2012-11-12
 */
ObjectUtil.define("crm.pages.ocrm.common.report.RMcusdistribution", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/report/RMcusdistribution.html",
	initCmp : function() {
		var owner = this;
	},
	/**
	 * 取得搜索区域值
	 * @return {}
	 */
	getData : function() {
		
		
		return DataUtil.encode({"corpersonky":DataUtil.getUserInfo().objectId});
	},
	/**
	 * 取得搜索区域的高
	 * @return {Number}
	 */
	getHeight : function(){
		return 120;
	}
})
