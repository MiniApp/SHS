package im.shs.web.plugin.texting.inolinkEucp.bean;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @class : CommandBean
 * @description: 命令
 *
 * @author suhao
 * @date 2014年7月16日 下午10:37:04
 * @version 1.0
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "Root")
public class CommandBean {

    /** 函数 */
    @XmlElement(name = "Function")
    private String function;

    /** 用户名 */
    @XmlElement(name = "LoginName")
    private String username;

    /** 密码 */
    @XmlElement(name = "Password")
    private String password;

    /** 签名 */
    @XmlElement(name = "SignedData")
    private String sign;

    /** 消息 */
    @XmlElement(name = "RequestData")
    private MessageBean message;

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public MessageBean getMessage() {
        return message;
    }

    public void setMessage(MessageBean message) {
        this.message = message;
    }

}