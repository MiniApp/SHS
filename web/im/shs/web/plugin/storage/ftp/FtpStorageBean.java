package im.shs.web.plugin.storage.ftp;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Bean - FTP存储
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public class FtpStorageBean {

    /** 存储方式名称 */
    private String storageName;

    /** 主机 */
    private String host;

    /** 端口号 */
    private Integer port;

    /** 用户名 */
    private String username;

    /** 密码 */
    private String password;

    /** URL前缀 */
    private String urlPrefix;

    /** 描述 */
    private String description;

    /** 排序 */
    private Integer order;

    /** 是否启用 */
    private Boolean enabled;

    @NotBlank
    @Length(max = 200)
    public String getStorageName() {
        return storageName;
    }

    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }

    @NotBlank
    @Length(max = 200)
    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    @NotNull
    @Min(0)
    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    @NotBlank
    @Length(max = 200)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotBlank
    @Length(max = 200)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotBlank
    @Length(max = 200)
    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = StringUtils.removeEnd(urlPrefix, "/");
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Min(0)
    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    @NotNull
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

}