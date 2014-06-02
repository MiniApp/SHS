/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManagePasswordUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/employeeManage/EmployeeManagePasswordUpdate.html",// html路径
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
						// 加载并渲染数据
						var owner = this;
						ConnectionUtil.ajaxReq({
									strServId : "employeeManageService.employeeManageById",
									jsonData : {
										corpersonky : this.corpersonky
									},
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.employeeManagePasswordUpdateContentDiv);// 渲染数据到页面
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
									contentEl : this.ids.employeeManagePasswordUpdateContentDiv,
									hasBackGroundColor : true,
									height : 160,
									width : 350,
									renderTo : this.ids.employeeManagePasswordUpdateDiv,
									buttons : [{
												text : '确定',
												iconCls : 'save',
												handler : function() {
													owner.updateEmployeeManagePasswordInfo();
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
					 * @编码日期：2012-07-25
					 * @最后修改日期：
					 */
					updateEmployeeManagePasswordInfo : function() {
						var owner = this;
						// 验证两次输入密码是否一致
						var queryPassword = HtmlUtil.getDom(this.ids.queryPassword).value;
						var confirmqueryPassword = HtmlUtil.getDom(this.ids.confirmqueryPassword).value;
						//验证密码长度
						if(queryPassword.length>13){
							MsgUtil.error('页面验证出错', '您输入的密码长度过长，请重新输入1-13位的密码');
							return;
						}
						if(queryPassword!=confirmqueryPassword){
						MsgUtil.error('页面验证出错', '两次输入的密码不一致');
						return;
						}
						var data = DataUtil.getDataFromArea(owner.ids.employeeManagePasswordUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
										corpersonky : this.corpersonky
									});// 组装修改信息将客户主键corpersonky添加的修改信息数据中
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "employeeManageService.updateEmployeePassword",
								jsonData : newData,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改密码成功！");
									owner.parent.close();// 关闭窗口
								}
							});
						}

					}
				});