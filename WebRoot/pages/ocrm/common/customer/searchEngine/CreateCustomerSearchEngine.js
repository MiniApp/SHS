ObjectUtil
		.define(
				"crm.pages.ocrm.common.customer.searchEngine.CreateCustomerSearchEngine",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/customer/searchEngine/CreateCustomerSearchEngine.html",
					// 定义条件输入域table样式
					table_head : "<FIELDSET style='margin-bottom:12px;margin-left:12px;margin-right:12px;margin-top:2px;'><LEGEND title='条件输入域' style='FONT-WEIGHT: bold; FONT-SIZE: 120%; COLOR: #003399; FONT-FAMILY: Verdana'>条件输入域</LEGEND> <TABLE class='DisplayTable' ID='idChkBoxControlsDIV' CELLSPACING='0' CELLPADDING='0' STYLE='margin-bottom: 12; display: block; width:800px;FONT-SIZE: 110%;'>",
					_TD1_ : "<TD width='150px' VALIGN='middle' style='padding:1px;'>",
					_TD2_ : "<TD width='150px' VALIGN='middle' style='padding:1px;'>",
					_TD3_ : "<TD width='150px' VALIGN='middle' style='padding:1px;' class='empt'>",
					table_end : "</TABLE></FIELDSET>",
					_TD_ : "</TD>",
					_TR1_ : "<TR>",
					_TR2_ : "</TR>",
					_TR_ : "<TR><TD width='150px' VALIGN='middle' style='padding:1px;'>条件名称：</TD>",

					idCounter : 0,
					initCmp : function() {
						var owner = this;
						var paramStr = "";
						if (DataUtil.getUserInfo().systemId == CodeStringDefinition.PERSONAL_SYSTM_MSGCODE) {// 当前用户属于对私用户
							paramStr = {
								type : CodeStringDefinition.PERSON_CUSTOMER_TYPE_CODE
							};
						} else {// 对公
							paramStr = {
								type : CodeStringDefinition.COPORATE_CUSTOMER_TYPE_CODE
							};
						}
						// 树
						this.indexTree = this.create("component.Tree", {
							title : '指标树区域',
							strServId : 'engineService.buildIndexTree',
							paramStr : paramStr,
							rootText : '指标树',
							rootId : 'treeConditionRoot',
							widthPercent : 0.21,
							height : 594,
							renderTo : this.ids.tree,
							fields : [ 'id', {// 映射字段
								name : 'text',
								mapping : 'caption'
							}, 'normid', 'showtype', 'fields', 'strServId',
									'rootCode', 'rootDesc', 'onlyLeafSelect' ],
							nodeClick : function() {
								if (this.leaf[0]) {
									owner.buildDynamicFields(this.data[0]);
								}
							}
						});
						this.create('component.Panel', {
							title : '基本条件信息',
							contentEl : this.ids.baseInfoContentDiv,
							hasBackGroundColor : false,
							height : 150,
							widthPercent : 0.761,
							renderTo : this.ids.baseInfoDiv
						});

						this.create('component.DateField', {
							renderTo : this.ids.execyteDay,
							format : 'd'
						});
						this
								.create(
										'component.Panel',
										{
											title : '条件树区域',
											contentEl : this.ids.condtionTreeContentDiv,
											hasBackGroundColor : false,
											height : 223,
											widthPercent : 0.761,
											autoScroll : true,
											renderTo : this.ids.condtionTreeDiv,
											tbar : [ {
												text : '删除选中条件',
												tooltip : '删除选中条件',
												iconCls : 'delete',
												handler : function() {
													if (owner.selectConditionTree
															.getSelectedNodes().length > 0) {
														if (owner.selectConditionTree
																.getSelectedNodes()[0].parentId != 'normroot') {
															owner.selectConditionTree
																	.deleteChild(owner.selectConditionTree
																			.getSelectedNodes()[0].id);
															var childs = owner.selectConditionTree
																	.getChildNodes(owner.selectConditionTree
																			.getNodeById(owner.selectConditionTree
																					.getSelectedNodes()[0].parentId));
															if (childs.length == 0) {
																owner.selectConditionTree
																		.deleteChild(owner.selectConditionTree
																				.getSelectedNodes()[0].parentId);
															}
														} else {
															owner.selectConditionTree
																	.deleteChild(owner.selectConditionTree
																			.getSelectedNodes()[0].id);
														}
														owner
																.showExpressContent();
														HtmlUtil
																.getDom(owner.ids.normId).value = '';
														HtmlUtil
																.getDom(owner.ids.normType).value = "";

													} else {
														MsgUtil.error("错误提示",
																"请选择要删除的条件")
													}
												}
											} ]
										});
						this.selectConditionTree = this
								.create(
										"component.SimpleTree",
										{
											renderTo : this.ids.selectTreeDiv,
											children : [],
											rootId : 'normroot',// id不能变，后面要引用到
											rootText : '条件树',
											rootVisible : true,
											collapsible : false,
//											title : '条件树',
											widthPercent : 0.76,
											height : 165,
											fields : [ 'id', 'text', 'data' ],
											nodeClick : function() {
												if (this.data[0].id == 'normroot') {
													HtmlUtil
															.getDom(owner.ids.normId).value = '';
													HtmlUtil
															.getDom(owner.ids.normType).value = "";
												} else {
													HtmlUtil
															.getDom(owner.ids.normId).value = this.data[0].normId;
													HtmlUtil
															.getDom(owner.ids.normType).value = this.data[0].data.type;
												}
											}
										});

						// 条件表达式面板
//						this.showExpressPanel = this.create('component.Panel',
//								{
//									title : '条件表达式',
//									contentEl : this.ids.showConditonContent,
//									hasBackGroundColor : false,
//									height : 170,
//									widthPercent : 0.38,
//									autoScroll : true,
//									buttonInPanel : false,
//									renderTo : this.ids.aaa,
//									collapsible : false,
//									buttonInPanel : false,
//									html : ''
//								});

						this.create('component.Panel', {
							title : '条件输入区',
							contentEl : this.ids.conditionInputContentDiv,
							hasBackGroundColor : false,
							height : 240,
							widthPercent : 0.761,
							renderTo : this.ids.conditionInputDiv,
							buttonInPanel : false,
							tbar : [ {
								text : '增加条件',
								tooltip : '增加条件',
								iconCls : 'add',
								handler : function() {
									owner.createSingleNorm();
								}
							} ],
							buttons : [ {
								text : '保存',
								iconCls : 'save',
								handler : function() {
									owner.saveCreateEngine();
								}
							}, {
								text : '保存并发布',
								iconCls : 'save',
								handler : function() {
									owner.saveAndPublicEngine();
								}
							}, {
								text : '关闭窗口',
								iconCls : 'form-close',
								handler : function() {
									owner.parent.close();
								}
							} ]
						});
					},
					saveCreateEngine : function() {
						var strServId = 'engineService.createDesigningSearchEngine';
						this.saveEngine(strServId)
					},
					saveAndPublicEngine : function() {
						var strServId = 'engineService.createPublishedSearchEngine';
						this.saveEngine(strServId)
					},
					saveEngine : function(strServId) {
						var owner = this;
						var nodes = this.selectConditionTree.getChildNodes();
						var norm_len = nodes.length;
						var params = DataUtil.decode(DataUtil
								.getDataFromArea(owner.ids.baseInfoContentDiv));
						var eningeName = params.eningeName;

						var engineDesc = params.eningeDesc;
						var execyteDay = params.execyteDay;
						if (parseInt(norm_len) < 1) {
							MsgUtil.error('保存出错', '请至少增加一条你需要的条件作为查询依据.');
							return false;
						}
						// 验证名称
						if (DataUtil.isEmpty(eningeName)) {

							MsgUtil.error('验证出错', '请输入引擎名称.');

							return false;
						} else {

							if (eningeName.length > 30) {

								MsgUtil.error('验证出错', '引擎名称内容过长,请限制在 30 字符以内.');
								return false;
							}
						}

						// 验证描述内容
						if (DataUtil.isEmpty(engineDesc)) {

							MsgUtil.error('验证出错', '请输入引擎描述.');

							return false;
						}
						if (!DataUtil.isEmpty(engineDesc)
								&& engineDesc.length > 100) {

							MsgUtil.error('验证出错', '引擎描述内容过长,请控制在 100 字符以内.');

							return false;
						}
						if (parseInt(norm_len) > 12) {
							MsgUtil.error('错误提示', "每个查询引擎最多只能拥有12项条件,当前条件个数为"
									+ norm_len);
							return false;
						}
						var normData = [];

						DataUtil
								.each(
										nodes,
										function(node) {
											if (node.data.data.normid == 'PARTNUMBER') {
												node.data.data.fields[0].value += "' AND SALEOPPORTUNITY.LEADSTATUSENUM = '5001640004"
											}

											if (node.parentNode.data.id == 'normroot') {
												if (node.data.data.type == '1') {// 复合条件
													var newData = {};
													newData.type = node.data.data.type;
													newData.logicoperator = node.data.data.logicoperator;
													newData.caption = node.data.data.caption;
													newData.childNorm = [];
													var childNodes = owner.selectConditionTree
															.getChildNodes(node);
													DataUtil
															.each(
																	childNodes,
																	function(
																			childNode) {
																		newData.childNorm
																				.push(childNode.data.data);
																	});
													normData.push(newData);
												} else {
													normData
															.push(node.data.data)
												}

											}
										});
						var paramData = {
							engineName : eningeName,
							engineDesc : engineDesc,
							execyteDay : execyteDay,
							normData : normData
						}
						ConnectionUtil.ajaxReq({
							strServId : strServId,
							jsonData : paramData,
							callback : function(data) {
								owner.parent.close();
							}
						});
					},
					getCommonNodeId : function() {
						return "webfx-tree-object-" + this.idCounter++;
					},
					/**
					 * 点击左侧指标条件树后,展示对应指标详情
					 */
					buildDynamicFields : function(node) {
						HtmlUtil.getDom(this.ids.treeId).value = node.id;
						// 获取指标的展现方式
						if (node.showtype == "select"
								|| node.showtype == "selectonlyeq") {
							// 展现方式为select
							this.showSelectField(node);

						} else if (node.showtype == "selectTree") {
							this.showSelectTreeField(node);
						} else if (node.showtype == "input") {

							this.showInputField(node);

						} else if (node.showtype == "date") {

							this.showDateField(node);

						} else if (node.showtype == "fundstype") {

							this.showFundsDetailFields(node);

						} else if (node.showtype == "boolean") {

							this.showBooleanField(node);

						} else if (node.showtype == "tree") {
							this.showTreeField(node);
						}

						// 调用重置方法，初始化隐藏域的值
						this.clear();

					},

					/**
					 * 清空回传服务器的指标区域
					 * 
					 */
					clear : function() {

						HtmlUtil.getDom(this.ids.normType).value = "";
						HtmlUtil.getDom(this.ids.normId).value = "";
					},

					/**
					 * Boolean 类型
					 */
					showBooleanField : function(node) {
						var html_body = this.showCommonField(node);
						html_body += this._TD2_ + "<select id='"
								+ node.fields[0].id + "' " + "name='"
								+ node.fields[0].id + "'>";
						html_body += "<option  value='1'>是</option>";
						html_body += "<option  value='0'>否</option>";
						html_body += "</select>" + this._TD_ + this._TR2_;
						html_body += this.table_end;

						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);
					},

					/**
					 * 处理基金（明细）类型的展现
					 */
					showFundsDetailFields : function(node) {
						// 获取field节点
						var html_body = this.table_head
								+ this._TR_
								+ this._TD2_
								+ "<input id='normName' style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;' value='"
								+ node.fields[0].caption + "'>" + this._TD_
								+ this._TR2_;
						html_body += this._TR1_ + this._TD1_ + "字段名称："
								+ this._TD_;
						html_body += this._TD2_ + "<select name='"
								+ node.fields[0].id + "'>";
						if (node.fields[0].items.length > 0) {
							var itemlist = node.fields[0].items;
							var len = itemlist.length;
							for ( var i = 0; i < len; i++) {
								var itemNode = itemlist[i];
								// 选中孩子节点
								var itemname = itemNode.label;
								var itemvalue = itemNode.code;
								html_body += "<option   value='" + itemvalue
										+ "'>" + itemname + "</option>";
							}// end for
						}// end if
						html_body += "</select>" + this._TD_;
						html_body += this._TD1_ + "与前置条件的关系：" + this._TD_;
						html_body += this._TD2_ + this.createRelationSelect();
						html_body += this._TR2_ + this._TR1_;
						html_body += this._TD1_ + "操作符：" + this._TD_;
						html_body += this._TD2_ + this.createOperationSelect()
								+ this._TD_;
						html_body += this._TD1_ + "条件值：" + this._TD_;
						html_body += this._TD2_
								+ "<input style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;' name='"
								+ node.fields[0].id + "'>";
						html_body += "</input>" + this._TD_ + this._TR2_;
						html_body += this.table_end;

						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);
					},

					/**
					 * 日期类型
					 */
					showDateField : function(node) {
						var html_body = this.showCommonField(node);
						html_body += this._TD3_
								+ "<input id='"
								+ node.fields[0].id
								+ "' name='"
								+ node.fields[0].id
								+ "' style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;'>";

						html_body += "</input>" + this._TD_ + this._TR2_;
						html_body += this.table_end;

						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);

						// 初始化时间选择栏
						this.create('component.DateField', {
							renderTo : node.fields[0].id,
							configDomName : node.fields[0].id + 'datetime',
							format : 'Y-m-d'
						});
					},

					/**
					 * 下拉框选择类型
					 */
					showSelectField : function(node) {
						var html_body = this.showCommonField(node);
						html_body += this._TD2_ + "<select id= '"
								+ node.fields[0].id + "' " + "name='"
								+ node.fields[0].id + "'>";
						if (node.fields[0].items.length > 0) {
							var itemlist = node.fields[0].items;
							var len = itemlist.length;
							for ( var i = 0; i < len; i++) {
								var itemNode = itemlist[i];
								// 选中孩子节点
								var itemname = itemNode.label;
								var itemvalue = itemNode.code;
								html_body += "<option   value='" + itemvalue
										+ "'>" + itemname + "</option>";
							}// end for
						}// end if
						html_body += "</select>" + this._TD_ + this._TR2_;
						html_body += this.table_end;
						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);
					},
					/**
					 * 下拉框选择树类型
					 */
					showSelectTreeField : function(node) {
						var html_body = this.showCommonField(node);
						html_body += this._TD3_ + "<input id= '"
								+ node.fields[0].id + "' " + "name='"
								+ node.fields[0].id
								+ "' type='hidden' /><input id= '"
								+ node.fields[0].id
								+ "Text' type='hidden'><input type='text' id='"
								+ node.fields[0].id + "Tree' />";

						html_body += this._TD_ + this._TR2_;
						html_body += this.table_end;
						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);
						var rootCode;
						var rootDesc;
						if (!DataUtil.isEmpty(node.rootCode)) {
							var rootCodeStartStr = node.rootCode.substring(0,1);
							var rootCodeEndStr = node.rootCode
									.substring(node.rootCode.length-1);
							if (rootCodeStartStr == '$'
									&& rootCodeEndStr == '$') {
								var rootCodeName = node.rootCode.substring(1,
										node.rootCode.length - 1);
								rootCode = DataUtil.getUserInfo()[rootCodeName];
							} else {
								rootCode = node.rootCode;
							}
						}
						if (!DataUtil.isEmpty(node.rootDesc)) {
							var rootDescStartStr = node.rootDesc.substring(0,1);
							var rootDescEndStr = node.rootDesc
									.substring(node.rootDesc.length-1);
							if (rootDescStartStr == '$'
									&& rootDescEndStr == '$') {
								var rootDescName = node.rootDesc.substring(1,
										node.rootDesc.length - 1);
								rootDesc = DataUtil.getUserInfo()[rootDescName];
							} else {
								rootDesc = node.rootDesc;
							}
						}
						this.selectTree = this.createSelectTree({
							renderTo : node.fields[0].id + "Tree",
							strServId : node.strServId,
							codeDomId : node.fields[0].id,
							textDomId : node.fields[0].id + "Text",
							rootCode : rootCode,
							width : 200,
							rootDesc : rootDesc,
							onlyLeafSelect : node.onlyLeafSelect
						});
					},

					/**
					 * 文本类型
					 */
					showInputField : function(node) {
						var html_body = this.showCommonField(node);
						html_body += this._TD2_
								+ "<input id= '"
								+ node.fields[0].id
								+ "' "
								+ "name='"
								+ node.fields[0].id
								+ "' style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;'>";
						html_body += "</input>" + this._TD_ + this._TR2_;
						html_body += this.table_end;
						// 展示至 "conditionInfoDiv" 区域
						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);
					},
					/**
					 * 树类型
					 */
					showTreeField : function(node) {

						var owner = this;
						var html_body = this.showCommonField(node);

						html_body += this._TD2_
								+ "<input type='text' id='productName' style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;' readonly='readonly' />"
								+ "<input type='hidden' id='"
								+ node.fields[0].id
								+ "' name='"
								+ node.fields[0].id
								+ "' />"
								+ "<a id='selectProductLink' href='#'><font size='2'>请选择产品</font></a>"

						html_body += this._TD_ + this._TR2_;
						html_body += this.table_end;

						// 展示至 "conditionInfoDiv" 区域
						HtmlUtil
								.overwrite(this.ids.conditionContent, "", false);
						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.conditionContent), html_body);
						HtmlUtil.getDom('selectProductLink').onclick = function() {
							owner.createProductSelectWindow({
								title : '选择产品',
								checkbox : false,
								displayDomId : 'productName',
								hiddenDomId : 'PARTNUMBER'
							});
						};
					},

					/**
					 * 公共字段
					 */
					showCommonField : function(node) {
						var html_body = this.table_head
								+ this._TR_
								+ this._TD2_
								+ "<input id='normName' style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;' value='"
								+ node.fields[0].caption + "'>" + this._TD_
								+ this._TR2_;
						html_body += this._TR1_ + this._TD1_ + "字段名称："
								+ this._TD_;
						html_body += this._TD2_
								+ "<input id='conditionName' readonly='readonly' style='BORDER-RIGHT: #4d4a46 1px solid; BORDER-TOP: #4d4a46 1px solid; BORDER-LEFT: #4d4a46 1px solid; COLOR: windowtext; BORDER-BOTTOM: #4d4a46 1px solid; FONT-FAMILY: Verdana, Arial, Helvetica; BACKGROUND-COLOR: white;' value='"
								+ node.fields[0].caption + "'>" + this._TD_;
						html_body += this._TD1_ + "与前置条件的关系：" + this._TD_;
						html_body += this._TD2_ + this.createRelationSelect();
						html_body += this._TR2_ + this._TR1_;
						html_body += this._TD1_ + "操作符：" + this._TD_;

						// // 增加判断当选中的指标是持有产品时，只生成等于操作符
						if (node.normid == 'ProdHolding') {
							html_body += this._TD2_
									+ this.createOperationSelect("boolean")
									+ this._TD_;
						} else if (node.normid == 'PARTNUMBER') {
							html_body += this._TD2_
									+ this.createOperationSelect("boolean")
									+ this._TD_;
						} else {
							html_body += this._TD2_
									+ this.createOperationSelect(node.showtype)
									+ this._TD_;
						}

						html_body += this._TD1_ + "条件值：" + this._TD_;

						return html_body;
					},

					/**
					 * 建立关系,现阶段只支持为 "并且"
					 * 
					 */
					createRelationSelect : function() {

						var html_body = "<select id='logicrelation' name='logicrelation'>";
						html_body += "<option   value='"
								+ CodeStringDefinition.RLATIONA_CODE
								+ "'>并且</option>";
						// html_body+="<option value='9021100002'>或者</option>";
						html_body += "</select>";

						return html_body;
					},

					/**
					 * 根据机制的 showtype 映射操作符
					 * 
					 */
					createOperationSelect : function(type) {
						var html_body = "<select id='opration' name='opration'>";
						if (type == "select") {
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_GE
									+ "'>等于</option>";
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_NOT_GE
									+ "'>不等于</option>";
						} else if (type == "boolean" || type == "selectonlyeq") { // 增加对布尔型条件的处理
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_GE
									+ "'>等于</option>";
						} else {
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_GE
									+ "'>等于</option>";
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_GT_AND_GE
									+ "'>大于等于</option>";
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_LT_AND_GT
									+ "'>小于等于</option>";
							html_body += "<option   value='"
									+ CodeStringDefinition.LOGIC_EXP_NOT_GE
									+ "'>不等于</option>";
						}
						html_body += "</select>";

						return html_body;
					},
					/**
					 * 在 xmlDom 上增加简单机制
					 */
					createSingleNorm : function() {
						if (HtmlUtil.getDom(this.ids.treeId).value == "") {
							MsgUtil.error('', '请点击指标树型结构后定制指标');
							return false;
						}

						// 验证条件个数是否超过12个selectConditionTree
						var norm_len = this.selectConditionTree.getChildNodes().length;
						if (parseInt(norm_len) > 12) {
							MsgUtil.error('错误提示', '每个查询引擎最多只能拥有12项条件,当前条件个数为'
									+ norm_len);

							return false;
						}
						
						if (!DataUtil
								.isEmpty(HtmlUtil.getDom(this.ids.normId).value)
								&& this.selectConditionTree.getSelectedNodes().length > 0) {
							if (HtmlUtil.getDom(this.ids.normType).value == "0") {

								MsgUtil.error('错误提示', '不能在条件内嵌套条件');

								return false;
							}
						}

						// 在条件下面不能再添加条件或者条件包
						// 操作人员点击了某个条件或条件包时
						var node = this.indexTree.getNodeById(HtmlUtil
								.getDom(this.ids.treeId).value);

						// 保存节点前,先对输入域做验证
						if (!this.check(node))
							return false;
						// 在条件树型结构上增加条件节点
						var norms_id = this.addNorm(node, "0");
						// 获取指标的展现方式
						// 刷新条件表达式的内容
						this.showExpressContent();
					},
					/**
					 * 增加条件包
					 */
					createComplexNorm : function() {
						if (HtmlUtil.getDom(this.ids.treeId).value == "") {

							MsgUtil.error('错误提示', '请点击指标树型结构后定制指标');

							return false;
						}

						if (!DataUtil
								.isEmpty(HtmlUtil.getDom(this.ids.normId).value)
								&& this.selectConditionTree.getSelectedNodes().length > 0) {

							MsgUtil.error('错误提示', '不能在条件或条件包内嵌套条件包');

							return false;
						}

						// 验证条件个数是否超过12个
						var norm_len = this.selectConditionTree.getChildNodes().length;

						if (parseInt(norm_len) > 12) {

							MsgUtil.error('错误提示', "每个查询引擎最多只能拥有12项条件,当前条件个数为"
									+ norm_len);

							return false;
						}

						var node = this.indexTree.getNodeById(HtmlUtil
								.getDom(this.ids.treeId).value);
						// 保存节点前,先对输入域做验证
						if (!this.check(node))
							return false;
						// 在条件树上增加条件包
						this.addNorms(node, "1");
						// 在条件树型结构上增加条件节点
						// var norms_id=addNorm(node);
						// 获取指标的展现方式
						// if(node.getAttribute("showtype")=="select") {
						// 在xmlDom中增加一个norms元素
						// createNormsElement(node,norms_id,"0");
						// }

						// 刷新条件表达式的内容
						this.showExpressContent();
					},
					/**
					 * 检查值是否符合类型,如 int 必须为 1,2,3...
					 * 
					 */
					check : function(node) {
						// 取出leaf的id属性
						var id = node.data.fields[0].id;
						var field_type = node.data.fields[0].type;
						var obj = HtmlUtil.getDom(id);
						if ("datetime" == field_type) {
							obj = HtmlUtil.getDomByName(id + 'datetime');
							if (DataUtil.isEmpty(obj.value)
									|| obj.value == '请选择...') {
								MsgUtil.error('验证出错', '条件值不能为空');
								return false;
							}
						}
						// 验证非空
						if (obj.value == "") {
							MsgUtil.error('验证出错', '条件值不能为空');
							return false;
						}
						// 验证长度
						if (obj.value.length >30) {
							MsgUtil.error('验证出错', '条件值不能超过30个字符！');
							return false;
						}
						// 验证输入值得类型
						if (field_type == "integer") {
							if (!this.isNum(obj.value)) {
								MsgUtil.error('验证出错', '请输入数字型的条件值');
								return false;
							}
							//去掉数字前面的0
							obj.value = new Number(obj.value); 
						}
						// 输入域为decimal型
						if (field_type == "decimal") {
							if (!this.checkMoney(obj.value)) {
								MsgUtil.error('验证出错', '请输入正确的金额');
								return false;
							}
							//去掉数字前面的0
							obj.value = new Number(obj.value); 
//							alert(obj.value);
						}
						return true;
					},
					/**
					 * 检查金额类型
					 */
					checkMoney : function(money) {

						if (!/^\d+(\.\d+)?$/.test(money)) {
							return false;
						} else {
							return true;
						}
					},

					/**
					 * 判断是否是数字
					 * 
					 */
					isNum : function(strValue) {

						if (!/^\d+$/.test(strValue)) {
							return false;
						} else {
							return true;
						}
					},
					/**
					 * 增加简单机制
					 */
					addNorm : function(node, type) {
						var text = "";
						var logicoperator = HtmlUtil.getDom("logicrelation").value;
						// 判断是否是第一个节点，若不是，需要添加逻辑关系符号
						if (this.selectConditionTree.getChildNodes().length > 0) {
							var sel_value = HtmlUtil.getDom("logicrelation").options[HtmlUtil
									.getDom("logicrelation").selectedIndex].text;
							text = "（" + sel_value + "）";
						}
						// 在节点上增加表达式的内容
						for ( var i = 0; i < node.data.fields.length; i++) {
							if (i > 0) {
								text += " （并且） ";
							}
							text += this.genFieldExpressContent(
									node.data.fields[i], node.data.showtype);
						}

						var nodedata = {};
						nodedata.normid = node.data.normid;
						nodedata.logicoperator = HtmlUtil
								.getDom("logicrelation").value;
						nodedata.caption = HtmlUtil.getDom('normName').value;
						nodedata.type = type;
						var fields = [];
						for ( var i = 0; i < node.data.fields.length; i++) {
							var field = {};

							var operator = "";
							// 对于基金指标，需作特殊化处理.
							if (node.data.normid == "FundsCurAmtDetail"
									&& node.data.fields[i].type == "string") {
								// modify by huxb ,date 2007-03-31,add else if
								// condition.
								operator = CodeStringDefinition.LOGIC_EXP_GE;
							} else {
								operator = HtmlUtil.getDom("opration").value;
							}
							field.id = node.data.fields[i].id;
							field.type = node.data.fields[i].type;
							if ("datetime" == field.type) {
								field.value = HtmlUtil
										.getDomByName(node.data.fields[i].id
												+ 'datetime').value;
							} else {
								field.value = HtmlUtil
										.getDom(node.data.fields[i].id).value;
							}
							field.operator = operator;
							fields.push(field);
						}
						nodedata.fields = fields;

						if (DataUtil.isEmpty(
								HtmlUtil.getDom(this.ids.normId).value, false)
								|| this.selectConditionTree.getSelectedNodes().length == 0) {

							this.selectConditionTree.appendChild({
								id : this.getCommonNodeId(),
								text : text,
								leaf : true,
								data : nodedata
							});
						} else {
							var node = this.selectConditionTree
									.getSelectedNodes()[0];
							this.selectConditionTree.appendChild({
								id : this.getCommonNodeId(),
								text : text,
								leaf : true,
								data : nodedata
							}, node.id);
						}
					},
					/**
					 * 增加条件包
					 */
					addNorms : function(node, type) {
						var text = "{" + HtmlUtil.getDom("normName").value
								+ "}";
						var logicoperator = HtmlUtil.getDom("logicrelation").value;

						// 判断是否是第一个节点，若不是，需要添加逻辑关系符号
						if (this.selectConditionTree.getChildNodes().length > 0) {

							var sel_value_child = HtmlUtil
									.getDom("logicrelation").options[HtmlUtil
									.getDom("logicrelation").selectedIndex].text;
							text = "（" + sel_value_child + "）" + text;
						}

						// 在条件树上增加一个norm节点
						// var norm_text=node.getAttribute("caption");
						var norm_text = "";
						// 在节点上增加表达式的内容
						for ( var i = 0; i < node.data.fields.length; i++) {
							if (i > 0) {
								norm_text += " （并且） ";
							}
							norm_text += this.genFieldExpressContent(
									node.data.fields[i], node.data.showtype);
						}

						var nodedata = {};
						nodedata.normid = node.data.normid;
						nodedata.logicoperator = HtmlUtil
								.getDom("logicrelation").value;
						nodedata.caption = HtmlUtil.getDom('normName').value;
						nodedata.type = '0';
						var fields = [];
						for ( var i = 0; i < node.data.fields.length; i++) {
							var field = {};

							var operator = "";
							// 对于基金指标，需作特殊化处理.
							if (node.data.normid == "FundsCurAmtDetail"
									&& node.data.fields[i].type == "string") {
								// modify by huxb ,date 2007-03-31,add else if
								// condition.
								operator = CodeStringDefinition.LOGIC_EXP_GE;
							} else {
								operator = HtmlUtil.getDom("opration").value;
							}
							field.id = node.data.fields[i].id;
							field.type = node.data.fields[i].type;
							if ("datetime" == field.type) {
								field.value = HtmlUtil
										.getDomByName(node.data.fields[i].id
												+ 'datetime').value;
							} else {
								field.value = HtmlUtil
										.getDom(node.data.fields[i].id).value;
							}
							field.operator = operator;
							fields.push(field);
						}
						nodedata.fields = fields;
						this.selectConditionTree.appendChild({
							id : this.getCommonNodeId(),
							text : text,
							leaf : false,
							data : {
								type : '1',
								logicoperator : HtmlUtil
										.getDom("logicrelation").value,
								caption : HtmlUtil.getDom('normName').value
							},
							children : [ {
								id : this.getCommonNodeId(),
								text : norm_text,
								leaf : true,
								data : nodedata
							} ]
						});
					},
					/**
					 * 处理字段,生成业务表达式内容
					 * 
					 */
					genFieldExpressContent : function(fieldnode, type) {
						var id = fieldnode.id;
						// 对于enum类型（页面展现为下拉框）的field，其操作符号固定为=，其它类型需取其动态值
						var operator = "（等于）";
						// 获取操作符号
						if (type != "fundstype") {
							operator = "（"
									+ HtmlUtil.getDom("opration").options[HtmlUtil
											.getDom("opration").selectedIndex].text
									+ "）";
						} else if (type == "fundstype"
								&& fieldnode.type == "decimal") {
							// modify date:2007-03-19,增加对基金明细中现值字段操作符号的处理
							operator = "（"
									+ HtmlUtil.getDom("opration").options[HtmlUtil
											.getDom("opration").selectedIndex].text
									+ "）";
						}

						var objStr = HtmlUtil.getDom(id);
						var value = "";
						if (fieldnode.type == "enum"
								|| fieldnode.type == "boolean") {

							objStr = HtmlUtil.getDom(id).options[HtmlUtil
									.getDom(id).selectedIndex];

							var obj = objStr;

							value = obj.text;
						} else if ((type == "select" || type == "boolean")
								&& fieldnode.type == "string") {
							objStr = HtmlUtil.getDom(id).options[HtmlUtil
									.getDom(id).selectedIndex];
							var obj = objStr;

							value = obj.text;
						} else if (type == "selectTree") {
							value = this.selectTree.getDisplayValue()
						} else {
							// 增加一个判断用于处理基金明细的证卷代码
							if (type == "fundstype"
									&& fieldnode.type == "string") {
								// objStr="document.forms[0]."+id+".options(document.forms[0]."+id+".selectedIndex);";
								// var obj=eval(objStr);

								objStr = HtmlUtil.getDom(id).options[HtmlUtil
										.getDom(id).selectedIndex];
								var obj = objStr;

								value = obj.text;
							} else if (fieldnode.type == 'datetime') {
								value = HtmlUtil.getDomByName(id + 'datetime').value;
							} else {
								// var obj=eval(objStr);

								var obj = objStr;
								value = obj.value;
							}
						}
						var expStr = fieldnode.caption + " " + operator + " "
								+ value;
						return expStr;
					},

					/**
					 * 遍历条件树，显示条件树内容,用于增、修、删 条件树文档模型时,树同步展现最新内容
					 * 
					 */
					showExpressContent : function() {
						// 定义保存条件表达式内容的变量
						var expStr = "";
						var nodes = this.selectConditionTree.getChildNodes();
						for ( var i = 0; i < nodes.length; i++) {
							var node = nodes[i];
							var childNodes = this.selectConditionTree
									.getChildNodes(node);
							if (childNodes.length > 0) {// 该节点为组合节点
								expStr += node.data.text;
								expStr += "【";
								// 获取节点内容
								for ( var j = 0; j < childNodes.length; j++) {
									expStr += childNodes[j].data.text;
									expStr += '<br>';
								}// end for
								expStr += "】";
							} else if (node.parentNode.data.id == 'normroot') {// end
								// if
								expStr += node.data.text;
								expStr += '<br>';
							}// end else
						} // end for

						HtmlUtil.setText(HtmlUtil
								.getDom(this.ids.showConditonContent), expStr);
					}
				});