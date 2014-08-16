/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 词典单词
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_dict_word")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_dict_word_sequence")
public class DictWordEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -6925525452024223734L;

    /** 名称 */
    private String name;

    /** 参数 */
    private String param;

    /** 词典 */
    private DictEntity dict;

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
    @Length(max = 200)
    @Column(nullable = false)
    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    @NotNull(groups = Save.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    public DictEntity getDict() {
        return dict;
    }

    public void setDict(DictEntity dict) {
        this.dict = dict;
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