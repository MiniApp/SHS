package im.shs.web.setting.basic;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

/**
 * @class : BasicSetting
 * @description: 基本设置
 *
 * @author suhao
 * @date 2014年7月12日 下午10:39:17
 * @version 1.0
 */
public class BasicSetting implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = 982827572983485140L;

    /** 网站名称 */
    private String siteName;

    /** 网站网址 */
    private String siteUrl;

    /** 网站LOGO */
    private String siteLogo;

    /** 网站LOGO文件 */
    private MultipartFile siteLogoFile;

    /** 联系地址 */
    private String address;

    /** 联系电话 */
    private String phone;

    /** 邮政编码 */
    private String zipCode;

    /** 邮箱地址 */
    private String email;

    /** 备案编号 */
    private String certtext;

    /** 网站是否开启 */
    private Boolean siteEnabled;

    /** 网站版本 */
    private String siteVersion;

    /** 网站关闭消息 */
    private String siteCloseMessage;

    /** Cookie路径 */
    private String cookiePath;

    /** Cookie作用域 */
    private String cookieDomain;

    /** CNZZ统计是否开启 */
    private Boolean cnzzEnabled;

    /** CNZZ统计站点ID */
    private String cnzzSiteId;

    /** CNZZ统计密码 */
    private String cnzzPassword;

    @NotBlank
    @Length(max = 200)
    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    @NotBlank
    @Length(max = 200)
    public String getSiteUrl() {
        return siteUrl;
    }

    public void setSiteUrl(String siteUrl) {
        this.siteUrl = siteUrl;
    }

    public String getSiteLogo() {
        return siteLogo;
    }

    public void setSiteLogo(String siteLogo) {
        this.siteLogo = siteLogo;
    }

    public MultipartFile getSiteLogoFile() {
        return siteLogoFile;
    }

    public void setSiteLogoFile(MultipartFile siteLogoFile) {
        this.siteLogoFile = siteLogoFile;
    }

    @Length(max = 200)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Length(max = 200)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Length(max = 200)
    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    @Email
    @Length(max = 200)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Length(max = 200)
    public String getCerttext() {
        return certtext;
    }

    public void setCerttext(String certtext) {
        this.certtext = certtext;
    }

    @NotNull
    public Boolean getSiteEnabled() {
        return siteEnabled;
    }

    public void setSiteEnabled(Boolean siteEnabled) {
        this.siteEnabled = siteEnabled;
    }

    @NotBlank
    @Length(max = 200)
    public String getSiteVersion() {
        return siteVersion;
    }

    public void setSiteVersion(String siteVersion) {
        this.siteVersion = siteVersion;
    }

    @NotBlank
    @Length(max = 500)
    public String getSiteCloseMessage() {
        return siteCloseMessage;
    }

    public void setSiteCloseMessage(String siteCloseMessage) {
        this.siteCloseMessage = siteCloseMessage;
    }

    @NotBlank
    @Length(max = 200)
    public String getCookiePath() {
        return cookiePath;
    }

    public void setCookiePath(String cookiePath) {
        if (cookiePath != null && !cookiePath.endsWith("/")) {
            cookiePath += "/";
        }
        this.cookiePath = cookiePath;
    }

    @Length(max = 200)
    public String getCookieDomain() {
        return cookieDomain;
    }

    public void setCookieDomain(String cookieDomain) {
        this.cookieDomain = cookieDomain;
    }

    @NotNull
    public Boolean getCnzzEnabled() {
        return cnzzEnabled;
    }

    public void setCnzzEnabled(Boolean cnzzEnabled) {
        this.cnzzEnabled = cnzzEnabled;
    }

    @Length(max = 200)
    public String getCnzzSiteId() {
        return cnzzSiteId;
    }

    public void setCnzzSiteId(String cnzzSiteId) {
        this.cnzzSiteId = cnzzSiteId;
    }

    @Length(max = 200)
    public String getCnzzPassword() {
        return cnzzPassword;
    }

    public void setCnzzPassword(String cnzzPassword) {
        this.cnzzPassword = cnzzPassword;
    }

    /**
     * 验证站内链接
     * 
     * @param link
     *            链接
     * @param count
     *            计数
     * @return 验证是否通过
     */
    public boolean verifyInboundLink(String link, HttpServletRequest request) {
        return StringUtils.equalsIgnoreCase(link, getSiteUrl()) || StringUtils.startsWith(link, getSiteUrl() + "/")
                || (request != null && StringUtils.startsWith(link, request.getContextPath() + "/"));
    }

}