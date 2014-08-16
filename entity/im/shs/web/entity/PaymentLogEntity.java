/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.PaymentLogTypeEnum;

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
 * Entity - 支付日志
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_payment_log")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_payment_log_sequence")
public class PaymentLogEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -7544121025629492590L;

    /** 类型 */
    private PaymentLogTypeEnum type;

    /** 内容 */
    private String cont;

    /** 是否通过 */
    private Boolean approved;

    /** 操作员 */
    private String operator;

    /** 操作员 */
    private String ip;

    /** 支付 */
    private PaymentEntity payment;

    @Enumerated
    @Column(nullable = false, updatable = false)
    public PaymentLogTypeEnum getType() {
        return type;
    }

    public void setType(PaymentLogTypeEnum type) {
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
    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
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
    public PaymentEntity getPayment() {
        return payment;
    }

    public void setPayment(PaymentEntity payment) {
        this.payment = payment;
    }

}