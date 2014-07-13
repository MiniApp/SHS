/**
 * CheckboxRadioField组件
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-08-02
 * @class component.CheckboxRadioField
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object}
 *          @example
 *          var compRadio = this.create("component.CheckboxRadioField", {
							renderTo : this.ids.radioBox,
							name:'test',
							fieldType:'checkbox',
							disabled : false,
							fieldLabel: '测试测试',
					        labelWidth : 100,
							checkedValue:[2],
							items :[{label:'测试1',value:1,config:{point:10}},{label:'测试2',value:2,config:{point:10}},{label:'测试3',value:3,config:{point:10}}],
							id : 'checkboxRadioField',
							itemClick : function(){
								alert(this.toSource());
							}
						});
					alert("设置值");
					compRadio.setValue(1);
 */
Ext.define('component.CheckboxRadioField', {
	extend : 'base.AbstractComponent',
	alias : 'widget.CheckboxRadioField',
	type : 'CheckboxRadioField',
	/**
	 * 组件是否被禁用,默认false
	 * 
	 * @type Boolean
	 */
	disabled : false,
	/**
	 * 组件渲染的id(必输)
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 左右排版,默认true,否则是上下排版
	 * 左右排版：标题和选项左右排列
	 * 上下排版：标题和选项上下排列
	 * @type Boolean
	 */
	isLeftRight : true,
	/**
	 * 是否有背景颜色,默认true
	 * @type Boolean
	 */
	frame : true,
	/**
	 * 控件名称(必输)
	 * 
	 * @type String
	 */
	name : '',
	/**
	 * 一行显示多少，默认值:3
	 * 
	 * @type Number
	 */
	columns : 3,
	/**
	 * 数据项(必输)
	 * 格式：[{label:'测试1',value:1,config:{}},{label:'测试2',value:2,config:{}},{label:'测试3',value:3,config:{}}]
	 * 
	 * @type Array
	 */
	items : null,
	/**
	 * 默认选中值数组
	 * 
	 * @type Array
	 */
	checkedValue : null,
	/**
	 * 控件类型：值必须是radio,checkbox之一,默认checkbox
	 * 
	 * @type String
	 */
	fieldType : 'checkbox',
	/**
	 * 选项标签
	 * 
	 * @type String
	 */
	fieldLabel : '',
	/**
	 * 标签宽度,默认100
	 * 
	 * @type Number
	 */
	labelWidth : 100,
	/**
	 * 每列宽度,支持数字和百分比
	 * 
	 * @type String
	 */
	columnWidth : '100%',
	/**
	 * 依次是上右下左
	 * 
	 * @type String
	 */
	columnMargin : '2 2 2 2',
	/**
	 * 点击事件,作用域为当前点击项值
	 */
	itemClick : Ext.emptyFn(),
	/**
	 * ID,值对照数组
	 * 
	 * @type Array
	 * @private
	 */
	_idToValueArray : null,
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
		if (Ext.isEmpty(this.name)) {
			ExceptionUtil.throwFramworkException({
						msg : '参数：name必须传入值!'
					});
		}
		if (Ext.isEmpty(this.items) || this.items.length == 0) {
			ExceptionUtil.throwFramworkException({
						msg : '参数：items必须传入值!'
					});
		}
		if (Ext.isEmpty(this.fieldType)
				|| (this.fieldType != 'radio' && this.fieldType != 'checkbox')) {
			ExceptionUtil.throwFramworkException({
						msg : '参数：fieldType必须传入值,且必须是radio,checkbox之一!'
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
		this._idToValueArray = [];
		this.newItems = this.populateItems(this.items);
		if(this.isLeftRight){//如果是左右排版
			this.containerItems = [{
						layout : {
							type : 'table',
							columns : this.columns
						},
						defaults : {
							margin : this.columnMargin
						},
						items : this.newItems,
						margin : '3 0 3 30'
					}];
			this.containerFieldLabel = this.fieldLabel;
		}else{//上下排版
			this.containerItems = [{
						xtype : 'label',
						html : this.fieldLabel,
						margin : '5 0 5 10'
					}, {
						layout : {
							type : 'table',
							columns : this.columns
						},
						defaults : {
							margin : this.columnMargin
						},
						items : this.newItems,
						margin : '3 0 3 30'
					}];
			this.containerFieldLabel = "";
		}
	},
	/**
	 * 构建组件
	 * 
	 * @Override
	 */
	build : function() {
		var radioBox = Ext.create('Ext.form.FieldContainer', {
					id : this.id,
					disabled : this.disabled,
					renderTo : this.renderTo,
					fieldLabel : this.containerFieldLabel,
					labelWidth : this.labelWidth,
					defaults : {
									bodyStyle : 'border-width: 0px;',
									baseCls : this.frame
										? 'checkboxRadioFrameTrueItems'
										: 'checkboxRadioFrameFalseItems'
								},
					items : this.containerItems
				})
		this.extObject = radioBox;
	},
	/**
	 * 绑定事件
	 * 
	 * @Override
	 */
	afterBuild : function() {
		this.bindFunction();
	},
	/**
	 * 设置值
	 * 
	 * @param {}
	 *            values
	 * @public
	 */
	setValue : function(values) {
		var me = this;
		if (!Ext.isEmpty(values)) {
			if (Ext.isArray(values)) {
				Ext.each(values, function(v) {
							me.checkedItem(v);
						});
			} else {
				me.checkedItem(values);
			}
		}
	},
	/**
	 * 取得控件选中的值,以","号分隔
	 * 
	 * @return {}
	 * @public
	 */
	getValue : function() {
		var values = [];
		Ext.each(this._idToValueArray, function(item) {
					if (item.value.checked) {
						values.push(item.value.value);
					}
				});
		return values.join(",");
	},
	/**
	 * 设置控件是否可用,true/false
	 * @param disabled
	 */
	setDisabled : function(disabled){
		this.extObject.setDisabled(disabled);
		Ext.each(this._idToValueArray, function(item) {
						Ext.getDom(item.id).disabled = disabled;
					});
	},
	/**
	 * 重新加载数据,目前无需求暂不实现
	 * 
	 * @param {}
	 *            items
	 * 
	 */
	reload : function(items) {
		// this._idToValueArray = [];
		// this.items = items;
		// Ext.DomHelper.overwrite(this.id, "", true);
	},
	/**
	 * 选中对应值选项
	 * 
	 * @param {}
	 *            v
	 * @private
	 */
	checkedItem : function(v) {
		var me = this;
		if (!Ext.isEmpty(v)) {
			Ext.each(this._idToValueArray, function(item) {
						if (v == item.value.value) {
							Ext.getDom(item.id).checked = true;
							me.changeState(item.value, true);
						}
					});
		}
	},
	/**
	 * 绑定事件
	 * 
	 * @private
	 */
	bindFunction : function() {
		var me = this;
		Ext.each(this._idToValueArray, function(item) {
			        var scope = {itemObj : item.value,curCmp : me};
					Ext.get(item.id).on('click', Ext.Function.bind(me.click,scope));
					if (Ext.isFunction(me.itemClick)) {
						Ext.get(item.id).on('click',
								Ext.Function.bind(me.itemClick,item.value));
					}
				});

	},
	/**
	 * 绑定click事件,改变当前选项状态
	 * 
	 * @private
	 */
	click : function() {
		var owner = this;
		if(this.curCmp.fieldType == 'radio'){
			Ext.each(this.curCmp._idToValueArray, function(item) {
						Ext.apply(item.value, {
								checked : false
							});
					});
		}
		Ext.apply(this.itemObj, {
					checked : Ext.getDom(this.itemObj.id).checked
				});
		
	},
	/**
	 * 改变当前选项状态
	 * 
	 * @param {}
	 *            item 当前选项
	 * @param {}
	 *            state 状态
	 * @private
	 */
	changeState : function(item, state) {
		Ext.apply(item, {
					checked : state
				});
	},
	/**
	 * 检查值是否被选中
	 * 
	 * @param {}
	 *            value 待检查值
	 * @return {}
	 * @private
	 */
	contains : function(value) {
		var contains = false;
		Ext.each(this.checkedValue, function(checkedValue) {
					if (value == checkedValue) {
						contains = true;
					}
				});
		return contains;
	},
	/**
	 * 将items数据填充到模板
	 * 
	 * @param {}
	 *            items 页面属相
	 * @return {} 组装好的数组
	 * @private
	 */
	populateItems : function(items) {
		var me = this;
		var t = new Ext.Template('<div style="width:{width}" ><input id={id} type="{type}" class="{validateclass}" title="{title}" name="{name}" value="{value}" {checked} {disabled} /><label>{label}</label></div>');
		var tempItems = [];
		var i = 0;
		var tempValue = {};
		var validateClass = Ext.getDom(this.renderTo).getAttribute('class');
		var title = Ext.getDom(this.renderTo).title;
		Ext.each(items, function(item) {
					tempValue = {
						width : me.columnWidth,
						id : (me.name + "-" + i++),
						type : me.fieldType,
						name : me.name,
						value : item.value,
						label : item.label,
						config : item.config,
						checked : (me.contains(item.value) ? "checked" : ''),
						disabled : (me.disabled ? "disabled" : ''),
						validateclass : validateClass,
						title : title
					};
					me._idToValueArray.push({
								id : tempValue.id,
								value : tempValue
							});
					tempItems.push({
								frame : me.frame,
								baseCls : me.frame
										? 'checkboxRadioFrameTrueItems'
										: 'checkboxRadioFrameFalseItems',
								html : t.apply(tempValue)
							});
				});
		return tempItems;
	}
});