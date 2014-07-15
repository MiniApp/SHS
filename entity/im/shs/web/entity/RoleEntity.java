/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 角色
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_role")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_role_sequence")
public class RoleEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 130105948566406151L;

    /** 名称 */
    private String name;

    /** 是否内置 */
    private Boolean builtin;

    /** 描述 */
    private String description;

    /** 权限 */
    private List<String> auths = new ArrayList<String>();

    /** 管理员 */
    private Set<AdminEntity> admins = new HashSet<AdminEntity>();

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false, unique = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(nullable = false, updatable = false)
    public Boolean getBuiltin() {
        return builtin;
    }

    public void setBuiltin(Boolean builtin) {
        this.builtin = builtin;
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ElementCollection
    @CollectionTable(name = "p2p_roles_auths")
    public List<String> getAuths() {
        return auths;
    }

    public void setAuths(List<String> auths) {
        this.auths = auths;
    }

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    public Set<AdminEntity> getAdmins() {
        return admins;
    }

    public void setAdmins(Set<AdminEntity> admins) {
        this.admins = admins;
    }

    /**
     * 重写toString方法
     * 
     * @return 名称
     */
    @Override
    public String toString() {
        return getName();
    }

}