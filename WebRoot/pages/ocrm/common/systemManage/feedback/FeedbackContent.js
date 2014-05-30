/**
 * 反馈信息查看内容
 * @author wuqihui
 * @since 2013-06-20
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.feedback.FeedbackContent", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH 
		+ "/pages/ocrm/common/systemManage/feedback/FeedbackContent.html",// 页面url地址
	
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */	
	initCmp : function() {
		var owner = this;
		DataUtil.populateDataForArea(owner,
								owner.ids.feedbackinnerDiv);// 渲染数据到页面
		// 创建面板
		this.create('component.Panel', {
			contentEl : this.ids.feedbackinnerDiv,
			hasBackGroundColor : true,
			renderTo : this.ids.feedbackDiv
		});
	}
});
