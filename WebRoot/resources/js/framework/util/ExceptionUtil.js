/**
 * 异常工具类
 * 提供统一处理异常信息的方法.
 * 前台界面开发主要用到：
 * 1：throwValidatorException 参数校验异常：参数校验,条件检查等异常
 * 2：throwBusinessException 业务逻辑异常：业务逻辑相关异常
 * 参数对象：
 *         title 标题
 *         errorCode 错误码
 *         msg 异常信息描述
 *         option 回调函数
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-01
 * @class util.ExceptionUtil
 * @static
 * @example
 *      参数校验
 * 		ExceptionUtil.throwValidatorException({msg:'客户姓名不能为空'});
 *      业务逻辑
 *      ExceptionUtil.throwBusinessException({msg:'AUM值必须大于50万'});
 */
Ext.define('ExceptionUtil', {
			singleton : true,
			alternateClassName : 'ExceptionUtil',
			/**
			 * 框架组件异常：构建组件时出错抛此类异常
			 * 
			 * @type String
			 */
			EXCEPTION_TYPE_FRAMWORK : 'FRAMWORK',
			/**
			 * 系统异常：调用后台服务错误,连接失败等服务等系统级错误
			 * 
			 * @type String
			 */
			EXCEPTION_TYPE_SYSTEM : 'SYSTEM',
			
			/**
			 * 参数校验异常:参数校验,条件检查异常
			 * 
			 * @type String
			 */
			EXCEPTION_TYPE_VALIDATOR : 'VALIDATOR',
			/**
			 * 业务逻辑异常:业务逻辑相关异常
			 * 
			 * @type String
			 */
			EXCEPTION_TYPE_BUSINESS : 'BUSINESS',
			/**
			 * JS框架组件异常:构建组件时出错抛此类异常
			 * 
			 * @param {}
			 *            config->title 标题
			 * @param {}
			 *            config->errorCode 错误码
			 * @param {}
			 *            config->msg 异常信息描述
			 * @param {}
			 *            config->option 回调函数
			 * @static
			 */
			throwFramworkException : function(config) {
				var config = config || {};
				Ext.apply(config,{type:this.EXCEPTION_TYPE_FRAMWORK});
				this.throwException(config);
			},
			/**
			 * 系统异常:调用后台服务错误,连接失败等服务等系统级错误
			 * 
			 * @param {}
			 *            config->title 标题
			 * @param {}
			 *            config->errorCode 错误码
			 * @param {}
			 *            config->msg 异常信息描述
			 * @param {}
			 *            config->option 回调函数
			 * @static
			 */
			throwSystemException : function(config) {
				var config = config || {};
				Ext.apply(config,{type:this.EXCEPTION_TYPE_SYSTEM});
				this.throwException(config);
			},
			/**
			 * 参数校验异常：参数校验,条件检查等异常
			 * 
			 * @param {}
			 *            config->title 标题
			 * @param {}
			 *            config->errorCode 错误码
			 * @param {}
			 *            config->msg 异常信息描述
			 * @param {}
			 *            config->option 回调函数
			 * @static
			 */
			throwValidatorException : function(config) {
				var config = config || {};
				Ext.apply(config,{type:this.EXCEPTION_TYPE_VALIDATOR});
				this.throwException(config);
			},
			/**
			 * 业务逻辑异常：业务逻辑相关异常
			 * 
			 * @param {}
			 *            config->title 标题
			 * @param {}
			 *            config->errorCode 错误码
			 * @param {}
			 *            config->msg 异常信息描述
			 * @param {}
			 *            config->option 回调函数
			 * @static
			 */
			throwBusinessException : function(config) {
				var config = config || {};
				Ext.apply(config,{type:this.EXCEPTION_TYPE_BUSINESS});
				this.throwException(config);
			},
			/**
			 * 异常
			 * 
			 * @param {}
			 *            config->type 异常类型
			 * @param {}
			 *            config->title 标题
			 * @param {}
			 *           config->errorCode 错误码
			 * @param {}
			 *            config->msg 异常信息描述
			 * @param {}
			 *            config->option 回调函数
			 * @private
			 */
			throwException : function(config) {
				Ext.Error.raise(config);
			}
		});
/**
 * 全局异常处理方法
 * 如果返回 true 则异常到此结束，不再继续抛出异常，否则继续向外抛异常
 * @param {} exception
 * @return {Boolean}
 */
Ext.Error.handle = function(exception) {
	if(exception.type == 'FRAMWORK'){
		MsgUtil.error(exception.title || '组件构建异常',exception.msg,exception.option);
	}else if(exception.type == 'SYSTEM'){
		MsgUtil.error(exception.title || '系统异常',exception.msg,exception.option);
	}else if(exception.type == 'VALIDATOR'){
		MsgUtil.error(exception.title || '参数校验异常',exception.msg,exception.option);
	}else if(exception.type == 'BUSINESS'){
		MsgUtil.error(exception.title || '业务逻辑异常',exception.msg,exception.option);
	}else{
		MsgUtil.error(exception.title || '未知异常',exception.msg || exception,exception.option || Ext.emptyFn());
	}
	return false;
    // any non-true return value (including none) will cause the error to be thrown
}