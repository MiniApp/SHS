/**
 * 交叉审批页面 <p/> 功能描述：
 * <li>交叉审批</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("business.crossAudit.CrossAudit", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/component/crossAudit/CrossAudit.html",
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：wanghua
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		this.create('component.Panel', {
			contentEl : this.ids.crossAuditContentDiv,
			hasBackGroundColor : true,
			renderTo : this.ids.crossAuditDiv,
			height : 90,
			buttons : [ {
				text : '确定',
				iconCls : 'query',
				handler : function() {
					owner.crossAudit();
				}
			} ]
		});
	},
	/**
	 * 进行交叉审批
	 * 
	 * @param
	 * @return
	 * @程序员：wanghua
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	crossAudit : function() {
		var owner = this;
		var searchParam = DataUtil
				.getDataFromArea(owner.ids.crossAuditContentDiv);
		if (searchParam != Constants.VALIDATION_FAIL) {
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "crossAuditService.validateAuditEmployee",
				jsonData : searchParam,
				callback : function(msg) {
					if(!DataUtil.isEmpty(owner.callbackParam)){
						owner.callbackParam.auditEmployeeKy=msg.employeeKy;
					}
					owner.callback(DataUtil.encode(owner.callbackParam));
					owner.parent.close();// 关闭窗口
				},
				failure : function(msg) {
					MsgUtil.error("审批失败", msg);
				}
			});
		}
	}
});