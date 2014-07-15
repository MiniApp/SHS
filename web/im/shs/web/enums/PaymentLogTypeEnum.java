package im.shs.web.enums;

/**
 * Enum - 支付日志类型
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum PaymentLogTypeEnum {

    /** 申请 */
    apply,

    /** 提交 */
    submit,

    /** 修改 */
    modify,

    /** 审核 */
    audit,
    
    /** 支付 */
    pay,
    
    /** 转账 */
    transfer,

    /** 取消 */
    cancel,

    /** 补救 */
    remedy
}