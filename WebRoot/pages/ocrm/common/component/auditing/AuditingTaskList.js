/**
 * 审批/审批任务管理
 * 
 * @author DuanYong
 * @Since:2012-10-17
 * @Update 2012-10-17
 */
ObjectUtil.define("business.auditing.AuditingTaskList", "base.PageObject", {
	htmlContent : [
			'<table width="100%" border="0" cellpadding="0">',
			'<tr>',
			'<td valign="top" id="{AuditingTaskListPanelDiv}">',
			'<div id="{AuditingTaskListContentDiv}">',
			'<table width="100%" border="0" cellspacing="2" cellpadding="0" class="SearchTable">',
			'<tr>',
			'<input name="applycusky" type="hidden" id="{AuditingTaskListContentDiv_applycusky}"/>',
			'<td align="right">审批类型:</td><td class="empt"><select name="applytype" id="{AuditingTaskListContentDiv_applytype}"><option /></select></td>',
			'<td align="right">创建时间:</td><td class="empt"><table border="0" cellspacing="2" cellpadding="0"><tr><td class="empt"><input name="taskcreatedatestart" title="起始日期" class="compareTo-taskcreatedateend-lt=-date" id="{AuditingTaskListContentDiv_taskcreatedatestart}" type="text" readonly="true"/></td><td>-</td><td class="empt"><input name="taskcreatedateend" title="结束日期" class="compareWith-taskcreatedatestart" id="{AuditingTaskListContentDiv_taskcreatedateend}" type="text" readonly="true" /></td></tr></table></td>',
			'</tr>',
			'<tr>',
			'<td align="right">审批结果:</td><td class="empt"><select name="auditresult" id="{AuditingTaskListContentDiv_auditresult}"><option /></select></td>',
			'<td align="right">审批时间:</td><td class="empt"><table border="0" cellspacing="2" cellpadding="0"><tr><td class="empt"><input name="taskauditdatestart" title="起始日期" class="compareTo-taskauditdateend-lt=-date" id="{AuditingTaskListContentDiv_taskauditdatestart}" type="text" readonly="true"/></td><td>-</td><td class="empt"><input name="taskauditdateend" title="结束日期" class="compareWith-taskauditdatestart" id="{AuditingTaskListContentDiv_taskauditdateend}" type="text" readonly="true" /></td></tr></table></td>',
			'</tr>', '</table>', '</div>', '</td>', '</tr>', '<tr>',
			'<td valign="top" id="{AuditingTaskListDiv}"></td>', '</tr>',
			'</table>'],
	initData : function() {
		HtmlUtil.getDom(this.ids.AuditingTaskListContentDiv_applycusky).value = DataUtil
				.getUserInfo().objectId;
	},
	initCmp : function() {
		var owner = this;
		var category = [];
		// 对公
		if (DataUtil.getUserInfo().systemId == CodeStringDefinition.CORPOR_SYSTM_MSGCODE) {
			category.push(CodeStringDefinition.CORP_APPROVE_TYPE);
		} else {
			category
					.push(CodeStringDefinition.CORPORATE_CUSTOMERSERVICE_CORPVIPAPPROVETYPE);
		}
		this.create("component.EnumSelector", {
					category : category,
					renderTo : [this.ids.AuditingTaskListContentDiv_applytype]
				});
		this.create("component.EnumSelector", {
					category : [CodeStringDefinition.APPROVAL_RESULT_STATUS_CATEGORY],
					renderTo : [this.ids.AuditingTaskListContentDiv_auditresult]
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingTaskListContentDiv_taskcreatedatestart,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingTaskListContentDiv_taskcreatedateend,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingTaskListContentDiv_taskauditdatestart,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingTaskListContentDiv_taskauditdateend,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.AuditingTaskListPanelDiv,
					contentEl : this.ids.AuditingTaskListContentDiv,
					collapsible : false,
					widthPercent : 1,
					heightPercent : 0.25,
					hasBackGroundColor : true,
					buttons : [{
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.reload();
								}
							}]
				});
		// this.reload();
	},
	getAuditingTaskList : function() {
		var owner = this;
		var jsonData = DataUtil
				.getDataFromArea(this.ids.AuditingTaskListContentDiv);
		if (Constants.VALIDATION_FAIL != jsonData) {
			// 清空列表区域
			var newbar = [{
						text : "查看任务详细",
						handler : ObjectUtil.bind(owner.viewDetail, owner),
						iconCls : 'view'
					}, {
						text : "查看审批记录",
						handler : ObjectUtil.bind(owner.view, owner),
						iconCls : 'view'
					}];

			HtmlUtil.overwrite(this.ids.AuditingTaskListDiv, "", false);
			this.grid = this.create('component.DataGrid', {
						strServId : 'auditingTaskHelper.getTaskList',
						jsonData : jsonData,
						renderTo : owner.ids.AuditingTaskListDiv,
						widthPercent : 1,
						heightPercent : 0.75,
						mapping : ['taskky', 'applycusky', 'applycusname',
								'applytype', 'applytypestr', 'auditdesc',
								'auditky', 'auditname', 'auditresult',
								'auditresultstr', 'taskauditdate',
								'taskauditdatestr', 'taskcreatedate',
								'taskcreatedatestr', 'taskinfo', 'businessky',
								'taskservername', 'targetStr'],
						columns : [{
									header : "审批类型",
									width : 80,
									dataIndex : 'applytypestr'
								}, {
									header : "描述",
									width : 200,
									dataIndex : 'taskinfo',
									renderer : ObjectUtil.bind(owner.format,
											owner)
								}, {
									header : "创建时间",
									width : 130,
									dataIndex : 'taskcreatedatestr'
								}, {
									header : "审批时间",
									width : 130,
									dataIndex : 'taskauditdatestr'
								}, {
									header : "审批人",
									width : 100,
									dataIndex : 'auditname'
								}, {
									header : "审批结果",
									width : 80,
									dataIndex : 'auditresultstr'
								}, {
									header : "目标对象",
									width : 120,
									dataIndex : 'targetStr',
									renderer : function(value, metadata, record) {
										if (record.get('applytypestr') == "发送短信") {
											return value + "...";
										} else {
											return value;
										}
									}
								}],
						tbar : newbar
					});
		}
	},
	format : function(val, cellmeta, recode) {
		var task = DataUtil.decode(recode.data.taskinfo);
		return task.desc;
	},
	/**
	 * 查看任务详细
	 */
	viewDetail : function(select) {
		var owner = this;
		var taskinfo = DataUtil
				.decode(this.grid.getSelectRecords()[0].data['taskinfo']);
		if (this.grid.getSelectRecords().length == 0) {
			MsgUtil.error('操作出错', '请选择一条记录查看详细信息');
			return;
		} else {
			var selectd = this.grid.getSelectRecords()[0];
			this.create('component.Window', {
						title : '查看任务详细',
						closable : true,
						draggable : true,
						resizable : true,
						width : 800,
						height : 500,
						modal : true,
						pageObject : this.create(
								'business.auditing.ViewTaskDetail', {
									id : 'ViewTaskDetail',
									taskky : selectd.data['taskky'],
									mysubmit : true,
									extFlag : taskinfo.extFlag,
									auditresult : selectd.data['auditresult']
								})
					});
		}
	},
	/**
	 * 查看详细
	 */
	view : function() {
		var owner = this;
		if (this.grid.getSelectRecords().length == 0) {
			MsgUtil.error('操作出错', '请选择一条记录查看审批记录');
			return;
		} else {
			var selectd = this.grid.getSelectRecords()[0];
			this.create('component.Window', {
						title : '查看审批记录',
						closable : true,
						draggable : true,
						resizable : true,
						width : 800,
						height : 500,
						modal : true,
						pageObject : this.create(
								'business.auditing.AuditingedList', {
									id : 'AuditingedList',
									taskky : selectd.data['taskky']
								})
					});
		}
	},
	/**
	 * 删除
	 */
	del : function() {
		var owner = this;
		if (owner.validation()) {
			var selectd = owner.grid.getSelectRecords()[0];
			if (selectd.data['auditresult'] == CodeStringDefinition.APPROVAL_RESULT_STATUS_DO_APPROVING) {
				MsgUtil.alert('验证出错', '该申请正在审批中,不能删除!');
				return;
			}
			MsgUtil.confirm("确认消息框", "是否确定对选中的行进行删除操作，删除后不能够恢复！", function(btn,
							txt) {
						if (btn == "yes") {
							var jsonData = {
								'taskky' : selectd.data['taskky'],
								'taskservername' : selectd.data['taskservername']
							};
							ConnectionUtil.ajaxReq({
										strServId : "auditingTaskHelper.deleteTask",
										jsonData : DataUtil.encode(jsonData),
										callback : function(data) {
											owner.reload();// 删除成功后刷新列表
										}
									});
						}
					});
		}

	},
	/**
	 * 重载数据
	 */
	reload : function() {
		this.getAuditingTaskList()
	},
	validation : function() {
		if (this.grid.getSelectRecords().length == 0) {// validation
			MsgUtil.alert('验证出错', '请选择一条记录!');
			return false;
		}
		if (this.grid.getSelectRecords().length > 1) {// validation
			MsgUtil.alert('验证出错', '只能择一条记录，进行此操作!');
			return false;
		}
		return true;
	}
})
