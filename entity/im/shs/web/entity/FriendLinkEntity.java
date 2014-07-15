/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.FriendLinkTypeEnum;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 友情链接
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_friend_link")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_friend_link_sequence")
public class FriendLinkEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 7772777844793013357L;

    /** 名称 */
    private String name;

    /** 类型 */
    private FriendLinkTypeEnum type;

    /** LOGO */
    private String logo;

    /** 链接地址 */
    private String url;

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(nullable = false)
    public FriendLinkTypeEnum getType() {
        return type;
    }

    public void setType(FriendLinkTypeEnum type) {
        this.type = type;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    @NotBlank
    @Pattern(regexp = "^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$")
    @Length(max = 200)
    @Column(nullable = false)
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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