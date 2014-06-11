/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-10-18
 * 
 */                
ObjectUtil.define("crm.pages.ocrm.common.systemManage.messagemodel.MessageModelCreate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/messagemodel/MessageModelCreate.html",// html路径
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
				//渲染下拉框
				this.create("component.EnumSelector",{
					category : ['MsgModelTypeEnum'],
					renderTo : [this.ids.modeltype],
					id : [this.ids.modeltype]
				});
				// 创建面板
				this.create('component.Panel', {
							contentEl : this.ids.messageModelCreateContentDiv,
							hasBackGroundColor : true,
							renderTo : this.ids.messageModelCreateDiv,
							height : 450,
							buttons : [{
										text : '保存',
										iconCls : 'save',
										handler : function() {
											owner.messageModelCreateInfo();
										}
									}]
						});
			
			},
			/**
			 * 保存添加信息
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-10-18
			 * @最后修改日期：
			 */
			messageModelCreateInfo : function() {
				var owner=this;
				var data = DataUtil.getDataFromArea(owner.ids.messageModelCreateContentDiv);// 获取页面输入的信息并自动验证
				if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "messageModelService.insertMessageModelInfo",
						jsonData : data,
						callback : function(msg) {
							MsgUtil.alert("提示", "新增短信模板成功！");
							owner.parent.close();// 关闭窗口
						}
					});
				}
			}
		});