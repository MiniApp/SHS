/**
 * 雇员选择页面 <p/> 功能描述：
 * <li>雇员选择</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.productLibrary.productMeal.SelectEmployee", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/SelectEmployee.html",
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：wanghua
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		
		if (this.localOrg != true) {
			this.localOrg = false;
		}

		if (CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE == this.type) {// 当类型为主管时
			if (!this.localOrg ) {// 不是选择本机构主管时显示
				this.create("component.EnumSelector", {
					category : [CodeStringDefinition.CUSDIRECTRPOS_CATEGORY],
					renderTo : [this.ids.position],
					id : [this.ids.position],
					excludedCodeList : [[
							CodeStringDefinition.POSITION_CATEGORY_SECEND
//							,
//							CodeStringDefinition.POSITION_CATEGORY_MSGCODE
							]]
						// 排除1级分行
					});
			}
		} else {
			this.createOrgSelectTree({
						renderTo : this.ids.nodeTree,
						codeDomId : this.ids.node,
						width : 250,
						onlyLeafSelect : false,
						belongPageObject : this
					});
		}
		owner.queryEmployee();
	},
	/**
	 * 查询雇员列表，提供选择功能
	 * 
	 * @param
	 * @return
	 * @程序员：wanghua
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	queryEmployee : function() {
		var owner = this;
		HtmlUtil.overwrite(this.ids.selectEmployeeGridDiv, "", false);
		var seachParam = DataUtil.getDataFromArea(owner.ids.searchEmployeeContentDiv);
		
		if(Constants.VALIDATION_FAIL != seachParam){
			var seachParamObj = DataUtil.decode(seachParam);
			var newSearchParam = null;
			if (DataUtil.isEmpty(seachParamObj.node)) {
				if (DataUtil.isEmpty(this.node)) {
					newSearchParam = ObjectUtil.applyIf(seachParamObj, {
								node : DataUtil.getUserInfo().orgCode
							});
				} else {
					newSearchParam = ObjectUtil.applyIf(seachParamObj, {
								node : this.node
							});
					if (!DataUtil.isEmpty(this.position)) {
						newSearchParam = ObjectUtil.applyIf(seachParamObj, {
									position : this.position
								});
					}
				}
			} else {
				newSearchParam = seachParamObj;
			}
			newSearchParam = ObjectUtil.applyIf(newSearchParam, {
						authorityCode : this.type,
						localOrg : this.localOrg
					});
			var strServId = null;
			if (DataUtil.isEmpty(this.strServId)) {
				strServId = 'employeeHelper.getEmployeeListToSelect';
			} else {
				strServId = this.strServId;
			}
			var checkbox = false;
			if (this.checkbox) {
				checkbox = this.checkbox;
			}
			var hidden = true;
			if (CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE == this.type) {
				hidden = false;
			}
			var grid = this.create('component.DataGrid', {
				renderTo : this.ids.selectEmployeeGridDiv,
				strServId : strServId,
				jsonData : newSearchParam,
				height : 250,
				mapping : ['objectId', 'name', 'genderLabel', 'logonId', 'orgDesc',
						'position'],
				collapsible : false,
				checkbox : checkbox,
				multiSelect : checkbox,
				columns : [{
							header : "姓名",
							sortable : true,
							dataIndex : 'name',
							width : 200
						}, {
							header : "登陆号",
							sortable : true,
							dataIndex : 'logonId',
							width : 100
						}, {
							header : "所属机构",
							sortable : true,
							dataIndex : 'orgDesc',
							width : 300
						}, {
							header : "级别",
							sortable : true,
							dataIndex : 'position',
							width : 200,
							hidden : hidden
						}],
				tbar : [{
					text : '确定',
					tooltip : '确定',
					iconCls : 'add',
					handler : function() {
						if (grid.getSelectRecords().length == 0) {
							MsgUtil.error('操作出错', '请先选择记录');
							return;
						}
						
						if (checkbox) {
							try {
								DataUtil.each(grid.getSelectRecords(), function(
										record) {
									if (DataUtil.isEmpty(HtmlUtil
											.getDom(owner.hiddenDomId).value)) {
										HtmlUtil.getDom(owner.hiddenDomId).value = record
												.get('objectId');
									} else {
										var values = HtmlUtil
												.getDom(owner.hiddenDomId).value
												.split(',');
										DataUtil.each(values, function(value) {
											if (value == record.get('objectId')) {
												ExceptionUtil
														.throwBusinessException({
															title : '选择错误',
															msg : '已经选择了:'
																	+ record
																			.get('name')
														});
											}
										});
										HtmlUtil.getDom(owner.hiddenDomId).value = HtmlUtil
												.getDom(owner.hiddenDomId).value
												+ "," + record.get('objectId');
									}
									if (DataUtil.isEmpty(HtmlUtil
											.getDom(owner.displayDomId).value)) {
										HtmlUtil.getDom(owner.displayDomId).value = record
												.get('name');
									} else {
										HtmlUtil.getDom(owner.displayDomId).value = HtmlUtil
												.getDom(owner.displayDomId).value
												+ "," + record.get('name');
									}
	
								});
	
							} catch (exception) {
								return;
							}
						} else {
							HtmlUtil.getDom(owner.displayDomId).value = grid
									.getSelectRecords()[0].get('name');
							HtmlUtil.getDom(owner.hiddenDomId).value = grid
									.getSelectRecords()[0].get('objectId');
						}
						owner.parent.close();
					}
				}]
			});
		}
	}
});