/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-10-15
 * 
 */                
ObjectUtil.define("crm.pages.ocrm.common.systemManage.personParamter.AssesstargetCreate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/personParamter/AssesstargetCreate.html",// html路径
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
				this.create("component.EnumSelector", {
					category : [CodeStringDefinition.PERSON_EMPLOYEETYPEENUM_CATEGORY],
					renderTo : [this.ids.employeetypeEnum],
					id : [this.ids.employeetypeEnum]	
				});
				// 创建面板
				this.create('component.Panel', {
							contentEl : this.ids.assesstargetCreateContentDiv,
							hasBackGroundColor : true,
							renderTo : this.ids.assesstargetCreateDiv,
							height : 310,
							buttons : [{
										text : '保存',
										iconCls : 'save',
										handler : function() {
											owner.assesstargetCreateInfo();
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
			 * @编码日期：2012-10-15
			 * @最后修改日期：
			 */
			assesstargetCreateInfo : function() {
				var owner=this;
				var data = DataUtil.getDataFromArea(owner.ids.assesstargetCreateContentDiv);// 获取页面输入的信息并自动验证
				if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "assesstargetService.insertAssesstargetInfo",
						jsonData : data,
						callback : function(msg) {
							MsgUtil.alert("提示", "新增客户经理指标成功！");
							owner.parent.close();// 关闭窗口
						}
					});
				}
			}
		});