package im.shs.web.enums;

import java.math.BigDecimal;

/**
 * Enum - 利率范围
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum InterestRateScopeEnum {

    /** 0-5% */
    between_0_and_5,

    /** 5-10% */
    between_5_and_10,

    /** 10-15% */
    between_10_and_15,

    /** 15-20% */
    between_15_and_20,

    /** 20-24% */
    between_20_and_24,

    /** 24%以上 */
    over_24;

    /**
     * 转换利率范围
     * 
     * @param interestRate
     *            利率
     * @return 利率范围
     */
    public static InterestRateScopeEnum transfer(BigDecimal interestRate) {
        if (interestRate == null || interestRate.compareTo(new BigDecimal("5")) < 0) {
            return between_0_and_5;
        }
        if (interestRate.compareTo(new BigDecimal("10")) < 0) {
            return between_5_and_10;
        }
        if (interestRate.compareTo(new BigDecimal("15")) < 0) {
            return between_10_and_15;
        }
        if (interestRate.compareTo(new BigDecimal("20")) < 0) {
            return between_15_and_20;
        }
        if (interestRate.compareTo(new BigDecimal("24")) < 0) {
            return between_20_and_24;
        } else {
            return over_24;
        }
    }

}
