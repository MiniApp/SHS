/**
 * 对公客户选择页面 <p/> 功能描述：
 * <li>选择对公客户</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("business.customer.SelectCorporateCustomer",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/component/customer/SelectCorporateCustomer.html",
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
				var panle=this.create('component.Panel', {
							title : '查询条件',
							contentEl : this.ids.selectCustomerListSearchDiv,
							hasBackGroundColor : true,
							height : 150,
							renderTo : this.ids.selectCustomerListDiv,
							buttons : [{
										text : '查询',
										iconCls : 'query',
										handler : function() {
											owner.queryCustomerList();
										}
									}]
						});
				this.create("component.EnumSelector", {
					category : [
							CodeStringDefinition.CORPORATE_CUSTOMER_SCOPE_CATEGORY,
							CodeStringDefinition.CORPORATE_CUSTOMER_CORPENTERLEVEL],
					renderTo : [ this.ids.enterScope,
							this.ids.grade],
					id : [this.ids.enterScope,
							this.ids.grade]
				});
				if (this.employeeType == CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE) {// 主管展示机构选择树
					panle.setHeight(160);
					this.createOrgSelectTree({
								renderTo : this.ids.nodeTree,
								codeDomId : this.ids.node,
								width : 250,
								onlyLeafSelect : false,
								belongPageObject : this,
								orgCode : this.orgCode,
								orgDesc : this.orgDesc
							});
					HtmlUtil.getDom(this.ids.searchOrgTreeText).style.display = "";
					HtmlUtil.getDom(this.ids.searchOrgTree).style.display = "";
				}
				owner.queryCustomerList();
			},
			/**
			 * 查询客户列表，提供选择功能
			 * 
			 * @param
			 * @return
			 * @程序员：wanghua
			 * @编码日期：2012-07-18
			 * @最后修改日期：
			 */
			queryCustomerList : function() {
				var owner = this;
				var checkbox = false;
				if (this.checkbox) {
					checkbox = this.checkbox;
				}
				var strServId = null;
				if (DataUtil.isEmpty(this.strServId)) {
					strServId = 'customerSelectService.getCustomerList'
				} else {
					strServId = this.strServId;
				}
				var searchParam = DataUtil
						.getDataFromArea(owner.ids.selectCustomerListSearchDiv);
				if (searchParam != Constants.VALIDATION_FAIL) {
					var seachParamObj = DataUtil.decode(searchParam);
					var newSearchParam = null;
					if (DataUtil.isEmpty(seachParamObj.node)) {
						if (DataUtil.isEmpty(this.node)) {
							newSearchParam = ObjectUtil.applyIf(seachParamObj,
									{
										node : DataUtil.getUserInfo().orgCode
									});
						} else {
							newSearchParam = ObjectUtil.applyIf(seachParamObj,
									{
										node : this.node
									});
						}
					} else {
						newSearchParam = seachParamObj
					}

					if (this.logonId) {
						newSearchParam = ObjectUtil.applyIf(newSearchParam, {
									logonId : this.logonId,
									customerType : this.customerType,
									employeeType : this.employeeType
								});
					} else {
						newSearchParam = ObjectUtil.applyIf(newSearchParam, {
									logonId : DataUtil.getUserInfo().logonId,
									customerType : this.customerType,
									employeeType : this.employeeType
								});
					}
					HtmlUtil.overwrite(this.ids.selectCustomerListGridDiv, "",
							false);
					var grid = this.create('component.DataGrid', {
						// width : (this.width || 900) - 260,
						renderTo : this.ids.selectCustomerListGridDiv,
						strServId : strServId,
						jsonData : newSearchParam,
						heightPercent:0.68,
						mapping : ['name', 'aum', 'corpersonky', 'corportid','dccnumber',
								'enterScope', 'enterLevel'],
						collapsible : false,
						checkbox : checkbox,
						multiSelect : checkbox,
						title : '查询结果',
						columns : [{
									header : "客户名称",
									sortable : true,
									dataIndex : 'name',
									width : 250
								}, {
									header : "客户号",
									sortable : true,
									dataIndex : 'corportid',
									width : 100
								}, {
									header : "企业规模",
									sortable : true,
									dataIndex : 'enterScope',
									width : 100
								}, {
									header : "企业等级",
									sortable : true,
									dataIndex : 'enterLevel',
									width : 83
								}, {
									header : "存款年日均",
									sortable : true,
									dataIndex : 'aum',
									width : 150
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
								// HtmlUtil.getDom(owner.displayDomId).value =
								// "";
								// HtmlUtil.getDom(owner.hiddenDomId).value =
								// "";
								if (checkbox) {
									try {
										DataUtil.each(grid.getSelectRecords(),
												function(record) {
													if (DataUtil
															.isEmpty(HtmlUtil
																	.getDom(owner.hiddenDomId).value)) {
														HtmlUtil
																.getDom(owner.hiddenDomId).value = record
																.get('corpersonky');
													} else {
														var values = HtmlUtil
																.getDom(owner.hiddenDomId).value
																.split(',');
														DataUtil
																.each(
																		values,
																		function(
																				value) {
																			if (value == record
																					.get('corpersonky')) {
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
																		.get('corpersonky');
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
											.getSelectRecords()[0]
											.get('corpersonky');
								}
								owner.parent.close();
							}
						}]
					});
				}
			}
		});