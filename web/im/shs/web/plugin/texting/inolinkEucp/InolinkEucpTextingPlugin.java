package im.shs.web.plugin.texting.inolinkEucp;

import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.texting.TextingPlugin;
import im.shs.web.plugin.texting.inolinkEucp.bean.CommandBean;
import im.shs.web.plugin.texting.inolinkEucp.bean.MessageBean;
import im.shs.web.util.XmlUtils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

/**
 * @class : InolinkEucpTextingPlugin
 * @description: 凌凯Eucp短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:35:27
 * @version 1.0
 */
@Component("inolinkEucpTextingPlugin")
public class InolinkEucpTextingPlugin extends TextingPlugin {

    @Override
    public String getName() {
        return "凌凯Eucp短信";
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
        return "http://www.inolink.com";
    }

    @Override
    public String getInstallUrl() {
        return "inolink_eucp/install";
    }

    @Override
    public String getUninstallUrl() {
        return "inolink_eucp/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "inolink_eucp/setting";
    }

    @Override
    public RequestMethodEnum getRequestMethod() {
        return RequestMethodEnum.post;
    }

    @Override
    public String getRequestCharset() {
        return "GBK";
    }

    @Override
    public String getRequestUrl() {
        return "http://eucp.inolink.com/Api/Execute";
    }

    @Override
    public void send(String toMobile, String content) throws Exception {
        // 消息
        MessageBean messageBean = new MessageBean();
        messageBean.setType("2");
        messageBean.setTitle(getPartner());
        messageBean.setReceiver(toMobile);
        messageBean.setContent(content);
        // 命令
        CommandBean commandBean = new CommandBean();
        commandBean.setFunction("SendMessage");
        commandBean.setUsername(getPartner());
        commandBean.setPassword(getKey());
        commandBean.setSign("");
        commandBean.setMessage(messageBean);
        // 发送短信
        Map<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("Command", XmlUtils.convertString(commandBean));
        post(getRequestUrl(), parameterMap);
    }

}