package im.shs.enums;

/**
 * @class : CaptchaTypeEnum
 * @description: 验证码类型
 * 
 * @author suhao
 * @date 2014年7月13日 上午12:48:05
 * @version 1.0
 */
public enum CaptchaTypeEnum {

	/** 后台登录 */
	adminLogin,

	/** 登录 */
	login,

	/** 注册 */
	regist,

	/** 修改密码 */
	modifyPassword,

	// /** 设置邮箱地址 */
	// setEmail,
	//
	// /** 修改邮箱地址 */
	// modifyEmail,
	//
	// /** 修改手机号码 */
	// setMobile,
	//
	// /** 修改手机号码 */
	// modifyMobile,
	//
	// /** 设置身份 */
	// setIdentity,
	//
	// /** 修改身份 */
	// modifyIdentity,
	//
	// /** 设置支付密码 */
	// setPayPassword,
	//
	// /** 修改支付密码 */
	// modifyPayPassword,

	/** 找回密码 */
	findPassword,

	/** 重置密码 */
	resetPassword,

	/** 申请借款 */
	applyBorrowing
}
