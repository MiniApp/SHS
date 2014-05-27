/**
 * TreeSelector组件
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-06-27
 * @class component.TreeSelector
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id:组件ID(必填) config->renderTo:下拉选择框渲染DIV(必填)
 *                config->strServId:服务ID(必填) config->codeDom:选择后将值赋予该控件
 *                config->textDom:选择后将文本赋予该控件 config->rootId:树根节点(必填)
 *                config->paramStr:参数 config->rootText:根节点名称(必填)
 *                config->width:下拉宽度 config->comBoxTreeDiv:下拉树渲染DIV(必填)
 *                config->comBoxTreeDivId:下拉树ID(必填)
 * 
 * @example
 * 
 * ObjectUtil.create("component.TreeSelector", { renderTo :
 * 'productTypeComboxTree', id :'extProductTypeTree', strServId :
 * 'ptTypeService.getProdTypeChildrenNodesByParentNode', codeDom :
 * HtmlUtil.getDom(this.ids.productSearch_productType), rootId : '000000',
 * rootText : '产品分类', width : 200, parentObj : this });
 */
Ext.define('component.TreeSelector', {
	extend : 'base.AbstractComponent',
	alias : 'widget.TreeSelector',
	type : 'TreeSelector',
	/**
	 * comBoxTreeDiv 下拉选择框渲染DIV
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 禁用时样式
	 * 
	 * @type String
	 */
	disabledCls : 'x-item-disabled',
	/**
	 * 组件是否被禁用,默认false
	 * 
	 * @type Boolean
	 */
	disabled : false,
	/**
	 * 组件宽度
	 * 
	 * @type Number
	 */
	width : 150,
	/**
	 * 选择后将值赋予该控件
	 * 
	 * @type String
	 */
	codeDom : '',
	/**
	 * 选择后将文本赋予该控件
	 * 
	 * @type String
	 */
	textDom : '',
	/**
	 * 根节点名称
	 * 
	 * @type String
	 */
	rootText : '',
	/**
	 * 根节点id
	 * 
	 * @type String
	 */
	rootId : '',
	/**
	 * 默认选中值对象 格式：{code:'T0001',text:'测试'}
	 * 
	 * @type String
	 */
	selectedValue : null,
	/**
	 * 紧叶子节点可选
	 * 
	 * @type Boolean
	 */
	onlyLeafSelect : true,
	/**
	 * 监听事件对象
	 * 
	 * @type Object
	 */
	listeners : {},
	/**
	 * 是否允许多选,默认false
	 * 
	 * @type Boolean
	 */
	multiple : false,
	/**
	 * 扩展数据读取字段
	 * 
	 * @type Array
	 */
	expandFields : null,
	/**
	 * 返回节点ID,字段对象集合 格式:[{'domId':this.ids.domId,'field':'mark'}]
	 * 
	 * @type Array
	 */
	domIdFieldsMapList : null,
	/**
	 * 是否延迟渲染,默认flase
	 * 
	 * @type Boolean
	 */
	defer : false,
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
		var me = this;
		if (this.id == 'AbstractComponent') {
			ExceptionUtil.throwFramworkException({
				msg : '参数：id必须传入值!'
			});
		}
		if (Ext.isEmpty(this.renderTo) || Ext.isEmpty(this.strServId)
				|| Ext.isEmpty(this.rootText) || Ext.isEmpty(this.rootId)
				|| Ext.isEmpty(this.codeDom)) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：renderTo,strServId,rootText,rootId,codeDom必须传入值!'
			});
		}
		if (this.parentObj && this.parentObj.parent
				&& this.parentObj.parent.extObject) {// 当所在页面对象的父容器被销毁时，本组件对象也要销毁，否则页面上下拉的dom元素不能被删除掉
			this.parentObj.parent.extObject.on('close', function() {
				if (me.id && Ext.getCmp(me.id)) {
					Ext.getCmp(me.id).destroy();
				}
			});
		} else {
			ExceptionUtil.throwFramworkException({
				msg : 'TreeSelector组件必须传入所属页面对象parentObj（即当前PageObject对象）!'
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
		// 如果组件已经存在 则销毁
		if (this.id && Ext.getCmp(this.id)) {
			Ext.getCmp(this.id).destroy();
		}
		this.store = Ext.create('Ext.data.Store', {
			fields : [],
			data : [ [] ]
		});
		// 下拉列表空选项Element ID
		this.comboEmptyElmId = this.id + '_empty';
		// 树渲染DIV
		this.comboTreeId = this.id + '_TreeDiv';
		// 默认数据读取字段
		var defaultFields = [ 'id', 'text', 'leaf', 'paramStr' ];
		// 树数据读取字段
		this.treeFields = Ext.isEmpty(this.expandFields) ? defaultFields
				: defaultFields.concat(this.expandFields);
		// if (this.multiple) {//去掉，修改为通过后台传输数据来确定
		// this.treeFields.push({
		// name : "checked",
		// defaultValue : false
		// });
		// }

		if (this.onlyLeafSelect != true) {
			this.onlyLeafSelect = false;
		}
		if (this.multiple != true) {
			this.multiple = false;
		}
	},
	/**
	 * @Override
	 */
	build : function() {
		var me = this;
		if (null != me.renderTo) {
			me.comboWithTooltip = Ext.create('Ext.form.field.ComboBox', {
				id : me.id,
				store : me.store,
				editable : false, // 禁止手写及联想功能
				typeAhead : false,
				queryMode : 'local',
				triggerAction : 'all',
				maxHeight : 300,
				width : me.width,
				disabled : this.disabled,
				disabledCls : me.disabledCls,
				tpl : '<tpl for="."><div style="height: 20px;" id="'
						+ me.comboEmptyElmId + '">&nbsp;</div><div id="'
						+ me.comboTreeId
						+ '" style="height:200px"></div></tpl>', // html代码
				emptyText : '请选择...',
				value : me.value,
				listeners : me.listeners,
				transform : me.renderTo
			});

		} else {
			me.comboWithTooltip = Ext.create('Ext.form.field.ComboBox', {
				id : me.id,
				store : me.store,
				editable : false, // 禁止手写及联想功能
				typeAhead : false,
				queryMode : 'local',
				triggerAction : 'all',
				maxHeight : 300,
				width : me.width,
				listeners : me.listeners,
				tpl : '<tpl for="."><div style="height: 20px;" id="'
						+ me.comboEmptyElmId + '">&nbsp;</div><div id="'
						+ me.comboTreeId
						+ '" style="height:200px"></div></tpl>', // html代码
				value : me.value,
				emptyText : '请选择...'
			});
		}
		if (this.defer) {
			Ext.Function.defer(me.initTreePanel, 10, me);
		} else {
			this.initTreePanel()
		}
	},
	initTreePanel : function() {
		var me = this;
		var tree;
		var url = Constants.AJAX_ACTION + "?strServId=" + me.strServId
				+ "&jsonData={id:'" + me.rootId + "',multiple:" + me.multiple
				+ ",onlyLeafSelect:" + me.onlyLeafSelect + ",root:true}";
		if (!Ext.isEmpty(me.paramStr)) {
			var jsonData = "{id:'" + me.rootId + "',multiple:" + me.multiple
					+ ",onlyLeafSelect:" + me.onlyLeafSelect + ",root:true}"
			var newJsonData = ObjectUtil.applyIf(DataUtil.decode(jsonData), Ext
					.isObject(me.paramStr) ? me.paramStr : DataUtil
					.decode(me.paramStr));
			url = Constants.AJAX_ACTION + "?strServId=" + me.strServId
					+ "&jsonData=" + DataUtil.encode(newJsonData);
		}

		var treeStore = Ext.create('Ext.data.TreeStore', {
			fields : this.treeFields,
			root : {
				expanded : true,
				text : me.rootText, // 节点名称
				draggable : false, // 是否支持拖动
				id : me.rootId
			},
			proxy : {
				type : 'ajax',
				url : url
			},
			listeners : {
				beforeload : {
					fn : function() {
						if (!Ext.isEmpty(me.selectedValue)) {
							var node = treeStore
									.getNodeById(me.selectedValue.code);
							if (node) {
								me.setValue(node, me.selectedValue.code,
										node.data.text);
							} else {
								me.setValue(null, me.selectedValue.code,
										me.selectedValue.text);
							}
						}
					},
					delay : 30
				}
			}
		});

		treeStore.on("beforeload", function(treeStore, node) {
			if (null != me.paramStr) {
				var jsonData = "{id:'" + node.node.data.id + "',multiple:"
						+ me.multiple + ",onlyLeafSelect:" + me.onlyLeafSelect
						+ ",root:false}";
				var newJsonData = ObjectUtil.applyIf(DataUtil.decode(jsonData),
						Ext.isObject(me.paramStr) ? me.paramStr : DataUtil
								.decode(me.paramStr));

				treeStore.proxy.url = Constants.AJAX_ACTION + "?strServId="
						+ me.strServId + "&jsonData="
						+ DataUtil.encode(newJsonData);
			} else {
				treeStore.proxy.url = Constants.AJAX_ACTION + "?strServId="
						+ me.strServId + "&jsonData={id:'" + node.node.data.id
						+ "',multiple:" + me.multiple + ",onlyLeafSelect:"
						+ me.onlyLeafSelect + ",root:false}";
			}
		}, treeStore);
		// 创建树形结构
		tree = Ext.create('Ext.tree.Panel', {
			store : treeStore,
			height : 200,
			width : me.width - 5,
			rootVisible : (!Ext.isEmpty(this.rootVisible)) ? this.rootVisible
					: true,
			animate : true
		});
		var falg = 1;
		if (this.multiple) {
			tree.on("checkchange", function(node, flag) {
				falg = 0;
				if (!node.isLeaf() && me.onlyLeafSelect) {// 如果不是叶节点
					return;
				}
				// 子节点全部选中
				// node.cascadeBy(function(child) {
				// child.set("checked", flag);
				// });
				if (!Ext.isEmpty(me.allPath) && me.allPath == true) {
					me.setValue(node, me.getCode(node), me.getText(node));
					me.comboWithTooltip.collapse();// 隐藏option列表
				} else {
					var textValue = me.populateSelectValue(me.comboWithTooltip
							.getValue(), node.data.text, flag);
					var codeValue = me.populateSelectValue(Ext
							.getDom(me.codeDom).value, node.data.id, flag);
					me.setValue(node, codeValue, textValue);
				}
				me.comboWithTooltip.fireEvent('select');
			});
		} else {
			tree.on("itemclick", function(view, node, e) {
				falg = 0;
				if (!node.isLeaf() && me.onlyLeafSelect) {// 如果不是叶节点
					return;
				}
				if (!Ext.isEmpty(me.allPath) && me.allPath == true) {
					me.setValue(node, me.getCode(node), me.getText(node));
					me.comboWithTooltip.collapse();// 隐藏option列表
				} else {
					me.setValue(node, node.data.id, node.data.text);
					me.comboWithTooltip.collapse();// 隐藏option列表
				}
				//获取当前点击的节点级别
				me.mark=node.data.mark;
				me.comboWithTooltip.fireEvent('select');
			});
		}

		me.comboWithTooltip.on('expand', function() {
			if (!tree.rendered) {
				tree.render(me.comboTreeId);
			}
			var theEl = Ext.get(me.comboEmptyElmId);
			theEl.on('click', function() {
				me.setValue(null, "", "");
				me.comboWithTooltip.collapse();// 隐藏option列表
			});
			theEl.on('mouseenter', function() {
				theEl.setStyle('background-color', '#EEEEEE');
			});
			theEl.on('mouseleave', function() {
				theEl.setStyle('background-color', '#FFFFFF');
			});

		});
		me.comboWithTooltip.on('collapse', function() {
			if (falg == 1) {
				this.expand();
				falg = 0;
			}
		});
		tree.on("itemcollapse", function(view, node) {
			falg = 1;
		});
		tree.on("itemexpand", function(view, node) {
			falg = 1;
		});
		this.extObject = me.comboWithTooltip;
		this.treePanelIsInit = true;
	},
	/**
	 * 设置值
	 * 
	 * @param {}
	 *            node
	 * @param {}
	 *            value
	 * @param {}
	 *            text
	 * @private
	 */
	setValue : function(node, value, text) {
		this.extObject.setValue(text);
		if (!Ext.isEmpty(this.textDom)) {
			Ext.getDom(this.textDom).value = text;
		}
		if (!Ext.isEmpty(this.codeDom)) {
			Ext.getDom(this.codeDom).value = value;
		}
		if (Ext.isArray(this.domIdFieldsMapList) && node) {
			Ext.each(this.domIdFieldsMapList, function(domIdFieldsMap) {
				var dom = Ext.getDom(domIdFieldsMap['domId']);
				if (dom) {
					dom.value = node.data[domIdFieldsMap['field']];
				}
			});
		}
		// this.extObject.fireEvent('select');
	},
	/**
	 * 组装选择值
	 * 
	 * @param {}
	 *            value 原始值
	 * @param {}
	 *            selectValue 选择的值
	 * @param {}
	 *            checked 是否选中
	 * @return {} 新的值
	 */
	populateSelectValue : function(value, selectValue, checked) {
		var value = Ext.isEmpty(value) ? [] : value.split(",");
		if (checked) {
			value.push(selectValue);
		} else {
			var newSelectValue = [];
			for ( var i = 0; i < value.length; i++) {
				if (value[i] != selectValue) {
					newSelectValue.push(value[i]);
				}
			}
			value = newSelectValue;
		}
		return value.join(",");
	},
	/**
	 * 取得下拉选项值
	 * 
	 * @param {}
	 *            node
	 * @return {}
	 */
	getCode : function(node) {
		if (node.parentNode != null) {
			var code = this.getCode(node.parentNode);
			return code + "/" + node.data.id;
		} else {
			return "/" + node.data.id;
		}
	},
	/**
	 * 取得下拉选项文本值
	 * 
	 * @param {}
	 *            node
	 * @return {}
	 */
	getText : function(node) {
		if (node.parentNode != null) {
			var text = this.getText(node.parentNode);
			return text + "/" + node.data.text;
		} else {
			return "/" + node.data.text;
		}
	},
	getDisplayValue : function() {
		return Ext.getDom(this.textDom).value;
	},
	/**
	 * 取得选中的节点级别
	 * 
	 * @return mark
	 */
	getMark:function(){
		var me=this;
		return me.mark;
	},
	clear : function() {
		Ext.getDom(this.codeDom).value = "";

		if (!Ext.isEmpty(this.textDom)) {
			Ext.getDom(this.textDom).value = "";
		}
		this.extObject.setValue("");
	}
});