package im.shs.web.plugin.texting.inolinkEucp;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @class : InolinkEucpTextingBean
 * @description: 凌凯Eucp短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:36:31
 * @version 1.0
 */
public class InolinkEucpTextingBean {

    /** 合作编号 */
    private String partner;

    /** 密匙 */
    private String key;

    /** 描述 */
    private String description;

    /** 排序 */
    private Integer order;

    /** 是否启用 */
    private Boolean enabled;

    @NotBlank
    @Length(max = 200)
    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    @NotBlank
    @Length(max = 200)
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
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