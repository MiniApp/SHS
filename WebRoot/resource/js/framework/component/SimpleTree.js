/**
 * SimpleTree组件 
 * 对Ext.tree.Panel的简单封装,前端只需要提供渲染节点和子项数组即可.
 * 提供了nodeClick属性,用于前端处理节点点击事件. 
 * 提供了appendChild方法,用于向根节点加子项
 * 提供了updateNode方法,用于修改节点
 * 提供了deleteChild方法,用于删除指定节点
 * 提供了getChildNodes方法,用于获取指定节点下所有子节点,如果未指定则默认为根节点
 * 提供了getSelectedNodes,用于获取当前选中的节点集合
 * 提供了getNodeById,根据节点ID取得当前节点对象
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-05
 * @class component.SimpleTree
 * @extends base.AbstractComponent
 * @constructor
 *          @example
 *          this.create("component.SimpleTree", {
							renderTo : this.ids.initResoureControlTreeDiv,
							children : this.translateMenu(),
							expandAll : true,
							fields :['resourceControlpk'],
							rootText : '系统功能树',
							widthPercent : 0.985,
							heightPercent : 1,
							tbar : [{
								text : '保存定制',
								iconCls : 'save',
								disabled : true,
								id : 'saveIndexBtn',
								handler : function() {
									owner.saveFunction();
								}
							}],
							nodeClick : function() {
								if(!this.leaf[0]){
									owner.initResourceControlTree.extObject.queryById('saveIndexBtn').setDisabled(true);
								}else{
									owner.initResourceControlTree.extObject.queryById('saveIndexBtn').setDisabled(false);
								}
							}
						});
 */
