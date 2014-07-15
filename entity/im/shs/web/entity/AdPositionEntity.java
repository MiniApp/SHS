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
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 广告位
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_ad_position")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_ad_position_sequence")
public class AdPositionEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 392813467734632250L;

    /** 名称 */
    private String name;

    /** 标识 */
    private String ident;

    /** 是否内置 */
    private Boolean builtin;

    /** 宽度 */
    private Integer width;

    /** 高度 */
    private Integer height;

    /** 描述 */
    private String description;

    /** 模板 */
    private String template;

    /** 广告 */
    private Set<AdEntity> ads = new HashSet<AdEntity>();

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

    @NotNull
    @Min(0)
    @Column(nullable = false)
    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    @NotNull
    @Min(0)
    @Column(nullable = false)
    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @NotBlank
    @Length(max = 3000)
    @Lob
    @Column(nullable = false, length = 3000)
    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    @OneToMany(mappedBy = "position", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("order asc")
    public Set<AdEntity> getAds() {
        return ads;
    }

    public void setAds(Set<AdEntity> ads) {
        this.ads = ads;
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