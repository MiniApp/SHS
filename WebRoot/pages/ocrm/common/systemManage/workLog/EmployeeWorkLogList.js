/**
 * 
 * 工作日志用户列表
 * 
 * <p/> 功能描述：
 * 
 * <li>输入查询条件查询</li>
 * <li>查询用户列表</li>
 * 
 * 
 * author:tangyingzhen
 * 
 * date:2012-08-15
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.workLog.EmployeeWorkLogList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/workLog/EmployeeWorkLogList.html",// 页面url地址
	
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-05-15
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		// 创建panel
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.employeeWorkLogPanelDiv,
					contentEl : this.ids.employeeWorkLogContentDiv,
					collapsible : true,
					widthPercent : 1,
					//height : 100,
					heightPercent : 0.2,
					hasBackGroundColor : true,	
					buttons : [{
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryEmployeeWorkLogList(); //查询列表
								}
							}]
			});
		owner.queryEmployeeWorkLogList(); //查询列表
	},
	
	
	/**
	 * 查询用户列表
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-08-15
	 * @最后修改日期：
	 */
	queryEmployeeWorkLogList : function() {
		var owner = this;
		var searchParam = DataUtil.getDataFromArea(this.ids.employeeWorkLogContentDiv);//获取页面录入的查询条件
		if (searchParam == Constants.VALIDATION_FAIL) {
			return;
		}
		// 清空列表区域
		HtmlUtil.overwrite(this.ids.employeeWorkLogListDiv, "", false);
		//创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.employeeWorkLogListDiv,
			strServId : 'employeeManageService.getFollowOrgEmployeeList',
			jsonData : searchParam,
			widthPercent : 1,
			heightPercent : 0.78,
			mapping : ['corpersonky','name', 'findphone', 'id', 'nodeDesc','status'],
			collapsible : false,
			checkbox : true,
			title : '查询结果',
			columns : [{
						header : "客户经理姓名",
						sortable : true,
						dataIndex : 'name',
						//width : 200
						widthPercent : 0.15
					}, {
						header : "客户经理编号",
						sortable : true,
						dataIndex : 'id',
						//width : 200
						widthPercent : 0.15
					},{
						header : "所属机构名称",
						sortable : true,
						dataIndex : 'nodeDesc',
						//width : 318
						widthPercent : 0.4
					},{
						header : "联系电话",
						sortable : true,
						dataIndex : 'findphone',
						//width : 200
						widthPercent : 0.15
					},{
						header : "状态",
						sortable : true,
						dataIndex : 'status',
						//width : 200
						widthPercent : 0.13
					}],
					tbar : [{
						text : '下载日志',
						tooltip : '下载工作日志',
						iconCls : 'save',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请选择一条记录操作');
								return;
							} else if (grid.getSelectRecords().length > 1) {
								MsgUtil.error('操作出错', '只能选择一条记录操作');
								return;
							}
							DataUtil.each(grid.getSelectRecords(), function(
											record) {
										owner.openDownLoadWindow(record);
									});
						}
					}]
		
		});
	},
	/**
	 * 下载工作日志窗口
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-08-15
	 * @最后修改日期：
	 */
	openDownLoadWindow : function(record) {
		var owner = this;
		//创建新增窗口
		var win = this.create('component.Window', {
					title : '工作日志',
					closable : true,
					draggable : true,
					resizable : true,
					width : 800,
					height : 200,
					//x : '80',
					//y : '60',
					modal : true,
					pageObject : this.create('crm.pages.ocrm.common.systemManage.workLog.WorkLog',
							{
						         id : 'downLoadWorkLog',
						         corpersonky : record.get('corpersonky'),
						         name : record.get('name')
							})
				});
		win.on('close', function() {
					owner.queryEmployeeWorkLogList();//窗口关闭后刷新列表
				});
	}
});