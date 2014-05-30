/**
 * 
 * 系统管理->重置密码
 * 
 * <p/> 功能描述：
 * 
 * <li>输入查询条件查询</li>
 * <li>查询当前用户列表</li>
 * <li>重置用户密码</li>
 * 
 * author:朱凯
 * 
 * date:2012-07-19
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.resetEmployeePassword.ResetEmployeePasswordList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/resetEmployeePassword/ResetEmployeePasswordList.html",// 页面url地址
	/**
	 * 初始数据
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-19
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
	 * @编码日期：2012-07-19
	 * @最后修改日期：
	 */
	initCmp : function() {
		this.queryEmployeeManageList();
		//创建机构树
		this.createOrgSelectTree({
			renderTo : this.ids.nodeTree,
			codeDomId : this.ids.node,
			width : 350,
			onlyLeafSelect : false,
			belongPageObject:this
		});
		var owner = this;
		// 创建panel
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.resetEmployeePasswordListDiv,
					contentEl : this.ids.resetEmployeePasswordListSearchDiv,
					widthPercent:1,
					heightPercent :0.225,
					hasBackGroundColor : true,	
					buttons : [{
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryEmployeeManageList(); //查询列表
								}
							}]//buttons 结束
				}//function 结束 
		);//cteate 结束
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
	 * 查询用户列表
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-19
	 * @最后修改日期：
	 */
	queryEmployeeManageList : function() {
		var owner = this;
		var searchParam =DataUtil.getDataFromArea(this.ids.resetEmployeePasswordListSearchDiv);//获取页面录入的查询条件
		// 清空列表区域
		HtmlUtil.overwrite(this.ids.resetEmployeePasswordListDisplayDiv, "", false);
		//创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.resetEmployeePasswordListDisplayDiv,
			strServId : 'resetEmployeePasswordService.getFollowOrgEmployeeList',
			jsonData : searchParam,
			mapping : ['corpersonky','name', 'findphone', 'id', 'nodeDesc','status'],
			collapsible : false,
			widthPercent:1,
			heightPercent:0.755,
			checkbox : true,
			title : '查询结果',
			columns : [{
						header : "用户姓名",
						sortable : true,
						dataIndex : 'name',
						widthPercent:0.2
					}, {
						header : "联系电话",
						sortable : true,
						dataIndex : 'findphone',
						widthPercent:0.2
					}, {
						header : "用户编号",
						sortable : true,
						dataIndex : 'id',
						widthPercent:0.2
					},{
						header : "所属机构名称",
						sortable : true,
						dataIndex : 'nodeDesc',
						widthPercent:0.2
					},{
						header : "状态",
						sortable : true,
						dataIndex : 'status',
						widthPercent:0.2
					}],
					tbar : [  {
						text : '重置密码',
						tooltip : '重置密码',
						iconCls : 'delete',
						handler : function() {
								if (grid.getSelectRecords().length == 0) {
									MsgUtil.error('操作出错', '请选择一条记录重置密码');
									return;
								} else if (grid.getSelectRecords().length > 1) {
									MsgUtil.error('操作出错', '只能选择一条记录重置密码');
									return;
								}
							MsgUtil.confirm("提示", "是否将"+grid.getSelectRecords()[0]
												.get('name')+"的密码重置为初始密码", function(btn) {
								if (btn == 'no') {
									return;
								}
								ConnectionUtil.ajaxReq({
									strServId : "resetEmployeePasswordService.updateResetEmployeePasswordInfo",
									jsonData : {
										corpersonky : grid.getSelectRecords()[0]
												.get('corpersonky')
									},
									callback : function(data) {
										owner.queryEmployeeManageList();//删除成功后刷新列表
									}
								});
							})
						}
					}
					]
		
		});//grid 结束
	}//function 结束
});