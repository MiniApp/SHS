/**
 * DataGrid组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.DataGrid
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object}
 * @example ObjectUtil.create('component.DataGrid', { renderTo :
 *          this.ids.customerexternallistdisplay, strServId :
 *          'customerListService.getExternalCustomerlistForTest', jsonData : {
 *          name : name }, mapping : ['name', 'mainphone', 'idNumber',
 *          'corpersonky'], collapsible : false, checkbox : true, title :
 *          '查询结果', columns : [{ header : "客户姓名", sortable : true, dataIndex :
 *          'name', width : 300 }, { header : "联系电话", sortable : true, dataIndex :
 *          'mainphone', width : 300 }, { header : "证件号码", sortable : true,
 *          dataIndex : 'idNumber', width : 300 }], tbar : [{ text : '详细信息',
 *          tooltip : '详细信息', iconCls : 'view', handler : function() { } }, {
 *          text : '新增行外客户', tooltip : '修改', iconCls : 'add', handler :
 *          function() { } }, { text : '修改', tooltip : '修改', iconCls : 'edit',
 *          handler : function() { } }, { text : '删除', tooltip : '删除', iconCls :
 *          'delete', handler : function() { } }] });
 * 
 */
ObjectUtil.define("component.DataGrid",{
			extend : 'base.AbstractComponent',
			type : 'DataGrid',
			/**
			 * 数据来源类型
			 * 
			 * @type String
			 */
			dataType : null,
			/**
			 * 后台服务Id
			 * 
			 * @type String
			 */
			strServId : '',
			/**
			 * 传递给后台服务的数据
			 * 
			 * @type Object
			 */
			jsonData : null,

			/**
			 * 是否展示多选框
			 * 
			 * @type Boolean
			 */
			checkbox : false,
			/**
			 * 是否分页
			 * 
			 * @type Boolean
			 */
			noPaging : false,
			/**
			 * 是否展示列序号
			 * 
			 * @type Boolean
			 */
			showRowNumber : true,
			/**
			 * 顶部工具栏
			 * 
			 * @type Array
			 */
			tbar : null,
			/**
			 * 渲染到的domId
			 * 
			 * @type String
			 */
			renderTo : '',
			/**
			 * 标题
			 * 
			 * @type String
			 */
			title : null,
			/**
			 * 是否可折叠
			 * 
			 * @type Boolean
			 */
			collapsible : false,
			/**
			 * 是否可多选,只有checkbox为true时才生效
			 * 
			 * @type Boolean
			 */
			multiSelect : true,
			/**
			 * 高度
			 * 
			 * @type Number
			 */
			height : null,
			/**
			 * 宽度
			 * 
			 * @type Number
			 */
			width : null,
			/**
			 * 列映射
			 * 
			 * @type Array
			 */
			mapping : null,
			/**
			 * 列配置
			 * 
			 * @type Array
			 */
			columns : null,
			/**
			 * 展示的数据, 本地数据时需传入
			 * 
			 * @type Array
			 */
			data : null,
			/**
			 * 每页记录数
			 * 
			 * @type Number
			 */
			pageSize : null,
			/**
			 * 分组字段名
			 * 
			 * @type String
			 */
			groupField : null,
			/**
			 * 是否可编辑
			 * 
			 * @type boolean
			 */
			edit : null,
			editing : null,
			/**
			 * 数据加载完成后调用事件,作用域为当前store对象
			 */
			onDataLoaded : Ext.emptyFn(),
			/**
			 * 行单击响应事件,作用域为当前行记录
			 */
			itemClick : Ext.emptyFn(),
			/**
			 * 是否记录选择的记录，只有当checkbox为true,noPaging为false时才生效，也就是分页可多选时才生效
			 */
			recordSelected : null,
			/**
			 * 初始化选中记录，
			 * 
			 * @type Array
			 */
			initSelectedData : null,
			/**
			 * 初始化选中记录，判断属性
			 * 
			 * @type String
			 */
			initSelectedProp : null,
			constructor : function(config) {
				Ext.apply(this, config);
				this.callParent();
			},
			/**
			 * 参数校验
			 * 
			 * @Override
			 * @return {Boolean}
			 */
			checkConfig : function() {
				// if (Ext.isEmpty(this.renderTo)) {
				// Ext.MessageBox.show({
				// title : '参数错误',
				// msg : '参数：renderTo必须传入值!',
				// buttons : Ext.MessageBox.OK
				// });
				// return false;
				// }
				return true;
			},
			/**
			 * 组件创建前处理
			 * 
			 * @Override
			 */
			beforeBuild : function() {
				var owner = this;
				if (!this.pageSize) {
					this.pageSize = Constants.PAGE_SIZE;
				}
				if (this.dataType == 'memory') {
					this.store = Ext.create('Ext.data.Store',{
						fields : this.mapping,
						autoLoad : false,
						pageSize : this.pageSize,
						buffered : false,
						data : this.data,
						groupField : this.groupField,
						proxy : {
							type : 'memory',// ajax or
							// memory
							reader : {
								type : 'json',
								root : 'data',
								totalProperty : 'totalCount'
							}
						},
						listeners : {// 监听store的事件
							'beforeload' : function(st,
									recs) {// 装载时去除全选
								if (owner.extObject instanceof Ext.grid.Panel) {
									var hd_checker = owner.extObject
											.getEl()
											.select(
													'div.x-column-header-checkbox');
									var hd = hd_checker
											.first();
									if (hd != null) {
										hd
												.removeCls('x-grid-hd-checker-on')
									}
								}

							},// 数据刷新后触发事件
							'refresh' : function(store,
									opt) {
								if (Ext
										.isFunction(owner.onDataLoaded)) {
									Ext.Function
											.bind(
													owner.onDataLoaded,
													store)
											();
								}
							}
						}
					});
				} else {
					if (this.jsonData
							&& DataUtil.isObject(this.jsonData))
						this.jsonData = DataUtil.encode(this.jsonData);
						this.store = Ext.create('Ext.data.Store',{
						buffered : false,
						remoteSort : false,
						fields : this.mapping,
						autoLoad : false,
						groupField : this.groupField,
						pageSize : this.pageSize
								|| Constants.PAGE_SIZE,
						proxy : {
							type : 'ajax',// ajax or
							// memory
							url : Constants.AJAX_ACTION,
							timeout : Constants.REQ_TIMEOUT,
							reader : {
								type : 'json',
								root : 'data',
								totalProperty : 'totalCount'
							},
							actionMethods : {// 设置请求提交方式
								create : 'POST',
								read : 'POST',
								update : 'POST',
								destroy : 'POST'
							},
							extraParams : {
								strServId : this.strServId,
								jsonData : this.jsonData
							},
							limitParam : 'pageSize',// 设置分页参数名
							startParam : 'startIndex',
							listeners : {// 监听proxy的事件
								'exception' : function(
										proxy,
										response,
										operation) {
									if (!response.getResponseHeader) {
										MsgUtil.error("操作异常",
												"请求超时,请稍后再试");
										return;
									}

									if (response.responseText.indexOf("请重新登录") != -1) {
										MsgUtil.error("错误提示",
											"您的会话已经超时,或由于相同用户登录而被踢下线，请重新登录",
											function() {
												location.href = Constants.CONTEXT_PATH
														+ '/pages/ocrmLogin.html';
											});
										return;
									}
									if (response
											.getResponseHeader('C-Result-Status')
											&& response.getResponseHeader('C-Result-Status') == 603) {
										MsgUtil.error("业务逻辑异常",
														response.responseText);
									} else if (response
											.getResponseHeader('C-Result-Status')
											&& response
													.getResponseHeader('C-Result-Status') == 602) {
										MsgUtil.error("系统异常",
														response.responseText);
									} else if (response.responseText) {
										MsgUtil.error("业务逻辑异常",
														response.responseText);
									}
									// owner.extObject.setLoading(false,
									// false);
									Ext.get(owner.renderTo).unmask();

								}
							}
			
						},
						listeners : {// 监听store的事件
							'beforeload' : function(
									store, operation) {
								var hd_checker = owner.extObject
										.getEl()
										.select(
												'div.x-column-header-checkbox');
								var hd = hd_checker
										.first();
								if (hd != null) {
									hd.removeCls('x-grid-hd-checker-on')
								}
								Ext.get(owner.renderTo)
										.mask('数据加载中,请稍候.....');
								// owner.extObject.setLoading({
								// msg :
								// '数据加载中,请稍候.....'
								// }, true)
							},
							'read' : function(store,
									records, successful) {
								// owner.extObject.setLoading(false,
								// false);
								Ext.get(owner.renderTo)
										.unmask();
							},// 数据刷新后触发事件
							'refresh' : function(store,opt) {
								if (Ext.isFunction(owner.onDataLoaded)) {
									Ext.Function.bind(owner.onDataLoaded,
													store)();
								}
							}
						}
					});
				}
				if (this.checkbox == true) {
					this.selModel = Ext
							.create('Ext.selection.CheckboxModel');
					this.multiSelect = true;
				} else {
					this.multiSelect = false;
				}
				this.pagingBar = null;
				if (!this.noPaging) {
					this.pagingBar = Ext.create('ux.Paging', {
						store : this.store,
						displayInfo : true,
						displayMsg : '显示记录 {0} - {1} of {2}',
						emptyMsg : '没有查询到记录'
					})
				}
				var newColums;
				if (this.showRowNumber) {
					newColums = [ {
						xtype : 'rownumberer',
						width : 30
					} ];
				} else {
					if (this.showRowNumber != false) {// 默认设置为true
						newColums = [ {
							xtype : 'rownumberer',
							width : 30
						} ];
					} else {
						newColums = [];
					}
				}
				this.columns = this
						.initCloumns(newColums, this.columns);
				this.columns = newColums;
				var newTbars;
				if (this.tbar) {
					newTbars = [ '->' ];
				} else {
					newTbars = null;
					;
				}
				DataUtil.each(this.tbar, function(bar) {

					if (!bar.hidden) {
						var newtbar = {};
						newtbar.text = bar.text;
						newtbar.tooltip = bar.tooltip;
						newtbar.handler = bar.handler;
						newtbar.iconCls = bar.iconCls;
						newTbars.push(newtbar);
						newTbars.push('-');
					}

					// if(bar.hidden)newtbar.hidden=true;
				});
				this.tbar = newTbars;
				return true;
			},
			/**
			 * 构建组件
			 * 
			 * @Override
			 */
			build : function() {
				var me = this;
				var gridConfig = {
					renderTo : this.renderTo,
					store : this.store,
					selModel : this.selModel,
					columnLines : false,
					// stateful : config.stateful,
					collapsible : this.collapsible,
					multiSelect : this.multiSelect,
					columns : this.columns,
					height : this.height,
					width : this.width,
					title : this.title,
					autoHeight : true,
					autoWidth : true,
					buttons : this.pagingBar,
					bbar : ObjectUtil.create("component.ToolBar", {
						items : this.tbar
					}).extObject,
					features : [ {
						ftype : 'grouping'
					} ]
				};
				if (this.edit) {
					gridConfig = ObjectUtil.apply(gridConfig, {
						plugins : [ Ext.create(
								'Ext.grid.plugin.CellEditing', {
									clicksToEdit : 1
								}) ],
						selModel : ObjectUtil.apply(
								gridConfig.selModel, {
									selType : 'cellmodel'
								})
					})
				}
				this.extObject = Ext.create('Ext.grid.Panel',
						gridConfig);
				if (this.edit) {
					this.extObject.on('beforeedit', function() {
						me.editing = true;
					});
					this.extObject.on('edit', function() {
						me.editing = false;
					});
				}
				this.extObject.on('itemclick', function(view, record,
						item, index, e) {
					if (Ext.isFunction(me.itemClick)) {
						Ext.Function.bind(me.itemClick, record)();
					}
				});
				if (this.checkbox == true
						&& this.recordSelected == true
						&& this.noPaging == false) {
					this.checkedRecords = new MixedCollection();
					this.extObject.on('select',
							function(rowMode, record, index, opts) {
								var currentPage = me.pagingBar
										.getPageData().currentPage;
								var recordIndex = (currentPage - 1)
										* me.pageSize + index;
								if (!me.checkedRecords
										.containsKey(recordIndex)) {
									me.checkedRecords.add(recordIndex,
											record);
								}
							});

					this.extObject.on('deselect',
						function(rowMode, record, index,
								opts) {
							var currentPage = me.pagingBar
									.getPageData().currentPage;
							var recordIndex = (currentPage - 1)
									* me.pageSize + index;
							me.checkedRecords
									.removeKey(recordIndex);

							if (!DataUtil
									.isEmpty(me.initSelectedProp)
									&& !DataUtil
											.isEmpty(me.initSelectedData)) {
								var newInitData = [];
								Ext.each(me.initSelectedData,
									function(
											initData) {
										if (record
												.get(me.initSelectedProp) != initData) {
											newInitData
													.push(initData);
										}
									});
								me.initSelectedData = newInitData;
							}
						});
					this.store.on('load',
						function(store, records) {
							if (!DataUtil
									.isEmpty(me.initSelectedProp)
									&& !DataUtil.isEmpty(me.initSelectedData)) {
								var allRecords = me
										.getAllRecords();
								// var inteSelectRecords =
								// [];
								var i = 0;
								Ext.each(allRecords,function(record) {
									Ext.each(me.initSelectedData,
										function(initData) {
											if (record.get(me.initSelectedProp) == initData) {
												var currentPage = me.pagingBar
														.getPageData().currentPage;
												var recordIndex = (currentPage - 1)
														* me.pageSize
														+ i;
												if (!me.checkedRecords
														.containsKey(recordIndex)) {
													me.checkedRecords
															.add(recordIndex,record);
												}
											}
										})
									i++;
									if (i >= me.pageSize) {
										i = 0;
									}
								});
							}
							if (me.checkedRecords
									.getCount() > 0) {
								var currentPage = me.pagingBar
										.getPageData().currentPage;
								var i = 0;
								var index;
								var selectRecords = [];
								Ext.each(records,function(rec) {
									index = (currentPage - 1)
											* me.pageSize
											+ i;
									if (me.checkedRecords
											.containsKey(index)) {
										selectRecords
												.push(rec);
									}
									i++;
								}, this);
								me.selModel
										.select(selectRecords);
							}
						});
				}

				if (this.dataType != 'memory') {
					this.store.load();
				}
			},
			/**
			 * 设置是否禁用列表
			 * 
			 * @param disable:true或false
			 * 
			 */
			setDisabled : function(disable) {
				this.extObject.setDisabled(disable);
			},
			/**
			 * 获取所有选中的记录
			 * 
			 */
			getSelectRecords : function() {
				var me = this;
				if (!DataUtil.isEmpty(me.initSelectedProp)
						&& !DataUtil.isEmpty(me.initSelectedData)) {

					var result = new MixedCollection();
					Ext.each(this.checkedRecords.items, function(item) {
						result.add(item.get(me.initSelectedProp), item
								.get(me.initSelectedProp));
					}, this);
					Ext.each(me.initSelectedData, function(data) {
						if (!result.containsKey(data)) {
							result.add(data, data);
						}
					}, this);
					return result.items;
				} else if (this.checkbox == true
						&& this.recordSelected == true
						&& this.noPaging == false) {
					return this.checkedRecords.items;
				} else {
					return this.extObject.getSelectionModel()
							.getSelection();
				}

			},
			/**
			 * 私有方法： 说明：组装Grid的多列头
			 */
			initCloumns : function(newColums, columns) {
				var owner = this;
				DataUtil.each(columns,function(column) {
						var newColumn = {};
						newColumn.header = column.header;
						newColumn.text = column.text;
						newColumn.sortable = column.sortable;
						newColumn.dataIndex = column.dataIndex;
						if (owner.edit) {
							if (column.edit) {
								newColumn.editor = {
									xtype : "textfield"
								}
							}
						}
						if (column.widthPercent) {
							newColumn.width = (owner.width - 60)
									* column.widthPercent;
						} else {
							newColumn.width = column.width;
						}
						// 检查是否需要右对齐
						if (!DataUtil
								.isEmpty(CodeStringDefinition.SYSTEM_COMMON_GRID_MUST_ALIGN_RIGHT_HEADER_KEY)
								&& !DataUtil
										.isEmpty(newColumn.header)) {
							var keyArray = CodeStringDefinition.SYSTEM_COMMON_GRID_MUST_ALIGN_RIGHT_HEADER_KEY
									.split(',');
							var isMustRight = false;
							for ( var i = 0; i < keyArray.length; i++) {
								if (newColumn.header
										.indexOf(keyArray[i]) != -1) {
									isMustRight = true;
									break;
								}
							}
							if (isMustRight) {
								newColumn.renderer = function(
										value, metadata,
										record) {
									return "<div style='text-align:right;'>"
											+ value
											+ "</div>";
								}
							}
						}
						if (!DataUtil
								.isEmpty(column.renderer)) {
							newColumn.renderer = column.renderer;
						}
						newColumn.hidden = column.hidden;
						if (column.columns) {
							var temColums = [];
							owner.initCloumns(temColums,
									column.columns);
							newColumn.columns = temColums;
						}
						newColums.push(newColumn);
					});
				return newColums;
			},
			/**
			 * 获取所有记录数
			 * 
			 */
			getAllCount : function() {
				return this.store.getCount();
			},
			/**
			 * 装载传入数据到列表
			 * 
			 */
			loadData : function(data) {
				return this.store.loadData(data);
			},
			/**
			 * 获取行号index指定的记录
			 * 
			 */
			getAt : function(index) {
				return this.store.getAt(index);
			},
			/**
			 * 取得所有记录
			 */
			getAllRecords : function() {
				return this.store.data.items;
			},
			getTotalCount:function(){
				return this.store.getTotalCount();
			}

	});