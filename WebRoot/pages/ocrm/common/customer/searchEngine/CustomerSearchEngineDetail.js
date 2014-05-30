ObjectUtil.define(
		"crm.pages.ocrm.common.customer.searchEngine.CustomerSearchEngineDetail",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/customer/searchEngine/CustomerSearchEngineDetail.html",
			idCounter : 0,//树id生成计数
			initData : function() {
				HtmlUtil.getDom(this.ids.eningeStatus).innerHTML = this.eningeStatus;
				HtmlUtil.getDom(this.ids.eningeName).innerHTML = this.eningeName;
				
				HtmlUtil.getDom(this.ids.eningeDesc).innerHTML = this.eningeDesc;

				if (!DataUtil.isEmpty(this.execyteDay)) {
					if (this.execyteDay.length == 1) {
						this.execyteDay = "0" + this.execyteDay;
					}
				}
				HtmlUtil.getDom(this.ids.execyteDay).innerHTML = this.execyteDay;
			},
			initCmp : function() {
				var owner = this;

				this.create('component.Panel', {
							title : '基本条件信息',
							contentEl : this.ids.baseInfoContentDiv,
							hasBackGroundColor : false,
							height : 90,
							widthPercent : 0.98,
							renderTo : this.ids.baseInfoDiv
						});
				this.create('component.Panel', {
							title : '条件树区域',
							contentEl : this.ids.condtionTreeContentDiv,
							hasBackGroundColor : false,
							height : 370,
							widthPercent : 0.98,
							autoScroll : true,
							renderTo : this.ids.condtionTreeDiv,
							buttonInPanel : false,
							buttons : [{
										text : '关闭窗口',
										iconCls : 'form-close',
										handler : function() {
											owner.parent.close();
										}
									}]
						});
				this.selectConditionTree =this.create(
						"component.SimpleTree", {
							renderTo : this.ids.selectTreeDiv,
							children : [],
							rootId : 'normroot',// id不能变，后面要引用到
							rootText : '条件树',
							rootVisible : true,
							collapsible : false,
//							title : '条件树',
							widthPercent : 0.97,
							height : 300,
							fields : ['id', 'text', 'data'],
							callback : function(tree) {// 组件渲染完后回调渲染数据
								owner.initConditionTreeData();
							}
						});
			},
			initConditionTreeData : function() {
				var owner = this;
				ConnectionUtil.ajaxReq({
					strServId : "engineService.getEngineConditionInfoById",
					jsonData : this.searchEngineId,
					callback : function(data) {
						var treeData = [];
						var children = [];
						var i = 0;
						var text = "";
						DataUtil.each(data, function(condition) {
							if (i != 0) {
								text = "（";
								if (condition.logicoperator == CodeStringDefinition.RLATIONA_CODE) {
									text += "并且";
								} else if (condition.logicoperator == CodeStringDefinition.RLATIONB_CODE) {
									text += "或者";
								}
								text += "）";
							}
							if (condition.type == '0') {// 简单条件
								children.push(owner
										.bulidSimpleCondtionTreeData(condition,
												text));
							} else {// 复合条件
								children.push(owner
										.bulidComplexCondtionTreeData(
												condition, text));
							}
							i++;
						});
						owner.selectConditionTree.appendChild(children);
						owner.showExpressContent();
					}
				});
			},
			bulidSimpleCondtionTreeData : function(condition, text) {
				var owner = this;
				var child = {};
				child.id = owner.getCommonNodeId();
				child.leaf = true;
				child.data = {
					normid : condition.normid,
					logicoperator : condition.logicoperator,
					caption : condition.caption,
					type : condition.type
				}
				var fields = [];
				var i = 0;
				DataUtil.each(condition.fields, function(field) {
							if (i > 0) {
								text += " （并且） ";
							}
							text += field.text;
							fields.push({
										id : field.id,
										type : field.type,
										value : field.value,
										operator : field.operator
									});
							i++;
						});

				child.text = text;
				child.data.fields = fields;
				return child;
			},
			bulidComplexCondtionTreeData : function(condition, text) {
				var owner = this;
				var child = {};
				child.id = owner.getCommonNodeId();
				child.text = text + '{' + condition.caption + '}';
				child.leaf = false;
				child.data = {
					logicoperator : condition.logicoperator,
					caption : condition.caption,
					type : condition.type
				};
				var childrenNorm = [];
				var i = 0;
				text = "";
				DataUtil.each(condition.childNorm, function(childs) {
							if (i > 0) {
								text += " （并且） ";
							}
							childrenNorm.push(owner
									.bulidSimpleCondtionTreeData(childs, text));
							i++;
						});
				child.children = childrenNorm;
				return child;
			},
			getOperatorDesc : function(operator) {
				if (operator == 'CUSSEET') {
					return '等于';
				} else if (operator == 'CUSSENET') {
					return '不等于';
				} else if (operator == 'CUSSEGTE') {
					return '大于等于';
				} else if (operator == 'CUSSELTE') {
					return '小于等于';
				}
			},

			getCommonNodeId : function() {
				return "webfx-tree-object-" + this.idCounter++;
			},
			/**
			 * 遍历条件树，显示条件树内容,用于增、修、删 条件树文档模型时,树同步展现最新内容
			 * 
			 */
			showExpressContent : function() {
				// 定义保存条件表达式内容的变量
				var expStr = "<br>";
				var nodes = this.selectConditionTree.getChildNodes();
				// alert(nodes.length);
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var childNodes = this.selectConditionTree
							.getChildNodes(node);
					if (childNodes.length > 0) {// 该节点为组合节点
						expStr += node.data.text;
						expStr += "【";
						// 获取节点内容
						for (var j = 0; j < childNodes.length; j++) {
							expStr += childNodes[j].data.text;
						}// end for
						expStr += "】";
					} else if (node.parentNode.data.id == 'normroot') {// end
						// if
						expStr += node.data.text + "</br><br>";
					}// end else
				} // end for
				expStr +="</br><br></br>"

				// 展现条件树上目前创建的内容
//				HtmlUtil.overwrite(this.ids.showConditonContent, "", false);
//				this.create('component.Panel', {
//					title : '条件表达式',
//					contentEl : this.ids.showConditonContent,
//					hasBackGroundColor : false,
//					height : 280,
//					widthPercent : 0.487,
//					autoScroll : true,
//					collapsible : false,
//					renderTo : this.ids.aaa,
//					html:expStr
//				});
				// Ext.getDom("express").innerText=expStr;
			}
		});