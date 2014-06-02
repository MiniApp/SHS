/**
 * 
 * 系统管理->用户管理列表->角色分配列表
 * 
 * <p/> 功能描述：
 * 
 * <li>增加客户经理角色</li>
 * <li>删除客户经理角色</li>
 * <li>查询当前客户经理角色列表</li>
 * 
 * 
 * author:朱凯
 * 
 * date:2012-07-29
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.distributionRole.DistributionRoleList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/distributionRole/DistributionRoleList.html",// 页面url地址
					/**
					 * 初始数据
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-29
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
					 * @编码日期：2012-07-29
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						// 下拉菜单
//						this
//								.create(
//										"component.EnumSelector",
//										{
//											category : [ CodeStringDefinition.POSITION_CATEGORY ],
//											renderTo : [ this.ids.positionenum ],
//											id : [ this.ids.positionenum ]
//										});
						// 创建下拉列表
						ConnectionUtil.ajaxReq({
							strServId : "distributionRoleService.getRolenames",
							callback : function(data) {
								owner.create("component.Selector", {
									id : owner.ids.roleid,
									renderTo : owner.ids.roleid,
									jsonData : data
								});
							}
						});
						this.queryDistributionRoleList(this.corpersonky);

						// 创建panel
						this.create('component.Panel', {
							title : '增加角色',
							renderTo : this.ids.distributionRoleListDiv,
							contentEl : this.ids.distributionRoleSearchDiv,
							hasBackGroundColor : true,
							buttons : [ {
								text : '保存',
								iconCls : 'query',
								handler : function() {
									owner.distributionRoleAdd(); // 新增角色
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
					 * 查询当前客户经理角色列表
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-19
					 * @最后修改日期：
					 */
					queryDistributionRoleList : function(corpersonky_ky) {
						var owner = this;
						HtmlUtil.overwrite(
								this.ids.distributionRoleListDisplayDiv, "",
								false);
						// 创建列表组件
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.distributionRoleListDisplayDiv,
											strServId : 'distributionRoleService.getDistributinRoleList',
											jsonData : {
												corpersonky : corpersonky_ky
											},
											mapping : [ 'sysuserrolepk',
													'corpersonky', 'roleid',
													'rolename', 'position',
													'positionLabel', 'system' ],
											collapsible : false,
											checkbox : true,
											widthPercent : 1,
//											heightPercent : 0.7,
											title : '查询结果',
											columns : [ {
												header : "角色名称",
												sortable : true,
												dataIndex : 'rolename',
												widthPercent : 0.7
											} ],
											tbar : [
											// {
											// text : '角色修改',
											// tooltip : '角色修改',
											// iconCls : 'edit',
											// handler : function() {
											// if
											// (grid.getSelectRecords().length
											// == 0) {
											// MsgUtil.error('操作出错',
											// '请选择一条记录进行修改');
											// return;
											// } else if
											// (grid.getSelectRecords().length >
											// 1) {
											// MsgUtil.error('操作出错',
											// '只能选择一条记录进行修改');
											// return;
											// }
											//
											// DataUtil.each(grid.getSelectRecords(),
											// function(
											// record) {
											// owner.openUpdateWindow(record);
											// })
											// }
											// },
											{
												text : '删除',
												tooltip : '删除',
												iconCls : 'delete',
												handler : function() {
													if (grid.getSelectRecords().length == 0) {
														MsgUtil.error('操作出错',
																'请选择一条记录删除');
														return;
													} else if (grid
															.getSelectRecords().length > 1) {
														MsgUtil.error('操作出错',
																'只能选择一条记录删除');
														return;
													}
													if (grid.getSelectRecords()[0]
															.get('system') != DataUtil
															.getUserInfo().systemId) {
														if (CodeStringDefinition.CORPOR_SYSTM_MSGCODE == DataUtil
																.getUserInfo().systemId) {
															MsgUtil
																	.error(
																			'操作出错',
																			'对公管理员不能删除对私的角色');
														} else {
															MsgUtil
																	.error(
																			'操作出错',
																			'对私管理员不能删除对公的角色');
														}

														return;
													}
													MsgUtil
															.confirm(
																	"提示",
																	"是否确认删除",
																	function(
																			btn) {
																		if (btn == 'yes') {
																			ConnectionUtil
																					.ajaxReq({
																						strServId : "distributionRoleService.deleteDistributionRoleInfo",
																						jsonData : {
																							sysuserrolepk : grid
																									.getSelectRecords()[0]
																									.get('sysuserrolepk'),
																							corpersonky : grid
																									.getSelectRecords()[0]
																									.get('corpersonky')
																						},
																						callback : function(
																								data) {
																							owner
																									.refresh();// 重新刷新窗口
																						}
																					});
																		}

																	})
												}
											} ]

										});// grid 结束
					},// function 结束
					/**
					 * 创建新增窗口
					 * 
					 * @param record
					 *            选择的列表记录
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-23
					 * @最后修改日期：
					 */
					distributionRoleAdd : function() {
						var owner = this;
						var data = DataUtil
								.getDataFromArea(owner.ids.distributionRoleSearchDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil
									.decode(data), {
								corpersonky : this.corpersonky
							});// 组装修改信息将客户主键corpersonky添加的修改信息数据中
							ConnectionUtil
									.ajaxReq({// 发送ajax请求
										strServId : "distributionRoleService.insertSysUserRole",
										jsonData : newData,
										callback : function(msg) {
											MsgUtil.alert("提示", "新增成功！");
											owner.refresh();// 重新刷新窗口
										}
									});
						}
					},

					refresh : function() {
						var owner = this;
						owner.queryDistributionRoleList(this.corpersonky);
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
											title : '修改角色信息',
											closable : true,
											draggable : true,
											resizable : true,
											width : 550,
											height : 150,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.systemManage.distributionRole.DistributionRoleUpdate',
															{
																id : 'DistributionRoleUpdate',
																sysuserrolepk : record
																		.get('sysuserrolepk'),
																corpersonky : record
																		.get('corpersonky'),
																roleid : record
																		.get('roleid'),
																position : record
																		.get('position')
															})
										});
						win.on('close', function() {
							owner.refresh();// 重新刷新窗口
						})
					}

				});