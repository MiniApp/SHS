/**
 * 审核/审批管理 审核通过列表
 * 
 * @author DuanYong
 * @Since:2012-10-16
 * @Update 2012-10-16
 */
ObjectUtil.define("business.auditing.WaitingAuditingList", "base.PageObject", {
	htmlContent : [
			'<table width="100%" border="0" cellpadding="0">',
			'<tr>',
			'<td valign="top" id="{WaitingAuditingListPanelDiv}">',
			'<div id="{WaitingAuditingListContentDiv}">',
			'<table width="100%" border="0" cellspacing="2" cellpadding="0" class="SearchTable">',
			'<tr>',
			'<td align="right">申请起始时间:</td><td class="empt"><input name="currauditcreatedatestart" title="起始日期" class="compareTo-currauditcreatedateend-lt=-date" id="{WaitingAuditingListContentDiv_currauditcreatedatestart}" type="text" readonly="true"/></td>',
			'<td align="right">申请结束时间:</td><td class="empt"><input name="currauditcreatedateend" title="结束日期" class="compareWith-currauditcreatedatestart" id="{WaitingAuditingListContentDiv_currauditcreatedateend}" type="text" readonly="true" /></td>',
			'</tr>',
			'<tr>',
			'<input name="currauditky" type="hidden" id="{WaitingAuditingListContentDiv_currauditky}"/>',
			'<input name="currauditresult" type="hidden" id="{WaitingAuditingListContentDiv_currauditresult}"/>',
			'<input name="waiteauditresult" type="hidden" id="{WaitingAuditingListContentDiv_waiteauditresult}"/>',
			'<input name="auditresulting" type="hidden" id="{WaitingAuditingListContentDiv_auditresulting}"/>',
			'<td align="right">审批类型:</td><td class="empt"><select name="applytype" id="{WaitingAuditingListContentDiv_applytype}"><option /></select></td>',
			'<td align="right">描述:</td><td><input align="left" name="taskdesc" id="{WaitingAuditingListContentDiv_taskdesc}" type="text"/></td>',
			'<td align="right">申请人:</td><td><input align="left" name="currapplycusname" id="{WaitingAuditingListContentDiv_currapplycusname}" type="text"/></td>',
			'</tr>',
			'</table>', '</div>', '</td>', '</tr>', '<tr>',
			'<td valign="top" id="{WaitingAuditingListDiv}"></td>', '</tr>',
			'</table>'],
	initData : function(){
		HtmlUtil.getDom(this.ids.WaitingAuditingListContentDiv_currauditky).value = DataUtil.getUserInfo().objectId;
		HtmlUtil.getDom(this.ids.WaitingAuditingListContentDiv_currauditresult).value = CodeStringDefinition.APPROVAL_RESULT_STATUS_APPROVING;
		HtmlUtil.getDom(this.ids.WaitingAuditingListContentDiv_waiteauditresult).value = CodeStringDefinition.APPROVAL_RESULT_STATUS_APPROVING;
		HtmlUtil.getDom(this.ids.WaitingAuditingListContentDiv_auditresulting).value = CodeStringDefinition.APPROVAL_RESULT_STATUS_DO_APPROVING;
	},
	initCmp : function() {
		var owner = this;
		var category = [];
		//对公
		if(DataUtil.getUserInfo().systemId == CodeStringDefinition.CORPOR_SYSTM_MSGCODE){
			category.push(CodeStringDefinition.CORP_APPROVE_TYPE);
		}else{
			category.push(CodeStringDefinition.CORPORATE_CUSTOMERSERVICE_CORPVIPAPPROVETYPE);
		}
		this.create("component.EnumSelector", {
					category : category,
					renderTo : [this.ids.WaitingAuditingListContentDiv_applytype]
				});
		
		this.create('component.DateField', {
					renderTo : this.ids.WaitingAuditingListContentDiv_currauditcreatedatestart,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.WaitingAuditingListContentDiv_currauditcreatedateend,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.WaitingAuditingListPanelDiv,
					contentEl : this.ids.WaitingAuditingListContentDiv,
					collapsible : false,
					widthPercent : 0.99,
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
//		this.reload();
	},
	getWaitingAuditingList : function(){
		var owner = this;
		var jsonData = DataUtil.getDataFromArea(this.ids.WaitingAuditingListContentDiv);
		if (Constants.VALIDATION_FAIL != jsonData) {
			// 清空列表区域
			HtmlUtil.overwrite(this.ids.WaitingAuditingListDiv, "", false);
			this.grid = this.create('component.DataGrid', {
						strServId : 'auditingTaskAssignHelper.getTaskAssignListByCriteria',
						jsonData : jsonData,
						renderTo : owner.ids.WaitingAuditingListDiv,
						widthPercent : 0.99,
						heightPercent : 0.75,
						mapping : ['assignky', 'taskky', 'currapplycusky',
									'currapplycusname', 'currauditcreatedatestr',
									'currauditdatestr', 'currauditdesc', 'currauditky',
									'currauditname', 'currauditresult',
									'currauditresultstr', 'currstepname',
									'nextauditname', 'nextstepname', 'applytype',
									'applytypestr', 'prevauditdesc', 'prevstepname',
									'taskdesc', 'taskservername','stepmustfinished','targetStr','nextauditorg','nextauditroleId','taskInfo'],
						columns : [{
									header : "审批类型",
									widthPercent : 0.2,
									dataIndex : 'applytypestr'
								},{
									header : "描述",
									widthPercent : 0.2,
									dataIndex : 'taskdesc'
								}, {
									header : "申请人",
									widthPercent : 0.2,
									dataIndex : 'currapplycusname'
								}, {
									header : "申请时间",
									widthPercent : 0.2,
									dataIndex : 'currauditcreatedatestr'
								}, {
									header : "目标对象",
									widthPercent : 0.2,
									dataIndex : 'targetStr',
									renderer : function(value,metadata,record){
										if(!DataUtil.isEmpty(value)){
											return value + "...";
										}else{
											return "";
										}
									}
								}],
						tbar : [{
									text : "查看任务详细",
									handler : ObjectUtil.bind(owner.viewDetail, owner),
									iconCls : 'view'
								},{
									text : "查看审批记录",
									handler : ObjectUtil.bind(owner.view, owner),
									iconCls : 'view'
								},{
									text : "审批",
									handler : ObjectUtil.bind(owner.auditing, owner),
									iconCls : 'save'
								}]
					});
		}
	}
	,
	format : function(val, cellmeta, recode) {
		var task = DataUtil.decode(recode.data.taskdesc);
		return task.desc;
	},
	/**
	 * 查看任务详细
	 */
	viewDetail : function() {
		var owner = this;
		if (this.grid.getSelectRecords().length == 0) {
			MsgUtil.error('操作出错', '请选择一条记录查看详细信息');
			return;
		} else {
			var selectd = this.grid.getSelectRecords()[0];
			var taskinfo = DataUtil.decode(selectd.data['taskInfo']);
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
									extFlag : taskinfo.extFlag,
									taskky : selectd.data['taskky']
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
			MsgUtil.error('操作出错', '请选择一条记录查看详细信息');
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
	 * 审批
	 */
	auditing : function() {
		var owner = this;
		if (this.grid.getSelectRecords().length == 0) {
			MsgUtil.error('操作出错', '请选择一条记录');
			return;
		} else {
			var selectd = this.grid.getSelectRecords()[0];
			var win = this.create('component.Window', {
						title : '审批',
						closable : true,
						draggable : true,
						resizable : true,
						width : 600,
						height : 400,
						modal : true,
						pageObject : this.create(
								'business.auditing.Auditing', {
									id : 'Auditing',
									data : selectd.data
								})
					});
			win.on('close', function() {
						owner.reload();// 窗口关闭后刷新列表
					});
		}
	},
	/**
	 * 重载数据
	 */
	reload : function() {
		this.getWaitingAuditingList()
	}
})
