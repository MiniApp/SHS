
package im.shs.web.enums;

/**
 * @class : FilterOperatorEnum
 * @description: 过滤器运算符
 *
 * @author suhao
 * @date 2014年7月13日 上午12:33:51
 * @version 1.0
 */
public enum FilterOperatorEnum {

    /** 等于 */
    eq,

    /** 不等于 */
    ne,

    /** 大于 */
    gt,

    /** 小于 */
    lt,

    /** 大于等于 */
    ge,

    /** 小于等于 */
    le,

    /** 相似 */
    like,

    /** 包含 */
    in,

    /** 为Null */
    isNull,

    /** 不为Null */
    isNotNull;

    /**
     * 从String中获取Operator
     * 
     * @param value
     *            值
     * @return String对应的operator
     */
    public static FilterOperatorEnum fromString(String value) {
        return FilterOperatorEnum.valueOf(value.toLowerCase());
    }
}
