/**
 * 详细信息页面
 * <p/> 功能描述：
 * <li>详细信息</li>
 * 
 * @author 朱凯
 * @since 2012-10-18
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.messagemodel.MessageModelDetail", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/messagemodel/MessageModelDetail.html",// html路径
			/**
			 * 初始化页面数据
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-10-18
			 * @最后修改日期：
			 */
			initData : function() {
				var owner = this;
				// 加载并渲染数据
				ConnectionUtil.ajaxReq({
							strServId : "messageModelService.messageModelById",
							jsonData : {
					              messagemodelky : this.messagemodelky
							},
							callback : function(data) {
								DataUtil
										.populateDataForArea(
												data,
												owner.ids.messageModelDetailContentDiv);// 渲染数据到页面
							}
						});
			},
		/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-10-18
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				// 面板
				this.panel = this.create('component.Panel', {
							contentEl : this.ids.messageModelDetailContentDiv,
							hasBackGroundColor : true,
							widthPercent:0.98,
							height:400,
							renderTo : this.ids.messageModelDetailDiv
						});
			}
		});
