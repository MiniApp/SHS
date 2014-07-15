/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.SnTypeEnum;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity - 序列号
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_sn")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_sn_sequence")
public class SnEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -2886999225655427618L;

    /** 类型 */
    private SnTypeEnum type;

    /** 末值 */
    private Long lastValue;

    @Column(nullable = false, updatable = false, unique = true)
    public SnTypeEnum getType() {
        return type;
    }

    public void setType(SnTypeEnum type) {
        this.type = type;
    }

    @Column(nullable = false)
    public Long getLastValue() {
        return lastValue;
    }

    public void setLastValue(Long lastValue) {
        this.lastValue = lastValue;
    }

}