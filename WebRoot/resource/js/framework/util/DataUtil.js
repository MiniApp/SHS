/**
 * 数据处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class DataUtil
 */
ObjectUtil.define("DataUtil", {
	statics : {
		/*
		 * 判断对象是否为空,undefined,空字符,如果是数组长度是否为0
		 */
		isEmpty : function(v) {
			return Ext.isEmpty(v, false);
		},
		/*
		 * 是否是一个js对象
		 */
		isObject : function(value) {
			return Ext.isObject(value);
		},
		/*
		 * 是否是一个字符串
		 */
		isString : function(value) {
			return Ext.isString(value);
		},
		/*
		 * 是否是数组
		 */
		isArray : function(obj) {
			return Ext.isArray(obj);
		},
		/*
		 * 是否是函数
		 */
		isFunction : function(obj) {
			return Ext.isFunction(obj);
		},
		/*
		 * 遍历所传入的对象并执行对应的fn
		 */
		each : function(items, fn, scope) {
			return Ext.each(items, fn, scope);
		},
		/*
		 * 根据json对象的key将其对应的value赋值给areaId下面所有子节点中name属性等于key的元素
		 * 
		 */
		populateDataForArea : function(jsonData, areaId, parentObj) {
			if (!DataUtil.isEmpty(jsonData)
					&& !DataUtil.isEmpty(Ext.getDom(areaId))) {
				for (var atr in jsonData) {
					Ext.each(Ext.query('#' + areaId + ' [name=' + atr + ']'),
							function(el) {
								// span
								if (el.type == undefined && el.tagName != 'DIV') {
									if (Ext.type(jsonData[atr]) == "object") {
										Ext.DomHelper.overwrite(el, "", false);
										Ext.DomHelper.insertHtml('afterbegin',
												el, jsonData[atr].label);
									} else {
										Ext.DomHelper.overwrite(el, "", false);
										Ext.DomHelper.insertHtml('afterbegin',
												el, jsonData[atr]);
									}
								}
								// 对radion和checkbox做处理,对checkbox如果是后台是集合则无效
								else if (el.type == 'radio'
										|| el.type == 'checkbox') {
									var tmpName = el.name;
									Ext.each(Ext.query('#' + areaId
													+ ' input[name=' + tmpName
													+ ']'), function(rd) {
//												for (var a = 0; a < jsonData[atr].length; a++) {
													if (rd.value == jsonData[atr]) {
														rd.checked = true;
													}
//												}
											});
								}
								// 对text,textarea,hidden做处理
								else if (el.type == 'text'
										|| el.type == 'textarea'
										|| el.type == 'hidden') {
									if (Ext.type(jsonData[atr]) == "object") {
										el['value'] = jsonData[atr].label;
									} else {
										el['value'] = jsonData[atr];
									}
								}
								// 对select做处理
								else if (el.type == 'select-one') {
									if (!Ext.isEmpty(jsonData[atr])) {
										var category = jsonData[atr].category;
										var enumList = jsonData[atr].enumList;
										if (!Ext.isEmpty(enumList)) {
											var width = HtmlUtil.getDom(el.id)
													.getAttribute('width');
											var lastWidth = '';
											if (width) {
												var newWidth = width
														.match(/[0-9]/g);
												DataUtil.each(newWidth,
														function(item) {
															lastWidth = lastWidth
																	+ item;
														});
												lastWidth = parseInt(lastWidth);
											}
											// 标准数据 有父子关系，以下拉树展示
											if (category.lastIndexOf("Tree") > 0) {
												if (null == parentObj) {
													ExceptionUtil
															.throwFramworkException(
																	{
																		msg : '参数：parentObj必须传入'
																	});
												}
												var targetDom = HtmlUtil
														.getDom(el.id);
												var name = targetDom.name;
												var tempDom = HtmlUtil
														.getDomByName(name);
												var className = Ext
														.isEmpty(tempDom
																.getAttribute('class'))
														? ""
														: tempDom
																.getAttribute('class');
												var title = targetDom.title;
												var id = name + "hiddenId";
												var hiddenInput = "<input type='hidden' id='"
														+ id
														+ "' title='"
														+ title
														+ "' class='"
														+ className
														+ "' name='"
														+ name
														+ "' />";
												// 插入隐藏元素到现有控件后面
												Ext.DomHelper.insertHtml(
														'afterEnd', targetDom,
														hiddenInput);
												// 删除原有控件名称
												targetDom.name = "";
												ObjectUtil
														.create(
																"component.TreeSelector",
																{
																	renderTo : el.id,
																	id : el.id,
																	strServId : 'labeledEnumWrapperService.getTreeEnumByCategory',
																	codeDom : id,
																	rootId : category,
																	rootText : '行业类型',
																	width : lastWidth
																			|| 160,
																	rootVisible : false,
																	selectedValue : {
																		code : jsonData[atr].code,
																		text : jsonData[atr].label
																	},
																	disabled : el.disabled,
																	parentObj : parentObj
																});
											} else {
												ObjectUtil.create(
														"component.Selector", {
															id : el.id,
															renderTo : el.id,
															jsonData : enumList,
															width : lastWidth,
															selectedValue : jsonData[atr].code,
															disabled : el.disabled
														});
											}
										}
									}
								}
								
								
								
							})
				}
			}
		},
		/*
		 * 将一个区域内的数据封装成json格式的string
		 */
		getDataFromArea : function(areaId) {
			var resultJson = {};
			var tmpJson = {};
			var re = /(Enum|enum)\b/;
			if (Ext.get(areaId)) {
				if (!Validator.validateAll(areaId))// 验证录入类型
					return Constants.VALIDATION_FAIL;
				Ext.each(Ext.query('#' + areaId + ' *'), function(el) {
					
					if (el.value && el.name) {
						if (re.exec(el.name)) {// 处理下拉框
							if (el.name.indexOf('-display') == -1) {
								if (el.value != 'unselectCode') {
									tmpJson[el.name] = {
										'code' : el.value
									};
								}
							}
						} else {
							if (el.type) {
								if (el.type == 'radio') {
									if (el.checked)
										tmpJson[el.name] = el.value
								} else if (el.type == 'checkbox') {
									if (el.checked) {
										if (Ext.isEmpty(tmpJson[el.name]))
											tmpJson[el.name] = [];
										tmpJson[el.name].push(el.value);
									}
								} else {// 处理文本框
									var relpaceValue = el.value;
									// 对金额特殊处理 added by panxiaodong@2012/12/14
									if(!Ext.isEmpty(el.className) && el.className.indexOf('money') > -1 && relpaceValue) {
										relpaceValue = relpaceValue.replace(/\,/g, "");
									}
									
									if (relpaceValue) {
										relpaceValue = relpaceValue.replace(
												/\;/g, "；");
										relpaceValue = relpaceValue.replace(
												/\'/g, "‘");
									}
									if (el.name.indexOf('-display') == -1
											&& el.name.indexOf('-inputEl') == -1) {
										if (el.id.indexOf('-inputEl')) {// 下拉框
											if (el.value.indexOf("请选择") == -1
													&& el.value != 'unselectCode') {
												// 增加对多选下拉框的处理  begin added by xiaodong.pan@2013-08-28
												if (tmpJson[el.name]) {
													tmpJson[el.name] = tmpJson[el.name] + "," + relpaceValue;
												}
												else {
													tmpJson[el.name] = relpaceValue;
												}
												//  end added by xiaodong.pan@2013-08-28
											}
										} else {// 文本框
											if (el.value != 'unselectCode') {
												tmpJson[el.name] = relpaceValue;
											}
										}
									}
								}

							}
						}
						Ext.apply(resultJson, tmpJson);
					}
				})

			}
			return Ext.encode(resultJson);
		},
		/*
		 * 将obj转为string
		 */
		encode : function(obj) {
			return Ext.encode(obj)
		},
		/*
		 * 将string转为json
		 */
		decode : function(obj) {
			return Ext.decode(obj)
		},
		/*
		 * 取得用户信息
		 */
		getUserInfo : function() {
			if (!window.userObj) {
				ConnectionUtil.ajaxReq({
							strServId : 'employeeHelper.getEmployee',
							submitWaitMessage:false,
							async : false,
							callback : function(data) {
								window.userObj = data;
							}
						});
				if (!window.userObj) {
					return false;
				}
			}
			// clone the original userObj
			var copyObj = new Object();
			for (var el in window.userObj)
				copyObj[el] = userObj[el];
			return copyObj;
		},
		/*
		 * 取得用户菜单
		 */
		getUserMenu : function() {
			if (!window.userMenu) {
				ConnectionUtil.ajaxReq({
							strServId : 'resourceTreeService.getSubAllResourceControl',
							submitWaitMessage:false,
							async : false,
							callback : function(data) {
								window.userMenu = data;
							}
						});
			}
			if (!window.userMenu) {
				return false;
			}
			return window.userMenu;
		},
		/*
		 * 取得用户菜单
		 */
		getSystemConfig : function() {
			if (!window.systemConfig) {
				ConnectionUtil.ajaxReq({
							strServId : 'employeeSystemConfigHelper.getConfig',
							submitWaitMessage:false,
							async : false,
							callback : function(record) {
								if (null != record) {
									window.systemConfig = DataUtil
											.decode(record.config);
								}
							}
						});
			}
			return window.systemConfig;
		},
		/**
		 * 去掉字符串前后空格
		 * 
		 * @param {}
		 *            str
		 * @return {}
		 */
		trim : function(str) {
			return Ext.String.trim(str);
		}

	}
});