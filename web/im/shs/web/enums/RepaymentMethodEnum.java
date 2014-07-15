package im.shs.web.enums;

/**
 * Enum - 还款方式
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum RepaymentMethodEnum {

    /** 每期等额本息 */
    each_period_avg_capital_plus_interest,

    /** 每期付息到期还本 */
    each_period_interest_and_last_period_plus_capital,

    /** 当期付息、每期付息、到期还本 */
    current_and_each_period_interest_and_last_period_capital,

    /** 到期还本付息 */
    last_period_capital_plus_interest

}
