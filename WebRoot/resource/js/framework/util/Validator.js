/**
 * 验证处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class Validator
 */
ObjectUtil.define("Validator", {
	statics : {
		/*
		 * 验证方法,包括验证非空,长度,数字,邮件
		 */
		validateAll : function(areaId) {
			var emptyString = '请选择';
			var VALIDATION_TITLE = '页面验证出错';
			/**
			 * 最大长度调节参数,中文在不同数据库编码下长度与JS和java中取得的长度不一直：
			 * 数据库编码为gbk时中文及中文字符的长度与JS和java中取得的长度一直，都为2
			 * 数据库编码为utf-8时一个中文或中文字符在数据库中占3位
			 * 所以在数据库编码为utf-8时，需要此参数，值为0.66。
			 * 数据库编码为utf-8时，值为0
			 */
			var maxLengthQuotiety = 0;
			function getLen(val) {
				var len = 0;
				for (var i = 0; i < val.length; i++) {
					if (/[^\x00-\xff]/ig.test(val.substring(i,i+1))){// 全角
						len += 2;}//utf8中文取值3，gbk取值2
					else
						len += 1;
				}
				return len;

			}
			function validateEmpty(inputElement) {
				if (inputElement.tagName != "DIV") {
					// 非空验证 控件必须有name属性
					if (!DataUtil.isEmpty(inputElement.name)) {
						if (document.getElementsByName(inputElement.name).length > 1
								&& inputElement.type == 'radio') {
							var el;
							var result = false;
							for (var a = 0; a < document
									.getElementsByName(inputElement.name).length; a++) {
								el = document
										.getElementsByName(inputElement.name)[a]
								if (el.checked) {
									result = true;
									break;
								}
							}
							if (!result)
								MsgUtil
										.error(
												VALIDATION_TITLE,
												document
														.getElementsByName(inputElement.name)[0].title
														+ '必须选一个值');
							return result
						} else if (document
								.getElementsByName(inputElement.name).length > 1
								&& inputElement.type == 'checkbox') {
							var el;
							var result = false;
							for (var a = 0; a < document
									.getElementsByName(inputElement.name).length; a++) {
								el = document
										.getElementsByName(inputElement.name)[a]
								if (el.checked) {
									result = true;
									break;
								}
							}
							if (!result)
								MsgUtil
										.error(
												VALIDATION_TITLE,
												document
														.getElementsByName(inputElement.name)[0].title
														+ '必须选一个值');
							return result
						} else if (Ext.isEmpty(Ext.String
										.trim(inputElement.value), false)
								|| inputElement.value.indexOf(emptyString) > -1
								|| inputElement.value == 'unselectCode') {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '必须输入值');
							return false;
						}
					}
				}
				return true;
			};
			if (Ext.getDom(areaId)) {
				var elements = Ext.query("#" + areaId + " [class*=required]");
				var inputElement;
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!validateEmpty(inputElement))
						return false;
				}
				elements = Ext.query("#" + areaId + " [class*=noChinese]");
				var inputElement;
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					var length = getLen(inputElement.value);
					if (inputElement.value.length != length) {
						MsgUtil.error(VALIDATION_TITLE, inputElement.title
										+ '不能包含中文，以及中文字符');
						return false;

					}
				}
				elements = Ext.query("#" + areaId + " [class*=maxLength]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					var classNames = inputElement.className.split(' ');
					var maxLength;
					for (var b = 0; b < classNames.length; b++) {
						if (classNames[b].indexOf('maxLength') > -1) {
							maxLength = classNames[b].split('-')[1];
							maxLength = parseInt(maxLength - maxLength  * maxLengthQuotiety);
							break;
						}
					}
					var length = getLen(inputElement.value);
					if (length > maxLength) {
						if (inputElement.value.length != length) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '长度不能超过' + maxLength
											+ '位, 中文以及中文字符长度占2位');
						} else {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '长度不能超过' + maxLength+"位");
						}
						return false;
					}
				}
				elements = Ext.query("#" + areaId + " [class*=email]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^(.+)@(.+)$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '格式不符合邮件格式');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=mobile]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						// 手机号码11位手机号13或15/18开头的手机号
						if (!/^(13[0-9]|15[0-9]|18[0-9])\d{8}$/
								.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '手机号码不合法,请输入合法手机号码');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=phone]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						// 座机号码如：区号加－７到８位数字（如０２８-88888888，0832-88888888)
						if (!/^\d{3,4}-\d{7,8}(-\d{3,4})?$/
								.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '座机号码不合法,请输入合法座机号码');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=idCard]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						// 身份证正则表达式(18位)
						if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
								.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '身份证号码不合法,请输入合法身份证号码');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=onlyNum]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^[0-9]+$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '只能是数字');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=onlyNumOrLetter]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^[A-Za-z0-9]+$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '只能是字母或者数字');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=onlyChinese]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^[\u4e00-\u9fa5]+$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '只能输入中文');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=onlyLetterOrChinese]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^[\u4e00-\u9fa5|A-Za-z]+$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '只能输入中文或者字母');
							return false;
						}
					}
				}
				// 增加金额类限制
				elements = Ext.query("#" + areaId + " [class*=money]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^(([1-9][0-9]{0,2}(,\d{3})*)|(\d+))(\.\d{1,2})?$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '必须为正确的表示，如【1,234.56】或者【123.12】');
							return false;
						}
					}
					
					var classNames = inputElement.className.split(' ');
					var intPrecision;// 整数位数
					var decimalPrecision;// 小树位数
					for (var b = 0; b < classNames.length; b++) {
						if (classNames[b].indexOf('money') > -1) {
							intPrecision = classNames[b].split('-')[1];
							decimalPrecision = classNames[b].split('-')[2];
							break;
						}
					}
					var emps = inputElement.value.replace(/\,/g,'');
					var tmp = emps.split('.');
					if (tmp.length >= 1 && tmp[0].length > intPrecision) {
						MsgUtil.error(VALIDATION_TITLE, inputElement.title
										+ '整数位不能多于' + intPrecision);
						return false;
					} else if (tmp.length > 1
							&& tmp[1].length > decimalPrecision) {
						MsgUtil.error(VALIDATION_TITLE, inputElement.title
										+ '小数点位数不能多于' + decimalPrecision);
						return false;
					} else {
						if (tmp[0].length > 1 && tmp[0].indexOf('0') == 0) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '数字开始不能为0');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=legit]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^\d+\.?\d*$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '必须为正数');
							return false;
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=digit]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (!/^(\+|-)?\d+$/.test(inputElement.value)) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '必须为整数');
							return false;
						} else {
							if (inputElement.value.indexOf('0') == 0
									&& inputElement.value.length > 1) {
								MsgUtil.error(VALIDATION_TITLE,
										inputElement.title + '数字开始不能为0');
								return false;
							}
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=+digit]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (inputElement.value < 0) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '必须为正整数');
							return false;
						} else {
							if (inputElement.value.indexOf('0') == 0
									&& inputElement.value.length > 1) {
								MsgUtil.error(VALIDATION_TITLE,
										inputElement.title + '数字开始不能为0');
								return false;
							}
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=-digit]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					if (!Ext.isEmpty(inputElement.value)) {
						if (inputElement.value > 0) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '必须为负整数');
							return false;
						} else {
							if (inputElement.value.indexOf('0') == 0
									&& inputElement.value.length > 1) {
								MsgUtil.error(VALIDATION_TITLE,
										inputElement.title + '数字开始不能为0');
								return false;
							}
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=compareTo]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];
					var classNames = inputElement.className.split(' ');
					var comparePros;
					for (var b = 0; b < classNames.length; b++) {
						if (classNames[b].indexOf('compareTo') > -1) {
							comparePros = classNames[b].split('-');
							break;
						}
					}
					var inputName = comparePros[1];
					var operator = comparePros[2];
					var dataType = comparePros[3];
					var compareWithElements = Ext
							.query("#" + areaId + " [class*=compareWith-"
									+ inputElement.name + "]");
					var inputElement2 = "";
					for (var c = 0; c < compareWithElements.length; c++) {
						if (compareWithElements[c].name == inputName) {
							inputElement2 = compareWithElements[c];
							break;
						}
					}
					if (DataUtil.isEmpty(inputElement2)) {
						MsgUtil.error(VALIDATION_TITLE, "未找到要和 "
										+ inputElement.title + " 进行比较的输入元素:"
										+ inputName + " 请检查配置！");
						return false;
					}
					if (dataType != "date" && dataType != "number") {// 判断配置的比较数据类型是否正确
						MsgUtil.error(VALIDATION_TITLE, "传入的数据类型： " + dataType
										+ " 错误，只支持date和number类型的比较!");
						return false;
					}

					if (operator != 'gt' && operator != 'gt='
							&& operator != 'lt' && operator != 'lt='
							&& operator != '=') {// 判断配置的比较符号是否正确
						MsgUtil
								.error(
										VALIDATION_TITLE,
										"传入的比较操作符： "
												+ operator
												+ " 错误，只能传入【大于(gt)，小于(lt)，大于等于(gt=)，小于等于(lt=)，等于(=)】!");
						return false;
					}
					if (dataType == 'number') {// 验证数字
						if (!Ext.isEmpty(inputElement.value)
								&& !Ext.isEmpty(inputElement2.value)) {
							var value = inputElement.value;
							var value1 = inputElement2.value;
							if (!Ext.isNumber(parseFloat(value))) {
								MsgUtil.error(VALIDATION_TITLE,
										inputElement.title + ' 输入不为数字 ');
								return false;
							}
							if (!Ext.isNumber(parseFloat(value1))) {
								MsgUtil.error(VALIDATION_TITLE,
										inputElement2.title + ' 输入不为数字 ');
								return false;
							}
							if (operator == 'gt') {// 大于
								if (parseFloat(value) <= parseFloat(value1)) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须大于 '
													+ inputElement2.title);
									return false;
								}
							} else if (operator == 'gt=') {// 大于等于
								if (parseFloat(value) < parseFloat(value1)) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须大于等于 '
													+ inputElement2.title);
									return false;
								}
							} else if (operator == 'lt') {// 小于
								if (parseFloat(value) >= parseFloat(value1)) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须小于 '
													+ inputElement2.title);
									return false;
								}

							} else if (operator == 'lt=') {// 小于等于
								if (parseFloat(value) > parseFloat(value1)) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须小于等于 '
													+ inputElement2.title);
									return false;
								}

							} else if (operator == '=') {// 等于
								if (parseFloat(value) != parseFloat(value1)) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须等于 '
													+ inputElement2.title);
									return false;
								}

							}
						}

					} else if (dataType == 'date') {// 验证日期
						if (!Ext.isEmpty(inputElement.value)
								&& !Ext.isEmpty(inputElement2.value)) {
							var valueStr = inputElement.value;
							var valueStr1 = inputElement2.value;
							var value = Ext.Date.parse(valueStr, inputElement
											.getAttribute('format'));
							var value1 = Ext.Date.parse(valueStr1,
									inputElement2.getAttribute('format'));
							if (operator == 'gt') {// 大于
								if (value <= value1) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须大于 '
													+ inputElement2.title);
									return false;
								}
							} else if (operator == 'gt=') {// 大于等于
								if (value < value1) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须大于等于 '
													+ inputElement2.title);
									return false;
								}
							} else if (operator == 'lt') {// 小于
								if (value >= value1) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须小于 '
													+ inputElement2.title);
									return false;
								}

							} else if (operator == 'lt=') {// 小于等于
								if (value > value1) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须小于等于 '
													+ inputElement2.title);
									return false;
								}

							} else if (operator == '=') {// 等于
								if (valueStr != valueStr1) {
									MsgUtil.error(VALIDATION_TITLE,
											inputElement.title + ' 必须等于 '
													+ inputElement2.title);
									return false;
								}

							}
						}
					}
				}
				elements = Ext.query("#" + areaId + " [class*=decimal]");
				for (var a = 0; a < elements.length; a++) {
					inputElement = elements[a];

					var reg = /^-?\d+\.?\d*$/;
					if (!DataUtil.isEmpty(inputElement.value)
							&& !reg.test(inputElement.value)) {
						MsgUtil.error(VALIDATION_TITLE, inputElement.title
										+ '必须为数字');
						return false;
					}

					var classNames = inputElement.className.split(' ');
					var intPrecision;// 整数位数
					var decimalPrecision;// 小树位数
					for (var b = 0; b < classNames.length; b++) {
						if (classNames[b].indexOf('decimal') > -1) {
							intPrecision = classNames[b].split('-')[1];
							decimalPrecision = classNames[b].split('-')[2];
							break;
						}
					}

					// if (!Ext.isNumber(parseInt(inputElement.value))) {
					// MsgUtil.error(VALIDATION_TITLE, inputElement.title
					// + '必须为数字');
					// return false;
					// }
					var tmp = inputElement.value.split('.');
					if (tmp.length >= 1 && tmp[0].length > intPrecision) {
						MsgUtil.error(VALIDATION_TITLE, inputElement.title
										+ '整数位不能多于' + intPrecision);
						return false;
					} else if (tmp.length > 1
							&& tmp[1].length > decimalPrecision) {
						MsgUtil.error(VALIDATION_TITLE, inputElement.title
										+ '小数点位数不能多于' + decimalPrecision);
						return false;
					} else {
						if (tmp[0].length > 1 && tmp[0].indexOf('0') == 0) {
							MsgUtil.error(VALIDATION_TITLE, inputElement.title
											+ '数字开始不能为0');
							return false;
						}
					}
				}
				return true;
			}
		},
		/**
		 * 单独校验身份证
		 * @param {} value
		 * @return {Boolean}
		 */
		validateIdCard : function(value) {
			var VALIDATION_TITLE = '页面验证出错';
			if (!Ext.isEmpty(value)) {
				// 身份证正则表达式(18位)
				if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
						.test(value)) {
					MsgUtil.error(VALIDATION_TITLE, '身份证号码不合法,请输入合法身份证号码');
					return false;
				}
			}
			return true;
		}
	}
})