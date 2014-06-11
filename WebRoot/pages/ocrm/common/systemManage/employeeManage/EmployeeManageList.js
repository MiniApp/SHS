/**
 * 
 * 系统管理->用户管理列表
 * 
 * <p/> 功能描述：
 * 
 * <li>输入查询条件查询</li>
 * <li>查询当前用户列表</li>
 * 
 * 
 * author:朱凯
 * 
 * date:2012-07-19
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/employeeManage/EmployeeManageList.html",// 页面url地址
					/**
					 * 初始数据
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-19
					 * @最后修改日期：
					 */
					initData : function() {

					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-19
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						this.queryEmployeeManageList();
						// 创建机构树
						this.createOrgSelectTree( {
							renderTo : this.ids.nodeTree,
							codeDomId : this.ids.node,
							width : 350,
							onlyLeafSelect : false,
							belongPageObject : this
						});
						// 创建下拉列表
						ConnectionUtil.ajaxReq( {
							strServId : "distributionRoleService.getRolenames",
							callback : function(data) {
								owner.create("component.Selector", {
									id : owner.ids.roleid,
									renderTo : owner.ids.roleid,
									jsonData : data
								});
							}
						});
						// 创建下拉框
						// 状态
						this
								.create(
										"component.EnumSelector",
										{
											category : [ CodeStringDefinition.SYSTEM_USER_STATE_CATEGORY ],
											renderTo : [ this.ids.statusenum ],
											id : [ this.ids.statusenum ]
										});

						// 创建panel
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.employeeManageListDiv,
							contentEl : this.ids.employeeManageListSearchDiv,
							widthPercent : 1,
							height : 150,
							hasBackGroundColor : true,
							buttons : [ {
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryEmployeeManageList(); // 查询列表
							}
							} ]
						// buttons 结束
								}// function 结束
								);// cteate 结束
					},
					/**
					 * 初始化事件监听
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-19
					 * @最后修改日期：
					 */
					initEvent : function() {

					},

					/**
					 * 查询当前用户列表
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-19
					 * @最后修改日期：
					 */
					queryEmployeeManageList : function() {
						var owner = this;
						var searchParam = DataUtil
								.getDataFromArea(this.ids.employeeManageListSearchDiv);// 获取页面录入的查询条件
						if (searchParam != Constants.VALIDATION_FAIL) {
							// 清空列表区域
							HtmlUtil.overwrite(
									this.ids.employeeManageListDisplayDiv, "",
									false);
							// 创建列表组件
							var grid = this
									.create(
											'component.DataGrid',
											{
												renderTo : this.ids.employeeManageListDisplayDiv,
												strServId : 'employeeManageService.getFollowOrgEmployeeList',
												jsonData : searchParam,
												pageSize : Constants.TAB_SIZE,
												mapping : [ 'corpersonky',
														'node', 'name','emNo',
														'findphone', 'loginId',
														'nodeDesc', 'status',
														'statuscode', 'roleid',
														'systemId' ],
												collapsible : false,
												widthPercent : 1,
												heightPercent : 0.695,
												checkbox : true,
												title : '查询结果',
												columns : [ {
													header : "用户姓名",
													sortable : true,
													dataIndex : 'name',
													widthPercent : 0.16
												}, {
													header : "联系电话",
													sortable : true,
													dataIndex : 'findphone',
													widthPercent : 0.16
												}, {
													header : "登陆ID",
													sortable : true,
													dataIndex : 'loginId',
													widthPercent : 0.12
												}, {
													header : "工号",
													sortable : true,
													dataIndex : 'emNo',
													widthPercent : 0.12
												}, {
													header : "所属机构名称",
													sortable : true,
													dataIndex : 'nodeDesc',
													widthPercent : 0.16
												}, {
													header : "是否激活",
													sortable : true,
													dataIndex : 'status',
													widthPercent : 0.08
												}, {
													header : "角色",
													sortable : true,
													dataIndex : 'roleid',
													widthPercent : 0.18
												} ],
												tbar : [
														{
															text : '详细信息',
															tooltip : '详细信息',
															iconCls : 'view',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录查看详细信息');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录查看详细信息');
																	return;
																}
																//取消对私对公管理员管理用户权限限制
//																if ((!DataUtil
//																		.isEmpty(grid
//																				.getSelectRecords()[0]
//																				.get('systemId')))
//																		&& grid
//																				.getSelectRecords()[0]
//																				.get(
//																						'systemId')
//																				.indexOf(
//																						DataUtil
//																								.getUserInfo().systemId) == -1) {
//																	if (CodeStringDefinition.CORPOR_SYSTM_MSGCODE == DataUtil
//																			.getUserInfo().systemId) {
//																		MsgUtil
//																				.error(
//																						'操作出错',
//																						'对公管理员不能查看对私用户信息');
//																	} else {
//																		MsgUtil
//																				.error(
//																						'操作出错',
//																						'对私管理员不能查看对公用户信息');
//																	}
//
//																	return;
//
//																}
																DataUtil
																		.each(
																				grid
																						.getSelectRecords(),
																				function(
																						record) {
																					owner
																							.openViewWindow(record);
																				})
															}
														},
														{
															text : '新增',
															tooltip : '新增',
															iconCls : 'add',
															handler : function() {
																owner
																		.openCreateWindow();
															}
														},
														{
															text : '修改',
															tooltip : '修改',
															iconCls : 'edit',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录进行修改');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录进行修改');
																	return;
																}

																DataUtil
																		.each(
																				grid
																						.getSelectRecords(),
																				function(
																						record) {
																					owner
																							.openUpdateWindow(record);
																				})
															}
														},
														{
															text : '废除',
															tooltip : '废除',
															iconCls : 'delete',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录进行操作');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录进行操作');
																	return;
																}
																if ((!DataUtil
																		.isEmpty(grid
																				.getSelectRecords()[0]
																				.get('systemId')))
																		&& grid
																				.getSelectRecords()[0]
																				.get(
																						'systemId')
																				.indexOf(
																						DataUtil
																								.getUserInfo().systemId) == -1) {
																	if (CodeStringDefinition.CORPOR_SYSTM_MSGCODE == DataUtil
																			.getUserInfo().systemId) {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对公管理员不能废除对私用户');
																	} else {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对私管理员不能废除对公用户');
																	}

																	return;

																}
																if (grid
																		.getSelectRecords()[0]
																		.get('statuscode') == CodeStringDefinition.SYSTEM_STATUE_INVAILD) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'无法废除状态为"未激活"的用户');
																	return;
																}
																MsgUtil
																		.confirm(
																				"提示",
																				"是否确认将当前用户"
																						+ grid
																								.getSelectRecords()[0]
																								.get('name')
																						+ "的状态置为未激活",
																				function(
																						btn) {
																					if (btn == 'yes') {
																						ConnectionUtil
																								.ajaxReq( {
																									strServId : "employeeManageService.deleteEmployeeManageInfo",
																									jsonData : {
																										corpersonky : grid
																												.getSelectRecords()[0]
																												.get('corpersonky')
																									},
																									callback : function(
																											data) {
																										owner
																												.queryEmployeeManageList();// 删除成功后刷新列表
																									}
																								});
																					}

																				})
															}
														},
														{
															text : '激活',
															tooltip : '激活',
															iconCls : 'delete',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录激活');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录激活');
																	return;
																}

																if ((!DataUtil
																		.isEmpty(grid
																				.getSelectRecords()[0]
																				.get('systemId')))
																		&& grid
																				.getSelectRecords()[0]
																				.get(
																						'systemId')
																				.indexOf(
																						DataUtil
																								.getUserInfo().systemId) == -1) {
																	if (CodeStringDefinition.CORPOR_SYSTM_MSGCODE == DataUtil
																			.getUserInfo().systemId) {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对公管理员不能激活对私用户');
																	} else {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对私管理员不能激活对公用户');
																	}

																	return;

																}
																MsgUtil
																		.confirm(
																				"提示",
																				"是否确认将当前用户"
																						+ grid
																								.getSelectRecords()[0]
																								.get('name')
																						+ "的状态置为激活",
																				function(
																						btn) {
																					if (btn == 'yes') {
																						ConnectionUtil
																								.ajaxReq( {
																									strServId : "employeeManageService.updateEmployeeStatus",
																									jsonData : {
																										corpersonky : grid
																												.getSelectRecords()[0]
																												.get('corpersonky')
																									},
																									callback : function(
																											data) {
																										owner
																												.queryEmployeeManageList();// 删除成功后刷新列表
																									}
																								});
																					}

																				})
															}
														},
														{
															text : '密码修改',
															tooltip : '密码修改',
															iconCls : 'edit',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录进行密码修改');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录进行密码修改');
																	return;
																}

																if ((!DataUtil
																		.isEmpty(grid
																				.getSelectRecords()[0]
																				.get('systemId')))
																		&& grid
																				.getSelectRecords()[0]
																				.get(
																						'systemId')
																				.indexOf(
																						DataUtil
																								.getUserInfo().systemId) == -1) {
																	if (CodeStringDefinition.CORPOR_SYSTM_MSGCODE == DataUtil
																			.getUserInfo().systemId) {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对公管理员不能修改对私用户密码');
																	} else {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对私管理员不能修改对公用户密码');
																	}

																	return;

																}

																DataUtil
																		.each(
																				grid
																						.getSelectRecords(),
																				function(
																						record) {
																					owner
																							.openUpdatePasswordWindow(record);
																				})
															}
														},
														{
															text : '角色分配',
															tooltip : '角色分配',
															iconCls : 'edit',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录进行角色分配');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录进行角色分配');
																	return;
																}

																DataUtil
																		.each(
																				grid
																						.getSelectRecords(),
																				function(
																						record) {
																					owner
																							.openDistributionRoleListWindow(record);
																				})
															}

														},
														{
															text : '重置密码',
															tooltip : '重置密码',
															iconCls : 'edit',
															handler : function() {
																if (grid
																		.getSelectRecords().length == 0) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'请选择一条记录重置密码');
																	return;
																} else if (grid
																		.getSelectRecords().length > 1) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'只能选择一条记录重置密码');
																	return;
																}
																if ((!DataUtil
																		.isEmpty(grid
																				.getSelectRecords()[0]
																				.get('systemId')))
																		&& grid
																				.getSelectRecords()[0]
																				.get(
																						'systemId')
																				.indexOf(
																						DataUtil
																								.getUserInfo().systemId) == -1) {
																	if (CodeStringDefinition.CORPOR_SYSTM_MSGCODE == DataUtil
																			.getUserInfo().systemId) {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对公管理员不能重置对私用户密码');
																	} else {
																		MsgUtil
																				.error(
																						'操作出错',
																						'对私管理员不能重置对公用户密码');
																	}

																	return;

																}
																if (grid
																		.getSelectRecords()[0]
																		.get('statuscode') == CodeStringDefinition.SYSTEM_STATUE_INVAILD) {
																	MsgUtil
																			.error(
																					'操作出错',
																					'该用户状态无效不能重置密码');
																	return;
																} else {
																	MsgUtil
																			.confirm(
																					"提示",
																					"是否将"
																							+ grid
																									.getSelectRecords()[0]
																									.get('name')
																							+ "的密码重置为初始密码",
																					function(
																							btn) {
																						if (btn == 'yes') {
																							ConnectionUtil
																									.ajaxReq( {
																										strServId : "resetEmployeePasswordService.updateResetEmployeePasswordInfo",
																										jsonData : {
																											corpersonky : grid
																													.getSelectRecords()[0]
																													.get('corpersonky')
																										},
																										callback : function(
																												data) {
																											owner
																													.queryEmployeeManageList();// 删除成功后刷新列表
																										}
																									});
																						}
																					})
																}

															}
														} ]

											});// grid 结束
						}
					},// function 结束
					/**
					 * 创建新增窗口
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-20
					 * @最后修改日期：
					 */
					openCreateWindow : function() {
						var owner = this;
						// 创建新增窗口
						var win = this
								.create(
										'component.Window',
										{
											title : '新增用户',
											closable : true,
											draggable : true,
											resizable : true,
											width : 790,
											height : 610,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageCreate',// 创建新增页面对象
															{
																id : 'EmployeeManageCreate'
															})
										});
						win.on('close', function() {
							owner.queryEmployeeManageList();// 窗口关闭后刷新列表
							})
					},
					/**
					 * 创建详细信息窗口
					 * 
					 * @param record
					 *            选择的列表记录
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-20
					 * @最后修改日期：
					 */
					openViewWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										'component.Window',
										{
											title : '查看用户详细信息',
											closable : true,
											draggable : true,
											resizable : true,
											width : 790,
											height : 480,
											layout : 'fit',
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageDetail',// 创建新增页面对象
															{
																id : 'EmployeeManageDetail',
																corpersonky : record
																		.get('corpersonky')
															})
										});

					},
					/**
					 * 创建修改窗口
					 * 
					 * @param record
					 *            选择的列表记录
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-23
					 * @最后修改日期：
					 */
					openUpdateWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										'component.Window',
										{
											title : '修改用户信息',
											closable : true,
											draggable : true,
											resizable : true,
											width : 790,
											height : 610,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageUpdate',
															{
																id : 'EmployeeManageUpdate',
																corpersonky : record
																		.get('corpersonky'),
																node : record.get('node')
															})
										});
						win.on('close', function() {
							owner.queryEmployeeManageList();
						})
					},
					/**
					 * 创建密码修改窗口
					 * 
					 * @param record
					 *            选择的列表记录
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-23
					 * @最后修改日期：
					 */
					openUpdatePasswordWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										'component.Window',
										{
											title : '修改用户密码',
											closable : true,
											draggable : true,
											resizable : true,
											width : 370,
											height : 200,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManagePasswordUpdate',
															{
																id : 'EmployeeManagePasswordUpdate',
																corpersonky : record
																		.get('corpersonky')
															})
										});
					},
					/**
					 * 角色分配窗口
					 * 
					 * @param record
					 *            选择的列表记录
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-23
					 * @最后修改日期：
					 */
					openDistributionRoleListWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										'component.Window',
										{
											title : '角色分配',
											closable : true,
											draggable : true,
											resizable : true,
											width : 550,
											height : 310,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.systemManage.distributionRole.DistributionRoleList',
															{
																id : 'DistributionRoleList',
																corpersonky : record
																		.get('corpersonky')
															})
										});
						win.on('close', function() {
							owner.queryEmployeeManageList();// 窗口关闭后刷新列表
							})

					}
				});