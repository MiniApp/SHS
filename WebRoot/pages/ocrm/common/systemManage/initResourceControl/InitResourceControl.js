/**
 * 菜单自定义页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存选择的资源</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.initResourceControl.InitResourceControl",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/initResourceControl/InitResourceControl.html",// 页面url地址
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
						// 创建树
						this.initResourceControlTree = this
								.createResourceTree({
									title : '',
									renderTo : this.ids.initResoureControlTreeDiv,
									paramStr : {
										'paramStr' : CodeStringDefinition.INIT_RESOURCE_CONTROL
									},
									multiple : true,
									expandAll : true,
									widthPercent : 0.985,
									heightPercent : 0.98,
									height : 500,
									tbar : [ {
										text : '自定义资源权限',
										iconCls : 'save',
										handler : function() {
											owner.addResourceControl();
										}
									} ],
									nodeClick : function(data) {
									}
								});

					},

					/**
					 * 保存选择的资源
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-23
					 * @最后修改日期：
					 */
					addResourceControl : function() {
						var owner = this;
						var nodes = this.initResourceControlTree
								.getCheckedNodes();
						var checkedNodes = [];
						DataUtil.each(nodes, function(data) {
							var node = {};
							node['resourceId'] = data['id'];
							checkedNodes.push(node);
						});
						var jsonData = {};
						if (checkedNodes.length == 0) {
							MsgUtil.alert("提示", "必须有资源被选中!");
							return;
						}
						if (this.initResourceControlTree.getAllNode().length
								- checkedNodes.length > 10) {
							MsgUtil.alert("提示", "最多只能屏蔽10个菜单!");
							return;
						}
						jsonData['resourceControlBeanList'] = checkedNodes;
						ConnectionUtil
								.ajaxReq({// 发送ajax请求
									strServId : "resourceTreeService.saveInitResourceControl",
									jsonData : DataUtil.encode(jsonData),
									callback : function(msg) {
										if (null != msg) {
											owner.parent.close();// 关闭窗口
											MsgUtil.alert("提示", "菜单定制失败");
										} else {
											MsgUtil
													.confirm(
															"确认消息框",
															"您定制的菜单已经保存成功,立即应用该定制吗?<br><br>提示：页面会被刷新,请先确认是否有尚未保存的业务数据,以免丢失!",
															function(btn, txt) {
																if (btn == "no") {
																	owner.parent
																			.close();// 关闭窗口
																	MsgUtil
																			.alert(
																					"提示",
																					"请在任何时候按[F5]键刷新页面或者重新登录系统以应用定制的菜单!",
																					400);
																	return false;
																} else {
																	owner.parent
																			.close();// 关闭窗口
																	MsgUtil
																			.alert(
																					"提示",
																					"正在为您应用定制的菜单...");
																	location
																			.reload();
																}
															}, 470);
										}
									}
								});
					}
				});