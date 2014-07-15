package im.shs.web.enums;

/**
 * @class : SequencerDirectionEnum
 * @description: 定序器方向
 *
 * @author suhao
 * @date 2014年7月14日 下午9:48:00
 * @version 1.0
 */
public enum SequencerDirectionEnum {

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
    public static SequencerDirectionEnum fromString(String value) {
        return SequencerDirectionEnum.valueOf(value.toLowerCase());
    }
}
