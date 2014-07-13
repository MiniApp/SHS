/**
 * 提示消息处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class MsgUtil
 */
ObjectUtil.define("MsgUtil", {
			statics : {
				/*
				 * 警告框 title:标题 content:内容 fn:回调函数
				 */
				alert : function(title, content, fn, width) {
					Ext.Msg.show({
								title : title,
								msg : content,
								width : width || 350,
								buttons : Ext.Msg.OK,
								fn : fn,
								icon : Ext.Msg.INFO
							});
				},
				/*
				 * 确认框 title:标题 content:提示内容 fn:回调函数
				 */
				confirm : function(title, content, fn, width) {
					Ext.Msg.confirm({
								title : title,
								icon : Ext.Msg.QUESTION,
								msg : content,
								width : width || 350,
								buttons : Ext.Msg.YESNO,
								callback : fn
							});
				},
				/*
				 * 提示框 title:标题 content:内容 fn:回调函数
				 */
				prompt : function(title, content, fn, width) {
					Ext.Msg.prompt({
								prompt : true,
								title : title,
								width : width || 350,
								msg : content,
								buttons : Ext.Msg.OKCANCEL,
								callback : fn
							});
				},
				/*
				 * 定制错误消息框 title:标题 content:内容 fn:回调函数
				 */
				error : function(title, content, fn, width) {
					Ext.Msg.show({
								title : title,
								msg : content,
								width : width || 350,
								buttons : Ext.Msg.OK,
								fn : fn,
								icon : Ext.Msg.ERROR
							});
				},
				/*
				 * 定制错误消息框 title:标题 content:内容 fn:回调函数
				 */
				show : function(title, content, fn, width) {
					Ext.Msg.show({
								title : title,
								width : width || 350,
								msg : content,
								buttons : Ext.MessageBox.YESNOCANCEL,
								fn : fn,
								icon : Ext.MessageBox.QUESTION
							});
				},

				/*
				 * 创建覆盖domId参数指定的区域的以msg参数指定的内容未提示内容的等待提示框
				 */
				mask : function(domId, msg) {
					Ext.get(domId).mask(msg);
				},
				/*
				 * 取消覆盖domId参数指定的区域的等待提示框
				 */
				unmask : function(domId) {
					Ext.get(domId).unmask();
				}

			}
		});