package im.shs.web.plugin.texting.inolinkMb345;

import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.texting.TextingPlugin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

/**
 * @class : InolinkMb345TextingPlugin
 * @description: 凌凯Mb345短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:38:17
 * @version 1.0
 */
@Component("inolinkMb345TextingPlugin")
public class InolinkMb345TextingPlugin extends TextingPlugin {

    @Override
    public String getName() {
        return "凌凯Mb345短信";
    }

    @Override
    public String getVersion() {
        return "1.0";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.mb345.com";
    }

    @Override
    public String getInstallUrl() {
        return "inolink_mb345/install";
    }

    @Override
    public String getUninstallUrl() {
        return "inolink_mb345/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "inolink_mb345/setting";
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
        return "http://mb345.com/WS/BatchSend.aspx";
    }

    @Override
    public void send(String toMobile, String content) throws Exception {
        Map<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("CorpID", getPartner());
        parameterMap.put("Pwd", getKey());
        parameterMap.put("Mobile", toMobile);
        parameterMap.put("Content", content);
        parameterMap.put("Cell", null);
        parameterMap.put("SendTime", null);
        get(getRequestUrl(), parameterMap);
    }

}