package im.shs.web.plugin.texting.zucp;

import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.texting.TextingPlugin;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * @class : ZucpTextingPlugin
 * @description: 漫道短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:40:16
 * @version 1.0
 */
@Component("zucpTextingPlugin")
public class ZucpTextingPlugin extends TextingPlugin {

    @Override
    public String getName() {
        return "漫道短信";
    }

    @Override
    public String getVersion() {
        return "1.1";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.zucp.net";
    }

    @Override
    public String getInstallUrl() {
        return "zucp/install";
    }

    @Override
    public String getUninstallUrl() {
        return "zucp/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "zucp/setting";
    }

    @Override
    public RequestMethodEnum getRequestMethod() {
        return RequestMethodEnum.get;
    }

    @Override
    public String getRequestCharset() {
        return "GBK";
    }

    @Override
    public String getRequestUrl() {
        return "http://sdk2.entinfo.cn:8061/mdsmssend.ashx";
    }

    @Override
    public void send(String toMobile, String content) throws Exception {
        Map<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("sn", getPartner());
        parameterMap.put("pwd", StringUtils.upperCase(DigestUtils.md5Hex(getPartner() + getKey())));
        parameterMap.put("mobile", toMobile);
        parameterMap.put("content", content);
        parameterMap.put("ext", null);
        parameterMap.put("stime", null);
        parameterMap.put("rrid", null);
        parameterMap.put("msgfmt", null);
        get(getRequestUrl(), parameterMap);
    }

}