/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 蒋敏
 * @since 2013-09-16
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.personParamter.PersonParamterUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/personParamter/PersonParamterUpdate.html",// html路径
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
									strServId : "personParamterService.getPersonParamter",
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
									height : 200 ,
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
						var flag = true;
						var data = DataUtil.getDataFromArea(owner.ids.personParamterUpdateContentDiv);// 获取页面输入的信息并自动验证
						if(data != Constants.VALIDATION_FAIL){
							var objectdata = DataUtil.decode(data);
							if(objectdata.cuswarnAmoun<50000.00){
								MsgUtil.error("提示", "客户大额提醒金额应不小于5万！");
								flag = false;
								return;
							}
							if(objectdata.abundadd<50000.00){
								MsgUtil.error("提示", "客户大额存现提醒金额应不小于5万！");
								flag = false;
								return;
							}
							if(objectdata.bigmoneyout<50000.00){
								MsgUtil.error("提示", "客户大额取现提醒金额应不小于5万！");
								flag = false;
								return;
							}
							if(objectdata.localtoother<50000.00){
								MsgUtil.error("提示", "客户本行转他行提醒金额应不小于5万！");
								flag = false;
								return;
							}
							if(objectdata.othertobank<50000.00){
								MsgUtil.error("提示", "客户他行转本行提醒金额应不小于5万！");
								flag = false;
								return;
							}
							if(objectdata.localtolocal<50000.00){
								MsgUtil.error("提示", "客户本行转本行提醒金额应不小于5万！");
								flag = false;
								return;
							}
						}else{
							return;
						}
						if (flag) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "personParamterService.insertPersonParamter",
								jsonData : data,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改参数成功！");
									ConnectionUtil.ajaxReq({
									strServId : "personParamterService.getPersonParamter",
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