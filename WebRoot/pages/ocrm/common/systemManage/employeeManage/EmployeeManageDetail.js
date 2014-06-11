/**
 * 详细信息页面
 * <p/> 功能描述：
 * <li>详细信息</li>
 * 
 * @author 朱凯
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageDetail", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/employeeManage/EmployeeManageDetail.html",// html路径
			/**
			 * 初始化页面数据
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			initData : function() {
				var owner = this;
//				//图片显示
//				ImgUtil.getImgFromServer({
////					imgId : this.ids.photoImg,
//					jsonData:{corpersonky:this.corpersonky},
////					imgStrServId : "accountManagerService.getImg",
////					inDataClass:"com.easy.ocrm.corporate.beans.accountmanager.EmployeePhotoBean",
//				});
				// 加载并渲染数据
				ConnectionUtil.ajaxReq({
							strServId : "employeeManageService.employeeManageById",
							jsonData : {
								corpersonky : this.corpersonky
							},
							callback : function(data) {
								DataUtil
										.populateDataForArea(
												data,
												owner.ids.employeeManageDetailContentDiv)// 渲染数据到页面
							}
						});
			},
		/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				// 面板
				this.panel = this.create('component.Panel', {
							contentEl : this.ids.employeeManageDetailContentDiv,
							hasBackGroundColor : true,
							width : 765,
							height:445,
							renderTo : this.ids.employeeManageDetailDiv
						});
			}
		});
