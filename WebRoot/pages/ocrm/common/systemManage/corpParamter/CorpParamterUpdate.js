/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-10-19
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.corpParamter.CorpParamterUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/corpParamter/CorpParamterUpdate.html",// html路径
					/**
					 * 初始化页面数据
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-10-19
					 * @最后修改日期：
					 */
					initData : function() {
						// 加载并渲染数据
						var owner = this;
						ConnectionUtil.ajaxReq({
									strServId : "corpParamterService.getCorpParamter",
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.corpParamterUpdateContentDiv);// 渲染数据到页面
									}
								});
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-10-19
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						// 面板
						this.panel = this.create('component.Panel', {
									contentEl : this.ids.corpParamterUpdateContentDiv,
									hasBackGroundColor : true,
									height : 130,
									renderTo : this.ids.corpParamterUpdateDiv,
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
					 * @程序员：朱凯
					 * @编码日期：2012-07-25
					 * @最后修改日期：
					 */
					updateEmployeeManageInfo : function() {
						var owner = this;
						
						var data = DataUtil.getDataFromArea(owner.ids.corpParamterUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "corpParamterService.insertCorpParamter",
								jsonData : data,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改参数成功！");
									owner.parent.close();// 关闭窗口
								}
							});
						}

					}
				});