/**
 * 资源权限分配 <p/> 功能描述：
 * <li>初始化数据</li>
 * <li>初始化页面组件</li>
 * <li>查询角色类别列表</li>
 * <li>查询角色列表</li>
 * <li>查询操作员列表</li>
 * <li>保存角色类别资源</li>
 * <li>保存角色资源</li>
 * <li>保存操作员资源</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil.define(
		"crm.pages.ocrm.common.systemManage.resourceManage.ResourceControl",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/resourceManage/ResourceControl.html",
			/**
			 * 初始化数据
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			initData : function() {
				var owner = this;
				this.queryRoleList();// 默认显示角色列表
			},
			/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				this.upidResourceControlTree;// 角色类别资源树
				this.roleidResourceControlTree;// 角色资源树
				this.corpersonkyResourceControlTree;// 操作员资源树
				this.upidValue;// 角色类别选中值
				this.roleidValue;// 角色选中值
				this.corpersonkyValue;// 操作员选中值
				this.create("component.Selector", {
							id : this.ids.selectList,
							renderTo : this.ids.selectList,
							jsonData : [
//							            {
//										code : '1',
//										label : '系统角色类别'
//									}, 
									{
										code : '2',
										label : '系统角色'
									}, {
										code : '3',
										label : '系统操作员'
									}],
							selectedValue : '2',
							listeners:{
								'select' : function() {
									var employeeIdShow =HtmlUtil.getDom(owner.ids.employeeIdShow);
			                        var employeeIdInput =HtmlUtil.getDom(owner.ids.id);
			                        employeeIdInput.value = '';
									if(this.getValue(owner.ids.selectList)=='3'){
										employeeIdShow.style.display="block";
									}
									else{
										employeeIdShow.style.display="none";
									}
								}
							}
						});
				// 资源树面板
				this.create('component.Panel', {
					id : 'panel',
					renderTo : this.ids.typeSelectDiv,
					title : '系统资源权限维护',
					widthPercent : 0.7,
					//height : 80,
					heightPercent : 0.25,
					contentEl : this.ids.typeSelectContentDiv,
					hasBackGroundColor : true,
					buttons : [{
						text : '查询',
						iconCls : 'query',
						handler : function() {
							var searchParam = DataUtil
									.getDataFromArea(owner.ids.typeSelectContentDiv);
							if (searchParam != Constants.VALIDATION_FAIL) {
								var searchParamObj = DataUtil
										.decode(searchParam);
								if ("1" == searchParamObj.type) {
									owner.queryUpidList();
								} else if ("2" == searchParamObj.type) {
									owner.queryRoleList();
								} else if ("3" == searchParamObj.type) {
									owner.queryEmployeeList();
								}
								HtmlUtil.overwrite(
										owner.ids.resourceControlTree, "",
										false);
							}
						}
					}]
				});
			},

			/**
			 * 查询角色类别列表
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			queryUpidList : function() {
				var owner = this;
				// 清空列表区域
				HtmlUtil.overwrite(this.ids.resourceControlUpidGrid, "", false);
				var searchParam = '{}';// 获取页面录入的查询条件
				// 创建列表组件
				var grid = this.create('component.DataGrid', {
					renderTo : this.ids.resourceControlUpidGrid,
					strServId : 'roleTypeService.searchArcprincipalPag',
					jsonData : searchParam,
					widthPercent : 0.7,
					heightPercent : 0.75,
					mapping : ['arcprincipalky', 'name', 'upid', 'rolename'],
					collapsible : false,
					//checkbox : true,
					multiSelect : false,
					title : '系统角色类别列表',
					columns : [{
								header : "岗位名称",
								sortable : true,
								dataIndex : 'rolename',
								//width : 265
								widthPercent : 0.35
							}, {
								header : "岗位编码",
								sortable : true,
								dataIndex : 'upid',
								//width : 262
								widthPercent : 0.3
							}, {
								header : "岗位中文名称",
								sortable : true,
								dataIndex : 'name',
								//width : 265
								widthPercent : 0.35
							}],
					itemClick : function(){
						if (owner.upidValue != this.data['upid']) {
							HtmlUtil.overwrite(owner.ids.resourceControlTree, "", false);
						}
					},
					tbar : [{
						text : '查看角色类别资源权限',
						tooltip : '查看角色类别资源权限',
						iconCls : 'view',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录查看');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录查看');
								return;
							}
							DataUtil.each(grid.getSelectRecords(), function(
									record) {
								//owner.openUpidResourceControlWindow(record);
								owner.upidValue = record.data['upid'];
								var strServId = 'resourceTreeService.getSubResourceControl';
								var paramStr = CodeStringDefinition.UPID_STIRNG
										+ CodeStringDefinition.SPLIT_STRING
										+ record.data['upid'];
								var disTreeText = '"' + record.data['rolename']
										+ '" 资源权限树';
								HtmlUtil.overwrite(
										owner.ids.resourceControlTree, "",
										false);
								owner.upidResourceControlTree = owner
										.createResourceTree({
											renderTo : owner.ids.resourceControlTree,
											title : '资源权限',
											tbar : [{
												text : '保存角色类别资源权限',
												iconCls : 'save',
												handler : function() {
													if (grid.getSelectRecords().length == 0) {
														MsgUtil.error('操作出错',
																'请选择一条记录操作');
														return;
													} else if (grid
															.getSelectRecords().length > 1) {
														MsgUtil.error('操作出错',
																'只能选择一条记录操作');
														return;
													}
													owner
															.saveUpidResourControl(grid
																	.getSelectRecords());
												}
											}],
											resourceDesc : disTreeText,
											widthPercent : 0.3,
											heightPercent : 0.98,
											height : 450,
											strServId : strServId,
											paramStr : {'paramStr': paramStr},
											expandAll : true,
											multiple : true,
											nodeClick : function(data) {

											}
										});
							});
						}
					}]
				});
			},

			/**
			 * 查询角色列表
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			queryRoleList : function() {
				var owner = this;
				// 清空列表区域
				HtmlUtil.overwrite(this.ids.resourceControlUpidGrid, "", false);
				var searchParam = '{}';// 获取页面录入的查询条件
				// 创建列表组件
				var grid = this.create('component.DataGrid', {
					renderTo : this.ids.resourceControlUpidGrid,
					strServId : 'roleService.searchRolePag',
					jsonData : searchParam,
					widthPercent : 0.7,
					heightPercent : 0.78,
					mapping : ['rolename', 'arcprincipalName',
							'arcprincipalRoleName', 'descript', 'roleid',
							'upid'],
					collapsible : false,
					//checkbox : true,
					multiSelect : false,
					title : '系统角色列表',
					columns : [{
								header : "角色名称",
								sortable : true,
								dataIndex : 'rolename',
								//width : 265
								widthPercent : 0.35
							}, {
								header : "角色类别编码",
								sortable : true,
								dataIndex : 'arcprincipalRoleName',
								//width : 262
								widthPercent : 0.3
							}, {
								header : "角色类别名称",
								sortable : true,
								dataIndex : 'arcprincipalName',
								//width : 265
								widthPercent : 0.35
							}],
					itemClick : function(){
						if (owner.roleidValue != this.data['roleid']) {
							HtmlUtil.overwrite(owner.ids.resourceControlTree, "", false);
						}
					},
					tbar : [{
						text : '查看角色资源权限',
						tooltip : '查看角色资源权限',
						iconCls : 'view',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录查看');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录查看');
								return;
							}
							DataUtil.each(grid.getSelectRecords(), function(
									record) {
								//owner.openRoleidResourceControlWindow(record);
								owner.roleidValue = record.data['roleid'];
								var strServId = 'resourceTreeService.getSubResourceControl';
								var paramStr = CodeStringDefinition.ROLEID_STRING
										+ CodeStringDefinition.SPLIT_STRING
										+ record.data['roleid'];
								var disTreeText = '"' + record.data['rolename']
										+ '" 资源权限树';
								HtmlUtil.overwrite(
										owner.ids.resourceControlTree, "",
										false);
								owner.roleidResourceControlTree = owner
										.createResourceTree({
											renderTo : owner.ids.resourceControlTree,
											resourceDesc : disTreeText,
											title : '资源权限',
											tbar : [{
												text : '保存角色资源权限',
												iconCls : 'save',
												handler : function() {
													if (grid.getSelectRecords().length == 0) {
														MsgUtil.error('操作出错',
																'请选择一条记录操作');
														return;
													} else if (grid
															.getSelectRecords().length > 1) {
														MsgUtil.error('操作出错',
																'只能选择一条记录操作');
														return;
													}
													owner
															.saveRoleidResourControl(grid
																	.getSelectRecords());
												}
											}],
											widthPercent : 0.3,
											heightPercent : 0.98,
											height : 450,
											strServId : strServId,
											multiple : true,
											paramStr : {'paramStr': paramStr},
											expandAll : true,
											nodeClick : function(data) {

											}
										});
							});
						}
					}]
				});
			},

			/**
			 * 查询用户列表
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			queryEmployeeList : function() {
				var owner = this;
				// 清空列表区域
				HtmlUtil.overwrite(this.ids.resourceControlUpidGrid, "", false);
				var searchParam = DataUtil.getDataFromArea(owner.ids.typeSelectDiv);;// 获取页面录入的查询条件
				// 创建列表组件
				var grid = this.create('component.DataGrid', {
					renderTo : this.ids.resourceControlUpidGrid,
					strServId : 'employeeManageService.getOneRoleEmployeeList',
					jsonData : searchParam,
					widthPercent : 0.7,
					heightPercent : 0.78,
					mapping : ['name', 'node', 'nodeDesc', 'corpersonky','id','loginId'],
					collapsible : false,
					//checkbox : true,
					multiSelect : false,
					title : '系统操作员列表',
					columns : [{
								header : "用户名称",
								sortable : true,
								dataIndex : 'name',
								//width : 200
								widthPercent : 0.2
							}, {
								header : "用户号",
								sortable : true,
								dataIndex : 'loginId',
								//width : 170
								widthPercent : 0.2
							}, {
								header : "所属机构号",
								sortable : true,
								dataIndex : 'node',
								//width : 170
								widthPercent : 0.2
							}, {
								header : "所属机构名称",
								sortable : true,
								dataIndex : 'nodeDesc',
								//width : 252
								widthPercent : 0.4
							}],
					itemClick : function(){
						if (owner.corpersonkyValue != this.data['corpersonky']) {
							HtmlUtil.overwrite(owner.ids.resourceControlTree, "", false);
						}
					},
					tbar : [{
						text : '查看操作员资源权限',
						tooltip : '查看操作员资源权限',
						iconCls : 'view',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录查看');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录查看');
								return;
							}
							DataUtil.each(grid.getSelectRecords(), function(
									record) {
								//owner.openCorpersonkyResourceControlWindow(record);
								owner.corpersonkyValue = record.data['corpersonky'];
								var strServId = 'resourceTreeService.getSubResourceControl';
								var paramStr = CodeStringDefinition.CORPERSONKY_STRING
										+ CodeStringDefinition.SPLIT_STRING
										+ record.data['corpersonky'];
								var disTreeText = '"' + record.data['name']
										+ '" 资源权限树';
								HtmlUtil.overwrite(
										owner.ids.resourceControlTree, "",
										false);
								owner.corpersonkyResourceControlTree = owner
										.createResourceTree({
											renderTo : owner.ids.resourceControlTree,
											resourceDesc : disTreeText,
											title : '资源权限',
											tbar : [{
												text : '保存操作员资源权限',
												iconCls : 'save',
												handler : function() {
													if (grid.getSelectRecords().length == 0) {
														MsgUtil.error('操作出错',
																'请选择一条记录操作');
														return;
													} else if (grid
															.getSelectRecords().length > 1) {
														MsgUtil.error('操作出错',
																'只能选择一条记录操作');
														return;
													}
													owner
															.saveCorpersonkyResourControl(grid
																	.getSelectRecords());
												}
											}],
											widthPercent : 0.3,
											heightPercent : 0.98,
											height : 450,
											multiple : true,
											strServId : strServId,
											paramStr : {'paramStr': paramStr},
											expandAll : true,
											nodeClick : function(data) {

											}
										});
							});

						}
					}]
				});
			},

			/**
			 * 保存角色类别资源
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			openUpidResourceControlWindow : function(record) {
				var owner = this;
				var win = this.create('component.Window', {
							title : '',
							closable : true,
							draggable : true,
							resizable : true,
							width : 370,
							height : 450,
							x : '80',
							y : '60',
							modal : true,
							pageObject : this.create(
									'crm.pages.ocrm.common.systemManage.resourceManage.UpidResourceControl',
									{
										id : 'UpidResourceControl',
										upid : record.get('upid'),
										rolename : record.get('rolename')
									})
						});
				win.on('close', function() {
						owner.queryUpidList();;// 窗口关闭后刷新列表
					});

			},
			saveUpidResourControl : function(data) {
				var owner = this;
				if (this.upidResourceControlTree) {
					if (data.length == 0) {
						MsgUtil.error("错误提示", "请选择角色类别");
						return;
					}
					var nodes = this.upidResourceControlTree.getCheckedNodes();
					if (nodes.length == 0) {
						MsgUtil.error("错误提示", "角色类别资源必须选择");
						return;
					}
					var upid;
					DataUtil.each(data, function(record) {
								upid = record.data['upid'];
							});
					if (owner.upidValue != upid) {
						MsgUtil.error("错误提示", "当前选择角色类别与资源树不符");
						return;
					}
					var checkedNodes = [];
					DataUtil.each(nodes, function(data) {
								var node = {};
								node['resourceId'] = data['id'];
								node['upid'] = upid;
								checkedNodes.push(node);
							});
					var jsonData = {};
					jsonData['resourceControlBeanList'] = checkedNodes;
					jsonData['upid'] = upid;
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "resourceTreeService.updateUpIdResourceControl",
						jsonData : DataUtil.encode(jsonData),
						callback : function(msg) {
							MsgUtil.alert("提示", "保存成功!");
						}
					});
				} else {
					MsgUtil.error("错误提示", "请查看角色类别资源权限后再进行此操作");
					return;
				}
			},

			/**
			 * 保存角色资源
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			openRoleidResourceControlWindow : function(record) {
				var owner = this;
				var win = this.create('component.Window', {
							title : '',
							closable : true,
							draggable : true,
							resizable : true,
							width : 370,
							height : 450,
							x : '80',
							y : '60',
							modal : true,
							pageObject : this.create(
									'crm.pages.ocrm.common.systemManage.resourceManage.RoleidResourceControl',
									{
										id : 'RoleidResourceControl',
										roleid : record.get('roleid'),
										rolename : record.get('rolename')
									})
						});
				win.on('close', function() {
						owner.queryRoleList();;// 窗口关闭后刷新列表
					});

			},
			saveRoleidResourControl : function(data) {
				var owner = this;
				if (this.roleidResourceControlTree) {
					if (data.length == 0) {
						MsgUtil.error("错误提示", "请选择角色");
						return;
					}
					var nodes = this.roleidResourceControlTree
							.getCheckedNodes();
//					if (nodes.length == 0) {
//						MsgUtil.error("错误提示", "请先勾选资源");
//						return;
//					}
					var roleid;
					DataUtil.each(data, function(record) {
								roleid = record.data['roleid'];
							});
					if (owner.roleidValue != roleid) {
						MsgUtil.error("错误提示", "当前选择角色与资源树不符");
						return;
					}
					var checkedNodes = [];
					DataUtil.each(nodes, function(data) {
								var node = {};
								node['resourceId'] = data['id'];
								node['roleid'] = roleid;
								checkedNodes.push(node);
							});
					var jsonData = {};
					jsonData['resourceControlBeanList'] = checkedNodes;
					jsonData['roleid'] = roleid;
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "resourceTreeService.updateUpIdResourceControl",
						jsonData : DataUtil.encode(jsonData),
						callback : function(msg) {
							MsgUtil.alert("提示", "保存成功!");
						}
					});
				} else {
					MsgUtil.error("错误提示", "请查看角色资源权限后再进行此操作");
					return;
				}
			},

			/**
			 * 保存操作员资源
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			openCorpersonkyResourceControlWindow : function(record) {
				var owner = this;
				var win = this.create('component.Window', {
							title : '',
							closable : true,
							draggable : true,
							resizable : true,
							width : 370,
							height : 450,
							x : '80',
							y : '60',
							modal : true,
							pageObject : this.create(
									'crm.pages.ocrm.common.systemManage.resourceManage.CorpersonkyResourceControl',
									{
										id : 'CorpersonkyResourceControl',
										corpersonky : record.get('corpersonky'),
										name : record.get('name')
									})
						});
				win.on('close', function() {
						owner.queryEmployeeList();;// 窗口关闭后刷新列表
					});

			},
			saveCorpersonkyResourControl : function(data) {
				var owner = this;
				if (this.corpersonkyResourceControlTree) {
					if (data.length == 0) {
						MsgUtil.error("错误提示", "请选择用户");
						return;
					}
					var nodes = this.corpersonkyResourceControlTree
							.getCheckedNodes();
//					if (nodes.length == 0) {
//						MsgUtil.error("错误提示", "请先勾选资源");
//						return;
//					}
					var corpersonky;
					DataUtil.each(data, function(record) {
								corpersonky = record.data['corpersonky'];
							});
					if (owner.corpersonkyValue != corpersonky) {
						MsgUtil.error("错误提示", "当前选择操作员与资源树不符");
						return;
					}
					var checkedNodes = [];
					DataUtil.each(nodes, function(data) {
								var node = {};
								node['resourceId'] = data['id'];
								node['corpersonky'] = corpersonky;
								checkedNodes.push(node);
							});
					var jsonData = {};
					jsonData['resourceControlBeanList'] = checkedNodes;
					jsonData['corpersonky'] = corpersonky;
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "resourceTreeService.updateUpIdResourceControl",
						jsonData : DataUtil.encode(jsonData),
						callback : function(msg) {
							MsgUtil.alert("提示", "保存成功!");
						}
					});
				} else {
					MsgUtil.error("错误提示", "请查看用户资源权限后再进行此操作");
					return;
				}
			}

		});
