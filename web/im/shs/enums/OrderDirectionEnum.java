package im.shs.enums;

/**
 * @class : OrderDirectionEnum
 * @description: 排序方向
 *
 * @author suhao
 * @date 2014年7月13日 上午12:21:01
 * @version 1.0
 */
public enum OrderDirectionEnum {

    /** 递增 */
    asc,

    /** 递减 */
    desc;

    /**
     * 从String中获取Direction
     * 
     * @param value
     *            值
     * @return String对应的Direction
     */
    public static OrderDirectionEnum fromString(String value) {
        return OrderDirectionEnum.valueOf(value.toLowerCase());
    }
}
