/**
 * Tree组件 注意 1：参数中：filter 为true时，必须要有后台程序支持，才能实现过滤功能
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-06-27
 * @class component.Tree
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID(必填) config->strServId:后台service id(必填)
 *                config->multiple:是否显示多选框(默认为不显示)true/false
 *                config->filter:是否显示过滤输入框(默认为不显示)true/false
 *                config->rootText:根节点名称 (必填) config->rootId:根节点值(必填)
 *                config->renderTo:树渲染的地方(必填) config->nodeClick:回调函数,属性如下
 *                config->nodeClick->:scope{data:[],value:[],text:[],leaf:[]}
 *                config->nodeClick->scope->data:当前选择节点数组对象
 *                config->nodeClick->scope->value:当前选择节点对象对应值数组
 *                config->nodeClick->scope->text:当前选择节点对象对应描述数组
 *                config->nodeClick->scope->leaf:当前选择节点是否是叶子节点属性数组
 * @example var tree = this.create("component.Tree", { id :
 *          'questionManagerTree', strServId :
 *          'ptTypeService.getProdTypeChildrenNodesByParentNode', rootText :
 *          '产品分类', rootId : '000000', width : 300, renderTo : this.ids.tree,
 *          menuItems : [{ text : '删除节点', iconCls : 'delete', items:[{ text :
 *          '子节点', iconCls : 'delete', handler : function() {
 *          alert(tree.getSelectedNodes()[0].toSource()); } }] }], nodeClick :
 *          function() { alert(this.text); } });
 */
