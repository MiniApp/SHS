/**
 * 反馈信息创建
 * @author wuqihui
 * @since 20130217
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.feedback.FeedbackCreate", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH 
		+ "/pages/ocrm/common/systemManage/feedback/FeedbackCreate.html",// 页面url地址
	
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
		// 创建面板
		this.create("component.EnumSelector", {
							category : [ 'FeedBackTypeEnum'],
							renderTo : [ this.ids.typeEnum],
							id : [ this.ids.typeEnum]
						});
		this.create('component.Panel', {
			contentEl : this.ids.feedbackinnerDiv,
			hasBackGroundColor : true,
			renderTo : this.ids.feedbackDiv,
//			height : 170,
			buttons : [{
				text : '保存',
				iconCls : 'save',
				handler : function() {
					owner.createInfo();
				}
			}]
		});
		
	},
	
	/**
	 * 保存添加信息
	 * 
	 * @param
	 * @return
	 * @程序员：wuqihui
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	createInfo : function() {
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.feedbackDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "feedbackService.createFeedback",
				jsonData : data,
				callback : function(msg) {
					MsgUtil.alert("提示", "新增成功！");
					owner.parent.close();// 关闭窗口
				}
			});
		}

	}
	
});
