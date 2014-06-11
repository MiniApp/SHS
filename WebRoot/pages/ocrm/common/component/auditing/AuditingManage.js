/**
 * 审批/审批管理
 * 
 * @author DuanYong
 * @Since:2012-10-14
 * @Update 2012-10-14
 */
ObjectUtil.define("business.auditing.AuditingManage", "base.PageObject", {
	htmlContent : ['<div id="{AuditingManageDiv}"></div>'],
	initData : function() {

	},
	initCmp : function() {
		var owner = this;

		this.create('component.TabPanel', {
			id : 'DefaultRightPanel',
			widthPercent : 0.989,
			heightPercent : 0.97,
			renderTo : this.ids.AuditingManageDiv,
			items : [{
						id : 'AuditingTaskList',
						type : 'Panel',
						title : '我提交的审批任务',
						parentObj : this,
						className : 'business.auditing.AuditingTaskList',
						classConfig : {
							id : 'AuditingTaskList'
						}
					}, {
						id : 'WaitingAuditPanel',
						type : 'Panel',
						title : '等待我审批的任务',
						parentObj : this,
						className : 'business.auditing.WaitingAuditingList',
						classConfig : {
							id : 'WaitingAuditListPage'
						}
					}, {
						id : 'HistoryAuditPanel',
						type : 'Panel',
						title : '审批历史',
						parentObj : this,
						className : 'business.auditing.HistoryAuditingList',
						classConfig : {
							id : 'HistoryAuditingList'
						}
					}],
			activeTab : 'AuditingTaskList'
		});
	}
})
