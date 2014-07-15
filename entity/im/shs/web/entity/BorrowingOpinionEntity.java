/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.BorrowingOpinionTypeEnum;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 借款意见
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_borrowing_opinion")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_borrowing_opinion_sequence")
public class BorrowingOpinionEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 3005798426711296068L;

    /** 类型 */
    private BorrowingOpinionTypeEnum type;

    /** 内容 */
    private String cont;

    /** 操作员 */
    private String operator;

    /** 操作员 */
    private String ip;

    /** 借款 */
    private BorrowingEntity borrowing;

    @Enumerated
    @Column(nullable = false, updatable = false)
    public BorrowingOpinionTypeEnum getType() {
        return type;
    }

    public void setType(BorrowingOpinionTypeEnum type) {
        this.type = type;
    }

    @NotBlank
    @Length(max = 200)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    @Column(updatable = false)
    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    @Column(updatable = false)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public BorrowingEntity getBorrowing() {
        return borrowing;
    }

    public void setBorrowing(BorrowingEntity borrowing) {
        this.borrowing = borrowing;
    }

}