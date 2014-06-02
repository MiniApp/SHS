/**
 * 角色权限分配页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存选择的资源</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.resourceManage.RoleidResourceControl",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/resourceManage/RoleidResourceControl.html",// 页面url地址
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
						var paramStr = CodeStringDefinition.ROLEID_STRING
								+ CodeStringDefinition.SPLIT_STRING
								+ owner.roleid;
						var disTreeText = '"' + owner.rolename + '" 资源权限树';
						this.roleidResourceControlTree = this
								.createResourceTree({
									renderTo : owner.ids.roleidResoureControlTreeDiv,
									title : '资源权限',
									tbar : [{
										text : '保存角色资源权限',
										iconCls : 'save',
										handler : function() {
											owner.saveRoleidResourControl();
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
					saveRoleidResourControl : function() {
						var owner = this;
						var nodes = this.roleidResourceControlTree.getCheckedNodes();
						var checkedNodes = [];
						DataUtil.each(nodes, function(data) {
									var node = {};
									node['resourceId'] = data['id'];
									node['roleid'] = owner.roleid;
									checkedNodes.push(node);
								});
						var jsonData = {};
						jsonData['resourceControlBeanList'] = checkedNodes;
						jsonData['roleid'] = owner.roleid;
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