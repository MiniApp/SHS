/**
 * 公用组件：
 * 审批主管选择界面 
 * 传入参数解释：
 * isUnion 	查询本级及以上所有主管
 * auditOrg 下次审批的机构 / 不传入值默认查询当前主管的上级机构
 * roleId 	角色小类型标准码
 * roleType 角色大类
 * parentRoleId 上级角色
 * <li>雇员选择</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"business.employee.SelectAuditEmployee",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/component/employee/SelectAuditEmployee.html",
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
//						this.create('component.Panel', {
//							title : '查询条件',
//							contentEl : this.ids.searchEmployeeContentDiv,
//							hasBackGroundColor : true,
//							height : 110,
//							renderTo : this.ids.searchEmployeeDiv,
//							buttons : [ {
//								text : '查询',
//								iconCls : 'query',
//								handler : function() {
//									owner.queryEmployee();
//								}
//							} ]
//						});

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
						HtmlUtil.overwrite(this.ids.selectEmployeeGridDiv, "",
								false);
						var seachParam = DataUtil
								.getDataFromArea(owner.ids.searchEmployeeContentDiv);

						if (Constants.VALIDATION_FAIL != seachParam) {

							var seachParamObj = DataUtil.decode(seachParam);
							if (this.isUnion != true) {
								this.isUnion = false;
							}
							//是否从上级开始查询
							if (this.isParent != true) {
								this.isParent = false;
							}
							seachParamObj.isUnion = this.isUnion;
							seachParamObj.auditOrg = this.auditOrg;
							seachParamObj.roleId = this.auditRoleId;
							seachParamObj.roleType = this.roleType;
							seachParamObj.parentRoleId = this.parentRoleId;
							seachParamObj.isParent = this.isParent;
							var strServId = this.strServId;
							
							if (DataUtil.isEmpty(this.strServId)) {
								strServId = "auditEmployeeSelectService.getAuditEmployeeList";
							}
							var grid = this
									.create(
											'component.DataGrid',
											{
												renderTo : this.ids.selectEmployeeGridDiv,
												strServId : strServId,
												jsonData : seachParamObj,
												heightPercent : 0.99,
												mapping : [ 'employeeKey',
														'name', 'roleName',
														'logonId', 'orgDesc' ],
												collapsible : false,
												checkbox : false,
												multiSelect : false,
												title : '查询结果',
												columns : [ {
													header : "姓名",
													sortable : true,
													dataIndex : 'name',
													width : 100
												}, {
													header : "登陆号",
													sortable : true,
													dataIndex : 'logonId',
													width : 100
												}, {
													header : "所属机构",
													sortable : true,
													dataIndex : 'orgDesc',
													width : 400
												}, {
													header : "主管类型",
													sortable : true,
													dataIndex : 'roleName',
													width : 250
												} ],
												tbar : [ {
													text : '确定',
													tooltip : '确定',
													iconCls : 'add',
													handler : function() {
														if (grid
																.getSelectRecords().length == 0) {
															MsgUtil.error(
																	'操作出错',
																	'请先选择记录');
															return;
														}
														if (grid
																.getSelectRecords()[0]
																.get('employeeKey') == DataUtil
																.getUserInfo().objectId) {
															MsgUtil
																	.error(
																			'操作出错',
																			'审批人不能选择自己');
															return;
														}
														if (!DataUtil
																.isEmpty(owner.managerNameDomId)) {
															HtmlUtil
																	.getDom(owner.managerNameDomId).value = grid
																	.getSelectRecords()[0]
																	.get('name');
														}
														if (!DataUtil
																.isEmpty(owner.emNoDomId)) {
															HtmlUtil
																	.getDom(owner.emNoDomId).value = grid
																	.getSelectRecords()[0]
																	.get('logonId');
														}
														if (!DataUtil
																.isEmpty(owner.managerKeyDomId)) {
															HtmlUtil
																	.getDom(owner.managerKeyDomId).value = grid
																	.getSelectRecords()[0]
																	.get('employeeKey');
														}

														owner.parent.close();
													}
												} ]
											});
						}
					}
				});