Ext.define('component.SimpleTree', {
			extend : 'base.AbstractComponent',
			alias : 'widget.SimpleTree',
			type : 'SimpleTree',
			/**
			 * 组件渲染的id(必填)
			 * 
			 * @type String
			 */
			renderTo : '',
			/**
			 * 字段
			 * @type Array
			 */
			fields : null,
			/**
			 * 右键按钮对象集合
			 * 格式:[{text:'右键节点',iconCls:'delete',handler:function(){},items : [{
			 * text : '子节点', iconCls : 'delete', handler : function() {
			 * alert(tree.getSelectedNodes()[0].text); } }]}]
			 * 
			 * @type
			 */
			menuItems : null,
			/**
			 * 是否显示根节点,默认false
			 * 
			 * @type Boolean
			 */
			rootVisible : false,
			/**
			 * 是否可折叠
			 * 
			 * @type Boolean
			 */
			collapsible : false,
			/**
			 * 树标题
			 * 
			 * @type String
			 */
			title : '',
			/**
			 * 根节点描述
			 * 
			 * @type String
			 */
			rootText : 'SimpleTree',
			/**
			 * 根几点ID
			 * 
			 * @type String
			 */
			rootId : 'SimpleTreeId',
			/**
			 * 组件宽度,默认150
			 * 
			 * @type Number
			 */
			width : 150,
			/**
			 * 组件高度,默认300
			 * 
			 * @type Number
			 */
			height : 300,
			/**
			 * 节点点击事件 nodeClick:回调函数,属性如下
			 * nodeClick->:scope{data:[],value:[],text:[],leaf:[],className:[]}
			 * nodeClick->scope->data:当前选择节点数组对象
			 * nodeClick->scope->value:当前选择节点对象对应值数组
			 * nodeClick->scope->text:当前选择节点对象对应描述数组
			 * nodeClick->scope->leaf:当前选择节点是否是叶子节点属性数组
			 * nodeClick->scope->className:js对象类名称
			 * nodeClick->scope->classConfig：js对象配置参数
			 */
			nodeClick : Ext.emptyFn(),
			/**
			 * 子项数组
			 * 
			 * @type Array
			 *       格式:{id:'id',text:'描述',leaf:false,children:[{id:'id',text:'描述',leaf:true}]}
			 *       config->id:子项ID, 
			 *       config->text:子项描述, 
			 *       config->leaf:是否是叶子节点,
			 *       config->children:子项的子项数组,格式与父项一样,
			 */
			children : [],
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
//				if (Ext.isEmpty(this.renderTo)) {
//					ExceptionUtil.throwFramworkException({
//								msg : '参数：renderTo必须传入值!'
//							});
//				}
			},
			/**
			 * 组件创建前处理
			 * 
			 * @Override
			 * @return {Boolean}
			 */
			beforeBuild : function() {
				var me = this;
				//默认数据读取字段
				var defaultFields = ['id', 'text','leaf', 'className','nameSpace','classConfig'];
				// 树数据读取字段
				this.fields = Ext.isEmpty(this.fields) ? defaultFields : defaultFields.concat(this.fields);
				
				this.treeStore = Ext.create('Ext.data.TreeStore', {
							fields : this.fields,
							root : {
								expanded : false,
								text : me.rootText, // 节点名称
								draggable : false, // 是否支持拖动
								id : me.rootId,
								children : me.children
							}
						});
				if(this.menuItems){
					this.parserContextMenuItems();
				}
				// 组装顶部工具栏
				var newTbars = [];
				if (this.tbar) {
					newTbars = ['->'];
				} else {
					newTbars = null;;
				}
				DataUtil.each(this.tbar, function(bar) {
					newTbars.push(bar);
					newTbars.push('-');
				});
				this.tbar = newTbars;
			},
			/**
			 * 构建组件
			 * 
			 * @Override
			 */
			build : function() {
				var me = this;
				var tree = Ext.create('Ext.tree.Panel', {
							region : this.region || 'east',
							title : this.title,
							autoScroll : true,
							animate : true,
							rootVisible : this.rootVisible,
							collapseFirst : false,
							collapsible : this.collapsible,
							lines : false,
							height : this.height,
							width : this.width,
							renderTo : this.renderTo,
							store : this.treeStore,
							tbar : this.tbar,
							listeners : {
								itemclick : function() {
									var selectedData = this.getSelectionModel().getSelection();
									me.populateNodeClick(selectedData);
								},
								itemcontextmenu : function(view,record,item,index,evt,eOpts){
									this.getSelectionModel().select(record);
									me.onContextMenuHandler(this,evt);
								},
								checkchange : function(node, flag) {
									me.populateCheckChange(node, flag);
								}
							}
						});
				if (this.expandAll) {// 展开所有节点
					tree.getRootNode().expand(true);
				} else {
					tree.getRootNode().expand(false)
				}
				this.extObject = tree;
			},
			/**
			 * 添加子项
			 * 格式：{id:'itemId',text:'子项描述',leaf:false,className:'子类对象',children:[{id:'itemId',text:'子项描述',leaf:true,className:'子类对象'}]}
			 * child->id：子项ID child->text：子项描述 
			 * child->leaf：是否是叶子节点
			 * child->className：JS对象对象名称
			 * child->....属性可以任意添加,但是必须与populateNodeClick方法同步
			 * child->children:子项的子项数组,格式与父项一样,
			 * 
			 * @param {}
			 *            child 子项对象
			 *@param {}
			 *            parentId 父节点ID
			 * @public
			 */
			appendChild : function(child,parentId) {
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
										children : [child]
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
			 * node->className：JS对象对象名称
			 * node->....属性可以任意添加,但是必须与populateNodeClick方法同步
			 * node->children:子项的子项数组,格式与父项一样,
			 * 
			 * @param {}
			 *            node 节点对象
			 * @param {}
			 *            parentId 父节点ID
			 * @public
			 */
			updateNode : function(node, parentId) {
				if (parentId) {
					var cuurNode = this.extObject.getStore()
							.getNodeById(node.id);
					var parentNode = this.extObject.getStore()
							.getNodeById(parentId);
					node = Ext.apply(node, {
								leaf : cuurNode.isLeaf()
							});
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
					if(superParentNode){
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
			 * @return {}
			 * @public
			 */
			getSelectedNodes : function(){
				var nodes = [];
				Ext.each(this.extObject.getSelectionModel().getSelection(), function(item) {
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
			},
			/**
			 * 根据节点ID取得当前节点对象
			 * @param {} nodeId 节点ID
			 * @return {} 当前节点对象
			 * @public
			 */
			getNodeById : function(nodeId){
				return this.extObject.getStore().getNodeById(nodeId);
			}
			,
			/**
			 * 取得指定节点下所有节点
			 * 如果未指定则默认为根节点
			 * @param {} node 节点
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
			populateContextMenu : function(item, items) {
				var me = this;
				Ext.each(items, function(childItem) {
							if (childItem.items) {
								me.populateContextMenu(childItem,childItem.items);
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
			 * @param {} me 当前树对象
			 * @param {} evt 事件
			 * @private
			 */
			onContextMenuHandler : function(me,evt){
				//阻止浏览器默认右键事件
				evt.preventDefault();
                evt.stopEvent();
				if(!me.ctxMenu){
					me.ctxMenu = Ext.create('Ext.menu.Menu', {
						floating:true,
						items : this.menuItems
					});
				}
				me.ctxMenu.showAt(evt.getXY());
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
				var classNameArray = [];
				var classConfigArray = [];
				Ext.each(data, function(item) {
							dataArray.push(item.data);
							textArray.push(item.data.text);
							valueArray.push(item.data.id);
							leafArray.push(item.data.leaf);
							classNameArray.push(item.data.className);
							classConfigArray.push(item.data.classConfig);
						});
				var scope = {
					data : dataArray,
					text : textArray,
					value : valueArray,
					leaf : leafArray,
					className : classNameArray,
					classConfig : classConfigArray
				}
				if (Ext.isFunction(this.nodeClick)) {
					Ext.Function.bind(this.nodeClick,scope)();
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
			populateCheckChange : function(node,flag) {
				var scope = {
					node : node,
					flag : flag
				}
				if (Ext.isFunction(this.checkChange)) {
					Ext.Function.bind(this.checkChange,scope)();
				}
			}
		});