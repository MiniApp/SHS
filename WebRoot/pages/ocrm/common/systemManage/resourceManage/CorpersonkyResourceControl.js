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
				"crm.pages.ocrm.common.systemManage.resourceManage.CorpersonkyResourceControl",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/resourceManage/CorpersonkyResourceControl.html",// 页面url地址
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
						var paramStr = CodeStringDefinition.CORPERSONKY_STRING
								+ CodeStringDefinition.SPLIT_STRING
								+ owner.corpersonky;
						var disTreeText = '"' + owner.name + '" 资源权限树';
						this.corpersonkyResourceControlTree = this
								.createResourceTree({
									renderTo : owner.ids.corpersonkyResoureControlTreeDiv,
									title : '资源权限',
									tbar : [{
										text : '保存操作员资源权限',
										iconCls : 'save',
										handler : function() {
											owner.saveCorpersonkyResourControl();
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
					saveCorpersonkyResourControl : function() {
						var owner = this;
						var nodes = this.corpersonkyResourceControlTree.getCheckedNodes();
						var checkedNodes = [];
						DataUtil.each(nodes, function(data) {
									var node = {};
									node['resourceId'] = data['id'];
									node['corpersonky'] = owner.corpersonky;
									checkedNodes.push(node);
								});
						var jsonData = {};
						jsonData['resourceControlBeanList'] = checkedNodes;
						jsonData['corpersonky'] = owner.corpersonky;
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