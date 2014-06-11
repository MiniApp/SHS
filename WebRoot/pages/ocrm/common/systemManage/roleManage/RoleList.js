/**
 * 角色列表 <p/> 功能描述：
 * <li>查询角色列表</li>
 * <li>分配资源信息窗口</li>
 * <li>创建新增信息窗口</li>
 * <li>修改信息窗口</li>
 * <li>删除按钮</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.roleManage.RoleList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/roleManage/RoleList.html",// 页面url地址
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
		this.queryRoleList();// 查询列表
	},
	initEvent : function() {
		
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
		HtmlUtil.overwrite(this.ids.roleListDataGrid, "", false);
		var searchParam = '{}';// 获取页面录入的查询条件
		// 创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.roleListDataGrid,
			strServId : 'roleService.searchRolePag',
			jsonData : searchParam,
			mapping : ['roleid','rolename', 'arcprincipalName','arcprincipalRoleName','descript','roleid','upid'],
			collapsible : false,
			checkbox : true,
			widthPercent : 1,
			heightPercent : 0.985,
			title : '角色列表',
			columns : [
			           {
						header : "角色ID",
						sortable : true,
						dataIndex : 'roleid',
						//width : 250
						widthPercent : 0.2
					},{
						header : "角色名称",
						sortable : true,
						dataIndex : 'rolename',
						//width : 250
						widthPercent : 0.2
					}, {
						header : "角色类别名称",
						sortable : true,
						dataIndex : 'arcprincipalName',
						//width : 250
						widthPercent : 0.2
					}, {
						header : "角色类别编码",
						sortable : true,
						dataIndex : 'arcprincipalRoleName',
						//width : 250
						widthPercent : 0.2
					}, {
						header : "角色描述",
						sortable : true,
						dataIndex : 'descript',
						//width : 368
						widthPercent : 0.18
					}],
			tbar : [{
						text : '新增',
						tooltip : '新增角色',
						iconCls : 'add',
						handler : function() {
							owner.openCreateWindow();
						}
					}, 
//					{
//						text : '资源分配',
//						tooltip : '资源分配',
//						iconCls : 'view',
//						handler : function() {
//							if (grid.getSelectRecords().length == 0) {
//								MsgUtil.error('操作出错', '请选择一条记录分配资源');
//								return;
//							} else if (grid.getSelectRecords().length > 1) {
//								MsgUtil.error('操作出错', '只能选择一条记录分配资源');
//								return;
//							}
//							DataUtil.each(grid.getSelectRecords(), function(
//											record) {
//										owner.openResourceControlWindow(record);
//									})
//						}
//					}, 
					{
						text : '修改',
						tooltip : '修改角色',
						iconCls : 'edit',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录进行修改');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录进行修改');
								return;
							}

							DataUtil.each(grid.getSelectRecords(), function(
											record) {
										owner.openUpdateWindow(record);
									});
						}
					}, {
						text : '删除',
						tooltip : '删除',
						iconCls : 'delete',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录进行删除');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录进行删除');
								return;
							}
							MsgUtil.confirm("提示", "是否确认删除", function(btn) {
								if (btn == 'no') {
									return;
								}
								ConnectionUtil.ajaxReq({
									strServId : "roleService.deleteRole",
									jsonData : {
										roleid : grid.getSelectRecords()[0]
												.get('roleid')
									},
									callback : function(data) {
										owner.queryRoleList();// 删除成功后刷新列表
									}
								});
							});
						}
					}]
		});
	},
	/**
	 * 创建新增窗口
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	openCreateWindow : function() {
		var owner = this;
		// 创建新增窗口
		var win = this.create('component.Window', {
					title : '新增角色信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 650,
					height : 210,
					//x : '80',
					//y : '60',
					modal : true,
					pageObject : this.create(
							'crm.pages.ocrm.common.systemManage.roleManage.RoleCreate',// 创建新增页面对象
							{
								id : 'RoleCreate'
							})
				});
		win.on('close', function() {
					owner.queryRoleList();// 窗口关闭后刷新列表
				})
	},
	/**
	 * 创建分配资源信息窗口
	 * 
	 * @param record
	 *            选择的列表记录
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	openResourceControlWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '为'+ record.get('rolename') +'分配资源',
					closable : true,
					draggable : true,
					resizable : true,
					width : 350,
					height : 500,
					//x : '80',
					//y : '60',
					modal : true,
					pageObject : this.create(
							'crm.pages.ocrm.common.systemManage.roleManage.AddResource',// 创建新增页面对象
							{
								id : 'TestDetail',
								roleid : record.get('roleid'),
								upid : record.get('upid'),
								rolename : record.get('rolename')
							})
				});
		win.on('close', function() {
					owner.queryRoleList();// 窗口关闭后刷新列表
				});

	},
	/**
	 * 创建修改窗口
	 * 
	 * @param record
	 *            选择的列表记录
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	openUpdateWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '修改角色信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 650,
					height : 210,
					//x : '80',
					//y : '60',
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.roleManage.RoleUpdate',
							{
								id : 'RoleUpdate',
								roleid : record.get('roleid')
							})
				});
		win.on('close', function() {
					owner.queryRoleList();
				});
	}

});