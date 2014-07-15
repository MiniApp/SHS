/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.listener.EntityListener;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import javax.validation.groups.Default;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Entity - 基类
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@JsonAutoDetect(fieldVisibility = Visibility.NONE, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE, isGetterVisibility = Visibility.NONE, creatorVisibility = Visibility.NONE)
@EntityListeners(EntityListener.class)
@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -3703154275817120085L;

    /** “ID”属性 */
    public static final String ID_PROP = "id";

    /** “创建日期”属性 */
    public static final String CREATE_DATE_PROP = "createDate";

    /** “更新日期”属性 */
    public static final String UPDATE_DATE_PROP = "modifyDate";

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
     * 生成HashCode
     * 
     * @return HashCode
     */
    @Override
    @Transient
    public int hashCode() {
        return 17 + (isEmpty() ? 0 : getId().hashCode() * 31);
    }

    /**
     * 判断是否相等
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    @Transient
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (isEmpty() || obj == null || !getClass().isAssignableFrom(obj.getClass())) {
            return false;
        }
        BaseEntity entity = (BaseEntity) obj;
        if (entity.isEmpty()) {
            return false;
        }
        return getId().equals(entity.getId());
    }

    /**
     * 判断是否为空
     * 
     * @return 是否为空
     */
    @Transient
    public boolean isEmpty() {
        return getId() == null;
    }

}