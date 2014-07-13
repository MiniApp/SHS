/**
 * EnumSelector组件 注意 1：配置参数中category,renderTo,disabled,selectedValue数组大小必须一致.
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-06-26
 * @class component.EnumSelector
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID(必填) config->category: 标准数据名称数组(必填)
 *                config->renderTo: 组件渲染的id数组 方位(必填) config->disabled: 是否可用数组
 *                config->selectedValue: 默认值数组 config->width: 组件宽度
 *                config->displayField: 显示字段 config->valueField: 值字段
 *                config->listeners: listeners事件
 * 
 * @example ObjectUtil.create("component.EnumSelector", { category :
 *          ['prodPbStateEnum','CUSTOMERLEVEL'], renderTo :
 *          [this.ids.productSearch_prodIsPublish,this.ids.productSearch_prodIsPublish2],
 *          id : ['productSearch_prodIsPublish','productSearch_prodIsPublish2'],
 *          selectedValue : ['PPSE000002','1001520019'] });
 */
Ext.define('component.EnumSelector', {
	extend : 'base.AbstractComponent',
	alias : 'widget.EnumSelector',
	type : 'EnumSelector',

	/**
	 * 服务ID
	 * 
	 * @type String
	 */
	strServId : 'labeledEnumWrapperService.getEnumsByCategory',
	/**
	 * 文本显示字段,默认label
	 * 
	 * @type String
	 */
	displayField : 'label',
	/**
	 * 值字段,默认code
	 * 
	 * @type String
	 */
	valueField : 'code',
	/**
	 * 组件宽度,默认150
	 * 
	 * @type Number
	 */
	width : 150,
	/**
	 * 标准数据名称数组
	 * 
	 * @type Array
	 */
	category : [],
	/**
	 * 排除的标准数据编码集合 如：[['PT0000001','PT00000002'],['PT0000001','PT00000002']]
	 * 
	 * @type
	 */
	excludedCodeList : [],
	/**
	 * 渲染ID数组
	 * 
	 * @type Array
	 */
	renderTo : [],
	/**
	 * 默认值数组
	 * 
	 * @type Array
	 */
	selectedValue : [],
	/**
	 * 是否禁用数组
	 * 
	 * @type Array
	 */
	disabled : [],
	/**
	 * ID数组
	 * 
	 * @type Array
	 */
	id : [],
	/**
	 * 是否显示"不限"选项，默认显示
	 * 
	 * @type boolean
	 */
	showDefault : true,
	/**
	 * 监听事件数组
	 * 
	 * @type Array
	 */
	listeners : [],
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
		if (this.renderTo.length <= 0 || this.category.length <= 0) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：category,renderTo必须传入值!'
			});
		}
		if (this.renderTo.length != this.category.length) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：category,renderTo大小必须一致!'
			});
		}
		if (this.selectedValue.length > 0
				&& this.renderTo.length != this.selectedValue.length) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：selectedValue必须与renderTo大小一致!'
			});
		}
		if (this.disabled.length > 0
				&& this.renderTo.length != this.disabled.length) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：disabled必须与renderTo大小一致!'
			});
		}
		if (DataUtil.isArray(this.id) && this.id.length > 0
				&& this.renderTo.length != this.id.length) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：id必须与renderTo大小一致!'
			});
		}
		if (this.listeners.length > 0
				&& this.renderTo.length != this.listeners.length) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：listeners必须与renderTo大小一致!'
			});
		}
		if (null != this.excludedCodeList
				&& !Ext.isArray(this.excludedCodeList)) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：excludedCodeList必须是数组'
			});
		} else if (null != this.excludedCodeList
				&& this.excludedCodeList.length > 0
				&& this.category.length != this.excludedCodeList.length) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：category必须与excludedCodeList大小一致!'
			});
		}
	},
	/**
	 * 组件创建前处理:解析并组装数据到数组
	 * 
	 * @Override
	 * @return {Boolean}
	 */
	beforeBuild : function() {
		this.inputData = this.populateArrayFromContent(this.category,
				this.excludedCodeList);
	},
	/**
	 * @Override
	 */
	build : function() {
		var owner = this;
		var config = this;
		var ajaxConfig = {
			strServId : this.strServId,
			submitWaitMessage : false,
			jsonData : Ext.encode(this.inputData),
			inDataClass : 'com.easy.common.helper.enums.SimpleLabeledEnum',
			callback : function(jsonData) {
				config['selectorContent'] = jsonData;
				owner.populateMultipleSelectorByJsonData(config);
				if (config['callback']) {
					config['callback']();
				}
			}
		}
		ConnectionUtil.ajaxReq(ajaxConfig);
	},
	/**
	 * 解析并组装数据到数组
	 * 
	 * @param {}
	 *            category
	 * @param {}
	 *            excludedCodeList 待去除的编码
	 */
	populateArrayFromContent : function(category, excludedCodeList) {
		var result = [];
		if (Ext.type(category) == 'string') {
			if (null != excludedCodeList
					&& Ext.type(excludedCodeList) == 'array'
					&& excludedCodeList.length > 0) {
				var codeList = [];
				for ( var j = 0; j < excludedCodeList.length; j++) {
					codeList[j] = excludedCodeList[j];
				}
				result.push({
					'category' : category,
					'excludedCodeList' : codeList
				});
			} else {
				result.push({
					'category' : category
				});
			}
		} else if (Ext.type(category) == 'array') {
			if (null != excludedCodeList
					&& Ext.type(excludedCodeList) == 'array'
					&& excludedCodeList.length > 0) {
				for ( var i = 0; i < category.length; i++) {
					var codeList = [];
					if (Ext.isArray(excludedCodeList[i])
							&& excludedCodeList[i].length > 0) {
						for ( var j = 0; j < excludedCodeList[i].length; j++) {
							codeList[j] = excludedCodeList[i][j];
						}
					}
					result.push({
						'category' : category[i],
						'excludedCodeList' : codeList
					});
				}
			} else {
				Ext.each(category, function(ob) {
					result.push({
						'category' : ob
					});
				});
			}
		} else {
			Ext.MessageBox.show({
				title : '参数错误',
				msg : '参数不是String或者array!',
				buttons : Ext.MessageBox.OK
			});
			return;
		}
		return result;
	},
	/**
	 * 根据数据组装多个下拉选择控件
	 * 
	 * @param {}
	 *            config
	 */
	populateMultipleSelectorByJsonData : function(config) {
		if (config['renderTo'] && config['selectorContent']) {
			var resultCategoryEnum;
			var renderTo = config['renderTo'];
			var selectedValue = config['selectedValue'];
			var disabled = config['disabled'];
			var listeners = config['listeners'];
			if (!config['id']) {
				ids = [];
				Ext.each(config['renderTo'], function(el) {
					ids.push(el.id);
				})
				config['id'] = ids;
			}
			resultCategoryEnum = this
					.extractJsonArrayByCategory(config['selectorContent']);
			var index = 0;
			var emptyText = '请选择';
			for ( var a in resultCategoryEnum) {
				// 标准数据 有父子关系，以下拉树展示
				if (a.lastIndexOf("Tree") > 0) {
					this.populateTreeEnumsSelector(config, index, a);
					index++;
				} else {
					var selectorContent = resultCategoryEnum[a];
					this.populateSingleSelectorByJsonData({
						jsonData : selectorContent,
						id : config['id'][index],
						selectedValue : selectedValue[index],
						disabled : disabled[index],
						renderTo : renderTo[index],
						emptyText : emptyText,
						width : config['width'],
						listeners : listeners[index++],
						showDefault : config['showDefault']

					});
				}
			}
		}
	},
	/**
	 * 从后台返回的JSON数据提取标准数据
	 * 
	 * @param {}
	 *            datas
	 * @return {}
	 */
	extractJsonArrayByCategory : function(datas) {
		var category;
		var enums;
		var results = {};
		if (Ext.type(datas) == 'array') {
			Ext.each(datas, function(data) {
				if (category != data['category']) {
					category = data['category'];
					enums = [];
					results[category] = enums;

				}
				enums.push({
					label : data['label'],
					code : data['code']
				});
			})
		}
		return results;
	},
	/**
	 * 根据JSON数据组装下拉控件
	 * 
	 * @param {}
	 *            config
	 */
	populateSingleSelectorByJsonData : function(config) {
		if (config['jsonData'] && config['renderTo']) {
			var renderTo = Ext.getDom(config['renderTo']);
			var width = config['width'] || this.width;
			var newJsonData = [];
			if (config['showDefault']) {
				newJsonData.push({
					code : 'unselectCode',
					label : '不限'
				});
			}

			DataUtil.each(config['jsonData'], function(item) {
				newJsonData.push(item);
			});
			config['jsonData'] = newJsonData;
			Ext.each(config['jsonData'], function(data) {
				if (!DataUtil.isEmpty(renderTo.options)) {
					var optionEl = document.createElement('option');
					renderTo.options.add(optionEl);
					optionEl.value = data['name'] || data['code'];
					if (optionEl.innerText != undefined) {
						optionEl.innerText = data['desc'] || data['label'];
					}
					if (optionEl.textContent != undefined) {
						optionEl.textContent = data['desc'] || data['label'];
					}
				}
			});
			if (!Ext.isEmpty(renderTo.name)) {
				config['hiddenName'] = renderTo.name;
				config['comboName'] = renderTo.name + "-display";
			}
			var validateCss = renderTo.className;
			var title = Ext.getDom(renderTo).title;
			var combox = Ext.create('Ext.form.field.ComboBox', {
				id : config['id'],
				width : width,
				typeAhead : true,
				editable : false,// 默认为true，false为禁止手写和联想功能
				triggerAction : "all", // 当editable为false时，该项必须设置为all，否则无法选择
				emptyText : config['emptyText'],
				transform : renderTo,
				displayField : this.displayField,
				valueField : this.valueField,
				disabled : config['disabled'],
				hiddenName : config['hiddenName'],
				name : config['comboName'],
				forceSelection : true,
				lastQuery : '',
				listeners : config['listeners']
			});
			// 设置初始值(如果有的话)
			if (config['selectedValue']) {
				combox.setValue(config['selectedValue']);
			} else {
				combox.setValue("unselectCode");
			}
			// 设置样式，主要用于自动验证
			if (combox.hiddenDataEl.first() && validateCss) {
				combox.hiddenDataEl.first().addCls(validateCss);
				combox.hiddenDataEl.first().set({
					"title" : title
				});
			}
		}
	},
	/**
	 * 组装标准数据下拉树
	 */
	populateTreeEnumsSelector : function(config, index, category) {
		var targetDom = Ext.getDom(config['renderTo'][index]);
		var name = targetDom.name;
		var tempDom = HtmlUtil.getDomByName(name);
		var className = Ext.isEmpty(tempDom.getAttribute('class')) ? ""
				: tempDom.getAttribute('class');
		var title = targetDom.title;
		var id = name + "hiddenId";
		var hiddenInput = "<input type='hidden' id='" + id + "' title='"
				+ title + "' class='" + className + "' name='" + name + "' />";
		// 插入隐藏元素到现有控件后面
		Ext.DomHelper.insertHtml('afterEnd', targetDom, hiddenInput);
		// 删除原有控件名称
		targetDom.name = "";
		ObjectUtil.create("component.TreeSelector", {
			renderTo : config['renderTo'][index],
			id : config['id'][index],
			strServId : 'labeledEnumWrapperService.getTreeEnumByCategory',
			codeDom : id,
			rootVisible : false,
			rootId : category,
			rootText : '行业类型',
			width : config['width'],
			parentObj : config['parentObj']
		});
	},
	/**
	 * 设置指定ID ComboBox对象值
	 * 
	 * @param {}
	 *            id 指定ID
	 * @param {}
	 *            value 值
	 */
	setValue : function(id, value) {
		var cmp = Ext.getCmp(id);
		if (cmp) {
			cmp.setValue(value);
		}
	},
	/**
	 * 返回指定ID ComboBox对象值
	 * 
	 * @param {}
	 *            id 指定ID
	 * @return ComboBox对象值
	 */
	getValue : function(id) {
		var cmp = Ext.getCmp(id);
		if (cmp) {
			return cmp.getValue();
		}
		return "";
	},
	/**
	 * 设置下拉框是否可选
	 * 
	 * @param {}
	 *            id 指定ID，disabled:true或者false
	 */
	setDisabled : function(id, disabled) {
		var cmp = Ext.getCmp(id);
		if (cmp) {
			cmp.setDisabled(disabled);
		}
	}

});