/**
 * 附件上传 <p/> 功能描述：
 * <li>附件上传</li>
 * 
 * @author DuanYong
 * @since 2012-07-27
 * 
 */
ObjectUtil.define("business.accessory.Upload", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/component/accessory/Upload.html",// html路径
	initData : function() {
		var me = this;
		if (!DataUtil.isEmpty(this.accrelationky) && 0 != this.accrelationky) {
			HtmlUtil.getDom(this.ids.accrelationky).value = this.accrelationky;
		} else if (!DataUtil.isEmpty(this.businessType)
				&& !DataUtil.isEmpty(this.businessky)) {
			HtmlUtil.getDom(this.ids.businessType).value = this.businessType;
			HtmlUtil.getDom(this.ids.businessky).value = this.businessky;
			// 检查是否已经存在关联关系
			var jsonData = {
				businessky : this.businessky,
				businessType : this.businessType
			};
			ConnectionUtil.ajaxReq({
				strServId : "accessoryReationHelper.getAccessoryRelationInfo",
				jsonData : jsonData,
				callback : function(data) {
					HtmlUtil.getDom(me.ids.accrelationky).value = data.accrelationky;
				}
			});
		} else if (!DataUtil.isEmpty(this.businessType)) {
			HtmlUtil.getDom(this.ids.businessType).value = this.businessType;
		} else {
			ExceptionUtil.throwBusinessException({
						msg : '参数不完整,请检查!'
					});
		}

	},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：DuanYong
	 * @编码日期：2012-07-27
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		// 创建面板
		this.create('component.UploadPanel', {
			renderTo : this.ids.uploadDiv,
			contentEl : this.ids.uploadContentDiv,
			strServId : 'accessoryHelper.uploadAccessory',
			multiple : true,
			types : this.types,
			height : 200,
			contentHeight : 0,
			uploadCallBack : function(obj, msg) {
				if (!msg.success) {
					owner.parent.close();
					MsgUtil.error('系统提示', msg.msg);
				} else {
					owner.parent.close();
					MsgUtil.alert('系统提示', '上传成功!');
				}
			}
		});
	}
});