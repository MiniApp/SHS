/**
 * Selector组件 注意： 1：简单渲染页面已存在select控件,只需配置id,renderTo属性即可.
 * 2：如果已经有json格式下拉选项值的数组,则配置中displayField,valueField,fields要与下拉选项数组中值对象的字段相对应
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-06-25
 * @class component.Selector
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID(必填) config->renderTo: 渲染的id(必填)
 *                config->jsonData: json格式数组数据 config->fields: 读取字段数据
 *                config->displayField: 显示字段 config->valueField: 值字段
 *                config->width: 组件宽度 config->selectedValue: 默认值
 *                config->disabled: 是否可用 config->listeners: 监听事件对象
 * @example ObjectUtil.create("component.Selector", { id :
 *          'productSearch_prodIsPublish', renderTo :
 *          this.ids.productSearch_prodIsPublish, jsonData :
 *          [{"category":"prodPbStateEnum","code":"PPSE000001","enumList":[],"label":"已发布"},{"category":"prodPbStateEnum","code":"PPSE000002","enumList":[],"label":"未发布"}],
 *          listeners : {'select':function(){ alert(this.value); }}, callback :
 *          function(){ alert("组件渲染完成"); } });
 */
Ext.define('component.Selector', {
	extend : 'base.AbstractComponent',
	alias : 'widget.Selector',
	type : 'Selector',
	/**
	 * 组件是否被禁用,默认false
	 * 
	 * @type Boolean
	 */
	disabled : false,
	/**
	 * 组件渲染的id
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 默认选中值
	 * 
	 * @type String
	 */
	selectedValue : '',
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
	 * 是否允许多选，默认false
	 * 
	 * @type Boolean
	 */
	multiSelect : false,
	/**
	 * 是否允许显示请选择，默认true
	 * 
	 * @type Boolean
	 */
	isShowPleaseSelect : true,
	/**
	 * 组件值数组对象
	 * 
	 * @type Array
	 */
	jsonData : [],
	/**
	 * 组件值数组对象中显示字段,值字段数组,默认值：['code','label','name','desc']
	 * 
	 * @type Array
	 */
	fields : [ 'code', 'label', 'name', 'desc' ],
	/**
	 * 未选中时显示的值,默认 请选择
	 * 
	 * @type String
	 */
	emptyText : '请选择',
	/**
	 * 组件宽度,默认150
	 * 
	 * @type Number
	 */
	width : 150,
	/**
	 * 监听事件对象
	 * 
	 * @type Object
	 */
	listeners : {},
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
		if (Ext.isEmpty(this.renderTo)) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：renderTo必须传入值!'
			});
		}
		if (Ext.isEmpty(this.jsonData) || this.jsonData.length <= 0) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：jsonData必须传入值!'
			});
		}
	},
	/**
	 * 组件创建前处理
	 * 
	 * @Override
	 * @return {Boolean}
	 */
	beforeBuild : function() {
		if (!Ext.isEmpty(this.jsonData) && Ext.isArray(this.jsonData)) {
			//无需请选择默认选项 remove by xiaodong.pan@2013-08-28
			var newJsonData=[];
			if (!this.multiSelect && this.isShowPleaseSelect) {
				newJsonData.push({
					code : 'unselectCode',
					label : '请选择...'
				});
			}
			DataUtil.each(this.jsonData, function(item) {
				newJsonData.push(item);
			});
			this.jsonData = newJsonData;
			this.store = Ext.create('Ext.data.Store', {
				fields : this.fields,
				data : this.jsonData
			});
		}
		var targetDom = Ext.getDom(this.renderTo);
		if (!Ext.isEmpty(targetDom.name)) {
			this.hiddenName = targetDom.name;
			this.comboName = targetDom.name + "-display";
		}
	},
	/**
	 * 构建组件
	 * 
	 * @Override
	 */
	build : function() {
		var validateCss = Ext.getDom(this.renderTo).className;
		var title = Ext.getDom(this.renderTo).title;
		var combox = Ext.create('Ext.form.field.ComboBox', {
			id : this.id,
			width : this.width,
			store : this.store,
			name : this.comboName,
			hiddenName : this.hiddenName,
			displayField : this.displayField,
			multiSelect : this.multiSelect,// 多选
			valueField : this.valueField,
			typeAhead : true,
			editable : false,// 默认为true，false为禁止手写和联想功能
			triggerAction : "all", // 当editable为false时，该项必须设置为all，否则无法选择
			emptyText : this.emptyText,
			transform : this.renderTo,
			disabled : this.disabled,
			forceSelection : true,
			listeners : this.listeners
		});
		// 设置初始值(如果有的话)
		if (this.selectedValue) {
			combox.setValue(this.selectedValue);
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
		this.extObject = combox;
	},
	/**
	 * 设置值
	 * 
	 * @param {}
	 *            value 值
	 */
	setValue : function(value) {
		this.extObject.setValue(value);
	},
	/**
	 * 获取选择值
	 * 
	 * @param {}
	 *            value 值
	 */
	getValue : function() {
		return this.extObject.getValue();
	},
	/**
	 * 重新加载值
	 * 
	 * @param {}
	 *            data
	 */
	reload : function(data) {
		this.setValue('');
		this.store.loadData(data);
	},
	/**
	 * 设置下拉框是否可选
	 * 
	 * @param {}
	 *            disabled:true或者false
	 */
	setDisabled : function(disabled) {
		this.extObject.setDisabled(disabled);
	}
});