/**
 * 查看审核/审批详细
 * 
 * @author DuanYong
 * @Since:2012-10-16
 * @Update 2012-10-16
 */
ObjectUtil.define("business.auditing.ViewAuditing", "base.PageObject", {
	htmlContent : [
			'<div id="{AuditingViewPanelId}">',
			'<div id="{AuditingViewPanelContentId}">',
			'<table class="DisplayTable">',
			'<tr>',
			'<td style="width:20%" align="right">申请人:</td>',
			'<td style="width:30%"><span name="currapplycusname" id="{AuditingViewPanelContentId_currapplycusname}"   /></td>',
			'<td style="width:20%" align="right">申请时间:</td>',
			'<td style="width:30%"><span name="currauditcreatedatestr" id="{AuditingViewPanelContentId_currauditcreatedatestr}"  /></td>',
			'</tr>',
			'<tr>',
			'<td  align="right">审批人:</td>',
			'<td><span name="currauditname" id="{AuditingViewPanelContentId_currauditname}" /></td>',
			'<td  align="right">审批时间:</td>',
			'<td><span name="currauditdatestr" id="{AuditingViewPanelContentId_currauditdatestr}" /></td>',
			'</tr>',
			'<tr>',
			'<td style="width:20%" align="right">申请理由:</td>',
			'<td colspan="3"><span name="taskdesc" id="{AuditingViewPanelContentId_taskdesc}" ></span></td>',
			'</tr>',
			'<tr>',
			'<td  align="right">上阶段审批意见:</td>',
			'<td  colspan="3" class="empt"><span name="prevauditdesc" id="{AuditingViewPanelContentId_prevauditdesc}" ></span></td>',
			'</tr>',
			'<tr>',
			'<td  align="right">审批意见:</td>',
			'<td  colspan="3" class="empt"><span name="currauditdesc" id="{AuditingViewPanelContentId_currauditdesc}" ></span></td>',
			'</tr>',
			'</table>', '</div>', '</div>'],
	initData : function() {
		DataUtil.populateDataForArea(this.data,this.ids.AuditingViewPanelContentId);
	},
	initCmp : function() {
		var owner = this;
		this.create('component.Panel', {
							contentEl : this.ids.AuditingViewPanelContentId,
							hasBackGroundColor : true,
							widthPercent : 0.98,
							heightPercent : 0.97,
							renderTo : this.ids.AuditingViewPanelId
						});
	}
});