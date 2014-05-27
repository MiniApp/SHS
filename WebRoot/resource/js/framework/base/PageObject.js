/**
 * 页面基础类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class base.PageObject
 */
Ext.define("base.PageObject", {
			mixins : ['businessBase.BusinessComponent'],
			constructor : function(config) {
				if (!DataUtil.isObject(config)) {
					ExceptionUtil.throwFramworkException({
								msg : 'PageObject的构造函数必须传入对象参数'
							});
					return;
				}
				if (DataUtil.isEmpty(config['id'])) {
					ExceptionUtil.throwFramworkException({
								msg : '请输入PageObject的Id'
							});
					return;
				}
				ObjectUtil.apply(this, config);
			},
			htmlUrl : null,// html页面路径
			ids : {},// 替换前页面元素Id和替换后的Id的对应关系
			genHtml : function() {// 根据路径加载html并替换id
				var htmlContent = this.htmlContent || '';
				if (!DataUtil.isEmpty(this.htmlUrl)) {
					ConnectionUtil.urlRequest({
								url : this.htmlUrl,
								async : false,
								callback : function(responseText) {
									htmlContent = responseText;
								},
								failure : function(xhr) {
									MsgUtil.error("错误提示", "加载页面失败")
								}
							});
				}
				return HtmlUtil.compile(htmlContent, this)
			},
			/*
			 * 初始化页面数据
			 */
			initData : function() {
			},
			/*
			 * 渲染页面
			 */
			initCmp : function() {
			},
			/*
			 * 设置事件相应
			 */
			initEvent : function() {
			},
			/*
			 * main入口
			 */
			render : function() {
				// 取得用户信息
				if (!DataUtil.getUserInfo()) {
					return;
				}
				if (!DataUtil.getUserMenu()) {// 取得菜单信息
					return;
				}
				this.initData();
				this.initPurview();
				this.initCmp();
				this.initEvent();
			},
			/**
			 * 创建当前对象的子对象 将当前对象设置为子对象的父
			 * 
			 * @param{Object} className->类名 confg->类配置对象
			 *                @example
			 *                this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.searchEngineListInfoPanel,
							contentEl : this.ids.searchEngineListInfoSubArea,
							collapsible : true,
							hasBackGroundColor : true,
							buttons : [{
										text : '查询',
										iconCls : 'query',
										handler : function() {
											owner.queryEngineList();
										}
									}]
						});
			 */
			create : function(className, config) {
				config.parentObj = this;
				return ObjectUtil.create(className, config);
			},
			/**
			 * 初始化权限,按钮权限等在这里初始化
			 */
			initPurview : function(){
				//定义显示按钮map
				var btnMap = new Ext.util.HashMap();
				if(DataUtil.isArray(this.button)){
					DataUtil.each(this.button, function(btnObj) {
						if(btnObj.id){
							btnMap.add(btnObj.id,btnObj);
						}
					});
				}else if(DataUtil.isObject(this.button)){
					if(this.button.id){
						btnMap.add(this.button.id,this.button);
					}
				}
				ObjectUtil.apply(this,{'btnMap':btnMap});
			}
})
