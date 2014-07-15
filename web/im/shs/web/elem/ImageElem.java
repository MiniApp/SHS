/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.elem;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import javax.validation.constraints.Min;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

/**
 * Elem - 图片
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Embeddable
public class ImageElem implements Serializable, Comparable<ImageElem> {

    /** serialVersionUID */
    private static final long serialVersionUID = 2813009143487356400L;

    /** 标题 */
    private String title;

    /** 原图片 */
    private String source;

    /** 大图片 */
    private String large;

    /** 中图片 */
    private String medium;

    /** 缩略图 */
    private String thumbnail;

    /** 排序 */
    private Integer order;

    /** 文件 */
    private MultipartFile file;

    @Length(max = 200)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Length(max = 200)
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @Length(max = 200)
    public String getLarge() {
        return large;
    }

    public void setLarge(String large) {
        this.large = large;
    }

    @Length(max = 200)
    public String getMedium() {
        return medium;
    }

    public void setMedium(String medium) {
        this.medium = medium;
    }

    @Length(max = 200)
    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    @Min(0)
    @Column(name = "orders")
    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    /**
     * 获取文件
     * 
     * @return 文件
     */
    @Transient
    public MultipartFile getFile() {
        return file;
    }

    /**
     * 设置文件
     * 
     * @param file
     *            文件
     */
    public void setFile(MultipartFile file) {
        this.file = file;
    }

    /**
     * 判断是否为空
     * 
     * @return 是否为空
     */
    @Transient
    public boolean isEmpty() {
        return (getFile() == null || getFile().isEmpty())
                && (StringUtils.isBlank(getSource()) || StringUtils.isBlank(getLarge())
                        || StringUtils.isBlank(getMedium()) || StringUtils.isBlank(getThumbnail()));
    }

    /**
     * 实现compareTo方法
     * 
     * @param image
     *            图片
     * @return 比较结果
     */
    @Override
    public int compareTo(ImageElem image) {
        return new CompareToBuilder().append(getOrder(), image.getOrder()).toComparison();
    }

}