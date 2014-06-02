/**
 * 新增角色信息页面 <p/> 功能描述：
 * <li>新增角色信息</li>
 * @author tangyingzhen
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.roleManage.RoleCreate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/roleManage/RoleCreate.html",// html路径
			/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				// 创建下拉框
//				this.create("component.EnumSelector", {
//							category : [CodeStringDefinition.ROLETYPE_CATEGORY],
//							renderTo : [this.ids.upidEnum],
//							id : [this.ids.upidEnum]
//						});
				ConnectionUtil.ajaxReq({
					strServId : "roleService.getUpidEnum",
					callback : function(upidEnum) {
						owner.create("component.Selector", {
										id :owner.ids.upidEnum,
										renderTo : owner.ids.upidEnum,
										jsonData : upidEnum
									});
					}
				});
				// 创建面板
				this.create('component.Panel', {
							contentEl : this.ids.roleCreateContentDiv,
							hasBackGroundColor : true,
							renderTo : this.ids.roleCreateDiv,
							height : 170,
							buttons : [{
										text : '保存',
										iconCls : 'save',
										handler : function() {
											owner.createInfo();
										}
									}]
						});
			},
			/**
			 * 保存添加信息
			 * 
			 * @param
			 * @return
			 * @程序员：tangyingzhen
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			createInfo : function() {
				var owner = this;
				var data = DataUtil.getDataFromArea(owner.ids.roleCreateContentDiv);// 获取页面输入的信息并自动验证
				if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
					var decodeData = DataUtil.decode(data);
					if(DataUtil.isEmpty(decodeData.upidEnum)){
						MsgUtil.error("页面验证出错", "角色类别必须选择值!");
						return ;
					}
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "roleService.addRole",
						jsonData : data,
						callback : function(msg) {
							MsgUtil.alert("提示", "新增成功！");
							owner.parent.close();// 关闭窗口
						}
					});
				}

			}
		});