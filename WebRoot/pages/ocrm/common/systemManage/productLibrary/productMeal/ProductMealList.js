/**
 * 套餐管理 <p/> 功能描述：
 * <li>查询套餐管理列表</li>
 * @author 苏皓
 * @since 2013-03-04
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealList.html",// 页面url地址
					initData : function() {
					    
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-04
				     * @最后修改日期：
				     */
					initCmp : function() {
						var owner = this;
						this.flag = true;
						
						//产品状态
						this.select = owner.create("component.EnumSelector", {
							category : [CodeStringDefinition.PRODUCT_CONVENTION_STATE_ENUM],
							renderTo : [owner.ids.prdGropStatusEnum],
							id : [owner.ids.prdGropStatusEnum]
						});
						
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.productMealPanelDiv,
							contentEl : this.ids.productMealContentDiv,
							collapsible : true,
							widthPercent : 1,
							heightPercent : 0.2,
							hasBackGroundColor : true,
							buttons : [ {
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryProductMealList();
								}
							}, {
								text : '重置',
								iconCls : 'reset',
								handler : function() {
									HtmlUtil.getDom(owner.ids.prdGropName).value = "";
									owner.select.setValue(owner.ids.prdGropStatusEnum, 'unselectCode');
								}
							}]
						});
						
						owner.queryProductMealList();
					},
					/**
					 * 查询产品列表
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-04
				     * @最后修改日期：
				     */
					queryProductMealList : function() {
						var owner = this;
						//alert(DataUtil.getUserInfo().orgLevel);
						var searchParam = DataUtil.getDataFromArea(this.ids.productMealContentDiv);// 获取页面录入的查询条件
						if (searchParam == Constants.VALIDATION_FAIL) {
							return;
						}
						var tbar;
						var strServId;
						if (CodeStringDefinition.RM_EMPLOYEE_TYPE_CODE == DataUtil.getUserInfo().authorityCode) {//客户经理
							tbar = [
								  {
									text : '详细信息',
									tooltip : '详细信息',
									iconCls : 'view',
									handler : function() {
										if (grid.getSelectRecords().length == 0) {
											MsgUtil.error('操作出错', '请选择一条记录进行查看');
											return;
										} else if (grid.getSelectRecords().length > 1) {
											MsgUtil.error('操作出错', '只能选择一条记录进行查看');
											return;
										}
										DataUtil.each(grid.getSelectRecords(), function(
												record) {
											owner.openProductMealDetailWindow(record);
										});
									}
								  }, {
									text : '套餐销售明细',
									tooltip : '套餐销售明细',
									iconCls : 'view',
									handler : function() {
										if (grid.getSelectRecords().length == 0) {
											MsgUtil.error('操作出错', '请选择一条记录进行查看');
											return;
										} else if (grid.getSelectRecords().length > 1) {
											MsgUtil.error('操作出错', '只能选择一条记录进行查看');
											return;
										}
										DataUtil.each(grid.getSelectRecords(), function(
												record) {
											owner.openMealSalDetailFroRMWindow(record);
										});
									}
								  }];
						} else if (CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE == DataUtil.getUserInfo().authorityCode) {
							if (CodeStringDefinition.POSITION_CENTER_MSGCODE == DataUtil.getUserInfo().orgLevel) {//总行级客户经理主管
								tbar = [
									  {
											text : '详细信息',
											tooltip : '详细信息',
											iconCls : 'view',
											handler : function() {
												if (grid.getSelectRecords().length == 0) {
													MsgUtil.error('操作出错', '请选择一条记录进行查看');
													return;
												} else if (grid.getSelectRecords().length > 1) {
													MsgUtil.error('操作出错', '只能选择一条记录进行查看');
													return;
												}
												DataUtil.each(grid.getSelectRecords(), function(
														record) {
													owner.openProductMealDetailWindow(record);
												});
											}
									  }, {
											text : '新建',
											tooltip : '新建',
											iconCls : 'add',
											handler : function() {
												owner.openCreateProductMealWindow();
											}
									  }, {
											text : '编辑',
											tooltip : '编辑',
											iconCls : 'edit',
											handler : function() {
												if (grid.getSelectRecords().length == 0) {
													MsgUtil.error('操作出错', '请选择一条记录进行查看');
													return;
												} else if (grid.getSelectRecords().length > 1) {
													MsgUtil.error('操作出错', '只能选择一条记录进行查看');
													return;
												}
												DataUtil.each(grid.getSelectRecords(), function(
														record) {
													if (record.get('prdGropStatusCode') == CodeStringDefinition.PRODUCT_CONVENTION_STATE_WORK_ENUM) {
														MsgUtil.error('操作出错', '套餐状态为运行中不能编辑！');
														return;
													} else {
														owner.openUpdateProductMealWindow(record);
													}
													
												});
											}
									  }, {
											text : '发布',
											tooltip : '发布',
											iconCls : 'publish',
											handler : function() {
												if (grid.getSelectRecords().length == 0) {
													MsgUtil.error('操作出错', '请选择一条记录进行查看');
													return;
												} else if (grid.getSelectRecords().length > 1) {
													MsgUtil.error('操作出错', '只能选择一条记录进行查看');
													return;
												}
												DataUtil.each(grid.getSelectRecords(), function(
														record) {
													if (record.get('prdGropStatusCode') == CodeStringDefinition.PRODUCT_CONVENTION_STATE_WORK_ENUM) {
														MsgUtil.error('操作出错', '套餐已经为发布状态！');
														return;
													} else {
														owner.openMealPushWindow(record);
													}
												});
											}
									  }, {
											text : '废止',
											tooltip : '废止',
											iconCls : 'delete',
											handler : function() {
												if (grid.getSelectRecords().length == 0) {
													MsgUtil.error('操作出错', '请选择一条记录进行查看');
													return;
												} else if (grid.getSelectRecords().length > 1) {
													MsgUtil.error('操作出错', '只能选择一条记录进行查看');
													return;
												}
												DataUtil.each(grid.getSelectRecords(), function(
														record) {
													if (record.get('prdGropStatusCode') == CodeStringDefinition.PRODUCT_CONVENTION_STATE_BOLISH_ENUM) {
														MsgUtil.error('操作出错', '套餐已经为废止状态！');
														return;
													} else {
														owner.openMealAbolishWindow(record);
													}
												});
											}
									  }, {
											text : '套餐销售明细',
											tooltip : '套餐销售明细',
											iconCls : 'view',
											handler : function() {
												if (grid.getSelectRecords().length == 0) {
													MsgUtil.error('操作出错', '请选择一条记录进行查看');
													return;
												} else if (grid.getSelectRecords().length > 1) {
													MsgUtil.error('操作出错', '只能选择一条记录进行查看');
													return;
												}
												DataUtil.each(grid.getSelectRecords(), function(
														record) {
													owner.openMealSalDetailWindow(record);
												});
											}
									  }, {
											text : '套餐销售统计',
											tooltip : '套餐销售统计',
											iconCls : 'tj',
											handler : function() {
												if (grid.getSelectRecords().length == 0) {
													MsgUtil.error('操作出错', '请选择一条记录进行查看');
													return;
												} else if (grid.getSelectRecords().length > 1) {
													MsgUtil.error('操作出错', '只能选择一条记录进行查看');
													return;
												}
												DataUtil.each(grid.getSelectRecords(), function(
														record) {
													owner.openMealSalSumWindow(record);
												});
											}
									  }];
							} else {//客户经理主管
								tbar = [
									  {
										text : '详细信息',
										tooltip : '详细信息',
										iconCls : 'view',
										handler : function() {
											if (grid.getSelectRecords().length == 0) {
												MsgUtil.error('操作出错', '请选择一条记录进行查看');
												return;
											} else if (grid.getSelectRecords().length > 1) {
												MsgUtil.error('操作出错', '只能选择一条记录进行查看');
												return;
											}
											DataUtil.each(grid.getSelectRecords(), function(
													record) {
												owner.openProductMealDetailWindow(record);
											});
										}
									  }, {
										text : '套餐销售明细',
										tooltip : '套餐销售明细',
										iconCls : 'view',
										handler : function() {
											if (grid.getSelectRecords().length == 0) {
												MsgUtil.error('操作出错', '请选择一条记录进行查看');
												return;
											} else if (grid.getSelectRecords().length > 1) {
												MsgUtil.error('操作出错', '只能选择一条记录进行查看');
												return;
											}
											DataUtil.each(grid.getSelectRecords(), function(
													record) {
												owner.openMealSalDetailWindow(record);
											});
										}
									  }];
							}
						}
						var jsonData = DataUtil.decode(searchParam);
						HtmlUtil.overwrite(this.ids.productMealListDiv, "", false);	
						var grid = this.create('component.DataGrid',
							{
								renderTo : this.ids.productMealListDiv,
								strServId : 'productMealService.getProductMealList',
								jsonData : DataUtil.encode(jsonData),
								widthPercent : 1,
								heightPercent : 0.8,
								mapping : [ 'prdGropName', 'sumDueTime',
								            'prdGropStatus', 'creater', 'prdGropStatusCode',
								            'createDateStr', 'releaseDateStr',
								            'tbproproductgroupky'],
								collapsible : false,
								checkbox : true,
								title : '查询结果',
								columns : [
										{
											header : "产品套餐名称",
											sortable : true,
											dataIndex : 'prdGropName',
											widthPercent : 0.2
										},
										{
											header : "统计期限",
											sortable : true,
											dataIndex : 'sumDueTime',
											widthPercent : 0.16
										},
										{
											header : "产品套餐状态",
											sortable : true,
											dataIndex : 'prdGropStatus',
											widthPercent : 0.16
										},
										{
											header : "创建人",
											sortable : true,
											dataIndex : 'creater',
											widthPercent : 0.16
										},
										{
											header : "创建时间",
											sortable : true,
											dataIndex : 'createDateStr',
											widthPercent : 0.16
										},
										{
											header : "发布时间",
											sortable : true,
											dataIndex : 'releaseDateStr',
											widthPercent : 0.16
										}],
								tbar : tbar
							});
					},
					/**
					 * 查询产品套餐详细信息
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-04
				     * @最后修改日期：
				     */
					openProductMealDetailWindow : function(record){
						var owner = this;
						var win = this.create('component.Window', {
									title : '查看产品套餐详细信息',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 439,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealDetail',//创建新增页面对象
											{
												id : 'ProductMealDetail',
												tbproproductgroupky : record.get('tbproproductgroupky')
											})
								});
					},
					/**
					 * 新建套餐信息
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-07
				     * @最后修改日期：
				     */
					openCreateProductMealWindow : function(){
						var owner = this;
						var win = this.create('component.Window', {
									title : '新建套餐信息',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 439,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealAdd',//创建新增页面对象
											{
												id : 'ProductMealAdd'
											})
								});
						win.on('close', function() {
							owner.queryProductMealList();// 窗口关闭后刷新列表
							});
					},
					
					/**
					 * 编辑套餐信息
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-08
				     * @最后修改日期：
				     */
					openUpdateProductMealWindow : function(record) {
						var owner = this;
						var win = this.create('component.Window', {
									title : '编辑套餐信息',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 439,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealEdit',//创建新增页面对象
											{
												id : 'ProductMealEdit',
												tbproproductgroupky : record.get('tbproproductgroupky')
											})
								});
						win.on('close', function() {
							owner.queryProductMealList();// 窗口关闭后刷新列表
							});
					},
					
					/**
					 * 发布套餐信息
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-08
				     * @最后修改日期：
				     */
					openMealPushWindow : function(record) {
						var owner = this;
						// 加载并渲染数据
						ConnectionUtil.ajaxReq({
									strServId : "productMealService.pushProductMeal",
									jsonData : {
										tbproproductgroupky : record.get('tbproproductgroupky')
									},
									callback : function(data) {
										MsgUtil.alert("提示", "发布套餐成功！");
										owner.queryProductMealList();
									}
								});
					},
					
					/**
					 * 废止套餐信息
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-08
				     * @最后修改日期：
				     */
					openMealAbolishWindow : function(record) {
						var owner = this;
						// 加载并渲染数据
						ConnectionUtil.ajaxReq({
									strServId : "productMealService.abolishProductMeal",
									jsonData : {
										tbproproductgroupky : record.get('tbproproductgroupky')
									},
									callback : function(data) {
										MsgUtil.alert("提示", "废止套餐成功！");
										owner.queryProductMealList();
									}
								});
					},
					/**
					 * 套餐销售明细
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-11
				     * @最后修改日期：
				     */
					openMealSalDetailWindow : function(record) {
						var owner = this;
						var win = this.create('component.Window', {
									title : '套餐销售明细信息',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 439,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalDetail',//创建新增页面对象
											{
												id : 'ProductMealSalDetail',
												tbproproductgroupky : record.get('tbproproductgroupky')
											})
								});
						win.on('close', function() {
							//owner.queryProductMealList();// 窗口关闭后刷新列表
							});
					},
					openMealSalDetailFroRMWindow : function(record) {
						var owner = this;
						var win = this.create('component.Window', {
									title : '套餐销售明细信息',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 439,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalDetailForRM',//创建新增页面对象
											{
												id : 'ProductMealSalDetailForRM',
												tbproproductgroupky : record.get('tbproproductgroupky')
											})
								});
						win.on('close', function() {
							//owner.queryProductMealList();// 窗口关闭后刷新列表
							});
					},
					/**
					 * 套餐销售统计
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-11
				     * @最后修改日期：
				     */
					openMealSalSumWindow : function(record) {
						var owner = this;
						var win = this.create('component.Window', {
									title : '套餐销售统计信息',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 439,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalSum',//创建新增页面对象
											{
												id : 'ProductMealSalSum',
												tbproproductgroupky : record.get('tbproproductgroupky')
											})
								});
						win.on('close', function() {
							//owner.queryProductMealList();// 窗口关闭后刷新列表
							});
					}
});
