package im.shs.web.setting.comm;

import java.io.Serializable;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @class : CommSetting
 * @description: 通信设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:24:20
 * @version 1.0
 */
public class CommSetting implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -8467335104105014064L;

    /** 发件人邮箱 */
    private String smtpFromMail;

    /** SMTP服务器地址 */
    private String smtpHost;

    /** SMTP服务器端口 */
    private Integer smtpPort;

    /** SMTP用户名 */
    private String smtpUsername;

    /** SMTP密码 */
    private String smtpPassword;

    /** SMS统一资源定位符 */
    private String smsURL;

    /** SMS用户名 */
    private String smsUsername;

    /** SMS密码 */
    private String smsPassword;

    @NotBlank
    @Email
    @Length(max = 200)
    public String getSmtpFromMail() {
        return smtpFromMail;
    }

    public void setSmtpFromMail(String smtpFromMail) {
        this.smtpFromMail = smtpFromMail;
    }

    @NotBlank
    @Length(max = 200)
    public String getSmtpHost() {
        return smtpHost;
    }

    public void setSmtpHost(String smtpHost) {
        this.smtpHost = smtpHost;
    }

    @NotNull
    @Min(value = 0)
    public Integer getSmtpPort() {
        return smtpPort;
    }

    public void setSmtpPort(Integer smtpPort) {
        this.smtpPort = smtpPort;
    }

    @NotBlank
    @Length(max = 200)
    public String getSmtpUsername() {
        return smtpUsername;
    }

    public void setSmtpUsername(String smtpUsername) {
        this.smtpUsername = smtpUsername;
    }

    @NotBlank
    @Length(max = 200)
    public String getSmtpPassword() {
        return smtpPassword;
    }

    public void setSmtpPassword(String smtpPassword) {
        this.smtpPassword = smtpPassword;
    }

    @NotBlank
    @Length(max = 200)
    public String getSmsURL() {
        return smsURL;
    }

    public void setSmsURL(String smsURL) {
        this.smsURL = smsURL;
    }

    @NotBlank
    @Length(max = 200)
    public String getSmsUsername() {
        return smsUsername;
    }

    public void setSmsUsername(String smsUsername) {
        this.smsUsername = smsUsername;
    }

    @NotBlank
    @Length(max = 200)
    public String getSmsPassword() {
        return smsPassword;
    }

    public void setSmsPassword(String smsPassword) {
        this.smsPassword = smsPassword;
    }

}