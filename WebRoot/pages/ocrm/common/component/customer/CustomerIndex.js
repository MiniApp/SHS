/**
 * 客户首页总控制公共组件类 对公,对私共用此组件
 * 
 * 
 * @author DuanYong
 * @since 2012-07-06
 * @class business.customer.CustomerIndex
 * @extends base.PageObject 参数： id : 唯一ID, customerky : 客户主键, name : 名称, type :
 *          页面类型, authority : 客户角色 funType :功能类型
 */
ObjectUtil
		.define(
				"business.customer.CustomerIndex",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/component/customer/CustomerIndex.html",
					/**
					 * 配置文件
					 */
					initData : function() {
						if (!this.customerky) {
							ExceptionUtil.throwBusinessException({
								msg : '客户主键不允许为空!'
							});
						}

						if (!this.name) {
							ExceptionUtil.throwBusinessException({
								msg : '客户姓名不允许为空!'
							});
						}

						if (!this.authority) {
							ExceptionUtil.throwBusinessException({
								msg : '角色权限为空,无法初始化客户首页!'
							});
						}

						if (!this.type) {
							ExceptionUtil.throwBusinessException({
								msg : '页面类型不允许为空!'
							});
						}

						// 配置文件完整路径
						// this.configFile = "/menu/" + this.authority + ".xml";
						if (this.type == 'corporate') {
							this.loadCorpInfo();	
							this.authority=CodeStringDefinition.MANAGERPort_EMPLOYEE_AUTHORITY;
							this.configFile = "/menu/" + this.type+ "/CustomerIndex-Corp-"+ this.authority + ".xml";
							// 根据客户类别加载相应的客户统一视图
							// 同业客户
//							if (this.customertype == CodeStringDefinition.CORPORATE_CUSTOMER_INCUS) {
//								this.configFile = "/menu/" + this.type
//										+ "/CustomerIndex-Corp-Indus-"
//										+ this.authority + ".xml";
//							} else if (this.customertype == CodeStringDefinition.CORPORATE_CUSTOMER_AVOUCH) {
//								// 担保客户
//								this.configFile = "/menu/" + this.type
//										+ "/CustomerIndex-Corp-Avouch-"
//										+ this.authority + ".xml";
//							} else if (this.customertype == CodeStringDefinition.CORPORATE_CUSTOMER_INVEST) {
//								// 投行客户
//								this.configFile = "/menu/" + this.type
//										+ "/CustomerIndex-Corp-Invest-"
//										+ this.authority + ".xml";
//							} else {
//								// 普通客户
//								if (this.authority == 'RMPort'
//										|| this.authority == 'ManagerPort'
//										|| this.authority == 'AssistRMPort'
//										|| this.authority == 'TeamRMPort') {
//									this.configFile = "/menu/" + this.type
//											+ "/CustomerIndex-Corp-"
//											+ this.authority + ".xml";
//								} else {
//									this.configFile = "/menu/" + this.type
//											+ "/CustomerIndex-Corp-Other-"
//											+ this.authority + ".xml";
//								}
//							}
						} else if (this.type == 'person') {
							this.configFile = "/menu/" + this.type
									+ "/CustomerIndex-" + this.authority
									+ ".xml";
						} else if (this.type == 'product') {
							this.configFile = "/menu/" + this.type
									+ "/ProductIndex-" + this.authority
									+ ".xml";
						} else {
							ExceptionUtil
									.throwBusinessException({
										msg : '页面类型只能是,对公：corporate,对私：person,产品库：product!'
									});
						}

						// 面板主键
						this.panelId = "CustomerIndex-" + this.type
								+ this.customerky;

					},

					/**
					 * 初始化组件
					 */
					initCmp : function() {
						/**
						 * 1.加载主菜单
						 */
						this.mainMenu = this.generateMenu();
						/**
						 * 3.初始化快速导航面板
						 */
						this.loadNavigationPanel();
						if (this.type == 'corporate') {
							this.pageObject = 'crm.pages.ocrm.corporate.customer.mycustomer.companyinfo.CorpCompanyInfo';
							this.pageTitle = '客户基本信息';
						} else if (this.type == 'person') {
							this.pageObject = 'crm.pages.ocrm.person.customer.cusDetailInfo.cusOverView.CustomerOverViewInfo';
							this.pageTitle = '客户概览';
						}
						this.infoPanel = this
								.create(
										"component.Panel",
										{
											id : this.customerky+'infoPanel',
											title : this.pageTitle,
											widthPercent : 0.83,
											heightPercent : 1,
											renderTo : this.ids.customerIndexPanelCenterPanel,
											hasBackGroundColor : false,
											pageObject : ObjectUtil
													.create(
															this.pageObject,
															{
																id : this.customerky+"id",
																customerky : this.customerky,
																authority : this.authority,
																otherConfig : this.otherConfig
															}),
											callback : function() {
											}
										});
					},

					/**
					 * 对公查询客户信息
					 */
					loadCorpInfo : function() {
						var me = this;
						// 加载并渲染数据
						var jsondata = '{"corporateky":' + me.customerky + '}';
						ConnectionUtil
								.ajaxReq({
									strServId : "corpCompanyInfoService.queryCompanyInfo",
									submitWaitMessage : false,
									jsonData : jsondata,
									async : false,
									callback : function(data) {
										me.customertype = data.customertypecode;
									}
								});
					},

					/**
					 * 加载快速导航菜单
					 * 
					 * 根据导航菜单，生成导航面板，返回快速导航面板 导航项基于树的形式展示
					 */
					loadNavigationPanel : function() {
						var me = this;
						var menus = this.mainMenu;
						if (!menus || DataUtil.isEmpty(menus[0].id)) {
							return;
						}
						// 快速导航面板
						var navigationPanel = this
								.create(
										"component.SimpleTree",
										{
											renderTo : this.ids.customerIndexPanelnavigationPanel,
											children : menus,
											widthPercent : 0.15,
											heightPercent : 1,
											nodeClick : function() {
												if (this.leaf[0]) {
													me.openWin(this);
												}
											}
										});

						return navigationPanel;
					},

					/**
					 * 打开新窗口(用于快速导航页面) 参数说明： - node 点击的快速导航节点
					 */
					openWin : function(node) {
						HtmlUtil.overwrite(
								this.ids.customerIndexPanelCenterPanel, "",
								false);
						this.create("component.Panel", {
//20130412统一视图同时打开2个，产生ID冲突，注释该ID
//							id : 'infoPanel',
							title : node.text[0],
							widthPercent : 0.85,
							heightPercent : 0.995,
							renderTo : this.ids.customerIndexPanelCenterPanel,
							hasBackGroundColor : false,
							pageObject : ObjectUtil.create(node.className[0], {
								id : 'customerBaseInfo',
								customerky : this.customerky,
								authority : this.authority,
								otherConfig : this.otherConfig,
								name : this.name
							}),
							callback : function() {
							}
						});

					},
					/**
					 * 解析主菜单配置文件
					 */
					generateMenu : function() {
						if (this.authority) {
							this.xmlJsonObj = XmlUtil.parseXml({
								xmlUrl : this.configFile
							});
							return XmlUtil
									.getJsonNavigationDataByNodeName(this.xmlJsonObj.navigation);
						} else {
							ExceptionUtil.throwBusinessException({
								msg : '操作员无职位信息,请联系管理员!'
							});
						}
					}
				});