/**
 * 修改信息页面 <p/> 功能描述：
 * <li>修改信息</li>
 * 
 * @author 朱凯
 * @since 2012-10-10
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.messagemodel.MessageModelUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/messagemodel/MessageModelUpdate.html",// html路径
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
						// 加载并渲染数据
						var owner = this;
						ConnectionUtil
								.ajaxReq( {
									strServId : "messageModelService.messageModelById",
									jsonData : {
										messagemodelky : this.messagemodelky
									},
									callback : function(data) {
										DataUtil
												.populateDataForArea(
														data,
														owner.ids.messageModelUpdateContentDiv);// 渲染数据到页面
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
							contentEl : this.ids.messageModelUpdateContentDiv,
							hasBackGroundColor : true,
							height : 450,
							renderTo : this.ids.messageModelUpdateDiv,
							buttons : [ {
								text : '确定',
								iconCls : 'save',
								handler : function() {
									owner.updatemessageModelInfo();
								}
							} ]
						});

					},
					/**
					 * 保存修改信息
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-10-18
					 * @最后修改日期：
					 */
					updatemessageModelInfo : function() {
						var owner = this;
						var data = DataUtil
								.getDataFromArea(owner.ids.messageModelUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil
									.decode(data), {
								messagemodelky : this.messagemodelky
							});// 组装修改信息将客户主键corpersonky添加的修改信息数据中
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "messageModelService.updateMessageModelInfo",
										jsonData : newData,
										callback : function(msg) {
											MsgUtil.alert("提示", "修改成功！");
											owner.parent.close();// 关闭窗口
									}
									});
						}

					}
				});