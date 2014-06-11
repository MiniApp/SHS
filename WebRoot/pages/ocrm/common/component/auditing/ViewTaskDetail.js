/**
 * 查看任务详细
 * 
 * @author DuanYong
 * @Since:2012-10-18
 * @Update 2012-10-18
 */
ObjectUtil.define("business.auditing.ViewTaskDetail", "base.PageObject", {
	htmlContent : [
			'<table>',
			'<tr>',
			'<td valign="top" id="{ViewTaskDetailPanelId}">',
			'<div id="{ViewTaskDetailPanelContentId}">',
			'<table class="DisplayTable">',
			'<tr>',
			'<td  align="right" style="width:15%">申请人:</td>',
			'<td style="width:35%"><span name="applycusname" id="{ViewTaskDetailPanelContentId_applycusname}" /></td>',
			'<td  align="right" style="width:15%">申请时间:</td>',
			'<td style="width:35%"><span name="taskcreatedatestr" id="{ViewTaskDetailPanelContentId_taskcreatedatestr}" /></td>',
			'</tr>',
			'<tr>',
			'<td align="right">申请理由:</td>',
			'<td colspan="3"><span name="taskdesc" id="{ViewTaskDetailPanelContentId_taskdesc}"/></td>',
			'</tr>',
			'<tr>',
			'<td  align="right">审批人:</td>',
			'<td><span name="auditname" id="{ViewTaskDetailPanelContentId_auditname}"/></td>',
			'<td  align="right">审批时间:</td>',
			'<td><span name="taskauditdatestr" id="{ViewTaskDetailPanelContentId_taskauditdatestr}"  /></td>',
			'</tr>',
			'<td  align="right">审批类型:</td>',
			'<td><span  name="applytypestr" id="{ViewTaskDetailPanelContentId_applytypestr}"/></td>',
			'<td  align="right">审批结果:</td>',
			'<td><span  name="auditresultstr" id="{ViewTaskDetailPanelContentId_auditresultstr}"/></td>',
			'</tr>',
			'<tr>',
			'<td  align="right">审批意见:</td>',
			'<td  colspan="3" ><span name="auditdesc" id="{ViewTaskDetailPanelContentId_auditdesc}" ></span></td>',
			'</tr>', '</table>', '</div>', '</td>', '</tr>', '<tr>',
			'<td valign="top" id="{TaskTagetInfoListDiv}"></td>', '</tr>',
			'</table>'],
	initData : function() {
		var me = this;
		ConnectionUtil.ajaxReq({// 发送ajax请求
			strServId : "auditingTaskHelper.getTask",
			jsonData : DataUtil.encode({
						taskky : this.taskky
					}),
			callback : function(reocrd) {
				DataUtil.populateDataForArea(reocrd,
						me.ids.ViewTaskDetailPanelContentId);
				var taskInfo = DataUtil.decode(reocrd.taskinfo);
				HtmlUtil.getDom(me.ids.ViewTaskDetailPanelContentId_taskdesc).innerHTML = taskInfo.desc
				if (reocrd.taskTargetInfoList.length > 0) {
					var mapping = [];
					var columns = [];
					var data = [];
					var jsonData;
					DataUtil.each(reocrd.taskTargetInfoList, function(item) {
								jsonData = null;
								jsonData = ObjectUtil.apply({
											'businessky' : item.businessky,
											'name' : item.name
										}, DataUtil.decode(unescape(item.info)));
								data.push(jsonData);
							});
					mapping.push('businessky', 'name');
					if (DataUtil.getUserInfo().systemId == CodeStringDefinition.PERSONAL_SYSTM_MSGCODE) {
						columns.push({
							header : '名称',
							width : 100,
							dataIndex : 'name',
							renderer : function(value, metadata, record) {
								return me
										.rendererPersonCustomerIndexColumnToWindow(
												{
													name : record.data.name,
													customerky : record.data.businessky,
													authority : 'User'
												});
							}
						});
					} else if (me.extFlag == "0017000000") {
						columns.push({
									header : '名称',
									width : 100,
									dataIndex : 'name'
								});
					} else {
						columns.push({
							header : '名称',
							width : 100,
							dataIndex : 'name',
							renderer : function(value, metadata, record) {
								return me
										.rendererCorporateCustomerIndexToWindow(
												{
													name : record.data.name,
													customerky : record.data.businessky,
													authority : CodeStringDefinition.OtherRMPort_EMPLOYEE_AUTHORITY
												});
							}
						});
					}
    
					DataUtil.each(reocrd.taskTargetInfoList[0], function(item) {
								for (var it in DataUtil
										.decode(unescape(item.info))) {
									mapping.push(it);
									columns.push({
												header : it,
												width : 100,
												dataIndex : it
											});
								}
							});
					if (DataUtil.getUserInfo().systemId == CodeStringDefinition.CORPOR_SYSTM_MSGCODE) {
						if (!DataUtil.isEmpty(reocrd.applytype)
								&& CodeStringDefinition.CORP_ApproveType_LEVEL == reocrd.applytype
								&& CodeStringDefinition.CORP_ApproveType_TRANSFER != reocrd.applytype
								&& CodeStringDefinition.CORP_ApproveType_UP != reocrd.applytype
								&& CodeStringDefinition.CORP_ApproveType_ASSIGN != reocrd.applytype
								&& CodeStringDefinition.CORP_ApproveType_COMBIN != reocrd.applytype
								&& CodeStringDefinition.CORP_ApproveType_RESERV != reocrd.applytype) {
							var grid = me.create('component.DataGrid', {
								title : '任务信息',
								strServId : 'auditingTaskHelper.getTaskList',
								dataType : 'memory',
								data : data,
								pageSize : 500,
								renderTo : me.ids.TaskTagetInfoListDiv,
								widthPercent : 0.985,
								heightPercent : 0.6,
								mapping : mapping,
								columns : columns,
								tbar : [{
									text : '附件信息',
									tooltip : '附件信息',
									iconCls : 'edit',
									handler : function() {
										if (grid.getSelectRecords().length == 0) {
											MsgUtil.error('操作出错', '请选择一条记录!');
											return;
										} else if (grid.getSelectRecords().length > 1) {
											MsgUtil.error('操作出错', '只能选择一条记录!');
											return;
										}
										me.createAccessoryManageWindow({
											title : '审批申请',
											businessky : grid
													.getSelectRecords()[0]
													.get('businessky'),// me.taskky,
											businessType : CodeStringDefinition.BUSINESS_TYPE_CORP_AUTIDAPPLAY_DOC,
											allowUpload : (me.mysubmit == true && me.auditresult == CodeStringDefinition.APPROVAL_RESULT_STATUS_APPROVING)
													? true
													: false,
											allowDownload : true,
											allowDelete : (me.mysubmit == true && me.auditresult == CodeStringDefinition.APPROVAL_RESULT_STATUS_APPROVING)
													? true
													: false,
											allowDeleteAll : (me.mysubmit == true && me.auditresult == CodeStringDefinition.APPROVAL_RESULT_STATUS_APPROVING)
													? true
													: false,
											allowViewAll : true
										});
									}
								}]
							});
						} else {
							me.create('component.DataGrid', {
										title : '任务信息',
										strServId : 'auditingTaskHelper.getTaskList',
										dataType : 'memory',
										data : data,
										pageSize : 500,
										renderTo : me.ids.TaskTagetInfoListDiv,
										widthPercent : 0.985,
										heightPercent : 0.6,
										mapping : mapping,
										columns : columns
									});
						}

					} else {
						me.create('component.DataGrid', {
									title : '任务信息',
									strServId : 'auditingTaskHelper.getTaskList',
									dataType : 'memory',
									data : data,
									pageSize : 500,
									renderTo : me.ids.TaskTagetInfoListDiv,
									widthPercent : 0.985,
									heightPercent : 0.6,
									mapping : mapping,
									columns : columns
								});
					}
				}

			}
		});
	},
	initCmp : function() {
		var owner = this;
		this.create('component.Panel', {
					contentEl : this.ids.ViewTaskDetailPanelContentId,
					hasBackGroundColor : true,
					widthPercent : 0.985,
					heightPercent : 0.4,
					renderTo : this.ids.ViewTaskDetailPanelId
				});
	}
});
