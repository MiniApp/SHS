/**
 * 报表
 * @author DuanYong
 * @Since:2012-11-12
 * @Update:2012-11-12
 */
ObjectUtil.define("crm.pages.ocrm.common.report.Report", "base.PageObject", {
	htmlContent : [
			'<table width="100%">',
			'<tr>',
			'<td width="20%" valign="top" id={ReportTreePanelDiv}></td>',
			'<td valign="top" id={ReportRightContentPanelDiv}>',
			'<table width="100%" class="DisplayTable">',
			'<tr>',
			'<td width="100%"  valign="top" >',
			'<div id="{ReportSearchPanelDiv}">',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td width="100%" height="500px" valign="top"><iframe width="100%" height="100%" src="" name="reportFrame" id="reportFrame" ></iframe></td>',
			'</tr>', '</table>', '</td>', '</tr>', '</table>'],
	initData : function() {
		//默认对私
		this.configFile = "/menu/report/PersonReport-" + DataUtil.getUserInfo().authorityCode + ".xml";
		//如果是总行级客户经理主管
		if(DataUtil.getUserInfo().authorityCode == CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE && DataUtil.getUserInfo().position == CodeStringDefinition.POSITION_CENTER_MSGCODE){
			this.configFile = "/menu/report/PersonReport-" + DataUtil.getUserInfo().authorityCode + "-"+CodeStringDefinition.POSITION_CENTER_MSGCODE+".xml";
		
		}
		//对公
		if(DataUtil.getUserInfo().systemId == CodeStringDefinition.CORPOR_SYSTM_MSGCODE){
			this.configFile = "/menu/report/CorporateReport-" + DataUtil.getUserInfo().authorityCode + ".xml";
			//如果是总行级客户经理主管
			if(DataUtil.getUserInfo().authorityCode == CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE && DataUtil.getUserInfo().position == CodeStringDefinition.POSITION_CENTER_MSGCODE){
				this.configFile = "/menu/report/CorporateReport-" + DataUtil.getUserInfo().authorityCode + "-"+CodeStringDefinition.POSITION_CENTER_MSGCODE+".xml";
			}
		}
		
		/**
		 * 加载报表导航
		 */
		this.navigationMenu = this.generateNavigationMenu();
	},
	initCmp : function() {
		this.treePanel = this.initTreePanel();
	},
	initSearchPanel : function(config){
		var owner = this;
		if (DataUtil.isEmpty(config.className)) {
			MsgUtil.alert('系统提示', '未配置搜索页面对象');
		}else{
			HtmlUtil.overwrite(this.ids.ReportSearchPanelDiv, "", false);
			var pageObj = this.create(config.className, {
								id : 'ReportSearchPanel'
							});
			this.create('component.Panel', {
						title : '查询条件',
						renderTo : this.ids.ReportSearchPanelDiv,
						pageObject : pageObj,
						collapsible : false,
						widthPercent : 0.80,
						height : pageObj.getHeight(),
						hasBackGroundColor : true,
						buttons : [{
									text : '查询',
									iconCls : 'query',
									handler : function() {
										owner.searchReport(pageObj);
									}
								}]
					});
		}
	},
	/**
	 * 列表
	 */
	searchReport : function(pageObj) {
        this.getReport(pageObj);
	},

	/**
	 * 解析快速导航菜单配置文件
	 */
	generateNavigationMenu : function() {
		this.xmlJsonObj = XmlUtil.parseXml({
					xmlUrl : this.configFile
				});
		return XmlUtil.getJsonDataByNodeName({
					jsonObj : this.xmlJsonObj,
					nodeName : 'navigation'
				});
	},
	/**
	 * 初始化树
	 */
	initTreePanel : function() {
		var owner = this;
		var menus = this.navigationMenu;
		if (!menus || DataUtil.isEmpty(menus[0].id)) {
			return;
		}
		var treePanel = this.create("component.SimpleTree", {
					renderTo : this.ids.ReportTreePanelDiv,
					title : '报表导航',
					children : menus,
					widthPercent : 0.20,
					heightPercent : 0.97,
					nodeClick : function() {
						if (this.leaf[0]) {
							if(owner.className != this.data[0].className){
								owner.rpt = this.data[0].id;
								owner.className = this.data[0].className;
								owner.initSearchPanel({className : owner.className});
								HtmlUtil.getDom('reportFrame').src = "";
							}
						}
					}
				});
		return treePanel.extObject;
	},
	getReport : function(pageObj) {
		var owner = this;
		var jsonData = pageObj.getData();
		if (this.validation(jsonData)) {
			jsonData = DataUtil.decode(jsonData);
			var paramStrArray = [];
			for (var key in jsonData){
				if('rpt' != key){
					paramStrArray.push(key+"="+jsonData[key]); 
				}
			}
			ConnectionUtil.reportReq({
					frameId : 'reportFrame',
					jsonData : {
						rpt : owner.rpt,
						params :  paramStrArray.join(";")
					}
				});
		}
		
	},
	validation : function(jsonData) {
		if (Constants.VALIDATION_FAIL == jsonData) {
			return false;
		}
		jsonData = DataUtil.decode(jsonData);
		//如果页面包含报表ID则使用
		if(!DataUtil.isEmpty(jsonData.rpt)){
			this.rpt = jsonData.rpt;
		}
		if (DataUtil.isEmpty(this.rpt)) {
			MsgUtil.alert('系统提示', '请选择一个报表');
			return false;
		}
		return true;
	}
})
