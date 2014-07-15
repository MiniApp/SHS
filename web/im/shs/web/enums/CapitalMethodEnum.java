package im.shs.web.enums;
/**
 * Enum - 资金方式
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum CapitalMethodEnum {
    
    /** 后台充值 */
    admin_recharge,

    /** 后台扣费 */
    admin_charge,

    /** 充值 */
    recharge,

    /** 充值服务费 */
    recharge_fee,

    /** 提现 */
    withdrawal,

    /** 提现服务费 */
    withdrawal_fee,

    /** 担保 */
    guarantee,

    /** 投资 */
    investment,

    /** 投资服务费 */
    investment_fee,

    /** 借款 */
    borrowing,

    /** 借款服务费 */
    borrowing_fee,

    /** 还款 */
    repayment,

    /** 还款服务费 */
    repayment_fee,

    /** 还款逾期利息 */
    repayment_overdue_interest,

    /** 回收 */
    recovery,

    /** 回收服务费 */
    recovery_fee
}
