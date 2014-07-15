/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 地区
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_area")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_area_sequence")
public class AreaEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 3476262211695181257L;

    /** 树路径分隔符 */
    public static final String TREE_PATH_SEPARATOR = ",";

    /** 名称 */
    private String name;

    /** 全称 */
    private String fullName;

    /** 树路径 */
    private String treePath;

    /** 层级 */
    private Integer grade;

    /** 上级 */
    private AreaEntity parent;

    /** 下级 */
    private Set<AreaEntity> children = new HashSet<AreaEntity>();

    @NotBlank
    @Length(max = 100)
    @Column(nullable = false, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(nullable = false)
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Column(nullable = false, updatable = false)
    public String getTreePath() {
        return treePath;
    }

    public void setTreePath(String treePath) {
        this.treePath = treePath;
    }

    @Column(nullable = false, updatable = false)
    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public AreaEntity getParent() {
        return parent;
    }

    public void setParent(AreaEntity parent) {
        this.parent = parent;
    }

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("order asc")
    public Set<AreaEntity> getChildren() {
        return children;
    }

    public void setChildren(Set<AreaEntity> children) {
        this.children = children;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        AreaEntity parent = getParent();
        if (parent != null) {
            setFullName(parent.getFullName() + getName());
            setTreePath(parent.getTreePath() + parent.getId() + TREE_PATH_SEPARATOR);
        } else {
            setFullName(getName());
            setTreePath(TREE_PATH_SEPARATOR);
        }
        setGrade(StringUtils.split(getTreePath(), TREE_PATH_SEPARATOR).length);
    }

    /**
     * 更新前处理
     */
    @PreUpdate
    public void preUpdate() {
        AreaEntity parent = getParent();
        if (parent != null) {
            setFullName(parent.getFullName() + getName());
        } else {
            setFullName(getName());
        }
    }

    /**
     * 重写toString方法
     * 
     * @return 全称
     */
    @Override
    public String toString() {
        return getFullName();
    }

}