/**
 * 业务组件工具类
 * 
 * 1:列表列渲染方法：rendererColumn,用于实现某一列连接效果
 * 2:创建产品类别选择下拉选择控件:createProductTypeTreeSelector
 * 3:添加panel页面对象到主TabPanel中:createCenterPanel
 * 4:渲染对私客户列表行,添加客户详细信息标签页到主标签页上:rendererPersonCustomerIndexColumn
 * 5:渲染对私客户列表行,页面将在window窗口中打开:rendererPersonCustomerIndexColumnToWindow
 * 6:页面将在主panel中打开(一般在按钮中使用)：createPersonCustomerIndexToPanel
 * 7:在window窗口中打开对私客户详细信息标签页(一般在按钮中使用):createPersonCustomerIndexWindow
 * 8:渲染对公客户列表行,添加客户详细信息标签页到主标签页上:rendererCorporateCustomerIndexColumn
 * 9:渲染对公客户列表行,页面将在window窗口中打开:rendererCorporateCustomerIndexColumnToWindow
 * 10:页面将在主panel中打开(一般在按钮中使用)：createCorporateCustomerIndexToPanel
 * 11:在window窗口中打开对公客户详细信息标签页(一般在按钮中使用):createCorporateCustomerIndexWindow
 * 12:弹出雇员选择窗口:createEmployeeSelectWindow 完善中.....
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-12
 * @class BusinessComponent
 * @static
 */
