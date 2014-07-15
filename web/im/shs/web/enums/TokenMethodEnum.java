package im.shs.web.enums;

/**
 * Enum - 令牌方式
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum TokenMethodEnum {

    /** 注册 */
    user_regist,

    /** 绑定手机 */
    mobile_binding,

    /** 修改手机 */
    mobile_modif,

    /** 绑定邮箱 */
    email_binding,

    /** 修改邮箱 */
    email_modif,

    /** 绑定银行卡 */
    bankcard_binding,

    /** 修改银行卡 */
    bankcard_modif,

    /** 找回登录密码 */
    user_password_find,

    /** 修改登录密码 */
    user_password_modif,

    /** 找回支付密码 */
    account_password_find,

    /** 修改支付密码 */
    account_password_modif

}
