/**
 * 可录入条件：（年，季度，岗位）
 * 使用者：yangtao
 * @author wuqihui
 * @Since:2012-11-14
 * @Update:2012-11-14
 */
ObjectUtil.define("crm.pages.ocrm.common.report.RMinfoage", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/report/RMinfoage.html",
	initCmp : function() {
		var owner = this;
		this.create(
					"component.EnumSelector",
						{
						category : ['CustomerStatusEnum'],
						renderTo : [this.ids.evalstatus ],
						id :       [this.ids.evalstatus ]					
					});
		this.create(
					"component.Selector",
					{
						id : 'quarter',
						renderTo : this.ids.quarter,
						jsonData : [  {
								"category" : "quarter",
								"code" : 1,
								"enumList" : [],
								"label" : "第一季度"
								}, {
								"category" : "quarter",
								"code" : 2,
								"enumList" : [],
								"label" : "第二季度"
								}, {
								"category" : "quarter",
								"code" : 3,
								"enumList" : [],
								"label" : "第三季度"
								}, {
								"category" : "quarter",
								"code" : 4,
								"enumList" : [],
								"label" : "第四季度"
								}]
					});	
		this.create('component.DateField', {
							renderTo : this.ids.year,
							format : 'Y',
							special:'Y'
						});
	},
	/**
	 * 取得搜索区域值
	 * @return {}
	 */
	getData : function() {
		return DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv20007);
	},
	/**
	 * 取得搜索区域的高
	 * @return {Number}
	 */
	getHeight : function(){
		return 120;
	}
})
