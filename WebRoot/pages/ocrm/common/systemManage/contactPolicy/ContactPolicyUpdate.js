/**
 * 修改联系策略信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-08-6
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.contactPolicy.ContactPolicyUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/contactPolicy/ContactPolicyUpdate.html",// html路径
					/**
					 * 初始化页面数据
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-08-6
					 * @最后修改日期：
					 */
					initData : function() {
						// 加载并渲染数据
						var owner = this;
						ConnectionUtil.ajaxReq({
									strServId : "contactPolicyService.getContactStrategyById",
									jsonData : {
							          contactpolicysubky : this.contactpolicysubky
									},
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.contactPolicyUpdateContentDiv);// 渲染数据到页面
									}
								});
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-24
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						// 面板
						this.panel = this.create('component.Panel', {
									contentEl : this.ids.contactPolicyUpdateContentDiv,
									hasBackGroundColor : true,
									height : 140,
									renderTo : this.ids.contactPolicyUpdateDiv,
									buttons : [{
												text : '确定',
												iconCls : 'save',
												handler : function() {
													owner.updateContactPolicyInfo();
												}
											}]
								});
						
					},
					/**
					 * 保存修改信息
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-08-6
					 * @最后修改日期：
					 */
					updateContactPolicyInfo : function() {
						var owner = this;
						//验证AUM分层名称
						var layername = HtmlUtil.getDom(this.ids.layername).value;
						if(layername.length>30){
							MsgUtil.error('页面验证出错', '您输入的AUM分层名称的长度过长，请重新输入');
							return;
						}
						var data = DataUtil.getDataFromArea(owner.ids.contactPolicyUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
								     contactpolicysubky : this.contactpolicysubky
									});// 组装修改信息将联系策略主键contactpolicysubky添加的修改信息数据中
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "contactPolicyService.updateContactStrategy",
								jsonData : newData,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改成功！");
									owner.parent.close();// 关闭窗口
								}
							});
						}

					}
				});