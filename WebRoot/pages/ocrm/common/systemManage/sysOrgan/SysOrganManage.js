ObjectUtil
		.define("crm.pages.ocrm.common.systemManage.sysOrgan.SysOrganManage",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/sysOrgan/SysOrganManage.html",// 页面url地址

	initCmp : function() {
		var owner = this;
		// 实例面板
		this.create('component.Panel',{
					title : '查询条件',
					id : "searchPanel",
					renderTo : this.ids.maintainOrganMainDiv,
					contentEl : this.ids.maintainOrganMainSearchDiv,
					frame : true,
					widthPercent:1,
					heightPercent :0.125,
					collapsible : true,
					collapsed : false,
					iconCls : 'query',
					buttons : [ {
						text : '查询',
						iconCls : 'query',
						handler : function() {
							owner.queryOrganList();
						}
					} ]
				});
		
		this.queryOrganList();
				
	},
	
	initEvent : function() {
		var owner = this;

	},	

	/**
	 * 取得机构信息
	 * 
	 * 参数说明： - result 查询结果
	 */
	queryOrganList : function() {
		var owner = this;
		HtmlUtil.overwrite(this.ids.maintainOrganMainDisplayDiv,
				"", false);
		// 获取页面录入的查询条件
		var searchData = DataUtil.getDataFromArea(this.ids.maintainOrganMainSearchDiv);
		var grid=this.create('component.DataGrid',{
					title : '机构列表',
					renderTo : this.ids.maintainOrganMainDisplayDiv,
					strServId : 'sysOrganManageService.getOrganInfoList',
					jsonData : searchData,
					mapping :['cororgky','organCode', 'organName','centerName',
					          'provinceName', 'cityName','branchcodeName',
					          'nodeName','organLevel','levelName','orgOtherName'],
					collapsible : false,
					checkbox : true,
					widthPercent:1,
					heightPercent:0.85,
					title : '查询结果',
					columns : [ 
					           {
									id : 'organCode',
									header : "机构号",
									sortable : true,
									dataIndex : 'organCode',
									widthPercent:0.09
								}
//					           , {
//									id : 'orgOtherName',
//									header : "核心机构号",
//									sortable : true,
//									dataIndex : 'orgOtherName',
//									widthPercent:0.09
//								}
					           , {
									id : 'name',
									header : "机构名称",
									sortable : true,
									dataIndex : 'organName',
									widthPercent:0.20					
								}, {
									header : "总行",
									sortable : true,
									dataIndex : 'centerName',
									widthPercent:0.20
								},{
									header : "分行",
									sortable : true,
									dataIndex : 'provinceName',
									widthPercent:0.20
								}
								, {
									header : "支行",
									sortable : true,
									dataIndex : 'cityName',
									widthPercent:0.20
								},
//								{
//									header : "二级支行",
//									sortable : true,
//									dataIndex : 'branchcodeName',
//									widthPercent:0.15
//								}, {
//									header : "网点",
//									sortable : true,
//									dataIndex : 'nodeName',
//									widthPercent:0.15
//								}, 
								{
									header : "机构级别",
									sortable : true,
									dataIndex : 'levelName',
									widthPercent:0.08
								}
								
					            ],
					tbar : [
					    {
							text : '新增',
							tooltip : '新增系统机构',
							iconCls : 'add',
							handler : function() {
								owner.openEditWindow(null);
							}
						},
						{
							text : '修改',
							tooltip : '修改系统机构',
							iconCls : 'add',
							handler : function() {
								var records=grid.getSelectRecords();
								if (records.length == 0) {
									MsgUtil.error('操作出错', '请选择一条记录进行操作');
									return;
								} else if (records.length > 1) {
									MsgUtil.error('操作出错', '只能选择一条记录进行操作');
									return;
								}
								owner.openEditWindow(records[0].get('cororgky'));
							}
						},
						/*{
							text : '调整机构调整',
							tooltip : '调整系统机构级别',
							iconCls : 'add',
							handler : function() {
								owner.openModifyLevelWindow();
							}
						},*/
						{
							text : '删除机构',
							tooltip : '删除系统机构',
							iconCls : 'add',
							handler : function() {
								var records=grid.getSelectRecords();
								if (records.length == 0) {
									MsgUtil.error('操作出错', '请选择一条记录进行操作');
									return;
								} else if (records.length > 1) {
									MsgUtil.error('操作出错', '只能选择一条记录进行操作');
									return;
								}
								MsgUtil.confirm("提示", "是否确认删除", function(btn) {
																	if (btn == 'no') {
																		return;
																	}
																	if (btn == 'yes') {
									ConnectionUtil.ajaxReq( {
									strServId : "sysOrganManageService.deleteOrganInfo",
									jsonData : {
										organCode:records[0].get('organCode'),
										organLevel:records[0].get('organLevel')
									},
									callback : function(msg) {
										if(msg.result){
											MsgUtil.alert('操作提示', '数据删除成功');
										}else{
											MsgUtil.error('操作提示', '数据删除失败:'+msg.error);
										}
										owner.queryOrganList();
									}
								});
																		
																	}
																	
																});
								
							}
						}
					]
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
	openEditWindow : function(cororgky) {
		var owner = this;
		// 创建新增窗口
		var win = this.create('component.Window', {
					title : '编辑机构信息',
					closable : true,
					draggable : true,
					resizable : true,
					width : 690,
					height:350,
					modal : true,
					pageObject : this.create(
							'crm.pages.ocrm.common.systemManage.sysOrgan.SysOrganEdit',// 创建新增页面对象
							{
								id : 'SysOrganEdit',
								organKey:cororgky
							})
				});
			win.on('close', function() {
				owner.queryOrganList();// 窗口关闭后刷新列表
			});
		},
		/**
		 * 机构级别调整
		 * 
		 * @param
		 * @return
		 * @程序员：tangyingzhen
		 * @编码日期：2012-07-23
		 * @最后修改日期：
		 */
		openModifyLevelWindow : function() {
			var owner = this;
			// 创建新增窗口
			var win = this.create('component.Window', {
						title : '机构级别调整',
						closable : true,
						draggable : true,
						resizable : true,
						width : 660,
						height : 200,
						modal : true,
						pageObject : this.create(
								'crm.pages.ocrm.common.systemManage.sysOrgan.SysOrganModifyLevel',// 创建新增页面对象
								{
									id : 'SysOrganModifyLevel'
								})
					});
				win.on('close', function() {
					owner.queryOrganList();// 窗口关闭后刷新列表
				});
			}
});