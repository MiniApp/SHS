/**
 * 资源管理 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>新增资源</li>
 * <li>给资源树添加节点</li>
 * <li>修改资源</li>
 * <li>修改资源树节点显示</li>
 * <li>删除资源</li>
 * <li>删除资源树节点</li>
 * <li>点击树节点时给修改页面赋值</li>
 * <li>是否选择节点</li>
 * <li>清除新增页面值</li>
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.resourceManage.Resource",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/resourceManage/Resource.html",

							/**
							 * 初始化页面组件
							 * 
							 * @param
							 * @return
							 * @程序员：tangyingzhen
							 * @编码日期：2012-07-18
							 * @最后修改日期：
							 */					
					initCmp : function() {
						var owner = this;
						// 参数类型选择框
						this
								.create(
										'component.EnumSelector',
										{
											category : [ CodeStringDefinition.RESOURCETYPE_CATEGORY ],
											renderTo : [ this.ids.resourceAddContentDiv_resourceTypeEnum ],
											id : [ this.ids.resourceAddContentDiv_resourceTypeEnum ]
										});
						this
						.create(
								'component.EnumSelector',
								{
									category : [ CodeStringDefinition.ROLETYPE_CATEGORY ],
									renderTo : [ this.ids.resourceCategoryEnum],
									id : [ this.ids.resourceCategoryEnum]
								});

						/** ******************************页面控件渲染******************************** */

						/** ******************************页面面板渲染******************************** */
					
						// 系统功能树
						this.resourceTree = this
								.createResourceTree( {
									renderTo : this.ids.resourceTreeDiv,
									widthPercent : 0.3,
									heightPercent : 0.98,
									height : 450,
									tbar : [{
										text : '删除',
										tooltip : '删除系统资源信息', // 提示信息
										iconCls : 'delete',
										handler : function() {
											owner.deleteResource();
										}
									}],
									nodeClick : function(data) {
										if (null != data) {
											var jsonParam = {
												'resourceId' : parseInt(data.value)
											};
											HtmlUtil.getDom(owner.ids.parentId).value = parseInt(data.value);
											ConnectionUtil
													.ajaxReq( {
														inDataClass : 'com.easy.common.helper.resource.bean.ResourceBean',
														strServId : 'resourceTreeService.getResourceById',
														jsonData : jsonParam,
														callback : function(
																record) {
															owner
																	.populateUpdateValue(record);
														}
													});
										}
									}
								});

						//资源树面板
//						this.create('component.Panel', {
//							id : 'delete',
//							title : '系统资源树',
//							autoScroll : false,
//							collapsible : true,
//							renderTo : this.ids.resourceContentDiv,
//							contentEl : this.ids.resourceTreeDiv,
//							split : true,
//							hasBackGroundColor : false,
//							tbar : [ {
//								text : '删除',
//								tooltip : '删除系统资源信息', // 提示信息
//								handler : function() {
//									owner.deleteResource();
//								},
//								iconCls : 'delete' // 图标CSS
//							} ]
//						});
						//修改资源页面
						this.updatePageObj = this
									.create(
											"crm.pages.ocrm.common.systemManage.resourceManage.ResourceUpdate",
											{
												id : 'ResourceUpdate'
											});
						this.updatePanel = this.create('component.Panel', {
							id : 'updateResourcePanel',
							title : '修改资源',
							contentEl : this.ids.resourceUpdateTabPanelDiv,
							hasBackGroundColor : true,
							widthPercent : 0.7,
							height : 200,
							disabled : true,
							pageObject : this.updatePageObj,
							bbar : [{
										text : '修改',
										tooltip : '修改系统资源信息', // 提示信息
										handler : function() {
											owner.updateResource();
										},
										iconCls : 'edit' // 图标CSS
									}]
						});
						//新增、修改资源面板
						this.resourceTabPanel = this.create('component.TabPanel',
										{
											renderTo : this.ids.resourceTabPanelDiv,
											widthPercent : 0.7,
											items : [this.create('component.Panel', {
														id : 'addResourcePanel',
														title : '新增资源',
														contentEl : this.ids.resourceAddContentDiv,
														widthPercent : 0.7,
														height : 200,
														hasBackGroundColor : true,
														bbar : [ {
															text : '保存',
															tooltip : '保存系统资源信息', // 提示信息
															handler : function() {
																owner
																		.createResource();
															},
															iconCls : 'add' // 图标CSS
														} ]
													}),this.updatePanel],
											activeTab : 'addResourcePanel'

										});

					},
					
					/**
					 * 新增资源
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createResource : function() {
						var owner = this;
						if (this.checkSelected()) {
							var data = DataUtil
									.getDataFromArea(owner.ids.resourceAddContentDiv);// 获取页面输入的信息并自动验证
							if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
								var decodeData = DataUtil.decode(data);
								if(DataUtil.isEmpty(decodeData.resourceTypeEnum)){
									MsgUtil.error("页面验证出错", "资源类型必须选择值!");
									return ;
								}
								if(!/^[A-Za-z0-9-.]+$/.test(decodeData.nameSpace)){
									MsgUtil.error("页面验证出错", "命名空间只能由字母、数字和小数点组成!");
									return;
								}
								if(!/^[A-Za-z0-9]+$/.test(decodeData.className)){
									MsgUtil.error("页面验证出错", "类名称只能由字母和数字组成!");
									return;
								}
								ConnectionUtil.ajaxReq( {// 发送ajax请求
											strServId : "resourceTreeService.createResource",
											jsonData : data,
											callback : function(reaultData) {
												owner.createNode(reaultData);
												owner.refreshCache();
												owner.clearContentDiv();
												MsgUtil.alert("提示", "新增成功!");
											}
										});
							}
						}
					},

					/**
					 * 给资源树添加节点
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createNode : function(reaultData) {
						var parentNodeId = HtmlUtil.getDom(owner.ids.parentId).value;
						var currText = HtmlUtil.getDom(owner.ids.resourceAddContentDiv_resourceName).value;
						var currClassName = HtmlUtil.getDom(owner.ids.resourceAddContentDiv_className).value;
						var child = reaultData['intValue'];
						var cuurNode = {
								id : child,
								text : currText,
								leaf : true,
								className : currClassName
							};
						this.resourceTree.appendChild(cuurNode,parentNodeId);
					},
					
					/**
					 * 修改资源
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					updateResource : function() {
						var owner = this;
						var jsonparam = this.updatePageObj.getData();
						if(this.checkSelected()){
							if (jsonparam != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
								var node = DataUtil.decode(jsonparam);
								if(DataUtil.isEmpty(node.resourceTypeEnum)){
									MsgUtil.error("页面验证出错", "资源类型必须选择值!");
									return ;
								}
								if(!/^[A-Za-z0-9-.]+$/.test(node.nameSpace)){
									MsgUtil.error("页面验证出错", "命名空间只能由字母、数字和小数点组成!");
									return;
								}
								if(!/^[A-Za-z0-9]+$/.test(node.className)){
									MsgUtil.error("页面验证出错", "类名称只能由字母和数字组成!");
									return;
								}
								ConnectionUtil.ajaxReq( {// 发送ajax请求
									strServId : "resourceTreeService.updateResource",
									jsonData : jsonparam,
									callback : function(msg) {
										owner.updateNode(node);
										owner.refreshCache();
										MsgUtil.alert("提示", "修改成功!");
									}
								});
							}
						}
					},
					
					/**
					 * 修改资源树节点显示
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					updateNode : function(node){
						var cuurNode = {
								id : node.resourceId,
								text : node.resourceName,
								className : node.className
							};
						this.resourceTree.updateNode(cuurNode,node.parentId);
					},
					
			
					/**
					 * 删除资源
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					deleteResource : function() {
						var resourceId = HtmlUtil.getDom(this.ids.parentId).value;
						if(DataUtil.isEmpty(resourceId)){
							MsgUtil.error('系统提示', '请选择一个节点!');
							return;
						}
						MsgUtil.confirm("提示", "是否确定删除?", function(btn) {
							if (btn == 'yes') {
							ConnectionUtil.ajaxReq( {// 发送ajax请求
								strServId : "resourceTreeService.deleteResource",
								jsonData : {
									resourceId : resourceId
								},
								callback : function(msg) {
									MsgUtil.alert("提示", "删除成功!");
									owner.deleteNode();
									owner.refreshCache();
									var record = {
											'resourceName' : '',
											'nameSpace' : '',
											'className' : '',
											'displayIndex' : '',
											'descript' : '',
											'resourceType' : ''
									};
									owner.updatePageObj.renderData(record);
									HtmlUtil.getDom(owner.ids.parentId).value = '';
								}
							});
						}
						});
						
					},

					/**
					 * 删除资源树节点
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					deleteNode : function() {
						var currId = HtmlUtil.getDom(owner.ids.parentId).value;
						this.resourceTree.deleteChild(currId);
					},
					
					/**
					 * 刷新缓存
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					refreshCache : function() {
						ConnectionUtil.ajaxReq( {// 发送ajax请求
							strServId : "resourceTreeService.refreshCache",
							//jsonData : {},
							callback : function(msg) {
								
							}
						});
					},
					
					/**
					 * 点击树节点时给修改页面赋值
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					populateUpdateValue : function(record) {
						this.updatePanel.setDisabled(false);
						this.resourceTabPanel.setActiveTab('updateResourcePanel');
						owner = this;
						this.updatePageObj.renderData(record);
					},
					
					/**
					 * 是否选择节点
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					checkSelected : function() {
						var parentNode = HtmlUtil.getDom(this.ids.parentId).value;
						if (DataUtil.isEmpty(parentNode)) {
							MsgUtil.error('系统提示', '请选择一个节点!');
							return false;
						}
						return true;
					},
					
					/**
					 * 清除新增页面值
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					clearContentDiv : function() {
						//HtmlUtil.getDom(owner.ids.parentId).value='';
						HtmlUtil.getDom(owner.ids.resourceAddContentDiv_resourceName).value='';
						HtmlUtil.getDom(owner.ids.resourceAddContentDiv_nameSpace).value='';
						HtmlUtil.getDom(owner.ids.resourceAddContentDiv_className).value='';
						HtmlUtil.getDom(owner.ids.resourceAddContentDiv_displayIndex).value='';
						HtmlUtil.getDom(owner.ids.resourceAddContentDiv_descript).value='';
					},
					
					doLayout : function(width, heigth) {
						this.resourceTabPanel.setWidth(width - 100)
					}

				});
