/**
 * 当前操作员所有角色列表 执行角色切换
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.mainPage.ChangeRole",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/mainPage/ChangeRole.html",// 页面url地址
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
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.roleList,
											strServId : 'employeeHelper.getSysUserRolesExcludeCureentRole',
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
													'rolename' ],
											collapsible : false,
											multiSelect : false,
											noPaging : true,
											checkbox : false,
											columns : [ {
												header : "角色名",
												sortable : true,
												dataIndex : 'rolename',
												width : 300
											} ],
											tbar : [ {
												text : '切换角色',
												tooltip : '切换角色',
												iconCls : 'view',
												handler : function() {
													if (grid.getSelectRecords().length == 0) {
														MsgUtil.error('操作出错',
																'请选择角色');
														return;
													}
													var selectRecord = grid
															.getSelectRecords()[0];
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
																						}
																					});
																		}
																	});

												}
											} ]
										});
					}
				});