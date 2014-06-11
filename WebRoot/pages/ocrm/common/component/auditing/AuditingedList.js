/**
 * 审批/审批管理 审批通过列表
 * 
 * @author DuanYong
 * @Since:2012-10-16
 * @Update 2012-10-16
 */
ObjectUtil.define("business.auditing.AuditingedList", "base.PageObject", {
	htmlContent : [
			'<table width="100%" border="0" cellpadding="0">',
			'<tr>',
			'<td valign="top" id="{AuditingedListPanelDiv}">',
			'<div id="{AuditingedListContentDiv}">',
			'<table width="100%" border="0" cellspacing="2" cellpadding="0" class="DisplayTable">',
			'<tr>',
			'<input name="taskky" type="hidden" id="{AuditingedListContentDiv_taskky}"/>',
			'<td align="right">审批结果:</td><td class="empt"><select name="currauditresult" id="{AuditingedListContentDiv_currauditresult}"><option /></select></td>',
			'<td align="right">申请时间:</td><td class="empt"><table border="0" cellspacing="2" cellpadding="0"><tr><td class="empt"><input name="currauditcreatedatestart" title="起始日期" class="compareTo-currauditcreatedateend-lt=-date" id="{AuditingedListContentDiv_currauditcreatedatestart}" type="text" readonly="true"/></td><td>-</td><td class="empt"><input name="currauditcreatedateend" title="结束日期" class="compareWith-currauditcreatedatestart" id="{AuditingedListContentDiv_currauditcreatedateend}" type="text" readonly="true" /></td></tr></table></td>',
			'</tr>',
			'<tr>',
			'<td align="right">审批人:</td><td><input align="left" name="currauditname" id="{AuditingedListContentDiv_currauditname}" type="text"/></td>',
			'<td align="right">审批时间:</td><td class="empt"><table border="0" cellspacing="2" cellpadding="0"><tr><td class="empt"><input name="currauditdatestart" title="起始日期" class="compareTo-currauditdateend-lt=-date" id="{AuditingedListContentDiv_currauditdatestart}" type="text" readonly="true"/></td><td>-</td><td class="empt"><input name="currauditdateend" title="结束日期" class="compareWith-currauditdatestart" id="{AuditingedListContentDiv_currauditdateend}" type="text" readonly="true" /></td></tr></table></td>',
			'</tr>',
			'</table>', '</div>', '</td>', '</tr>', '<tr>',
			'<td valign="top" id="{AuditingedListDiv}"></td>', '</tr>',
			'</table>'],
	initData : function(){
		HtmlUtil.getDom(this.ids.AuditingedListContentDiv_taskky).value = this.taskky;
	},
	initCmp : function() {
		var owner = this;
		this.create("component.EnumSelector", {
					category : [CodeStringDefinition.APPROVAL_RESULT_STATUS_CATEGORY],
					renderTo : [this.ids.AuditingedListContentDiv_currauditresult]
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingedListContentDiv_currauditcreatedatestart,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingedListContentDiv_currauditcreatedateend,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingedListContentDiv_currauditdatestart,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.DateField', {
					renderTo : this.ids.AuditingedListContentDiv_currauditdateend,
					width : 150,
					format : 'Y-m-d'
				});
		this.create('component.Panel', {
					title : '查询条件',
					renderTo : this.ids.AuditingedListPanelDiv,
					contentEl : this.ids.AuditingedListContentDiv,
					collapsible : false,
					widthPercent : 0.988,
					heightPercent : 0.3,
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
	getAuditingedList : function() {
		var owner = this;
		var jsonData = DataUtil.getDataFromArea(this.ids.AuditingedListContentDiv);
		if (Constants.VALIDATION_FAIL != jsonData) {
			// 清空列表区域
			HtmlUtil.overwrite(this.ids.AuditingedListDiv, "", false);
			this.grid = this.create('component.DataGrid', {
						strServId : 'auditingTaskAssignHelper.getTaskAssignListByCriteria',
						jsonData : jsonData,
						renderTo : owner.ids.AuditingedListDiv,
						widthPercent : 0.988,
						heightPercent : 0.7,
						mapping : ['assignky', 'taskky', 'currapplycusky',
								'currapplycusname', 'currauditcreatedatestr',
								'currauditdatestr', 'currauditdesc', 'currauditky',
								'currauditname', 'currauditresult',
								'currauditresultstr', 'currstepname',
								'nextauditname', 'nextstepname', 'applytype',
								'applytypestr', 'prevauditdesc', 'prevstepname',
								'taskdesc', 'taskservername'],
						columns : [{
									header : "审批类型",
									width : 70,
									dataIndex : 'applytypestr'
								}, {
									header : "申请人",
									width : 60,
									dataIndex : 'currapplycusname'
								}, {
									header : "申请时间",
									width : 130,
									dataIndex : 'currauditcreatedatestr'
								}, {
									header : "审批人",
									width : 60,
									dataIndex : 'currauditname'
								}, {
									header : "审批时间",
									width : 130,
									dataIndex : 'currauditdatestr'
								}, {
									header : "审批结果",
									width : 70,
									dataIndex : 'currauditresultstr'
								}, {
									header : "审批意见",
									width : 200,
									dataIndex : 'currauditdesc'
								}],
						tbar : [{
									text : "查看详细",
									handler : ObjectUtil.bind(owner.view, owner),
									iconCls : 'view'
								}]
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
						title : '查看审批结果详细',
						closable : true,
						draggable : true,
						resizable : true,
						width : 600,
						height : 400,
						modal : true,
						pageObject : this.create(
								'business.auditing.ViewAuditing', {
									id : 'ViewAuditing',
									data : selectd.data
								})
					});
		}
	},
	/**
	 * 重载数据
	 */
	reload : function() {
		this.getAuditingedList()
	}
})
