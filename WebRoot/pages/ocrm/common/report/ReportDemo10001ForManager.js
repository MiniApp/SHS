/**
 * 归属其他机构客户价值统计报表
 * @author wuqihui
 * @Since:2012-11-14
 * @Update:2012-11-14
 */
ObjectUtil.define("crm.pages.ocrm.common.report.ReportDemo10001ForManager", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/report/ReportDemo10001ForManager.html",
	initCmp : function() {
		var owner = this;
		this.create('component.DateField', {
							renderTo : this.ids.date,
							special:'Y',
							format : 'Ym'
						});
	},
	/**
	 * 取得搜索区域值
	 * @return {}
	 */
	getData : function() {
		var date = DataUtil.decode(DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv10001));
		if(DataUtil.isEmpty(date.date)){
			var now = new Date();
			var yearmonth =now.getFullYear().toString() + (now.getMonth()).toString();
			ObjectUtil.applyIf(date,DataUtil.decode('{"date":"'+yearmonth+'"}'));
		}
		ObjectUtil.applyIf(date,DataUtil.decode('{"cus_manager":"'+DataUtil.getUserInfo().objectId+'"}'));
		return DataUtil.encode(date);
//		return DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv10001);
	},
	/**
	 * 取得搜索区域的高
	 * @return {Number}
	 */
	getHeight : function(){
		return 120;
	}
})
