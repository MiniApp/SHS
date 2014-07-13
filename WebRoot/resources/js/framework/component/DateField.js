/**
 * DateField组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.DateField
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->width: 组件ID config->format 格式 config->value: 默认值
 *                config->renderTo: 渲染到的Dom的id config->disabled:是否禁用
 *                @example
 * 
 * ObjectUtil.create('component.DateField', {
					renderTo : this.ids.testDate,
					format : 'Y-m-d'
				});
 */
ObjectUtil.define("component.DateField", {
	extend : 'base.AbstractComponent',
	type : 'DateField',
	/**
	 * 要渲染到的Dom的Id
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 日期格式
	 * 
	 * @type String
	 */
	format : 'Y-m-d',
	/**
	 * 默认值
	 * 
	 * @type String
	 */
	value : null,
	/**
	 * 宽度
	 * 
	 * @type Number
	 */
	width : null,
	/**
	 * 是否禁用
	 * 
	 * @type Boolean
	 */
	disabled : false,
	/**
	 * 禁止选择的星期组成的数组，0-周日，1-周一， ...，6-周六
	 * 
	 * @type Array
	 */
	disabledDays : null,
	/**
	 * 允许选择的最小日期
	 * 
	 * @type String
	 */
	minValue : null,
	/**
	 * 允许选择的最大日期
	 * 
	 * @type String
	 */
	maxValue : null,
	/**
	 * 禁止选择的日期组成的数组
	 * 
	 * @type Array
	 */
	disabledDates : null,
	configDomName : null,
	/**
	 * 是否显示时间选择框
	 * 
	 * @type Boolean
	 */
	showTime : null,
	/**
	 * 是否是特殊日期控件:默认false
	 * true,可以只选择年月
	 * 其格式可以是：
	 * m/y|m/Y|m-y|m-Y|my|mY|y/m|Y/m|y-m|Y-m|ym|Ym
	 * @type Boolean
	 */
	special : null,
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
		if (Ext.isEmpty(this.renderTo)) {
			Ext.MessageBox.show({
						title : '参数错误',
						msg : '参数：renderTo必须传入值!',
						buttons : Ext.MessageBox.OK
					});
			return false;
		}
		return true;
	},
	/**
	 * 组件创建前处理
	 * 
	 * @Override
	 */
	beforeBuild : function() {
		var configDom = HtmlUtil.getDom(this.renderTo);
		if (!this.configDomName) {
			this.configDomName = configDom.name;
		}
		this.configDomClass = configDom.className;
		this.configDomTitle = configDom.title;
		var parentNode = configDom.parentNode;
		parentNode.removeChild(configDom);
		var renderDom = document.createElement("span");
		renderDom.id = this.renderTo;
		parentNode.appendChild(renderDom);
		if(Ext.isEmpty(this.special)){
			this.special = false;
		}
		return true;
	},
	/**
	 * 构建组件
	 * 
	 * @Override
	 */
	build : function() {
		if(this.special){
			this.extObject = Ext.create('ux.date.DateMonthField', {
					hiddenLabel : true,
					emptyText : '请选择...',
					format : this.format,
					name : this.configDomName,
					value : this.value,
					width : this.width,
					disabled : this.disabled,
					disabledDays : this.disabledDays,
					minValue : this.minValue,
					maxValue : this.maxValue,
					disabledDates : this.disabledDates
				});
		}else{
			this.extObject = Ext.create('ux.date.DateTimeField', {
					hiddenLabel : true,
					emptyText : '请选择...',
					format : this.format,
					name : this.configDomName,
					value : this.value,
					width : this.width,
					showTime : this.showTime,
					disabled : this.disabled,
					disabledDays : this.disabledDays,
					minValue : this.minValue,
					maxValue : this.maxValue,
					disabledDates : this.disabledDates
				});
		}
		this.extObject.render(this.renderTo);
		if (this.configDomTitle) {// 设置ext生成的input的title属性
			this.extObject.inputEl.dom.title = this.configDomTitle;
		}
		this.extObject.inputEl.dom.onblur = Ext.Function.bind(this.onblurValidateDate,this);// 设置失去焦点时验证录入的日期格式
		this.extObject.inputEl.dom.setAttribute("format",this.format)
		if (this.configDomClass) {// 为ext生成的input设置框架提供的验证样式
			this.extObject.inputEl.addCls(this.configDomClass);
		}
	},
	onblurValidateDate : function() {
		var errors = this.extObject.getErrors(this.extObject.inputEl.dom.value);
		if (errors != "") {
			MsgUtil.error("验证错误", this.configDomTitle + "输入日期格式错误:" + errors);
			this.extObject.inputEl.dom.value = "";
		}
	},
	/**
	 * 事件注册
	 * 
	 * @param event:事件类型
	 *            callback回调方法
	 * 
	 */
	on : function(event, callback) {
		this.extObject.on(event, callback);
	}

})