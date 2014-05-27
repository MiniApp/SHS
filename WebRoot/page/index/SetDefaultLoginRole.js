/**
 * 设置默认登录角色
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.mainPage.SetDefaultLoginRole",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/mainPage/SetDefaultLoginRole.html",// 页面url地址
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
						this.queryRoleList();// 查询列表
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
											width : 480,
											height : 350,
											mapping : [ 'system',
													'arcprincipalName',
													'arcprincipalRoleName',
													'upId', 'roleid',
													'rolename','isDefaultRole' ],
											collapsible : false,
											multiSelect : false,
											noPaging : true,
											checkbox : false,
											columns : [
													{
														header : "角色名",
														sortable : true,
														dataIndex : 'rolename',
														width : 300
													},
													{
														header : "是否默认登录角色",
														sortable : true,
														dataIndex : 'isDefaultRole',
														width : 110
													} ],
											tbar : [ {
												text : '设置',
												tooltip : '设置默认登录角色',
												iconCls : 'view',
												handler : function() {
													if (grid.getSelectRecords().length == 0) {
														MsgUtil.error('操作出错',
																'请选择角色');
														return;
													}
													var selectRecord = grid
															.getSelectRecords()[0];
													if ( selectRecord
																	.get('isDefaultRole') == '是') {
														MsgUtil
																.error('操作出错',
																		'选择的角色已经是默认的登录角色');
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
																			alert(selectRecord
																							.get('roleid'));
																			var defalutRole = {
																				'defalutLoginRole' : selectRecord
																							.get('roleid')
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
																				'config' : selectRecord
																							.get('roleid')
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
																											"设置默认登录角色成功！");
																							owner.queryRoleList();
																						}
																					});
																		}
																	});

												}
											} ]
										});
					}
				});