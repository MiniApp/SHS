/**
 * 
 * 系统管理->短信模板列表
 * 
 * <p/> 功能描述：
 * 
 * <li>输入查询条件查询</li>
 * <li>查询当前短信模板列表</li>
 * 
 * 
 * author:朱凯
 * 
 * date:2012-10-17
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.messagemodel.MessageModelList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/messagemodel/MessageModelList.html",// 页面url地址
	/**
	 * 初始数据
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-17
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
	 * @编码日期：2012-10-17
	 * @最后修改日期：
	 */
	initCmp : function() {
		
		var owner = this;
		//渲染下拉框
		this.create("component.EnumSelector",{
			category : ['MsgModelTypeEnum'],
			renderTo : [this.ids.modeltype],
			id : [this.ids.modeltype]
		});
		// 创建panel
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.messageModelListDiv,
					contentEl : this.ids.messageModelListSearchDiv,
					widthPercent:0.98,
					heightPercent :0.175,
					hasBackGroundColor : true,	
					buttons : [{
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.querymessageModelList(); //查询列表
								}
							}]//buttons 结束
				}//function 结束 
		);//cteate 结束

		this.querymessageModelList();
	},
	/**
	 * 初始化事件监听
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-17
	 * @最后修改日期：
	 */
	initEvent:function(){
		
	},
	
	/**
	 * 查询当前短信模板列表
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-17
	 * @最后修改日期：
	 */
	querymessageModelList : function() {
		var owner = this;
		
		var searchParam =DataUtil.getDataFromArea(this.ids.messageModelListSearchDiv);//获取页面录入的查询条件
		if(searchParam != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过){
			// 清空列表区域
			HtmlUtil.overwrite(this.ids.messageModelListDisplayDiv, "", false);
			//创建列表组件
			var grid = this.create('component.DataGrid', {
				renderTo : this.ids.messageModelListDisplayDiv,
				strServId : 'messageModelService.getMessageModelList',
				jsonData : searchParam,
				mapping : ['messagemodelky','title', 'content','modeltype','modeltypeStr'],
				collapsible : false,
				widthPercent:0.98,
				heightPercent:0.785,
				checkbox : true,
				title : '查询结果',
				columns : [{
							header : "标题",
							sortable : true,
							dataIndex : 'title',
							widthPercent:0.15
						},{
							header : "短信模板类型",
							sortable : true,
							dataIndex : 'modeltypeStr',
							widthPercent:0.13
						},{
							header : "内容",
							sortable : true,
							dataIndex : 'content',
							widthPercent:0.7
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
						}, {
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
						}, {
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
										return;
									}
									ConnectionUtil.ajaxReq({
										strServId : "messageModelService.deleteMessageModelInfo",
										jsonData : {
											messagemodelky : grid.getSelectRecords()[0]
													.get('messagemodelky')
										},
										callback : function(data) {
											owner.querymessageModelList();//删除成功后刷新列表
										}
									});
								})
							}
						}
						]
			
			});//grid 结束	
		}
	
	},//function 结束
	/**
	 * 创建新增窗口
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-17
	 * @最后修改日期：
	 */
	openCreateWindow : function() {
		var owner = this;
		//创建新增窗口
		var win = this.create('component.Window', {
					title : '新增短信模板',
					closable : true,
					draggable : true,
					resizable : true,
					width : 700,
					height : 490,
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.messagemodel.MessageModelCreate',//创建新增页面对象
							{
						         id : 'messageModelCreate'
							})
				});
		win.on('close', function() {
					owner.querymessageModelList();//窗口关闭后刷新列表
				})
	},
	/**
	 * 创建详细信息窗口
	 * 
	 * @param record 选择的列表记录
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-17
	 * @最后修改日期：
	 */
	openViewWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '查看短信模板详细信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 680,
					height : 440,
					layout : 'fit',
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.messagemodel.MessageModelDetail',//创建详细信息页面对象
							{
								id : 'messageModelDetail',
								messagemodelky : record.get('messagemodelky')
							})
				});
		

	},
	/**
	 * 创建修改窗口
	 * 
	 * @param record 选择的列表记录
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-10-17
	 * @最后修改日期：
	 */
	openUpdateWindow : function(record) {
		var owner = this;
		var win = this.create('component.Window', {
					title : '修改短信模板信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 700,
					height : 490,
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.messagemodel.MessageModelUpdate',
							{
								id : 'messageModelUpdate',
								messagemodelky : record.get('messagemodelky')
							})
				});
		win.on('close', function() {
					owner.querymessageModelList();
		})
	}
});