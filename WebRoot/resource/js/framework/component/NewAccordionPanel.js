Ext
		.define(
				'component.NewAccordionPanel',
				{
					extend : 'base.AbstractComponent',
					type : 'NewAccordionPanel',
					/**
					 * panel对象数组
					 * 
					 * @type Array
					 */
					items : [],
					/**
					 * 组件渲染ID(必填)
					 * 
					 * @type String
					 */
					renderTo : null,
					/**
					 * 宽度,默认NULL,自适应宽度
					 * 
					 * @type Number
					 */
					width : null,
					/**
					 * 高度,默认300
					 * 
					 * @type Number
					 */
					height : 300,
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
						if (this.id == 'AbstractComponent') {
							ExceptionUtil.throwFramworkException({
								msg : '参数：id必须传入值!'
							});
						}
						// if (Ext.isEmpty(this.renderTo)) {
						// ExceptionUtil.throwFramworkException({
						// msg : '参数：renderTo必须传入值!'
						// });
						// }
						// if (this.items.length <= 0) {
						// ExceptionUtil.throwFramworkException({
						// msg : '参数：items必须传入值!'
						// });
						// }
					},
					/**
					 * 组件创建前处理
					 * 
					 * @Override
					 * @return {Boolean}
					 */
					beforeBuild : function() {
					},
					/**
					 * 构建组件
					 * 
					 * @Override
					 */
					build : function() {
						var html = [];
						html.push("<div id='" + this.id
								+ "_Accordion' style='width: 100%'>");
						var config;
						var i = 0;
						Ext
								.each(
										this.items,
										function(item) {
											if (i == 0) {
												html
														.push("<div id='"
																+ item.id
																+ "-header' class='accordion_headings selected'><img id='"
																+ item.id
																+ "_accoimg' src='/ocrmweb/resources/images/expand_acco.jpg'/>&nbsp;&nbsp;"
																+ item.title
																+ "</div>");
											} else {
												html
														.push("<div id='"
																+ item.id
																+ "-header' class='accordion_headings'><img id='"
																+ item.id
																+ "_accoimg' src='/ocrmweb/resources/images/collspan_acco.jpg'/>&nbsp;&nbsp;"
																+ item.title
																+ "</div>");
											}
											html
													.push("<div id='"
															+ item.id
															+ "-content'><div class='accordion_child'><ul>");
											var j = 0;
											Ext
													.each(
															item.child,
															function(child) {
																config = {
																	title : child['text'],
																	id : child['id'],
																	className : child['nameSpace']
																			+ '.'
																			+ child['className']
																}
																var text = child['text'];
																if (child['text'].length > 10) {
																	text = child['text']
																			.substring(
																					0,
																					10)
																			+ "...";
																}
																html
																		.push("<li><img src='/ocrmweb/resources/images/leaf_accon.gif' /><font title='"
																				+ child['text']
																				+ "' id='"
																				+ item.id
																				+ "_"
																				+ j
																				+ "_font'onmousemove='this.style.color=\"red\"' "
																				+ "onmouseout='var objecs=ObjectMgrUtil.get(\"selectId\");"
																				+ "if(objecs){if(objecs.value.id!=this.id){this.style.color=\"#519CE0\"};}else{this.style.color=\"#519CE0\"};' onclick='function cgbg(item){"
																				+ "var objecs=ObjectMgrUtil.get(\"selectId\");"
																				+ "if(objecs){"
																				+ "objecs.value.style.color=\"#519CE0\";"
																				+ "ObjectMgrUtil.register({id:\"selectId\",value:item});"
																				+ "}else{ObjectMgrUtil.register({id:\"selectId\",value:item});"
																				+ "};"
																				+ "item.style.color=\"red\";"
																				+ "BusinessUtil.quikNavigMenuClickForAccordin(\""
																				+ escape(DataUtil
																						.encode(config))
																				+ "\");};cgbg(this);' color='#519CE0'>"
																				+ text
																				+ "</font></li><hr  style='color: #EFEFEF;height:1px;'>");
																j++;
															});
											html.push("</ul></div></div>");

											i++;
										});
						html.push("</div>");
						HtmlUtil.getDom(this.renderTo).innerHTML = html
								.join("").toString();
						this.extObject = new Accordian(
								this.id + '_Accordion',
								5,
								function(item) {
									var h = item.id;
									var imgId = h.substr(0, h.indexOf('-'))
											+ "_accoimg";
									var imgObj = HtmlUtil.getDom(imgId);
									var objecs = ObjectMgrUtil
											.get("lastAccoImg");
									if (objecs) {
										objecs.value.src = "/ocrmweb/resources/images/collspan_acco.jpg";
										ObjectMgrUtil.register({
											id : "lastAccoImg",
											value : imgObj
										});
									} else {
										ObjectMgrUtil.register({
											id : "lastAccoImg",
											value : imgObj
										});
									}
									imgObj.src = "/ocrmweb/resources/images/expand_acco.jpg";
								});
					}
				});