Ext.define('component.Tree', {
	extend : 'base.AbstractComponent',
	alias : 'widget.Tree',
	type : 'Tree',
	/**
	 * 树标题
	 * 
	 * @type String
	 */
	title : '',
	/**
	 * 是否禁用组件,默认false
	 * 
	 * @type Boolean
	 */
	disabled : false,
	/**
	 * 右键按钮对象集合 格式:[{text:'右键节点',iconCls:'delete',handler:function(){},items : [{
	 * text : '子节点', iconCls : 'delete', handler : function() {
	 * alert(tree.getSelectedNodes()[0].text); } }]}]
	 * 
	 * @type
	 */
	menuItems : null,
	/**
	 * 是否允许多选,默认false
	 * 
	 * @type Boolean
	 */
	multiple : false,
	/**
	 * 是否显示过滤文本输入框,默认fasle
	 * 
	 * @type Boolean
	 */
	filter : false,
	/**
	 * 组件渲染ID
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 服务ID
	 * 
	 * @type String
	 */
	strServId : '',
	/**
	 * 默认值
	 * 
	 * @type String
	 */
	selectedValue : '',
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
	 * 组件值数组对象中显示字段,值字段数组
	 * 
	 * @type Array
	 */
	fields : null,
	/**
	 * 组件宽度
	 * 
	 * @type Number
	 */
	width : 300,
	/**
	 * 组件高度
	 * 
	 * @type Number
	 */
	height : 400,
	/**
	 * 是否展开所有节点,默认false
	 * 
	 * @type Boolean
	 */
	expandAll : false,
	/**
	 * 顶部工具栏
	 * 
	 * @type Array
	 */
	tbar : null,
	/**
	 * 节点点击事件 nodeClick:回调函数,属性如下
	 * nodeClick->:scope{data:[],value:[],text:[],leaf:[]}
	 * nodeClick->scope->data:当前选择节点数组对象 nodeClick->scope->value:当前选择节点对象对应值数组
	 * nodeClick->scope->text:当前选择节点对象对应描述数组
	 * nodeClick->scope->leaf:当前选择节点是否是叶子节点属性数组
	 */
	nodeClick : Ext.emptyFn(),
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
		if (Ext.isEmpty(this.strServId) || Ext.isEmpty(this.renderTo)
				|| Ext.isEmpty(this.rootText) || Ext.isEmpty(this.rootId)) {
			ExceptionUtil.throwFramworkException({
				msg : '参数：strServId,renderTo,rootText,rootId必须传入值!'
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
		if (this.menuItems) {
			this.parserContextMenuItems();
		}
	},
	/**
	 * @Override
	 */
	build : function() {
		var me = this;
		var root;
		var tree;
		var treeStore;
		// 组装顶部工具栏
		var newTbars;
		if (this.tbar) {
			newTbars = [ '->' ];
		} else {
			newTbars = null;
			;
		}
		DataUtil.each(this.tbar, function(bar) {
			var newtbar = {};
			newtbar.text = bar.text;
			newtbar.tooltip = bar.tooltip;
			newtbar.handler = bar.handler;
			newtbar.iconCls = bar.iconCls;
			newTbars.push(newtbar);
			newTbars.push('-');
		});
		this.tbar = newTbars;
		// 默认数据读取字段
		var defaultFields = [ 'id', 'text', 'leaf' ]
		// 树数据读取字段
		this.fields = Ext.isEmpty(this.fields) ? defaultFields : defaultFields
				.concat(this.fields);
		// if (this.multiple) {//去掉，修改无为通过后台传送数据来确定
		// this.fields.push({
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
		var url = Constants.AJAX_ACTION + "?strServId=" + me.strServId
				+ "&jsonData={id:'" + me.rootId + "',multiple:" + me.multiple
				+ ",onlyLeafSelect:" + me.onlyLeafSelect + "}";
		if (!Ext.isEmpty(me.paramStr)) {
			var jsonData = "{id:'" + me.rootId + "',multiple:" + me.multiple
					+ ",onlyLeafSelect:" + me.onlyLeafSelect + "}"
			var newJsonData = ObjectUtil.applyIf(DataUtil.decode(jsonData), Ext
					.isObject(me.paramStr) ? me.paramStr : DataUtil
					.decode(me.paramStr));
			url = Constants.AJAX_ACTION + "?strServId=" + me.strServId
					+ "&jsonData=" + DataUtil.encode(newJsonData);
		}
		// alert(me.multiple)
		treeStore = Ext.create('Ext.data.TreeStore', {
			fields : this.fields,
			filterOnLoad : true,
			root : {
				expanded : false,
				text : me.rootText, // 节点名称
				draggable : false, // 是否支持拖动
				id : me.rootId
			},
			proxy : {
				type : 'ajax',
				url : url
			}
		});
		treeStore.on("beforeload", function(treeStore, node) {
			if (!Ext.isEmpty(me.paramStr)) {

				var jsonData = "{id:'" + node.node.data.id + "',multiple:"
						+ me.multiple + ",onlyLeafSelect:" + me.onlyLeafSelect
						+ "}";
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
						+ me.onlyLeafSelect + "}";
			}
		}, treeStore);
		// 搜索框
		var searchField = Ext.create('component.SearchField', {
			width : this.width - 200,
			hidden : this.filter ? false : true,
			maxLength : 20,
			labelWidth : 30,
			store : treeStore,
			fieldLabel : '过滤',
			emptyText : '请输入过滤字符',
			onTrigger2Click : function() {
				var filter = this.getValue().replace(/\s*/g, "");
				if (!Ext.isEmpty(filter)) {
					treeStore.on("beforeload", function(treeStore, node) {
						treeStore.proxy.url = Constants.AJAX_ACTION
								+ "?strServId=" + me.strServId
								+ "&jsonData={id:'" + node.node.data.id
								+ "',filter:'" + filter + "',multiple:"
								+ me.multiple + ",onlyLeafSelect:"
								+ me.onlyLeafSelect + "}";
					}, treeStore);
					tree.getStore().load(treeStore);
					tree.expandAll();
				}
				var value = this.getValue();

				if (value.length > 0) {
					this.store.filter({
						id : this.paramName,
						property : this.paramName,
						value : value
					});
					this.hasSearch = true;
					this.triggerCell.item(0).setDisplayed(true);
					this.updateLayout();
				}
			},
			onTrigger1Click : function() {
				if (this.hasSearch) {
					this.setValue('');
					this.hasSearch = false;
					this.triggerCell.item(0).setDisplayed(false);
					this.updateLayout();
					treeStore.on("beforeload", function(treeStore, node) {
						treeStore.proxy.url = Constants.AJAX_ACTION
								+ "?strServId=" + me.strServId
								+ "&jsonData={id:'" + node.node.data.id
								+ "',multiple:" + me.multiple
								+ ",onlyLeafSelect:" + me.onlyLeafSelect + "}";
					}, treeStore);
					tree.getStore().load(treeStore);
					tree.expand(true);
				}
			}
		});
		if (this.tbar) {
			this.tbar.push(searchField)
		} else {
			this.tbar = [ searchField ];
		}
		if (this.multiple) {
			tree = Ext.create('Ext.tree.Panel', {
				// useArrows:true,
				autoScroll : true,
				title : this.title,
				animate : true,
				rootVisible : true,
				tbar : this.tbar,
				height : this.height,
				width : this.width,
				renderTo : this.renderTo,
				store : treeStore,
				listeners : {
					select : function() {
						var selectedData = this.getSelectionModel()
								.getSelection();
						me.populateNodeClick(selectedData);
					},
					checkchange : function(node, flag) {
						node.cascadeBy(function(child) {
							child.set("checked", flag);
						});
						// 字节点选中,设置父节点为选中
						var pNode = node.parentNode;
						if (flag) {
							for (; pNode != null; pNode = pNode.parentNode) {
								if (1 != pNode.data.id) {
									pNode.set("checked", flag);
								}
							}
						}
						me.populateCheckChange(node, flag);
					},
					itemcontextmenu : function(view, record, item, index, evt,
							eOpts) {
						this.getSelectionModel().select(record);
						me.onContextMenuHandler(this, evt);
					}
				}
			});
		} else {
			tree = Ext.create('Ext.tree.Panel', {
				useArrows : true,
				autoScroll : true,
				animate : true,
				tbar : this.tbar,
				title : this.title,
				height : this.height,
				width : this.width,
				renderTo : this.renderTo,
				store : treeStore,
				listeners : {
					select : function() {
						var selectedData = this.getSelectionModel()
								.getSelection();
						me.populateNodeClick(selectedData);
					},
					itemcontextmenu : function(view, record, item, index, evt,
							eOpts) {
						this.getSelectionModel().select(record);
						me.onContextMenuHandler(this, evt);
					}
				}
			});
		}
		if (this.expandAll) {// 展开所有节点
			tree.getRootNode().expand(true);
		} else {
			tree.getRootNode().expand(false)
		}
		this.extObject = tree;
	},
	/**
	 * 组装并回调nodeClick
	 * 
	 * @param {}
	 *            data
	 * @private
	 */
	populateNodeClick : function(data) {
		var dataArray = [];
		var textArray = [];
		var valueArray = [];
		var leafArray = [];
		Ext.each(data, function(item) {
			dataArray.push(item.data);
			textArray.push(item.data.text);
			valueArray.push(item.data.id);
			leafArray.push(item.data.leaf);
		});
		var scope = {
			data : dataArray,
			text : textArray,
			value : valueArray,
			leaf : leafArray
		}
		if (Ext.isFunction(this.nodeClick)) {
			Ext.Function.bind(this.nodeClick, scope)();
		}
	},
	/**
	 * 组装并回调checkChange
	 * 
	 * @param {}
	 *            node
	 * @param {}
	 *            flag
	 * @private
	 */
	populateCheckChange : function(node, flag) {
		var scope = {
			node : node,
			flag : flag
		}
		if (Ext.isFunction(this.checkChange)) {
			Ext.Function.bind(this.checkChange, scope)();
		}
	},
	/**
	 * 解析右键菜单按钮
	 */
	parserContextMenuItems : function() {
		var me = this;
		Ext.each(this.menuItems, function(item) {
			if (item.items) {
				item = me.populateContextMenu(item, item.items);
			}
		});
	},
	/**
	 * 递归组装菜单
	 * 
	 * @param {}
	 *            item
	 * @param {}
	 *            items
	 * @return {}
	 */
	populateContextMenu : function(item, items) {
		var me = this;
		Ext.each(items, function(childItem) {
			if (childItem.items) {
				me.populateContextMenu(childItem, childItem.items);
			}
		});
		item = Ext.apply(item, {
			menu : Ext.create('Ext.menu.Menu', {
				floating : true,
				items : items
			})
		});
		return item;
	},
	/**
	 * 鼠标右键处理
	 * 
	 * @param {}
	 *            me 当前树对象
	 * @param {}
	 *            evt 事件
	 * @private
	 */
	onContextMenuHandler : function(me, evt) {
		// 阻止浏览器默认右键事件
		evt.preventDefault();
		evt.stopEvent();
		if (!me.ctxMenu) {
			me.ctxMenu = Ext.create('Ext.menu.Menu', {
				floating : true,
				items : this.menuItems
			});
		}
		me.ctxMenu.showAt(evt.getXY());
	},
	/**
	 * 根据节点ID得到节点
	 * 
	 * @param {}
	 *            nodeId 节点ID
	 * @return {} 节点
	 */
	getNodeById : function(nodeId) {
		return this.extObject.getStore().getNodeById(nodeId);
	},
	getAllNode : function() {
		return this.getChildNodes(this.extObject.getRootNode());
	},
	/**
	 * 取得指定节点下所有节点 如果未指定则默认为根节点
	 * 
	 * @param {}
	 *            node 节点
	 * @return {}
	 * @public
	 */
	getChildNodes : function(node) {
		var rootNode = node || this.extObject.getRootNode();
		var childs = [];
		this.findChildNode(childs, rootNode);
		return childs;
	},
	/**
	 * 查找指定节点下所有子节点,并放入给定数组中
	 * 
	 * @param {}
	 *            childs 用于存放找到的节点数组
	 * @param {}
	 *            node 指定节点
	 * @private
	 */
	findChildNode : function(childs, node) {
		var childNodes = node.childNodes;
		var me = this;
		Ext.each(childNodes, function() { // 从节点中取出子节点依次遍历
			var nd = this;
			childs.push(nd);
			if (nd.hasChildNodes()) { // 判断子节点下是否存在子节点
				me.findChildNode(childs, nd); // 如果存在子节点 递归
			}
		});
	},
	/**
	 * 添加子项
	 * 格式：{id:'itemId',text:'子项描述',leaf:false,className:'子类对象',children:[{id:'itemId',text:'子项描述',leaf:true,className:'子类对象'}]}
	 * child->id：子项ID child->text：子项描述 child->leaf：是否是叶子节点
	 * child->className：JS对象对象名称 child->....属性可以任意添加,但是必须与populateNodeClick方法同步
	 * child->children:子项的子项数组,格式与父项一样,
	 * 
	 * @param {}
	 *            child 子项对象
	 * @param {}
	 *            parentId 父节点ID
	 * @public
	 */
	appendChild : function(child, parentId) {
		if (parentId) {
			var parentNode = this.extObject.getStore().getNodeById(parentId);
			// 如果当前父节点是叶子节点则改变属性
			if (parentNode.isLeaf()) {
				var superParentNode = parentNode.parentNode;
				if (superParentNode) {
					superParentNode.replaceChild({
						id : parentNode.data.id,
						text : parentNode.data.text,
						leaf : false,
						children : [ child ]
					}, parentNode);
				}
			} else {
				parentNode.appendChild(child);
			}
		} else {
			this.extObject.getRootNode().appendChild(child);
		}
	},
	/**
	 * 修改节点
	 * 格式：{id:'itemId',text:'子项描述',leaf:false,className:'子类对象',children:[{id:'itemId',text:'子项描述',leaf:true,className:'子类对象'}]}
	 * node->id：子项ID child->text：子项描述 node->leaf：是否是叶子节点
	 * node->className：JS对象对象名称 node->....属性可以任意添加,但是必须与populateNodeClick方法同步
	 * node->children:子项的子项数组,格式与父项一样,
	 * 
	 * @param {}
	 *            node 节点对象
	 * @param {}
	 *            parentId 父节点ID
	 * @public
	 */
	updateNode : function(node, parentId) {
		if (node) {
			var cuurNode = this.extObject.getStore().getNodeById(node.id);
			var parentNode = null;
			if (parentId) {
				parentNode = this.extObject.getStore().getNodeById(parentId);
			} else {
				parentNode = cuurNode.parentNode;
			}
			if (parentNode && cuurNode) {
				parentNode.replaceChild(node, cuurNode);
			}
		}
	},
	/**
	 * 根据节点ID删除节点
	 * 
	 * @param {}
	 *            childId 节点ID
	 */
	deleteChild : function(childId) {
		// 取得当前节点
		var childNode = this.extObject.getStore().getNodeById(childId);
		if (!childNode) {
			ExceptionUtil.throwFramworkException({
				msg : '此节点不存在'
			});
		}
		if (childNode.isRoot()) {
			ExceptionUtil.throwFramworkException({
				msg : '不能删除根节点'
			});
		}
		// 取得当前节点父节点
		var parentNode = childNode.parentNode;
		// 删除并销毁节点
		childNode.remove(true);
		// 如果当前父节没有子节点,则设置当前父节点leaf属性为true
		if (!parentNode.hasChildNodes()) {
			var superParentNode = parentNode.parentNode;
			if (superParentNode) {
				superParentNode.replaceChild({
					id : parentNode.data.id,
					text : parentNode.data.text,
					leaf : true
				}, parentNode);
			}

		}
	},
	/**
	 * 取得当前选中的节点集合
	 * 
	 * @return {}
	 * @public
	 */
	getSelectedNodes : function() {
		var nodes = [];
		Ext.each(this.extObject.getSelectionModel().getSelection(), function(
				item) {
			nodes.push(item.data);
		});
		return nodes;
	},
	/**
	 * 取得当前已经选中的节点集合
	 * 
	 * @return {}
	 * @public
	 */
	getCheckedNodes : function() {
		var nodes = [];
		Ext.each(this.extObject.getChecked(), function(item) {
			nodes.push(item.data);
		});
		return nodes;
	}
});