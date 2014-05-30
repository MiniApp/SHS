/**
 * 角色类别权限分配页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存选择的资源</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.resourceManage.UpidResourceControl",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/resourceManage/UpidResourceControl.html",// 页面url地址
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
						var strServId = 'resourceTreeService.getSubResourceControl';
						var paramStr = CodeStringDefinition.UPID_STIRNG
								+ CodeStringDefinition.SPLIT_STRING
								+ owner.upid;
						var disTreeText = '"' + owner.rolename + '" 资源权限树';
						this.upidResourceControlTree = this
								.createResourceTree({
									renderTo : owner.ids.upidResoureControlTreeDiv,
									title : '资源权限',
									tbar : [{
										text : '保存角色类别资源权限',
										iconCls : 'save',
										handler : function() {
											owner.saveUpidResourControl();
										}
									}],
									resourceDesc : disTreeText,
									height : 450,
									strServId : strServId,
									paramStr : {'paramStr': paramStr},
									expandAll : true,
									multiple : true,
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
					saveUpidResourControl : function() {
						var owner = this;
						var nodes = this.upidResourceControlTree.getCheckedNodes();
						if (nodes.length == 0) {
							MsgUtil.error("错误提示", "角色类别资源必须选择");
							return;
						}
						var checkedNodes = [];
						DataUtil.each(nodes, function(data) {
									var node = {};
									node['resourceId'] = data['id'];
									node['upid'] = owner.upid;
									checkedNodes.push(node);
								});
						var jsonData = {};
						jsonData['resourceControlBeanList'] = checkedNodes;
						jsonData['upid'] = owner.upid;
						ConnectionUtil.ajaxReq({// 发送ajax请求
							strServId : "resourceTreeService.updateUpIdResourceControl",
							jsonData : DataUtil.encode(jsonData),
							callback : function(msg) {
								MsgUtil.alert("提示", "保存成功!");
								owner.parent.close();// 关闭窗口
							}
						});
					} 
			});