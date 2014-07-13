package im.shs.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.validation.groups.Default;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @class : BaseEntity
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:17:54
 * @version 1.0
 */
@JsonAutoDetect(fieldVisibility = Visibility.NONE, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE, isGetterVisibility = Visibility.NONE, creatorVisibility = Visibility.NONE)
@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -3703154275817120085L;

    /** “ID”属性名称 */
    public static final String ID_PROPERTY_NAME = "id";

    /** “创建日期”属性名称 */
    public static final String CREATE_DATE_PROPERTY_NAME = "createDate";

    /** “修改日期”属性名称 */
    public static final String MODIFY_DATE_PROPERTY_NAME = "modifyDate";

    /** ID */
    private Long id;

    /** 创建日期 */
    private Date createDate;

    /** 修改日期 */
    private Date modifyDate;

    @JsonProperty
    @Id
    // MySQL/SQLServer: @GeneratedValue(strategy = GenerationType.AUTO)
    // Oracle: @GeneratedValue(strategy = GenerationType.AUTO, generator =
    // "sequenceGenerator")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonProperty
    @Column(nullable = false, updatable = false)
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @JsonProperty
    @Column(nullable = false)
    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    /**
     * 保存验证组
     */
    public interface Save extends Default {

    }

    /**
     * 更新验证组
     */
    public interface Update extends Default {

    }

    /**
     * 重写equals方法
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        if (!getClass().isAssignableFrom(obj.getClass())) {
            return false;
        }
        BaseEntity other = (BaseEntity) obj;
        return getId() != null ? getId().equals(other.getId()) : false;
    }

    /**
     * 重写hashCode方法
     * 
     * @return hashCode
     */
    @Override
    public int hashCode() {
        int hashCode = 17;
        hashCode += null == getId() ? 0 : getId().hashCode() * 31;
        return hashCode;
    }

}