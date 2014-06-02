/**
 * 
 * 系统管理->联系策略列表
 * 
 * <p/> 功能描述：
 * 
 * <li>增加联系策略</li>
 * <li>删除联系策略</li>
 * <li>修改联系策略</li>
 * 
 * 
 * 
 * author:朱凯
 * 
 * date:2012-08-3
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.contactPolicy.ContactPolicyList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/contactPolicy/ContactPolicyList.html",// 页面url地址
	/**
	 * 初始数据
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-29
	 * @最后修改日期：
	 */
	initData:function(){
		
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
		this.queryList();
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
	initEvent:function(){
		
		
	},
	/**
	 * 创建查询
	 * 
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	queryList:function(){
		var owner = this;
		HtmlUtil.overwrite(this.ids.contactPolicyListDisplayDiv, "", false);
		//创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.contactPolicyListDisplayDiv,
			strServId : 'contactPolicyService.searchContactStrategy',
			jsonData : {
			},
			mapping : ['contactpolicysubky','downlevel','uplevel', 'contacttimes', 'phonecontacttimes','layername','description'],
			collapsible : false,
			widthPercent:1,
			heightPercent:0.97,
			checkbox : true,
			title : '查询结果',
			columns : [{
						header : "层名",
						sortable : true,
						dataIndex : 'layername',
						widthPercent:0.16
					}, {
						header : "上限",
						sortable : true,
						dataIndex : 'uplevel',
						widthPercent:0.16
					},{
						header : "下限",
						sortable : true,
						dataIndex : 'downlevel',
						widthPercent:0.16
					},{
						header : "面谈联系次数",
						sortable : true,
						dataIndex : 'contacttimes',
						widthPercent:0.16
					},{
						header : "电话联系次数",
						sortable : true,
						dataIndex : 'phonecontacttimes',
						widthPercent:0.16
					},
					{
						header : "简要描述",
						sortable : true,
						dataIndex : 'description',
						widthPercent:0.2
					}],
					tbar : [ {
						text : '新增',
						tooltip : '新增',
						iconCls : 'add',
						handler : function() {
							owner.openCreateWindow();
						}
					   },{
						text : '修改',
						tooltip : '修改',
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
									})
						}
					},{
						text : '删除',
						tooltip : '删除',
						iconCls : 'delete',
						handler : function() {
								if (grid.getSelectRecords().length == 0) {
									MsgUtil.error('操作出错', '请选择一条记录删除');
									return;
								} else if (grid.getSelectRecords().length > 1) {
									MsgUtil.error('操作出错', '只能选择一条记录删除');
									return;
								}
							MsgUtil.confirm("提示", "是否确认删除", function(btn) {
								if (btn == 'no') {
									return ;
								}
								ConnectionUtil.ajaxReq({
									strServId : "contactPolicyService.deleteContactStrategy",
									jsonData : {
									contactpolicysubky : grid.getSelectRecords()[0]
												.get('contactpolicysubky')
									},
									callback : function(data) {
										owner.queryList();// 重新刷新窗口
									}
								});
							})
						}
					}]
		
		});//grid 结束
	},
	/**
	 * 创建新增窗口
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-08-3
	 * @最后修改日期：
	 */
	openCreateWindow : function() {
		var owner = this;
		//创建新增窗口
		var win = this.create('component.Window', {
					title : '新增联系策略',
					closable : true,
					draggable : true,
					resizable : true,
					width : 570,
					height : 200,
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.contactPolicy.ContactPolicyCreate',//创建新增页面对象
							{
						         id : 'ContactPolicyCreate'
							})
				});
		win.on('close', function() {
					owner.queryList();//窗口关闭后刷新列表
				})
	},
	/**
	 * 创建修改窗口
	 * 
	 * @param record 选择的列表记录
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	openUpdateWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '修改联系策略信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 570,
					height : 180,
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.contactPolicy.ContactPolicyUpdate',
							{
								id : 'ContactPolicyUpdate',
								contactpolicysubky : record.get('contactpolicysubky')
							})
				});
		win.on('close', function() {
					owner.queryList();//窗口关闭后刷新列表
				})
	}
	
});