package im.shs.web.enums;

import java.math.BigDecimal;

/**
 * Enum - 额度范围
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum AmountScopeEnum {

    /** 2000以下 */
    under_2k,

    /** 2000-5000 */
    between_2k_and_5k,

    /** 5000-10000 */
    between_5k_and_10k,

    /** 1万-3万 */
    between_10k_and_30k,

    /** 3万-5万 */
    between_30k_and_50k,

    /** 5万-10万 */
    between_30k_and_100k,

    /** 10万以上 */
    over_100k;

    /**
     * 转换额度范围
     * 
     * @param amount
     *            额度
     * @return 额度范围
     */
    public static AmountScopeEnum transfer(BigDecimal amount) {
        if (amount == null || amount.compareTo(new BigDecimal("2000")) < 0) {
            return under_2k;
        }
        if (amount.compareTo(new BigDecimal("5000")) < 0) {
            return between_2k_and_5k;
        }
        if (amount.compareTo(new BigDecimal("10000")) < 0) {
            return between_5k_and_10k;
        }
        if (amount.compareTo(new BigDecimal("30000")) < 0) {
            return between_10k_and_30k;
        }
        if (amount.compareTo(new BigDecimal("50000")) < 0) {
            return between_30k_and_50k;
        }
        if (amount.compareTo(new BigDecimal("100000")) < 0) {
            return between_30k_and_100k;
        } else {
            return over_100k;
        }
    }

}
