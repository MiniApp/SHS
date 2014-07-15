package im.shs.web.enums;

/**
 * Enum - 期限范围
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum PeriodScopeEnum {

    /** 1-3月 */
    between_1month_and_3month,

    /** 3-6月 */
    between_3month_and_6month,

    /** 6-12月 */
    between_6month_and_12month,

    /** 12-24月 */
    between_12month_and_24month,

    /** 24月以上 */
    over_24month;

    /**
     * 转换期限范围
     * 
     * @param period
     *            期限
     * @return 期限范围
     */
    public static PeriodScopeEnum transfer(Integer period) {
        if (period == null || period < 3) {
            return between_1month_and_3month;
        }
        if (period < 6) {
            return between_3month_and_6month;
        }
        if (period < 12) {
            return between_6month_and_12month;
        }
        if (period < 24) {
            return between_12month_and_24month;
        } else {
            return over_24month;
        }
    }

}
