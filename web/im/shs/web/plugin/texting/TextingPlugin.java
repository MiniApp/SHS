package im.shs.web.plugin.texting;

import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.BasePlugin;

/**
 * @class : TextingPlugin
 * @description: 短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:34:46
 * @version 1.0
 */
public abstract class TextingPlugin extends BasePlugin {

    /** “合作编号”属性 */
    public static final String PARTNER_ATTR = "partner";

    /** “密匙”属性 */
    public static final String KEY_ATTR = "key";

    /** “描述”属性 */
    public static final String DESCRIPTION_ATTR = "description";

    /**
     * 获取合作编号
     * 
     * @return 合作编号
     */
    public String getPartner() {
        return getAttribute(PARTNER_ATTR);
    }

    /**
     * 获取密匙
     * 
     * @return 密匙
     */
    public String getKey() {
        return getAttribute(KEY_ATTR);
    }

    /**
     * 获取描述
     * 
     * @return 描述
     */
    public String getDescription() {
        return getAttribute(DESCRIPTION_ATTR);
    }

    /**
     * 获取请求方式
     * 
     * @return 请求方式
     */
    public abstract RequestMethodEnum getRequestMethod();

    /**
     * 获取请求字符编码
     * 
     * @return 请求字符编码
     */
    public abstract String getRequestCharset();

    /**
     * 获取请求URL
     * 
     * @return 请求URL
     */
    public abstract String getRequestUrl();

    /**
     * 短信发送
     * 
     * @param toMobile
     *            收件人手机号码
     * @param content
     *            短信内容
     */
    public abstract void send(String toMobile, String content) throws Exception;

}