Ext.define('businessBase.BusinessComponent', {
	/**
	 * 添加页面对象到主tabpanel中
	 * 
	 * @param {}
	 *            config配置参数
	 * @param {}
	 *            target 窗口打开方式：window 在新窗口打开,panel 在主TabPanel中打开，默认 panel
	 *            config -> name:名称 config -> width:窗口宽度(newWindow为true时有效)
	 *            config -> height:窗口高度(newWindow为true时有效) config ->
	 *            x:x坐标(newWindow为true时有效) config -> y:y坐标(newWindow为true时有效)
	 *            config -> pageConfig:页面对象配置 config -> pageConfig ->
	 *            className:页面对象类名称 config -> pageConfig ->
	 *            config:页面对象类的配置参数,与具体的类相关
	 *            @example
	 *            在主TabPanel中打开
	 * renderer : function(value, metadata, record) {
					return this.rendererColumn({
						name : value,
						pageConfig : {
							className : 'ocrm.pages.test.CustomerIndex',
							config : {
								id : 'CustomerIndex',
								customerky : record.data.corpersonky,
								name : value,
								authority : 'User'
							}
						}
					});
				},
				在新窗口打开
	 * renderer : function(value, metadata, record) {
					return this.rendererColumn({
						name : value,
						pageConfig : {
							className : 'ocrm.pages.test.CustomerIndex',
							config : {
								id : 'CustomerIndex',
								customerky : record.data.corpersonky,
								name : value,
								authority : 'User'
							}
						}
					},'window');
				},
	 * 
	 * @return {}
	 */
	rendererColumn : function(config, newWindow) {
		// 将配置对象转换为JSON格式字符串再编码
		if(window.currentStyle == CodeStringDefinition.SYSTEM_CURRENT_STYLE_DESKTOP){
			config = ObjectUtil.apply(config,{maximizable : true});
		}
		
		var pageConfig = escape(Ext.encode(config));
		if (newWindow == 'window' || window.currentStyle == CodeStringDefinition.SYSTEM_CURRENT_STYLE_DESKTOP) {
			return '<a href="#" onclick="javascript:BusinessUtil.newWindow(\''
					+ pageConfig + '\');">' + config.name + '</a>';
		} else {
			return '<a href="#" onclick="javascript:BusinessUtil.newCenterPanel(\''
					+ pageConfig + '\');">' + config.name + '</a>';
		}

	},
	/**
	 * 添加页面对象到主tabpanel中
	 * 
	 * @param {}
	 *            config配置参数 config -> name:名称 config ->
	 *            width:窗口宽度(newWindow为true时有效) config ->
	 *            height:窗口高度(newWindow为true时有效) config ->
	 *            x:x坐标(newWindow为true时有效) config -> y:y坐标(newWindow为true时有效)
	 *            config -> pageConfig:页面对象配置 config -> pageConfig ->
	 *            className:页面对象类名称 config -> pageConfig ->
	 *            config:页面对象类的配置参数,与具体的类相关
	 *            @example
	 *            this.createCenterPanel({
						name : value,
						pageConfig : {
							className : 'ocrm.pages.test.CustomerIndex',
							config : {
								id : 'CustomerIndex',
								customerky : record.data.corpersonky,
								name : value,
								authority : 'User'
							}
						}
					});
	 * @public
	 */
	createCenterPanel : function(config) {
		if(window.currentStyle == CodeStringDefinition.SYSTEM_CURRENT_STYLE_DESKTOP){
			config = ObjectUtil.apply(config,{maximizable : true});
			this.createWindow(config);
		}else{
			var centerPanel = ObjectMgrUtil.get('centerPanel');
			if (centerPanel.items.length > (Constants.TAB_SIZE - 1)) {
				ExceptionUtil.throwBusinessException({
							title : '提示信息',
							msg : '考虑到系统性能,您打开的tab不能超过' + Constants.TAB_SIZE + '个!'
						});
			}
			if (!centerPanel.getItem(config.pageConfig.config.id)) {
				centerPanel.add(this.create('component.Panel', {
							id : config.pageConfig.config.id,
							title : config.name,
							closable : true,
							widthPercent : 1,
							hasBackGroundColor : false,
							pageObject : this.create(config.pageConfig.className,
									config.pageConfig.config)
						}));
				if (config.pageConfig.config.onTabClose) {
					centerPanel.onTabClose = {
												'onTabCloseFun':config.pageConfig.config.onTabClose,
												'onTabClosePanelId':config.pageConfig.config.id
											 };
				}
			}
			centerPanel.setActiveTab(centerPanel.getItem(config.pageConfig.config.id));
		}
	},
	/**
	 * 创建新窗口
	 * 
	 * @param {}
	 *            config配置参数 config -> name:名称 config -> width:窗口宽度 config ->
	 *            height:窗口高度 config -> x:x坐标 config -> y:y坐标 config ->
	 *            pageConfig:页面对象配置 config -> pageConfig -> className:页面对象类名称
	 *            config -> pageConfig -> config:页面对象类的配置参数,与具体的类相关
	 * 
	 * @example
	 * var windowConfig = {
						name : '产品详细',
						width : 950,
						pageConfig : {
							className : 'ocrm.pages.product.view.ViewProduct',
							config : {
								id : 'extViewProductInfoWin',
								productId : record.get("productId")
							}
						}
					};
					// 显示
					var win = this.createWindow(windowConfig);
					win.on('close', function() {
								owner.productTemplateList();
							});
	 * 
	 * 
	 * @return {}
	 * @public
	 */
	createWindow : function(config) {
		var win = ObjectUtil.create('component.Window', {
					title : config.name,
					closable : true,
					draggable : true,
					maximizable : config.maximizable,
					width : config.width || 1000,
					height : config.height || 550,
					modal : true,
					pageObject : ObjectUtil.create(config.pageConfig.className,
							config.pageConfig.config)
				});
		return win.extObject;
	},
	/**
	 * 渲染对私客户列表行,添加客户详细信息标签页到主标签页上
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            renderer : function(value, metadata, record) {
					return this.rendererPersonCustomerIndexColumn({
						name : value,
						customerky : record.data.corpersonky,
						authority : 'User'
					});
				}
	 * @return {}返回带连接的字符串
	 * @public
	 */
	rendererPersonCustomerIndexColumn : function(config) {
		return this.rendererColumn(this.populateCustomerIndexConfig(config,
				'person'));
	},
	/**
	 * 渲染对私客户列表行,添加客户详细信息标签页到新窗口上
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            renderer : function(value, metadata, record) {
					return this.rendererPersonCustomerIndexColumn({
						name : value,
						customerky : record.data.corpersonky,
						authority : 'User'
					});
				}
	 * @return {}返回带连接的字符串
	 * @public
	 */
	rendererPersonCustomerIndexColumnToWindow : function(config) {
		return this.rendererColumn(this.populateCustomerIndexConfig(config,
				'person'), 'window');
	},
	/**
	 * 页面将在主panel中打开 一般在点击按钮时使用
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            this.createPersonCustomerIndexToPanel({
						name : value,
						customerky : record.data.corpersonky,
						authority : 'User'
					});
	 * @return {} 返回带连接的字符串
	 * @public
	 */
	createPersonCustomerIndexToPanel : function(config) {
		return this.createCenterPanel(this.populateCustomerIndexConfig(config,
				'person'));
	},
	/**
	 * 在window窗口中打开对私客户详细信息标签页 一般用于按钮
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            this.createPersonCustomerIndexWindow({
						name : '测试',
						customerky : 1,
						authority : 'User'
					});
	 * @return {} 窗口对象
	 * @public
	 */
	createPersonCustomerIndexWindow : function(config) {
		return this.createWindow(this.populateCustomerIndexConfig(config,
				'person'));
	},
	/**
	 * 渲染对公客户列表行,添加客户详细信息标签页到主标签页上
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            renderer : function(value, metadata, record) {
					return this.rendererCorporateCustomerIndexColumn({
						name : value,
						customerky : record.data.corporateky,
						authority : 'User'
					});
				}
	 * @return {}
	 * @public
	 */
	rendererCorporateCustomerIndexColumn : function(config) {
		return this.rendererColumn(this.populateCustomerIndexConfig(config,
				'corporate'));
	},
	/**
	 * 渲染对公客户列表行,页面将在window窗口中打开
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            renderer : function(value, metadata, record) {
					return this.rendererCorporateCustomerIndexColumn({
						name : value,
						customerky : record.data.corporateky,
						authority : 'User'
					});
				}
	 * @return {}
	 * @public
	 */
	rendererCorporateCustomerIndexToWindow : function(config) {
		return this.rendererColumn(this.populateCustomerIndexConfig(config,
						'corporate'), 'window');
	},
	/**
	 * 页面将在主panel中打开 一般在点击按钮时使用
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            this.createCorporateCustomerIndexToPanel({
						name : value,
						customerky : record.data.corporateky,
						authority : 'User'
					});
	 * @return {} 返回带连接的字符串
	 * @public
	 */
	createCorporateCustomerIndexToPanel : function(config) {
		return this.createCenterPanel(this.populateCustomerIndexConfig(config,
				'corporate'));
	},
	/**
	 * 在window窗口中打开对公客户详细信息标签页 一般用于按钮
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            this.createCorporateCustomerIndexWindow({
						name : '测试',
						customerky : 1,
						authority : 'User'
					});
	 * @return {} 窗口对象
	 * @public
	 */
	createCorporateCustomerIndexWindow : function(config) {
		var newconfig = this.populateCustomerIndexConfig(config,
				'corporate');
		newconfig = ObjectUtil.apply(newconfig,{maximizable : true});
		return this.createWindow(newconfig);
	},
	/**
	 * 组装客户详细信息标签页参数
	 * 
	 * @param {}
	 *            config 参数对象
	 * @param {}
	 *            customerType 客户类别,对公:'corporate',对私:'person' config->name 客户名称
	 *            config->customerky 客户主键 config->authority 客户权限
	 * @return {} 参数对象
	 * @private
	 */
	populateCustomerIndexConfig : function(config, customerType) {
		if (Ext.isEmpty(config)) {
			ExceptionUtil.throwBusinessException({
						title : '错误信息',
						msg : '未传递配置参数!'
					});
		} 
		// 对公客户统一视图特殊处理
		if ("corporate" == customerType) {
			if (Ext.isEmpty(config.name) || Ext.isEmpty(config.customerky)) {
			ExceptionUtil.throwBusinessException({
						title : '错误信息',
						msg : '参数：name,customerky,authority必须传入值'
					});
			}
			// 处理权限，如果权限为空，则从系统中查询用户权限
			if (Ext.isEmpty(config.authority)) {
				this.loadCorpAuthority(config.customerky, config);
			}
		}
		
		if (Ext.isEmpty(config.name) || Ext.isEmpty(config.customerky)
			|| Ext.isEmpty(config.authority)) {
				ExceptionUtil.throwBusinessException({
					title : '错误信息',
					msg : '参数：name,customerky,authority必须传入值'
				});
		}
		 
		return {
			name : config.name,
			width : config.width || 1000,
			height : config.height || 550,
			pageConfig : {
				className : 'business.customer.CustomerIndex',
				config : {
					id : customerType + '-customer-index-' + config.customerky
							+ config.funType,
					customerky : config.customerky,
					name : config.name,
					widthPercent : config.widthPercent,
					heightPercent : config.heightPercent,
					funType : config.funType,
					type : customerType,
					otherConfig : config.otherConfig,
					authority : config.authority,
					onTabClose : config.onTabClose
				}
			}
		};
	},
	/**
	 * 弹出雇员选择窗口
	 * 
	 * @example
	 * HtmlUtil.getDom(this.ids.customertransferChooseTargetEmployee).onclick = function() {
	this.createEmployeeSelectWindow({
				title : '选择客户经理',
				id : 'selectEmployee',
				width : 800,
				height : 450,
				type:CodeStringDefinition.RM_EMPLOYEE_TYPE_CODE,
				checkbox:false,
				displayDomId:owner.ids.test,
				hiddenDomId:owner.ids.testId
			});
	};
	 * @return {}
	 * @public
	 */
	createEmployeeSelectWindow : function(config) {
		config.id = "selectEmployee";
		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					width : config.width || 900,
					height : config.height || 480,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.employee.SelectEmployee", config)
				});
		return win;
	},
	createAuditEmployeeSelectWindow : function(config) {
		config.id = "auditEmployeeSelect";
		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					width : config.width || 900,
					height : config.height || 480,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.employee.SelectAuditEmployee", config)
				});
		return win;
	},
	/**
	 * 创建树形下拉选择框
	 * 
	 * @example
	 * this.createSelectTree({
					renderTo : this.ids.nodeTree,
					codeDomId : this.ids.node,
					strServId:'xx',
					rootCode:'xx',
					rootDesc:'xx',
					width : 350,
					onlyLeafSelect : false
				});
	 * @return {}
	 * @public
	 */
	createSelectTree : function(config) {
		if (DataUtil.isEmpty(config.renderTo)) {
			MsgUtil.error("错误提示", "必须传入参数renderTo");
			return;
		}
		if (DataUtil.isEmpty(config.rootCode)) {
			MsgUtil.error("错误提示", "必须传入参数rootCode");
			return;
		}
		if (DataUtil.isEmpty(config.rootDesc)) {
			MsgUtil.error("错误提示", "必须传入参数rootDesc");
			return;
		}
		if (DataUtil.isEmpty(config.strServId)) {
			MsgUtil.error("错误提示", "必须传入参数strServId");
			return;
		}
		return ObjectUtil.create("component.TreeSelector", {
					renderTo : config.renderTo,
					id : config.renderTo + "SelectTree",
					strServId : config.strServId,
					expandFields : ['mark'],
					domIdFieldsMapList : config.domIdFieldsMapList,
					codeDom : HtmlUtil.getDom(config.codeDomId),
					textDom : config.textDomId,
					rootId : config.rootCode,
					rootText : config.rootDesc,
					multiple : config.multiple,
					selectedValue : config.selectedValue,
					width : config.width || 180,
					onlyLeafSelect : config.onlyLeafSelect,
					paramStr : config.paramStr,
					widthPercent : config.widthPercent,
					heightPercent : config.heightPercent,
					listeners : config.listeners,
					parentObj : this
				});
	},
	/**
	 * 创建树形
	 * 
	 * @example
	 * createTree({
					renderTo : this.ids.nodeTree,
					codeDomId : this.ids.node,
					strServId:'xx',
					rootCode:'xx',
					rootDesc:'xx',
					widthPercent : 0.2,
					onlyLeafSelect : false
				});
	 * @return {}
	 * @public
	 */
	createTree : function(config) {
		if (DataUtil.isEmpty(config.renderTo)) {
			MsgUtil.error("错误提示", "必须传入参数renderTo");
			return;
		}
		if (DataUtil.isEmpty(config.rootCode)) {
			MsgUtil.error("错误提示", "必须传入参数rootCode");
			return;
		}
		if (DataUtil.isEmpty(config.rootDesc)) {
			MsgUtil.error("错误提示", "必须传入参数rootDesc");
			return;
		}
		if (DataUtil.isEmpty(config.strServId)) {
			MsgUtil.error("错误提示", "必须传入参数strServId");
			return;
		}
		return ObjectUtil.create("component.Tree", {
					id : config.renderTo + 'Tree',
					title : config.title,
					strServId : config.strServId,
					rootId : config.rootCode,
					rootText : config.rootDesc,
					width : config.width || 350,
					height : config.width || 400,
					multiple : config.multiple,
					renderTo : config.renderTo,
					widthPercent : config.widthPercent,
					heightPercent : config.heightPercent,
					paramStr : config.paramStr,
					expandAll : config.expandAll,
					tbar : config.tbar,
					filter : config.filter,
					parentObj : this,
					nodeClick : function() {
						config.nodeClick(this);
					}
				});
	},
	/**
	 * 创建机构选择框
	 * 
	 * @example
	 * this.createOrgSelectTree({
					renderTo : this.ids.nodeTree,
					codeDomId : this.ids.node,
					width : 350,
					onlyLeafSelect : false
				});
	 * @return {}
	 * @public
	 */
	createOrgSelectTree : function(config) {
		if (config.multiple != true) {
			config.multiple = false;
		}
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'organTreeService.retrieveChildrenNodesByParentNode';
		// }
		if (DataUtil.isEmpty(config.rootCode)) {
			if(DataUtil.isEmpty(DataUtil.getUserInfo().position)){
				config.rootCode = DataUtil.getUserInfo().orgCode;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_HEAD){
				config.rootCode = DataUtil.getUserInfo().center;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_PROVINCE){
				config.rootCode = DataUtil.getUserInfo().province;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_CITY){
				config.rootCode = DataUtil.getUserInfo().city;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_BRANCH){
				config.rootCode = DataUtil.getUserInfo().branchcode;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_NODE){
				config.rootCode = DataUtil.getUserInfo().orgCode;
			}
			
		}
		if (DataUtil.isEmpty(config.rootDesc)) {
			if(DataUtil.isEmpty(DataUtil.getUserInfo().position)){
				config.rootDesc = DataUtil.getUserInfo().orgDesc;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_HEAD){
				config.rootDesc = DataUtil.getUserInfo().centerDesc;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_PROVINCE){
				config.rootDesc = DataUtil.getUserInfo().provinceDesc;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_CITY){
				config.rootDesc = DataUtil.getUserInfo().cityDesc;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_BRANCH){
				config.rootDesc = DataUtil.getUserInfo().branchcodeDesc;
			}else if(DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_NODE){
				config.rootDesc = DataUtil.getUserInfo().orgDesc;
			}
			
		}
		return this.createSelectTree(config);
	},
	/**
	 * 创建机构树
	 * 
	 * @example
	 * this.createResourceTree({
							renderTo : this.ids.resourceTree,
							width : 300,
							nodeClick : function(node) {
								alert(node)
							}
						});
	 * @return {}
	 * @public
	 */
	createOrgTree : function(config) {
		if (config.multiple != true) {
			config.multiple = false;
		}
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'organTreeService.retrieveChildrenNodesByParentNode';
		// }
		if (DataUtil.isEmpty(config.rootCode)) {
			config.rootCode = DataUtil.getUserInfo().orgCode;
		}
		if (DataUtil.isEmpty(config.rootDesc)) {
			config.rootDesc = DataUtil.getUserInfo().orgDesc;
		}
		return this.createTree(config);
	},
	/**
	 * 创建行业类型树
	 * 
	 * @example
	 * this.creatIndustryTypeTree({
							title : '行业类型树',
							renderTo : this.ids.industryTypeTree,
							widthPercent : 0.3,
							nodeClick : function(data) {
								alert(data.value[0])
							}
						});
	 * @return {}
	 * @public
	 */
	creatIndustryTypeTree : function(config) {
		if (config.multiple != true) {
			config.multiple = false;
		}
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'industryTypeTreeService.retrieveChildrenNodesByParentNode';
		// }
		if (DataUtil.isEmpty(config.rootCode)) {
			config.rootCode = CodeStringDefinition.INDUSTRY_TYPE_TREE_ROOT_CODE;
		}
		if (DataUtil.isEmpty(config.rootDesc)) {
			config.rootDesc = '行业类别';
		}
		return this.createTree(config);
	},
	/**
	 * 创建行业类型选择框
	 * 
	 * @example
	 * this.createIndustryTypeSelectTree({
					renderTo : this.ids.industType,
					codeDomId : this.ids.industTypeCode,
					width : 350,
					onlyLeafSelect : false
				});
	 * @return {}
	 * @public
	 */
	createIndustryTypeSelectTree : function(config) {
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'industryTypeTreeService.retrieveChildrenNodesByParentNode';
		// }
		if (config.multiple != true) {
			config.multiple = false;
		}

		if (DataUtil.isEmpty(config.typeCode)) {
			config.rootCode = CodeStringDefinition.INDUSTRY_TYPE_TREE_ROOT_CODE;
		} else {
			config.rootCode = config.typeCode;
		}
		if (DataUtil.isEmpty(config.typeDesc)) {
			config.rootDesc = '行业类别';
		} else {
			config.rootDesc = config.typeDesc;
		}
		return this.createSelectTree(config);
	},
	/**
	 * 创建产品分类选择框
	 * 
	 * @example
	 * this.createProductTypeSelectTree({
					renderTo : this.ids.productTypeTree,
					codeDomId : this.ids.productType,
					width : 350,
					onlyLeafSelect : false
				})
	 * @return {}
	 * @public
	 */
	createProductTypeSelectTree : function(config) {
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'productTreeService.getProdTypeChildrenNodesByParentNode';
		// }
		if (config.multiple != true) {
			config.multiple = false;
		}

		if (DataUtil.isEmpty(config.typeCode)) {
			config.rootCode = '000000';
		} else {
			config.rootCode = config.typeCode;
		}
		if (DataUtil.isEmpty(config.typeDesc)) {
			config.rootDesc = '产品分类';
		} else {
			config.rootDesc = config.typeDesc;
		}
		return this.createSelectTree(config);
	},
	createCorpProductTypeSelectTree : function(config) {
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'corpProductTypeService.getProdTypeChildrenNodesByParentNode';
		// }
		if (config.multiple != true) {
			config.multiple = false;
		}

		if (DataUtil.isEmpty(config.typeCode)) {
			config.rootCode = '000000';
		} else {
			config.rootCode = config.typeCode;
		}
		if (DataUtil.isEmpty(config.typeDesc)) {
			config.rootDesc = '产品分类';
		} else {
			config.rootDesc = config.typeDesc;
		}
		return this.createSelectTree(config);
	},
	/**
	 * 创建产品分类树
	 * 
	 * @example
	 * this.createProductTypeTree({
							renderTo : this.ids.productTypeTree,
							width : 300,
							nodeClick : function(node) {
								alert(node)
							}
						});
	 * @return {}
	 * @public
	 */
	createProductTypeTree : function(config) {
		if (config.multiple != true) {
			config.multiple = false;
		}
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'productTreeService.getProdTypeChildrenNodesByParentNode';
		// }
		if (DataUtil.isEmpty(config.typeCode)) {
			config.rootCode = '000000';
		} else {
			config.rootCode = config.typeCode;
		}
		if (DataUtil.isEmpty(config.typeDesc)) {
			config.rootDesc = '产品分类';
		} else {
			config.rootDesc = config.typeDesc;
		}
		return this.createTree(config);
	},
		createCorpProductTypeTree : function(config) {
		if (config.multiple != true) {
			config.multiple = false;
		}
		config.strServId = 'corpProductTypeService.getProdTypeChildrenNodesByParentNode';
		if (DataUtil.isEmpty(config.typeCode)) {
			config.rootCode = '000000';
		} else {
			config.rootCode = config.typeCode;
		}
		if (DataUtil.isEmpty(config.typeDesc)) {
			config.rootDesc = '产品分类';
		} else {
			config.rootDesc = config.typeDesc;
		}
		return this.createTree(config);
	},
	/**
	 * 创建资源树
	 * 
	 * @example
	 * this.createResourceTree({
							renderTo : this.ids.resourceTree,
							width : 300,
							nodeClick : function(node) {
								alert(node)
							}
						});
	 * @return {}
	 * @public
	 */
	createResourceTree : function(config) {
		if (config.multiple != true) {
			config.multiple = false;
		}
		// if (DataUtil.isEmpty(config.strServId)) {
		config.strServId = 'resourceTreeService.getSubResource';
		// }
		if (DataUtil.isEmpty(config.resourceCode)) {
			config.rootCode = '1';
		} else {
			config.rootCode = config.resourceCode;
		}
		if (DataUtil.isEmpty(config.resourceDesc)) {
			config.rootDesc = '资源树';
		} else {
			config.rootDesc = config.resourceDesc;
		}
		return this.createTree(config);
	},

	/**
	 * 创建产品选择窗口
	 * 
	 * @example
	 * this.createProductSelectWindow({
						title : '选择产品',
						checkbox : false,
						displayDomId : owner.ids.productName,
						hiddenDomId : owner.ids.productId
					});
	 * @return {}
	 * @public
	 */
	createProductSelectWindow : function(config) {
		config.id = "selectProduct";
		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					width : config.width || 700,
					height : config.height || 450,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.product.SelectProduct", config)
				});
		return win;
	},
	/**
	 * 创建客户选择窗口
	 * 
	 * @example
	 * this.createCustomerSelectWindow({
						title : '选择客户',
						checkbox : true,
						customerType : CodeStringDefinition.COPORATE_CUSTOMER_TYPE_CODE,
						displayDomId : owner.ids.customerName,
						hiddenDomId : owner.ids.customerKy,
						employeeType : CodeStringDefinition.RM_EMPLOYEE_TYPE_CODE
					});
	 * @return {}
	 * @public
	 */
	createCustomerSelectWindow : function(config) {
		config.id = "selectCustomer";
		if (DataUtil.isEmpty(config.customerType)) {
			MsgUtil.error("错误提示", "必须传入客户类型");
			return;
		}
		var pageObject = null;
		if (CodeStringDefinition.PERSON_CUSTOMER_TYPE_CODE == config.customerType) {// 对私客户
			if (config.employeeType == CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE) {
				config.height = 540;
			} else {
				config.height = 480;
			}
			pageObject = ObjectUtil.create(
					"business.customer.SelectPersonCustomer", config);
		} else if (CodeStringDefinition.COPORATE_CUSTOMER_TYPE_CODE == config.customerType) {// 对公客户
			if (config.employeeType == CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE) {
				config.height = 540;
			} else {
				config.height = 520;
			}
			pageObject = ObjectUtil.create(
					"business.customer.SelectCorporateCustomer", config);
		}

		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					width : config.width || 900,
					height : config.height || 492,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : pageObject
				});
		return win;
	},
	/**
	 * 创建综合查询引擎选择窗口
	 * 
	 * @example
	 * this.createSearchEnginSelectWindow({
						title : '选择搜索引擎',
						checkbox : true,
						displayDomId : owner.ids.searchEnginName,
						hiddenDomId : owner.ids.searchEnginId
					});
	 * @return {}
	 * @public
	 */
	createSearchEnginSelectWindow : function(config) {
		config.id = "selectSearchEngin";
		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					width : config.width || 750,
					height : config.height || 400,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.searchEngine.SelectSearchEngine", config)
				});
		return win;
	},
	/**
	 * 创建附件管理窗口 businessky:业务主键 businessType:业务类型
	 * allowUpload:是否允许上传(false:不显示上传按钮),默认true
	 * allowDownload:是否允许下载(false:不显示下载按钮),默认true
	 * allowDelete:是否允许删除(false:不显示删除按钮),默认true
	 * allowDeleteAll:是否允许删除全部(false:只能查看删除上传的),默认true
	 * allowViewAll:是否允许查看全部(false:只能查看自己上传的),默认true
	 * types : 允许上传的类型,默认['txt', 'pdf', 'doc', 'xls', 'xlsx', 'docx', 'rar',
							'zip', 'ppt']
	 * @example
	 * this.createAccessoryManageWindow({
	 *                  title:'测试',
						businessky : 12,
						businessType:CodeStringDefinition.BUSINESS_TYPE_CORPORATE_BUSGROUP_REPORT_TEMPLATE,
						allowUpload:true,
						allowDownload:true,
						allowDelete:true,
						allowDeleteAll:true,
						allowViewAll:true
					});
	 * @return {}
	 * @public
	 */
	createAccessoryManageWindow : function(config) {
		config.id = "createAccessoryManageWindow";
		var win = ObjectUtil.create('component.Window', {
					title : config.title + '-附件管理',
					closable : true,
					draggable : true,
					width : config.width || 500,
					height : config.height || 350,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.accessory.AccessoryManage", config)
				});
		return win;
	},
	/**
	 * 创建标签窗口 config->title:标题 config->id:id config->tabs:标签数组
	 * [{id:'itemId',text:'子项描述',className:'子类对象',children:[{id:'itemId',text:'子项描述',className:'子类对象',classConfig:{id:'itemId'}},{id:'itemId',text:'子项描述',active:true,className:'子类对象',classConfig:{id:'itemId'}}]}],
	 * active 表示激活当前标签
	 * 
	 * @example
	 * this.createTabWindow({
						title : '名称',
						id : "test",
						tabs : [{
											id : 'itemId-7',
											text : '测试列表',
											active : true,
											className : 'crm.pages.ocrm.test.TestList',
											classConfig : {
												id : "TestList-7"
											}
										}, {
											id : 'itemId-1',
											text : '新增',
											children : [{
												id : 'itemId-2',
												text : '行外客户',
												className : 'crm.pages.ocrm.test.TestCreate',
												classConfig : {
													id : "TestCreate-1"
												}
											}, {
												id : 'itemId-3',
												text : '行外客户(带附件)',
												active : true,
												className : 'crm.pages.ocrm.test.TestUpload',
												classConfig : {
													id : "TestUpload-1"
												}
											}, {
												id : 'itemId-4',
												text : '行外客户(带附件)1',
												className : 'crm.pages.ocrm.test.TestUpload',
												classConfig : {
													id : "TestUpload-4"
												}
											}, {
												id : 'itemId-8',
												text : '子子项',
												children : [{
													id : 'itemId-9',
													text : '行外客户',
													className : 'crm.pages.ocrm.test.TestCreate',
													classConfig : {
														id : "TestCreate-9"
													}
												}, {
													id : 'itemId-10',
													text : '行外客户(带附件)',
													active : true,
													className : 'crm.pages.ocrm.test.TestUpload',
													classConfig : {
														id : "TestUpload-10"
													}
												}]
											}]
										}, {
											id : 'itemId-5',
											text : '测试列表',
											active : true,
											className : 'crm.pages.ocrm.test.TestList',
											classConfig : {
												id : "TestList-5"
											}
										}, {
											id : 'itemId-6',
											text : '测试列表1',
											className : 'crm.pages.ocrm.test.TestList',
											classConfig : {
												id : "TestList-6"
											}
										}]
					});
	 * @return {}
	 * @public
	 */
	createTabWindow : function(config) {
		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					autoScroll : true,
					width : config.width || 900,
					height : config.height || 450,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create("business.tab.Tab", config)
				});
		return win;
	},
	/**
	 * 渲染产品库列表行,添加产品库详细信息标签页到主标签页上
	 * 
	 * @param {}
	 *            config config->name 产品名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            renderer : function(value, metadata, record) {
					return this.rendererProductIndexColumn({
						name : value,
						customerky : record.data.corpersonky,
						authority : 'User'
					});
				}
	 * @return {}返回带连接的字符串
	 * @public
	 */
	rendererProductIndexColumn : function(config) {
		return this.rendererColumn(this.populateCustomerIndexConfig(config,
				'product'));
	},
	/**
	 * 页面将在主panel中打开 一般在点击按钮时使用
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            this.createProductIndexToPanel({
						name : value,
						customerky : record.data.corpersonky,
						authority : 'User'
					});
	 * @return {} 返回带连接的字符串
	 * @public
	 */
	createProductIndexToPanel : function(config) {
		return this.createCenterPanel(this.populateCustomerIndexConfig(config,
				'product'));
	},
	/**
	 * 在window窗口中打开产品库详细信息标签页 一般用于按钮
	 * 
	 * @param {}
	 *            config config->name 客户名称 config->customerky 客户主键
	 *            config->authority 客户权限
	 *            @example
	 *            this.createProductIndexWindow({
						name : '测试',
						customerky : 1,
						authority : 'User'
					});
	 * @return {} 窗口对象
	 * @public
	 */
	createProductIndexWindow : function(config) {
		return this.createWindow(this.populateCustomerIndexConfig(config,
				'product'));
	},
	/**
	 * 创建附件关联关系管理窗口
	 * 
	 * @example
	 * this.createAccessoryReationManageWindow();
	 * @return {}
	 * @public
	 */
	createAccessoryReationManageWindow : function() {
		var win = ObjectUtil.create('component.Window', {
					title : '系统附件关联关系管理',
					id : "createAccessoryReationManageWindow",
					closable : true,
					draggable : true,
					width : 600,
					height : 380,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.accessory.AccessoryReationManage", {
								id : 'accessoryReationManageWindow'
							})
				});
		return win;
	},
	/**
	 * 创建上下级雇员选择窗口
	 * 
	 * @example
	 * owner.createSuperSubEmployeeSelectWindow({
						title : '选择客户经理',
						checkbox : true,
						displayDomId : owner.ids.test,
						hiddenDomId : owner.ids.testId
					});
	 * @return {}
	 * @public
	 */
	createSuperSubEmployeeSelectWindow : function(config) {
		config.id = "selectSuperSubEmployeeSelect";
		var win = ObjectUtil.create('component.Window', {
					title : config.title,
					closable : true,
					draggable : true,
					width : config.width || 900,
					height : config.height || 480,
					x : config.x,
					y : config.y,
					modal : true,
					pageObject : ObjectUtil.create(
							"business.employee.SelectSuperSubEmployee", config)
				});
		return win;
	},
	
	/**
	 * 加载对公操作员与客户的关系
	 * @param {Object} customerky
	 * @param {Object} config
	 * @memberOf {TypeName} 
	 */
	loadCorpAuthority : function(customerky, config) {
		// 加载并渲染数据
		var jsondata='{"corporateky":' + customerky + '}';
		ConnectionUtil.ajaxReq({
				strServId : "corpAuthorityService.queryAuthorityInfo",
				submitWaitMessage:false,
				jsonData :jsondata,
				async:false,
				callback : function(data) {
					config.authority=data.authority;
				}
		});
	},
	initYearControll:function (config){
		var today=new Date();
		var thisYear = today.getFullYear();
		var years = [];
		for (var i = thisYear; i >= 2000; i--) {
			var year = {};
			year.label = i + "年";
			year.code = i;
			years[thisYear - i] = year;
		}		
		var curentYear=thisYear;
		ObjectUtil.create("component.Selector", {
			id : config.id,
			renderTo : config.renderTo,
			jsonData : years,
			selectedValue : curentYear
		});
	}
});
