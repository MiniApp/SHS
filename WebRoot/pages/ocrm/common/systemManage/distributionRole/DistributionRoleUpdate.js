/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.distributionRole.DistributionRoleUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/distributionRole/DistributionRoleUpdate.html",// html路径
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
						var positions=owner.position;
						var roleids=owner.roleid+'';
						//下拉菜单
						this.create("component.EnumSelector", {
							category : [CodeStringDefinition.POSITION_CATEGORY],
							renderTo : [this.ids.positionenum],
							id : [this.ids.positionenum],
							selectedValue:[positions]
						});
						//创建下拉列表
						ConnectionUtil.ajaxReq({
							strServId : "distributionRoleService.getRolenames",
							callback : function(data) {
								owner.create("component.Selector", {
												id :owner.ids.roleid,
												renderTo : owner.ids.roleid,
												jsonData : data,
												selectedValue:roleids	
											});
							}
						});
						/*
						ConnectionUtil.ajaxReq({
									strServId : "distributionRoleService.distributionRoleById",
									jsonData : {
							               sysuserrolepk : this.sysuserrolepk
									},
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.distributionRoleUpdateContentDiv);// 渲染数据到页面
										var roleids=owner.roleid+'';
										
									}
								});
					*/
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
									contentEl : this.ids.distributionRoleUpdateContentDiv,
									hasBackGroundColor : true,
									height : 100,
									renderTo : this.ids.distributionRoleUpdateDiv,
									buttons : [{
												text : '确定',
												iconCls : 'save',
												handler : function() {
													owner.updateDistributionRoleInfo();
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
					updateDistributionRoleInfo : function() {
						var owner=this;
						
						var data = DataUtil.getDataFromArea(owner.ids.distributionRoleUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
										sysuserrolepk:this.sysuserrolepk,
										corpersonky : this.corpersonky
					
									});// 组装修改信息将客户主键sysuserrolepk添加的修改信息数据中
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "distributionRoleService.updateSysUserRole",
								jsonData : newData,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改角色成功！");
									owner.parent.close();// 关闭窗口
								}
							});
						}

					}
				});