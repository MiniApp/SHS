package im.shs;

/**
 * @class : CommonAttrs
 * @description: 公共参数
 *
 * @author suhao
 * @date 2014年7月13日 上午12:15:26
 * @version 1.0
 */
public final class CommonAttrs {

    /** 日期格式配比 */
    public static final String[] DATE_PATTERNS = new String[] { "yyyy", "yyyy-MM", "yyyyMM", "yyyy/MM", "yyyy-MM-dd",
            "yyyyMMdd", "yyyy/MM/dd", "yyyy-MM-dd HH:mm:ss", "yyyyMMddHHmmss", "yyyy/MM/dd HH:mm:ss" };

    /**
     * 不可实例化
     */
    private CommonAttrs() {
    }

}