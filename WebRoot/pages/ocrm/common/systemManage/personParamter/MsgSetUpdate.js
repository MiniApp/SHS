/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 蒋敏
 * @since 2013-09-16
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.personParamter.MsgSetUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/personParamter/MsgSetUpdate.html",// html路径
					/**
					 * 初始化页面数据
					 * 
					 * @param
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					initData : function() {
						// 加载并渲染数据
						var owner = this;
						ConnectionUtil.ajaxReq({
									strServId : "msgSendSetService.searchMsgSendSet",
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.personParamterUpdateContentDiv);// 渲染数据到页面
									}
								});
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						// 面板
						this.panel = this.create('component.Panel', {
									contentEl : this.ids.personParamterUpdateContentDiv,
									hasBackGroundColor : true,
									height : 400 ,
									renderTo : this.ids.personParamterUpdateDiv,
									buttons : [{
												text : '确定',
												iconCls : 'save',
												handler : function() {
													owner.updateEmployeeManageInfo();
												}
											}]
								});
						
					},
					/**
					 * 保存修改信息
					 * 
					 * @param
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					updateEmployeeManageInfo : function() {
						var owner = this;
						//IP地址验证的正则表达式
						var data = DataUtil.getDataFromArea(owner.ids.personParamterUpdateContentDiv);// 获取页面输入的信息并自动验证
						/*var pattern=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
						var data = DataUtil.getDataFromArea(owner.ids.personParamterUpdateContentDiv);// 获取页面输入的信息并自动验证
						var flag_ip = pattern.test(DataUtil.decode(data).url);
						if(!flag_ip){
							//验证IP地址
							MsgUtil.error("提示", "输入IP地址非法，请从新输入！");
							return;
						}else{
							if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
								ConnectionUtil.ajaxReq({// 发送ajax请求
									strServId : "msgSendSetService.updateParameter",
									jsonData : data,
									callback : function(msg) {
										MsgUtil.alert("提示", "修改参数成功！");
										ConnectionUtil.ajaxReq({
										strServId : "msgSendSetService.searchMsgSendSet",
										callback : function(data) {
											DataUtil.populateDataForArea(data,
													owner.ids.personParamterUpdateContentDiv);// 渲染数据到页面
										}
									});
									}
								});
							}
						}*/
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "msgSendSetService.updateParameter",
								jsonData : data,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改参数成功！");
									ConnectionUtil.ajaxReq({
									strServId : "msgSendSetService.searchMsgSendSet",
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.personParamterUpdateContentDiv);// 渲染数据到页面
									}
								});
								}
							});
						}
					}
				});