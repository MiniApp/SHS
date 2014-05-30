/**
 * 审核/审批管理 审核历史列表
 * 
 * @author DuanYong
 * @Since:2012-11-6
 * @Update 2012-11-6
 */
ObjectUtil.define("business.auditing.HistoryAuditingList", "base.PageObject", {
	htmlContent : [
			'<table width="100%" border="0" cellpadding="0">',
			'<tr>',
			'<td valign="top" id="{HistoryAuditingListPanelDiv}">',
			'<div id="{HistoryAuditingListContentDiv}">',
			'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="SearchTable">',
			'<tr>',
			'<input name="currauditky" type="hidden" id="{HistoryAuditingListContentDiv_currauditky}"/>',
			'<input name="refuseresult" type="hidden" id="{HistoryAuditingListContentDiv_refuseresult}"/>',
			'<input name="approvedresult" type="hidden" id="{HistoryAuditingListContentDiv_approvedresult}"/>',
			'<td align="right">申请起始时间:</td><td class="empt"><input name="currauditcreatedatestart" title="起始日期" class="compareTo-currauditcreatedateend-lt=-date" id="{HistoryAuditingListContentDiv_currauditcreatedatestart}" type="text" readonly="true"/></td>',
			'<td align="right">申请结束时间:</td><td class="empt"><input name="currauditcreatedateend" title="结束日期" class="compareWith-currauditcreatedatestart" id="{HistoryAuditingListContentDiv_currauditcreatedateend}" type="text" readonly="true" /></td>',
			'<td align="right">描述:</td><td ><input align="left" name="taskdesc" id="{HistoryAuditingListContentDiv_taskdesc}" type="text"/></td>',
			'</tr>',
			'<tr>',
			'<td align="right">审批类型:</td><td class="empt"><select name="applytype" id="{HistoryAuditingListContentDiv_applytype}"><option /></select></td>',
			'<td align="right">审批结果:</td><td class="empt"><select name="currauditresult" id="{HistoryAuditingListContentDiv_currauditresult}"><option /></select></td>',
			'<td align="right">申请人:</td><td><input align="left" name="currapplycusname" id="{HistoryAuditingListContentDiv_currapplycusname}" type="text"/></td>',
			'</tr>',
			'</table>', '</div>', '</td>', '</tr>', '<tr>',
			'<td valign="top" id="{HistoryAuditingListDiv}"></td>', '</tr>',
			'</table>'],
	initData : function(){
		HtmlUtil.getDom(this.ids.HistoryAuditingListContentDiv_currauditky).value = DataUtil.getUserInfo().objectId;
		HtmlUtil.getDom(this.ids.HistoryAuditingListContentDiv_approvedresult).value = CodeStringDefinition.APPROVAL_RESULT_STATUS_APPROVED;
		HtmlUtil.getDom(this.ids.HistoryAuditingListContentDiv_refuseresult).value = CodeStringDefinition.APPROVAL_RESULT_STATUS_FAIL;
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
					category :category,
					renderTo : [this.ids.HistoryAuditingListContentDiv_applytype]
				});
		this.create("component.EnumSelector", {
					category : [CodeStringDefinition.APPROVAL_RESULT_STATUS_CATEGORY],
					renderTo : [this.ids.HistoryAuditingListContentDiv_currauditresult]
				});
		this.create('component.DateField', {
					renderTo : this.ids.HistoryAuditingListContentDiv_currauditcreatedatestart,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.HistoryAuditingListContentDiv_currauditcreatedateend,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.HistoryAuditingListPanelDiv,
					contentEl : this.ids.HistoryAuditingListContentDiv,
					collapsible : false,
					widthPercent : 1,
					heightPercent : 0.2,
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
	getHistoryAuditingList : function(){
		var owner = this;
		var jsonData = DataUtil.getDataFromArea(this.ids.HistoryAuditingListContentDiv);
		if (Constants.VALIDATION_FAIL != jsonData) {
			// 清空列表区域
			HtmlUtil.overwrite(this.ids.HistoryAuditingListDiv, "", false);
			this.grid = this.create('component.DataGrid', {
						strServId : 'auditingTaskAssignHelper.getTaskAssignListByCriteria',
						jsonData : jsonData,
						renderTo : owner.ids.HistoryAuditingListDiv,
						widthPercent : 1,
						heightPercent : 0.8,
						mapping : ['assignky', 'taskky', 'currapplycusky',
								'currapplycusname', 'currauditcreatedatestr',
								'currauditdatestr', 'currauditdesc', 'currauditky',
								'currauditname', 'currauditresult',
								'currauditresultstr', 'currstepname',
								'nextauditname', 'nextstepname', 'applytype',
								'applytypestr', 'prevauditdesc', 'prevstepname',
								'taskdesc', 'taskservername','stepmustfinished','targetStr','taskInfo','laststut'],
						columns : [{
									header : "审批类型",
									widthPercent : 0.1,
									dataIndex : 'applytypestr'
								},{
									header : "描述",
									widthPercent : 0.2,
									dataIndex : 'taskdesc'
								}, {
									header : "申请人",
									widthPercent : 0.1,
									dataIndex : 'currapplycusname'
								}, {
									header : "申请时间",
									widthPercent : 0.1,
									dataIndex : 'currauditcreatedatestr'
								}, {
									header : "审批时间",
									widthPercent : 0.1,
									dataIndex : 'currauditdatestr'
								}, {
									header : "审批结果",
									widthPercent : 0.1,
									dataIndex : 'currauditresultstr'
								}, {
									header : "终审状态",
									widthPercent : 0.1,
									dataIndex : 'laststut'
								}, {
									header : "审批意见",
									widthPercent : 0.1,
									dataIndex : 'currauditdesc'
								}, {
									header : "目标对象",
									widthPercent : 0.1,
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
	 * 重载数据
	 */
	reload : function() {
		this.getHistoryAuditingList()
	}
})
