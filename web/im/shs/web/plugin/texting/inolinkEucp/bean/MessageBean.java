package im.shs.web.plugin.texting.inolinkEucp.bean;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

/**
 * @class : MessageBean
 * @description: 消息
 *
 * @author suhao
 * @date 2014年7月16日 下午10:37:28
 * @version 1.0
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class MessageBean {

    /** 标题 */
    @XmlElement(name = "Title")
    private String title;

    /** 消息类型 */
    @XmlElement(name = "MessageType")
    private String type;

    /** 收信人 */
    @XmlElement(name = "ReceiveNum")
    private String receiver;

    /** 内容 */
    @XmlElement(name = "Content")
    private String content;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}