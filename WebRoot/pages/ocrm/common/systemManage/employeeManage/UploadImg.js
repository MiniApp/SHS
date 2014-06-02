/**
 * 照片上传页面
 * 
 * <p/> 功能描述：
 * <上传照片>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.employeeManage.UploadImg", "base.PageObject", {
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/employeeManage/UploadImg.html",// 页面url地址
		
		initData: function(){
				if (!DataUtil.isEmpty(this.corpersonky) && 0 != this.corpersonky) {
					HtmlUtil.getDom(this.ids.corpersonky).value = this.corpersonky;
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
		 * @程序员：wanghua
		 * @编码日期：2012-07-18
		 * @最后修改日期：
		 */
		initCmp : function() {
			var owner = this;
			// 创建面板
			ObjectUtil.create('component.UploadPanel', {
				renderTo : this.ids.createDiv,
				contentEl : this.ids.createContentDiv,
				height : 200,
			    contentHeight : 100,
			    types : ['jpeg','jpg','png','bmp'],
				strServId:'accountManagerService.uploadImg',
				uploadCallBack : function(obj, msg) {
						if (msg.success) {
							MsgUtil.alert('系统提示', '修改照片成功,请刷新后可看到!');
						} else {
							MsgUtil.error('系统提示', msg.msg);
						}
					}
			});
		}
	});