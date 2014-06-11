/**
 * 上下级雇员选择页面 <p/> 功能描述：
 * <li>上下级雇员(主管或经理可同时选择)</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("business.employee.SelectSuperSubEmployee",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/component/employee/SelectSuperSubEmployee.html",
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
				if(!DataUtil.isEmpty(this.authorityCode) && !DataUtil.isEmpty(this.orgLevelCode)){
					HtmlUtil.getDom(this.ids.searchEmployeeOptionTr).style.display = 'none';
				}
				this.create('component.Panel', {
							title : '查询条件',
							contentEl : this.ids.searchEmployeeContentDiv,
							hasBackGroundColor : true,
							height : 110,
							renderTo : this.ids.searchEmployeeDiv,
							buttons : [{
										text : '查询',
										iconCls : 'query',
										handler : function() {
											owner.queryEmployee();
										}
									}]
						});
				this.create("component.Selector", {
							id : this.ids.orgLevelCode,
							renderTo : this.ids.orgLevelCode,
							selectedValue : this.orgLevelCode,
							jsonData : [{
										code : '0',
										label : '上级机构'
									}, {
										code : '1',
										label : '本级机构'
									}, {
										code : '2',
										label : '下级机构'
									}]
						});
				this.create("component.Selector", {
					id : this.ids.authorityCode,
					renderTo : this.ids.authorityCode,
					selectedValue : this.authorityCode,
					jsonData : [{
								code : CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE,
								label : '客户经理主管'
							}, {
								code : CodeStringDefinition.RM_EMPLOYEE_TYPE_CODE,
								label : '客户经理'
							}]
				});
				
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
				var seachParam = DataUtil
						.getDataFromArea(owner.ids.searchEmployeeContentDiv);
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
					}
				} else {
					newSearchParam = seachParamObj
				}
				var strServId = null;
				if (DataUtil.isEmpty(this.strServId)) {
					strServId = 'employeeHelper.getSuperSubEmployeeToSelect'
				} else {
					strServId = this.strServId;
				}
				var checkbox = false;
				if (this.checkbox) {
					checkbox = this.checkbox;
				}
				var grid = this.create('component.DataGrid', {
					renderTo : this.ids.selectEmployeeGridDiv,
					strServId : strServId,
					jsonData : newSearchParam,
					heightPercent : 0.75,
					mapping : ['objectId',  'name', 'orgDesc',
							'logonId', 'authorityDesc'],
					collapsible : false,
					checkbox : checkbox,
					multiSelect : checkbox,
					title : '查询结果',
					columns : [{
								header : "姓名",
								sortable : true,
								dataIndex : 'name',
								width : 200
							},{
								header : "登录号",
								sortable : true,
								dataIndex : 'logonId',
								width : 100
							}, {
								header : "角色",
								sortable : true,
								dataIndex : 'authorityDesc',
								width : 100
							}, {
								header : "所属机构",
								sortable : true,
								dataIndex : 'orgDesc',
								width : 300
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
									DataUtil.each(grid.getSelectRecords(),
											function(record) {
												if (DataUtil
														.isEmpty(HtmlUtil
																.getDom(owner.hiddenDomId).value)) {
													HtmlUtil
															.getDom(owner.hiddenDomId).value = record
															.get('objectId');
												} else {
													var values = HtmlUtil
															.getDom(owner.hiddenDomId).value
															.split(',');
													DataUtil.each(values,
															function(value) {
																if (value == record
																		.get('objectId')) {
																	ExceptionUtil
																			.throwBusinessException(
																					{
																						title : '选择错误',
																						msg : '已经选择了:'
																								+ record
																										.get('name')
																					});
																}
															});
													HtmlUtil
															.getDom(owner.hiddenDomId).value = HtmlUtil
															.getDom(owner.hiddenDomId).value
															+ ","
															+ record
																	.get('objectId');
												}
												if (DataUtil
														.isEmpty(HtmlUtil
																.getDom(owner.displayDomId).value)) {
													HtmlUtil
															.getDom(owner.displayDomId).value = record
															.get('name');
												} else {
													HtmlUtil
															.getDom(owner.displayDomId).value = HtmlUtil
															.getDom(owner.displayDomId).value
															+ ","
															+ record
																	.get('name');
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
		});