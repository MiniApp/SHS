/**
 * 当前操作员所有角色列表 执行角色切换
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.mainPage.RoleAndPassworUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/mainPage/RoleAndPassworUpdate.html",// 页面url地址
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
						this.create('component.Panel', {
							title:'密码维护',
							renderTo : this.ids.passwordManageDiv,
							contentEl : this.ids.passwordManageContentDiv,
							hasBackGroundColor : true,
							height : 110,
							width : 345,
							margin : '5 0 0 0',
							bbar : [ {
								text : '确定',
								iconCls : 'edit',
								handler : function() {
									owner.updateEmployeeManagePasswordInfo();
								}
							} ]
						});
						if (DataUtil.getUserInfo().roleCount > 1) {
							this.queryRoleList();// 查询列表
						}

					},
					/**
					 * 保存修改信息
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-25
					 * @最后修改日期：
					 */
					updateEmployeeManagePasswordInfo : function() {
						var owner = this;
						var data = DataUtil
								.getDataFromArea(owner.ids.passwordManageContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过

							ObjectMgrUtil.register({
								id : "roleAndPasswordManageWin",
								value : true
							});
							var newData = DataUtil.decode(data);
							if(DataUtil.isEmpty(newData.password)){
								MsgUtil
										.error(
												'页面验证出错',
												'原密码不能为空',
												function() {
													ObjectMgrUtil
															.unregister(ObjectMgrUtil
																	.get('roleAndPasswordManageWin'));
												});
								return;
							}else{
								if(newData.password.length>13){
									MsgUtil
										.error(
												'页面验证出错',
												'原密码长度不能超过13位',
												function() {
													ObjectMgrUtil
															.unregister(ObjectMgrUtil
																	.get('roleAndPasswordManageWin'));
												});
								return;
								}
							}
							if(DataUtil.isEmpty(newData.queryPassword)){
								MsgUtil
										.error(
												'页面验证出错',
												'新密码不能为空',
												function() {
													ObjectMgrUtil
															.unregister(ObjectMgrUtil
																	.get('roleAndPasswordManageWin'));
												});
								return;
							}else{
								if(newData.queryPassword.length>13){
									MsgUtil
										.error(
												'页面验证出错',
												'新密码长度不能超过13位',
												function() {
													ObjectMgrUtil
															.unregister(ObjectMgrUtil
																	.get('roleAndPasswordManageWin'));
												});
								return;
								}
							}
							if (newData.password == newData.queryPassword) {
								MsgUtil
										.error(
												'页面验证出错',
												'输入的旧密码和新密码相同',
												function() {
													ObjectMgrUtil
															.unregister(ObjectMgrUtil
																	.get('roleAndPasswordManageWin'));
												});
								return;
							}
							newData.corpersonky = this.corpersonk;
							ConnectionUtil
									.ajaxReq({// 发送ajax请求
										strServId : "employeeManageService.updateEmployeePassword",
										jsonData : newData,
										callback : function(msg) {
											MsgUtil
													.alert(
															"提示",
															"修改密码成功！",
															function() {
																ObjectMgrUtil
																		.unregister(ObjectMgrUtil
																				.get('roleAndPasswordManageWin'));
															});
											owner.parent.parentObj.parent
													.close();// 关闭窗口
										},
										failure : function(msg) {
											MsgUtil
													.error(
															"错误提示",
															msg,
															function() {
																ObjectMgrUtil
																		.unregister(ObjectMgrUtil
																				.get('roleAndPasswordManageWin'));
															});

										}
									});
						}

					},
					/**
					 * 查询角色列表
					 * 
					 * @param
					 * @return
					 * @程序员：wanghua
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					queryRoleList : function() {
						var owner = this;
						HtmlUtil.overwrite(this.ids.roleList, "", false);
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.roleList,
											strServId : 'employeeHelper.getSysUserRolesForDefaultLoginRole',
											jsonData : {
												objectId : DataUtil
														.getUserInfo().objectId
											},
											width : 345,
											mapping : [ 'system',
													'arcprincipalName',
													'arcprincipalRoleName',
													'upId', 'roleid',
													'rolename', 'isDefaultRole' ],
											collapsible : false,
											multiSelect : false,
											noPaging : true,
											checkbox : false,
											columns : [ {
												header : "角色名",
												sortable : true,
												dataIndex : 'rolename',
												width : 160
											}, {
												header : "是否默认登录角色",
												sortable : true,
												dataIndex : 'isDefaultRole',
												width : 120
											} ],
											tbar : [
													{
														text : '设置为默认登录角色',
														tooltip : '设置默认登录角色',
														iconCls : 'view',
														handler : function() {
															ObjectMgrUtil
																	.register({
																		id : "roleAndPasswordManageWin",
																		value : true
																	});
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择角色',
																				function() {
																					ObjectMgrUtil
																							.unregister(ObjectMgrUtil
																									.get('roleAndPasswordManageWin'));
																				});
																return;
															}
															var selectRecord = grid
																	.getSelectRecords()[0];
															if (selectRecord
																	.get('isDefaultRole') == '是') {
																MsgUtil
																		.error(
																				'操作出错',
																				'选择的角色已经是默认的登录角色',
																				function() {
																					ObjectMgrUtil
																							.unregister(ObjectMgrUtil
																									.get('roleAndPasswordManageWin'));
																				});
																return;
															}
															MsgUtil
																	.confirm(
																			'确认',
																			"是否将默认登录角色设置为[<span style='color:red;'>"
																					+ selectRecord
																							.get('rolename')
																					+ "</span>]?",
																			function(
																					result) {
																				if ('yes' === result) {
																					var defalutRole = {
																						'defalutLoginRole' : {
																							roleId : selectRecord
																									.get('roleid')
																						}
																					};
																					var config = {};
																					if (null != window.systemConfig) {
																						config = window.systemConfig;
																					}
																					config = ObjectUtil
																							.apply(
																									config,
																									defalutRole);
																					var jsonData = {
																						'config' : DataUtil
																								.encode(config)
																					}
																					ConnectionUtil
																							.ajaxReq({// 发送ajax请求
																								strServId : "employeeSystemConfigHelper.updateConfig",
																								jsonData : jsonData,
																								callback : function(
																										msg) {
																									MsgUtil
																											.alert(
																													"提示",
																													"设置默认登录角色成功！",
																													function() {
																														ObjectMgrUtil
																																.unregister(ObjectMgrUtil
																																		.get('roleAndPasswordManageWin'));
																													});
																									owner
																											.queryRoleList();
																								},
																								failure : function(
																										msg) {
																									MsgUtil
																											.error(
																													"错误提示",
																													msg,
																													function() {
																														ObjectMgrUtil
																																.unregister(ObjectMgrUtil
																																		.get('roleAndPasswordManageWin'));
																													});
																								}
																							});
																				} else {
																					ObjectMgrUtil
																							.unregister(ObjectMgrUtil
																									.get('roleAndPasswordManageWin'));

																				}
																			});

														}
													},
													{
														text : '切换角色',
														tooltip : '切换角色',
														iconCls : 'view',
														handler : function() {
															ObjectMgrUtil
																	.register({
																		id : "roleAndPasswordManageWin",
																		value : true
																	});
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择角色',
																				function() {
																					ObjectMgrUtil
																							.unregister(ObjectMgrUtil
																									.get('roleAndPasswordManageWin'));
																				});
																return;
															}
															var selectRecord = grid
																	.getSelectRecords()[0];
															if (selectRecord
																	.get('roleid') == DataUtil
																	.getUserInfo().roleid) {
																MsgUtil
																		.error(
																				"错误提示",
																				"选择的角色["
																						+ selectRecord
																								.get('rolename')
																						+ "],为当前登录的角色",
																				function() {
																					ObjectMgrUtil
																							.unregister(ObjectMgrUtil
																									.get('roleAndPasswordManageWin'));
																				});
																return;
															}
															MsgUtil
																	.confirm(
																			'确认',
																			"是否切换到角色[<span style='color:red;'>"
																					+ selectRecord
																							.get('rolename')
																					+ "</span>]?<br /><br />提示：页面会被刷新,请先确认是否有尚未保存的业务数据,以免丢失!",
																			function(
																					result) {
																				if ('yes' === result) {
																					ConnectionUtil
																							.ajaxReq({// 发送ajax请求
																								strServId : "employeeHelper.changeRole",
																								jsonData : {
																									system : selectRecord
																											.get('system'),
																									arcprincipalName : selectRecord
																											.get('arcprincipalName'),
																									arcprincipalRoleName : selectRecord
																											.get('arcprincipalRoleName'),
																									upId : selectRecord
																											.get('upId'),
																									roleid : selectRecord
																											.get('roleid'),
																									rolename : selectRecord
																											.get('rolename')
																								},
																								callback : function(
																										msg) {
																									location
																											.reload();
																								},
																								failure : function(
																										msg) {
																									MsgUtil
																											.error(
																													"错误提示",
																													msg,
																													function() {
																														ObjectMgrUtil
																																.unregister(ObjectMgrUtil
																																		.get('roleAndPasswordManageWin'));
																													});
																								}
																							});
																				} else {
																					ObjectMgrUtil
																							.unregister(ObjectMgrUtil
																									.get('roleAndPasswordManageWin'));

																				}
																			});

														}
													} ]
										});
					}
				});