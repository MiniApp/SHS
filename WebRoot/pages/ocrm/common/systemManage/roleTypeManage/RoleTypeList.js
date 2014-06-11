/**
 * 角色类别列表 <p/> 功能描述：
 * <li>查询角色类别列表</li>
 * <li>新建角色类别</li>
 * <li>删除按钮</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.roleTypeManage.RoleTypeList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH 
		+ "/pages/ocrm/common/systemManage/roleTypeManage/RoleTypeList.html",// 页面url地址
	
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	initCmp:function(){	
		owner=this;
		// 查询列表
		this.queryRoleTypeList();
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
	queryRoleTypeList : function() {
		var owner = this;
		// 清空列表区域
		HtmlUtil.overwrite(this.ids.roleTypeListDataGrid, "", false);
		var searchParam = '{}';// 获取页面录入的查询条件
		// 创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.roleTypeListDataGrid,
			strServId : 'roleTypeService.searchArcprincipalPag',
			jsonData : searchParam,
			mapping : ['arcprincipalky', 'name', 'upid','rolename'],
			collapsible : false,
			checkbox : true,
			title : '角色类别列表',
			columns : [{
						header : "岗位名称",
						sortable : true,
						dataIndex : 'rolename',
						width : 300
					}, {
						header : "岗位编码",
						sortable : true,
						dataIndex : 'upid',
						width : 300
					}, {
						header : "岗位中文名称",
						sortable : true,
						dataIndex : 'name',
						width : 300
					}],
			tbar : [{
						text : '新增',
						tooltip : '新增角色',
						iconCls : 'add',
						handler : function() {
							owner.openCreateWindow();
						}
					}, {
						text : '删除',
						tooltip : '删除',
						iconCls : 'delete',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录进行修改');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录进行修改');
								return;
							}
							MsgUtil.confirm("提示", "是否确认删除", function(btn) {
								if (btn == 'no') {
									return;
								}
								ConnectionUtil.ajaxReq({
									strServId : "roleTypeService.deleteArcprincipa",
									jsonData : {
										arcprincipalky : grid.getSelectRecords()[0]
												.get('arcprincipalky')
									},
									callback : function(data) {
										MsgUtil.alert("提示","删除成功")
										owner.queryRoleTypeList();// 删除成功后刷新列表
									}
								});
							});
						}
					}]
		});
	},
	
	/**
	 * 新建角色类别窗口
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
					title : '新增角色类别',
					closable : true,
					draggable : true,
					resizable : true,
					width : 600,
					height : 200,
					//x : '80',
					//y : '60',
					modal : true,
					pageObject : this.create(
							'crm.pages.ocrm.common.systemManage.roleTypeManage.RoleTypeCreate',// 创建新增页面对象
							{
								id : 'RoleTypeCreate'
							})
				});
		win.on('close', function() {
					owner.queryRoleTypeList();// 窗口关闭后刷新列表
				});
	}
	
	
});

