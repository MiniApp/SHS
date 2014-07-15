package im.shs.web.enums;

/**
 * Enum - 支付状态
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum PaymentStateEnum {

    /** 待审核 */
    auditing,

    /** 待转账 */
    transferring,

    /** 已取消 */
    cancel,

    /** 已成功 */
    success,

    /** 已失败 */
    failure
}