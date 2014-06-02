/**
 * 产品识别信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductIdentifyDetail",
				"base.PageObject", {
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/detail/ProductIdentifyDetail.html",// 页面url地址

					/**
					 * 初始化页面数据
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					initData : function() {
				
						// 加载并渲染数据
						var owner = this;
						var jsonData = {
							'productId' : owner.customerky
						};
						ConnectionUtil.ajaxReq({
							strServId : "productManageService.getProductInfoById",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								DataUtil
										.populateDataForArea(
												data,
												owner.ids.productIdentifyDetailContentDiv);// 渲染数据到页面
							}
						});
						
						var btnArray = [];
						var userInfo = DataUtil.getUserInfo();
						if (CodeStringDefinition.POSITION_CENTER_MSGCODE == userInfo.orgLevel
								&& CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER == userInfo.authorityCode) {
							this.flag = true;
						}
						if (this.flag) {// 总行级主管权限
							btnArray = [{
										id : "update"
									},//更新
									{
										id : "delete"
									},//废止
									{
										id : "view"
									}// 查看
									];
						} else {// 非总行级主管权限
							btnArray = [{
										id : "view"
							}];//查看
						}
						this.button = btnArray;
					},
					
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
                        var jsonData = {
										'productId' : owner.customerky
									};
						// 面板
						this.create('component.Panel', {

							title : '',
							contentEl : this.ids.productIdentifyDetailContentDiv,
							renderTo : this.ids.productIdentifyDetailPanelDiv,
							height : 260,
							hasBackGroundColor : true,
							buttons : [{
								text : '产品基本信息',
								id:'view',
								iconCls : 'view',
								tooltip : '产品基本信息',
								handler : function() {
									if (CodeStringDefinition.PRODUCTTYPE_DEPOSIT == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailDEPOSIT();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_LOAN == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailLOAN();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_AGENCY == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailAGENCY();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_INVEST == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailINVEST();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_THRIDPAY == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailTHRIDPAY();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_ELECHANEL == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailELECHANEL();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_BORROWCARD == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailBORROWCARD();
									}
									else if (CodeStringDefinition.PRODUCTTYPE_CREDITCARD == owner.productType) {
										ProductBaseInfoDetail = owner
												.viewDetailCREDITCARD();
									}else{
										MsgUtil.alert("提示", "该产品未分类!");
									}
									ProductBaseInfoDetail;
								}
							}, {
								text : '更新',
								id:'update',
								iconCls : 'edit',
								tooltip : '修改产品识别信息',
								handler : function() {
									owner.updataBaseInfo();
								}
							}, {
								text : '废止',
								id:'delete',
								iconCls : 'delete',
								tooltip : '废止产品',
								handler : function() {
									MsgUtil.confirm("提示", "是否确认废止该产品？", function(btn) {
								if (btn == 'yes') {
									ConnectionUtil.ajaxReq({
										strServId : "productManageService.updateProduct",
										jsonData : DataUtil.encode(jsonData),
										callback : function(msg) {
											MsgUtil.alert("提示", "产品废止成功!");
										}
									});
								   }
								  });
							    }
								
							}]
						});

					},
					/**
					 * 创建存款基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailDEPOSIT : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '存款产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductDepositInfoDetail',// 创建新增页面对象
											{
												id : 'ProductDepositDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建贷款基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailLOAN : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '贷款产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 320,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductLoanInfoDetail',// 创建新增页面对象
											{
												id : 'ProductLoanDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建代理基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailAGENCY : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '代理产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductAgencyInfoDetail',// 创建新增页面对象
											{
												id : 'ProductAngecyDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建投资理财基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailINVEST : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '理财产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 420,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductInvestInfoDetail',// 创建新增页面对象
											{
												id : 'ProductIdentifyDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建第三方支付平台基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailTHRIDPAY : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '第三方支付平台基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductThirdpayInfoDetail',// 创建新增页面对象
											{
												id : 'ProductIdentifyDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建电子渠道基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailELECHANEL : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '电子渠道产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 320,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductElechanelInfoDetail',// 创建新增页面对象
											{
												id : 'ProductIdentifyDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建借记卡基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailBORROWCARD : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '借记卡产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 380,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductBorrowcardInfoDetail',// 创建新增页面对象
											{
												id : 'ProductIdentifyDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},
					/**
					 * 创建信用卡基本信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					viewDetailCREDITCARD : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '信用卡产品基本信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductCreditcardInfoDetail',// 创建新增页面对象
											{
												id : 'ProductIdentifyDetail',
												productId : owner.customerky,
												productType : owner.productType
											})
						});

					},

					/**
					 * 更新产品识别信息窗口
					 * 
					 * @param
					 * @return
					 * @程序员：suxiaoliang
					 * @编码日期：2013-03-05
					 * @最后修改日期：
					 */
					updataBaseInfo : function() {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '产品识别信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.update.ProductIdentifyUpdate',// 创建新增页面对象
											{
												id : 'ProductIdentifyUpdata',
												productId : owner.customerky
											})

						});
						win.on('close', function() {
									owner.initData();
								})

					}

				});