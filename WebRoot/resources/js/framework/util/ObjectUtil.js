/**
 * 对象处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class ObjectUtil
 */
Ext.define("ObjectUtil", {
	statics : {
		/*
		 * 将c的属性放入o中
		 */
		apply : function(o, c, defaults) {
			return Ext.apply(o, c, defaults);
		},
		/*
		 * 将c的属性放入o中,对于o中已存在的属性 不覆盖
		 */
		applyIf : function(o, c, defaults) {
			return Ext.applyIf(o, c, defaults);
		},
		/*
		 * 根据config配置对象创建className指定的对象
		 */
		create : function(className, config) {
			try {
				return Ext.create(className, config);
			} catch (exception) {
				if (exception.name == 'TypeError') {
					MsgUtil.error("错误提示", "加载:" + className + " 失败");
				} else if (exception.name == 'Ext.Error') {
					MsgUtil.error("错误提示", exception.msg);
				} else {
					MsgUtil.error("错误提示", "您的会话已经超时,或由于相同用户登录而被踢下线，请重新登录",
							function() {
								location.href = Constants.CONTEXT_PATH
										+ '/pages/ocrmLogin.html';
							});
				}
			}
		},
		/*
		 * 定义className指定的类,继承parentOrConfig,config为配置对象
		 */
		define : function(className, parentOrConfig, config) {
			if (config) {// 如果有继承类parentOrConfig就为父类名，config为配置对象
				config.extend = parentOrConfig;
				return Ext.define(className, config);
			} else {// 如果没有继承类，则parentOrConfig就为配置对象
				return Ext.define(className, parentOrConfig);
			}
		},
		/**
		 * 回调方法，根据参数指定的作用域和参数回调指定的方法
		 * 
		 * @param {}
		 *            func 要回调的函数
		 * @param {}
		 *            scope 作用域
		 * @param {}
		 *            param 要传个回调方法的参数
		 * 
		 * @return {} 新的函数
		 */
		callback : function(func, scope, param) {
			Ext.callback(func, scope, [ param ]);
		},
		/**
		 * 绑定作用域到指定函数并返回新的函数
		 * 
		 * @param {}
		 *            fn 函数
		 * @param {}
		 *            scope 作用域
		 * @return {} 新的函数
		 */
		bind : function(fn, scope) {
			return Ext.Function.bind(fn, scope);
		}
	}
});