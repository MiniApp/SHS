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
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 词典
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_dict")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_dict_sequence")
public class DictEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 6390958151840664098L;

    /** 名称 */
    private String name;

    /** 标识 */
    private String ident;

    /** 是否内置 */
    private Boolean builtin;

    /** 描述 */
    private String description;

    /** 单词 */
    private Set<DictWordEntity> words = new HashSet<DictWordEntity>();

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotBlank
    @Pattern(regexp = "^\\w+$")
    @Length(max = 100)
    @Column(nullable = false, unique = true)
    public String getIdent() {
        return ident;
    }

    public void setIdent(String ident) {
        this.ident = ident;
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

    @OneToMany(mappedBy = "dict", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<DictWordEntity> getWords() {
        return words;
    }

    public void setWords(Set<DictWordEntity> words) {
        this.words = words;
    }

    /**
     * 重写toString方法
     * 
     * @return 全称
     */
    @Override
    public String toString() {
        return getName();
    }

}