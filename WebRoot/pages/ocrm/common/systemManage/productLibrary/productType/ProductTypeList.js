/**
 * 产品分类管理 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>新增分类</li>
 * <li>添加节点</li>
 * <li>修改分类</li>
 * <li>修改节点显示</li>
 * <li>删除分类</li>
 * <li>删除节点</li>
 * <li>点击节点时给修改页面赋值</li>
 * <li>是否选择节点</li>
 * <li>清除新增页面值</li>
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productType.ProductTypeList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productType/ProductTypeList.html",// 页面url地址
	                initData : function(){
	                	 var btnArray = [];
					    var userInfo = DataUtil.getUserInfo();
					    this.flag = CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE == DataUtil.getUserInfo().authorityCode
					    			&& CodeStringDefinition.POSITION_CENTER_MSGCODE == DataUtil.getUserInfo().orgLevel;
					    if(this.flag){//总行级客户经理主管
					    	btnArray = [
					    	            {id : "addProductTypeBtnId"},//添加
					    	            {id : "updateProductTypeBtnId"},//修改
					    	            {id : "deleteProductTypeBtnId"}//删除
					    	           ];
					    }
						this.button = btnArray;
	                },
					initCmp : function() {
						var owner = this;
						// 系统功能树
						this.productTypeTree = this
								.createProductTypeTree( {
									renderTo : this.ids.productTypeTreeDiv,
									widthPercent : 0.3,
									heightPercent : 0.98,
									/*tbar : [ {
										text : '删除',
										tooltip : '删除产品分类信息', // 提示信息
										id : 'deleteProductTypeBtnId',
										handler : function() {
											owner.deleteProductType();
										},
										iconCls : 'delete' // 图标CSS
									} ],*/
									nodeClick : function(data) {
										if (null != data) {
											var jsonParam = {
												'prodTypeCode' : data.value+''
											};
											if (data.value != '000000') {
												
												HtmlUtil.getDom(owner.ids.prodTypeParentIdAdd).value = data.value;
												ConnectionUtil
														.ajaxReq( {
															inDataClass : 'com.easy.common.helper.product.ProductTypeBean',
															strServId : 'productTypeService.getProdType',
															jsonData : jsonParam,
															callback : function(record) {
																if (record.prodTypeParentId == '000000') {
																	HtmlUtil.getDom(owner.ids.prodTypeParentNameAdd).value = record.prodTypeParentNameAdd;
																	HtmlUtil.getDom(owner.ids.prodTypeParentIdAdd).value = data.value;
																	owner.productTypeTabPanel.setActiveTab('addProductTypePanel');
																	owner.updatePanel.setDisabled(true);
																} else {
																	HtmlUtil.getDom(owner.ids.prodTypeParentNameAdd).value = record.prodTypeParentNameAdd;
																	HtmlUtil.getDom(owner.ids.prodTypeParentIdAdd).value = data.value;
																	owner.updatePanel.setDisabled(false);
																	owner.productTypeTabPanel.activeTable = "updateProductTypePanel";
																	owner.populateUpdateValue(record);
																}
															}
														});
											}
										}
									}
								});

						//修改资源页面
						this.updatePageObj = this
									.create(
											"crm.pages.ocrm.common.systemManage.productLibrary.productType.ProductTypeUpdate",
											{
												id : 'productTypeUpdate'
											});
						
						this.updatePanel = this.create('component.Panel', {
							id : 'updateProductTypePanel',
							title : '修改产品分类',
							contentEl : this.ids.productTypeUpdateTabPanelDiv,
							hasBackGroundColor : true,
							widthPercent : 0.5,
							height : 250,
							disabled : true,
							pageObject : this.updatePageObj,
							bbar : [{
										text : '修改',
										tooltip : '修改产品分类信息', // 提示信息
										id : 'updateProductTypeBtnId',
										handler : function() {
											owner.updateProductType();
										},
										iconCls : 'edit' // 图标CSS
									}]
						});
						//新增、修改资源面板
						this.productTypeTabPanel = this
								.create(
										'component.TabPanel',
										{
											renderTo : this.ids.productTypeTabPanelDiv,
											widthPercent : 0.7,
											items : [this.create('component.Panel',{
														id : 'addProductTypePanel',
														title : '新增产品分类',
														contentEl : this.ids.productTypeCreateContentDiv,
														widthPercent : 0.5,
														height : 250,
														hasBackGroundColor : true,
														bbar : [ {
															text : '保存',
															id:'addProductTypeBtnId',
															tooltip : '保存产品分类信息', // 提示信息
															handler : function() {
																owner
																		.createProductType();
															},
															iconCls : 'add' // 图标CSS
														} ]
													}),this.updatePanel],
											activeTab : 'addProductTypePanel'

										});

					},
					
					/**
					 * 新增分类
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createProductType : function() {
						var owner = this;
						if (this.checkSelected()) {
							var data = DataUtil.getDataFromArea(owner.ids.productTypeCreateContentDiv);// 获取页面输入的信息并自动验证
							if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
								ConnectionUtil.ajaxReq( {// 发送ajax请求
											strServId : "productTypeService.createProdType",
											jsonData : data,
											callback : function(reaultData) {
												owner.createNode(reaultData);
												owner.clearContentDiv();
												MsgUtil.alert("提示", "新增成功!");
											}
										});
							}
						}
					},
					/**
					 * 添加节点
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createNode : function() {
						var owner = this;
						var parentNodeId = HtmlUtil.getDom(owner.ids.prodTypeParentIdAdd).value;
						var currText = HtmlUtil.getDom(owner.ids.prodTypeName).value;
						var currId = HtmlUtil.getDom(owner.ids.prodTypeCode).value;
						var cuurNode = {
								id : currId,
								text : currText,
								leaf : true
							};
						// 如果是向叶子节点添加子节点
						this.productTypeTree.appendChild(cuurNode,parentNodeId);
					},
					
					/**
					 * 修改分类
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					updateProductType : function() {
						var owner = this;
						var jsonparam = this.updatePageObj.getData();
						if(this.checkSelected()){
							if (jsonparam != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
								var node = DataUtil.decode(jsonparam);
								ConnectionUtil.ajaxReq( {// 发送ajax请求
									strServId : "productTypeService.updateProdType",
									jsonData : jsonparam,
									callback : function(msg) {
										owner.updateNode(node);
										MsgUtil.alert("提示", "修改成功!");
									}
								});
							}
						}
					},
					/**
					 * 修改节点
					 */
					updateNode : function(node) {
						var cuurNode = {
								id : node.prodTypeCode,
								text : node.prodTypeName
							};
						this.productTypeTree.updateNode(cuurNode,node.prodTypeParentId);
					},
					
					/**
					 * 删除分类
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					deleteProductType : function() {
						var owner = this;
						var prodTypeCode = HtmlUtil.getDom(this.ids.prodTypeParentIdAdd).value;
						alert(prodTypeCode);
						if(DataUtil.isEmpty(prodTypeCode)){
							MsgUtil.error('系统提示', '请选择一个节点!');
							return;
						}
						var jsonParam = {
								'prodTypeCode' : prodTypeCode+''
							};
						if(prodTypeCode!='000000'){
							ConnectionUtil
							.ajaxReq( {
								inDataClass : 'com.easy.common.helper.product.ProductTypeBean',
								strServId : 'productTypeService.getProdType',
								jsonData : jsonParam,
								callback : function(record) {
									if (record.prodTypeParentId == '000000') {
										MsgUtil.error('系统提示', '根节点下面的主类不能删除!');
										return;
									} 
								}
							});
						}
						MsgUtil.confirm("提示", "是否确定删除?", function(btn) {
							if (btn == 'no') {
								return;
							}
							ConnectionUtil.ajaxReq( {// 发送ajax请求
								strServId : "productTypeService.deleteProdType",
								jsonData : {
									prodTypeCode : prodTypeCode
								},
								callback : function(msg) {
									MsgUtil.alert("提示", "删除成功!");
									owner.deleteNode(prodTypeCode);
									var record = {
											'prodTypeParentName' : '',
											'prodTypeParentId' : '',
											'prodTypeName' : '',
											'prodTypeCode' : '',
											'prodTypeIsCoreEnum' : '',
											'prodTypeDesc' : ''
									};
									owner.updatePageObj.renderData(record);
									HtmlUtil.getDom(owner.ids.prodTypeParentIdAdd).value = '';
									HtmlUtil.getDom(owner.ids.prodTypeParentNameAdd).value = '';
								}
							});
						});
						
					},
					
					/**
					 * 删除节点
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					deleteNode : function(prodTypeCode) {
						this.productTypeTree.deleteChild(prodTypeCode);
					},
					
					/**
					 * 点击节点时给修改页面赋值
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					populateUpdateValue : function(record) {
						this.updatePanel.setDisabled(false);
						this.productTypeTabPanel.setActiveTab('updateProductTypePanel');
						owner = this;
						this.updatePageObj.renderData(record);
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
						var owner = this;
						HtmlUtil.getDom(owner.ids.prodTypeName).value='';
						HtmlUtil.getDom(owner.ids.prodTypeCode).value='';
						HtmlUtil.getDom(owner.ids.prodTypeDesc).value='';
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
						var parentNode = HtmlUtil.getDom(this.ids.prodTypeParentIdAdd).value;
						if (DataUtil.isEmpty(parentNode)) {
							MsgUtil.error('系统提示', '请选择一个节点!');
							return false;
						}
						return true;
					}

				});