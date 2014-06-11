/**
 * 详细信息页面
 * <p/> 功能描述：
 * <li>详细信息</li>
 * 
 * @author 朱凯
 * @since 2012-10-15
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.personParamter.AssesstargetDetail", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/personParamter/AssesstargetDetail.html",// html路径
			/**
			 * 初始化页面数据
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-10-15
			 * @最后修改日期：
			 */
			initData : function() {
				var owner = this;
				// 加载并渲染数据
				ConnectionUtil.ajaxReq({
							strServId : "assesstargetService.assesstargetById",
							jsonData : {
					              assesstargetky : this.assesstargetky
							},
							callback : function(data) {
								DataUtil
										.populateDataForArea(
												data,
												owner.ids.assesstargetDetailContentDiv);// 渲染数据到页面
							}
						});
			},
		/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-10-15
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				// 面板
				this.panel = this.create('component.Panel', {
							contentEl : this.ids.assesstargetDetailContentDiv,
							hasBackGroundColor : true,
							height:200,
							renderTo : this.ids.assesstargetDetailDiv
						});
			}
		});
