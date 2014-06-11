/**
 * 
 * 系统管理->客户经理指标列表列表
 * 
 * <p/> 功能描述：
 * 
 * <li>增加客户经理指标</li>
 * <li>删除客户经理指标</li>
 * <li>修改客户经理指标</li>
 * 
 * 
 * 
 * author:朱凯
 * 
 * date:2012-10-15
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.personParamter.AssesstargetList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/personParamter/AssesstargetList.html",// 页面url地址
	/**
	 * 初始数据
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-15
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
	 * @编码日期：2012-10-15
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
	 * @编码日期：2012-10-15
	 * @最后修改日期：
	 */
	initEvent:function(){
		
		
	},
	/**
	 * 创建查询
	 * 
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-15
	 * @最后修改日期：
	 */
	queryList:function(){
		var owner = this;
		HtmlUtil.overwrite(this.ids.assesstargetListDisplayDiv, "", false);
		//创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.assesstargetListDisplayDiv,
			strServId : 'assesstargetService.getAssesstargetList',
			jsonData : {
			},
			mapping : ['assesstargetky','employeetype','target', 'targetdefine','weight'],
			collapsible : false,
			widthPercent:1,
			heightPercent:0.97,
			checkbox : true,
			title : '查询结果',
			columns : [{
						header : "客户经理类型",
						sortable : true,
						dataIndex : 'employeetype',
						widthPercent:0.2
					}, {
						header : "考核指标",
						sortable : true,
						dataIndex : 'target',
						widthPercent:0.2
					},
					{
						header : "单项权重",
						sortable : true,
						dataIndex : 'weight',
						widthPercent:0.1
					},{
						header : "指标定义",
						sortable : true,
						dataIndex : 'targetdefine',
						widthPercent:0.5
					}],
					tbar : [{
						text : '详细信息',
						tooltip : '详细信息',
						iconCls : 'view',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录查看详细信息');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录查看详细信息');
								return;
							}
							DataUtil.each(grid.getSelectRecords(), function(
											record) {
										owner.openViewWindow(record);
									})
						}
					}, {
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
								if (btn == 'yes') {
								ConnectionUtil.ajaxReq({
									strServId : "assesstargetService.deleteAssesstargetInfo",
									jsonData : {
									assesstargetky : grid.getSelectRecords()[0]
												.get('assesstargetky')
									},
									callback : function(data) {
										owner.queryList();// 重新刷新窗口
									}
								});
								}
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
	 * @编码日期：2012-10-15
	 * @最后修改日期：
	 */
	openCreateWindow : function() {
		var owner = this;
		//创建新增窗口
		var win = this.create('component.Window', {
					title : '新增客户经理指标',
					closable : true,
					draggable : true,
					resizable : true,
					width : 700,
					height : 350,
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.personParamter.AssesstargetCreate',//创建新增页面对象
							{
						         id : 'AssesstargetCreate'
							})
				});
		win.on('close', function() {
					owner.queryList();//窗口关闭后刷新列表
				})
	},
	/**
	 * 创建详细信息窗口
	 * 
	 * @param record 选择的列表记录
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-15
	 * @最后修改日期：
	 */
	openViewWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '查看客户经理指标详细信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 580,
					height : 240,
					layout : 'fit',
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.personParamter.AssesstargetDetail',//创建详细信息页面对象
							{
								id : 'AssesstargetDetail',
								assesstargetky : record.get('assesstargetky')
							})
				});
		

	},
	/**
	 * 创建修改窗口
	 * 
	 * @param record 选择的列表记录
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-15
	 * @最后修改日期：
	 */
	openUpdateWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '修改客户经理指标信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 700,
					height : 350,
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.personParamter.AssesstargetUpdate',
							{
								id : 'AssesstargetUpdate',
								assesstargetky : record.get('assesstargetky')
							})
				});
		win.on('close', function() {
					owner.queryList();//窗口关闭后刷新列表
				})
	}
	
});