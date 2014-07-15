/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.AdTypeEnum;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

/**
 * Entity - 广告
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_ad")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_ad_sequence")
public class AdEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -6122935153829384518L;

    /** 类型 */
    private AdTypeEnum type;

    /** 标题 */
    private String title;

    /** 路径 */
    private String path;

    /** 内容 */
    private String cont;

    /** 开始日期 */
    private Date startDate;

    /** 结束日期 */
    private Date endDate;

    /** 链接地址 */
    private String url;

    /** 位置 */
    private AdPositionEntity position;

    @NotNull
    @Enumerated
    @Column(nullable = false)
    public AdTypeEnum getType() {
        return type;
    }

    public void setType(AdTypeEnum type) {
        this.type = type;
    }

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Length(max = 200)
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Lob
    @Length(max = 3000)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @URL
    @Length(max = 200)
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    public AdPositionEntity getPosition() {
        return position;
    }

    public void setPosition(AdPositionEntity position) {
        this.position = position;
    }

    /**
     * 重写toString方法
     * 
     * @return 标题
     */
    @Override
    public String toString() {
        return getTitle();
    }

    /**
     * 判断是否有效
     * 
     * @return 是否有效
     */
    @Transient
    public boolean valid() {
        return (getStartDate() == null || new Date().after(getStartDate()))
                && (getEndDate() == null || new Date().before(getEndDate()));
    }

    /**
     * 判断是否已开始
     * 
     * @return 是否已开始
     */
    @Transient
    public boolean started() {
        return getStartDate() == null || new Date().after(getStartDate());
    }

    /**
     * 判断是否已结束
     * 
     * @return 是否已结束
     */
    @Transient
    public boolean ended() {
        return getEndDate() != null && new Date().after(getEndDate());
    }

    /**
     * 验证位置
     * 
     * @param positionId
     *            位置ID
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyPosition(Long positionId) {
        return positionId == null || getPosition() == null || getPosition().getId().equals(positionId);
    }

}