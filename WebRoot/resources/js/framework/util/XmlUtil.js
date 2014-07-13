/**
 * XML解析工具类 
 *  在本系统XML格式统一为：其中从节点item开始,以下节点为固定字段class节点为页面对象名
 *  root:根节点(必须)
 *  navigation:一级子节点(名称不固定)
 *  item:二级子节点(名称固定)
 *  id:三级子节点(名称固定)
 *  text:三级子节点(名称固定)
 *  className:三级子节点(名称固定)
 *  children:三级子节点(名称固定)
 * <root>
	<navigation>
		<item>
			<id>navigation</id>
			<text>客户联系</text>
			<children>
				<id>quickContactPlanCreate</id>
				<text>创建联系计划</text>
				<classname>ocrm.page.contactPlan.QuickContactPlanCreate</classname>
			</children>
			<children>
				<id>sendSMS</id>
				<text>发送短信</text>
				<className>ocrm.page.quicknavigation.customercontact.sendSMS</className>
			</children>
		</item>
		<item>
			<id>navigation1</id>
			<text>客户联系1</text>
			<cls>feeds-node</cls>
			<children>
				<id>quickContactPlanCreate1</id>
				<text>创建联系计划1</text>
				<className>ocrm.page.contactPlan.QuickContactPlanCreate1</className>
			</children>
			<children>
				<id>sendSMS1</id>
				<text>发送短信1</text>
				<className>ocrm.page.quicknavigation.customercontact.sendSMS1</className>
			</children>
		</item>
	</navigation>
	<mainMenu>
		<item>
			<id>customerBasicInfo</id>
			<text>基本信息</text>
			<children>
				<id>customerBaseInfo</id>
				<text>个人信息</text>
				<className>ocrm.page.customer.baseinfo.customerbaseinfo.CustomerBaseInfo</className>
			</children>
			<children>
				<id>personFamilyInfo</id>
				<text>家庭信息</text>
				<className>ocrm.page.customer.baseinfo.family.FamilyInfo</className>
			</children>
		</item>
	</mainMenu>
</root>
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-04
 * @class XmlUtil
 * @static
 *        @example
 *       var jsonObj = XmlUtil.parseXml({
			xmlUrl:xmlFileName
		});
 */
Ext.define('XmlUtil', {
			singleton : true,
			alternateClassName : 'XmlUtil',
			/**
			 * 添加导航属性:节点样式为feeds-node,不是叶子节点
			 * @type Object
			 */
			navItemAttr : {'cls':'feeds-node','leaf':false},
			/**
			 * 添加导航叶子节点属性:节点样式为feed,是叶子节点,节点图标
			 * @type 
			 */
			navChildAttr : {'cls':'feed','leaf':true,'icon':Constants.CONTEXT_PATH+'/images/icons/table_go.png'},
			/**
			 * 添加面板属性:节点样式为tabs
			 * @type Object
			 */
			menuItemAttr : {'iconCls':'tabs'},
			/**
			 * 添加子面板属性:节点样式为tabs1
			 * @type Object
			 */
			menuChildAttr : {'iconCls':'tabs1'},
            /**
             * 加载XML
             * @param xmlUrl xml文件路径
             * @return XML字符串
             */
			loadXml : function(xmlUrl) {
				var content = '';
				ConnectionUtil.urlRequest({
							url : xmlUrl,
							async : false,
							callback : function(responseText) {
								content = responseText;
							},
							failure : function(xhr) {
								MsgUtil.error("错误提示", "加载XML失败")
							}
						});
				return content;
			},
			/**
			 * 解析XML
			 * @param config->xmlUrl:xml文件路径
			 * @return JSON对象
			 */
			parseXml : function(config) {
				//调用后台服务解析XML
				var jsonXml = "";
				ConnectionUtil.ajaxReq({
							strServId : "jsonHelper.xmlToJson",
							submitWaitMessage:false,
							jsonData : {
								xmlPath : config.xmlUrl
							},
							async : false,
							callback : function(data) {
								jsonXml = data.jsonData;
							}
						});
				return Ext.decode(jsonXml);
			},
			/**
			 * 得到XML中指定节点名称JSON数据
			 * 目前有2中类型需要加属性
			 * @param config->jsonObj:已经解析好的json数据
			 * @param config->nodeName:节点名称
			 * @exception 节点未定义
			 * @return 返回XML中指定节点名称JSON数据
			 */ 
			getJsonMainMenuDataByNodeName : function(config){
				try{
					var children = [];
					var itemAttr = {};
					var childAttr = {};
					if(Ext.isEmpty(config.jsonObj) || !Ext.isObject(config.jsonObj)){
						ExceptionUtil.throwBusinessException({msg:'未传入xml数据'});
					}
					if(Ext.isEmpty(config.nodeName)){
						ExceptionUtil.throwBusinessException({msg:'节点名称不能为空'});
					}
					itemAttr = this.menuItemAttr;
					childAttr = this.menuChildAttr;
					 Ext.each(eval("config.jsonObj."+config.nodeName),function(item){
			        	var childArray = [];
			        	if(!Ext.isEmpty(item.children)){
			        		//添加属性
			        		Ext.apply(item,itemAttr);
			        	}else{
			        		Ext.apply(item,childAttr);
			        	}
			        	 Ext.each(item.children,function(child){
			        	 	//添加子节点属性
			        	 	Ext.apply(child,childAttr);
			        	 	childArray.push(child);
			        	 });
			        	 //覆盖原有children
			        	 Ext.apply(item,{children:childArray});
			        	 children.push(item);
			        });
			        return children;
				}catch(e){
					ExceptionUtil.throwBusinessException({msg:e});
				}
			},
			/**
			 * 得到XML中指定节点名称JSON数据
			 * 目前有2中类型需要加属性
			 * @param config->jsonObj:已经解析好的json数据
			 * @param config->nodeName:节点名称
			 * @exception 节点未定义
			 * @return 返回XML中指定节点名称JSON数据
			 */ 
			getJsonNavigationDataByNodeName : function(navigation){
				try{
					var children = [];
					Ext.each(navigation,function(item){
			        	if(!Ext.isEmpty(item.children)){
			        	 	Ext.apply(item,XmlUtil.navItemAttr);
			        		XmlUtil.populateNaviChild(item);
			        	}else{
			        		Ext.apply(item,XmlUtil.navChildAttr);
			        	}
			        	 children.push(item);
			        });
			        return children;
				}catch(e){
					ExceptionUtil.throwBusinessException({msg:e});
				}
			},
			/**
			 * 递归取得子节点
			 * 
			 * */
			populateNaviChild:function(item){
				try{
		        	var childArray = [];
		        	 Ext.each(item.children,function(child){
		        	 	if(!Ext.isEmpty(child.children)){
		        	 		XmlUtil.populateNaviChild(child);
			        	 	Ext.apply(child,XmlUtil.navItemAttr);
		        	 	}else{
		        	 		Ext.apply(child,XmlUtil.navChildAttr);
		        	 	}
		        	 	childArray.push(child);
		        	 });
		        	 Ext.apply(item,{children:childArray});
	        	 }catch(e){
						ExceptionUtil.throwBusinessException({msg:e});
				}
			}
			
		});
if (!Array.prototype.push) {
	Array.prototype.push = function(x) {
		this[this.length] = x;
		return true
	};
};

if (!Array.prototype.pop) {
	Array.prototype.pop = function() {
		var response = this[this.length - 1];
		this.length--;
		return response
	};
};