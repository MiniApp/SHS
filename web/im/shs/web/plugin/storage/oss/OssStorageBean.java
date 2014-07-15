package im.shs.web.plugin.storage.oss;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @class : OssStorageBean
 * @description: 阿里云存储
 *
 * @author suhao
 * @date 2014年7月14日 下午11:06:58
 * @version 1.0
 */
public class OssStorageBean {

    /** 存储方式名称 */
    private String storageName;

    /** ACCESS ID */
    private String accessId;

    /** ACCESS KEY */
    private String accessKey;

    /** BUCKET名称 */
    private String bucketName;

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
    public String getAccessId() {
        return accessId;
    }

    public void setAccessId(String accessId) {
        this.accessId = accessId;
    }

    @NotBlank
    @Length(max = 200)
    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    @NotBlank
    @Length(max = 200)
    public String getBucketName() {
        return bucketName;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
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