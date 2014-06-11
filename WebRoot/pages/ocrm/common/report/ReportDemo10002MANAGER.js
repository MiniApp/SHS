/**
 * 归属其他机构客户价值统计报表
 * @author wuqihui
 * @Since:2012-11-14
 * @Update:2012-11-14
 */
ObjectUtil.define("crm.pages.ocrm.common.report.ReportDemo10002MANAGER", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/report/ReportDemo10002MANAGER.html",
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
						id : 'customerlevel',
						renderTo : this.ids.customerlevel,
						jsonData : [ {
								"category" : "customerlevel",
								"code" : 0,
								"enumList" : [],
								"label" : "所有客户"
								}, {
								"category" : "customerlevel",
								"code" : 1,
								"enumList" : [],
								"label" : "一星级及以上"
								}, {
								"category" : "customerlevel",
								"code" : 2,
								"enumList" : [],
								"label" : "二星级及以上"
								}, {
								"category" : "customerlevel",
								"code" : 3,
								"enumList" : [],
								"label" : "三星级及以上"
								}, {
								"category" : "customerlevel",
								"code" : 4,
								"enumList" : [],
								"label" : "四星级及以上"
								}, {
								"category" : "customerlevel",
								"code" : 5,
								"enumList" : [],
								"label" : "五星级客户"
								}]
					});	
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
		var date = DataUtil.decode(DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv20007));
		if(DataUtil.isEmpty(date.date)){
			var now = new Date();
			var yearmonth =now.getFullYear().toString() + (now.getMonth()).toString();
			ObjectUtil.applyIf(date,DataUtil.decode('{"date":"'+yearmonth+'"}'));
//			date = DataUtil.encode(date);
		}
		ObjectUtil.applyIf(date,{"manager":DataUtil.getUserInfo().objectId,"mark":"0"});
		if(date.rptchange=="1"){
			ObjectUtil.applyIf(date,{"rpt":"10002forManagerINMb.brt"});
		}//根据选择的机构级别进行不同统计,默认按网点统计(使用TheCountOfCustomerBelongToOtherOrganForNode.brt),如果选择支行级,则按支行统计(使用TheCountOfCustomerBelongToOtherOrganForBrance.brt)
		if(DataUtil.isEmpty(date.customerlevel)){
			ObjectUtil.applyIf(date,{"customerlevel":0});
		}
		return DataUtil.encode(date);
	},
	/**
	 * 取得搜索区域的高
	 * @return {Number}
	 */
	getHeight : function(){
		return 120;
	}
})
