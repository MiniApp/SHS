/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.BankCardLogTypeEnum;

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
 * Entity - 银行卡日志
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_bank_card_log")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_bank_card_log_sequence")
public class BankCardLogEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -6100096271249503718L;

    /** 类型 */
    private BankCardLogTypeEnum type;

    /** 内容 */
    private String cont;

    /** 是否通过 */
    private Boolean approved;

    /** 操作员 */
    private String operator;

    /** 操作员 */
    private String ip;

    /** 银行卡 */
    private BankCardEntity bankCard;

    @Enumerated
    @Column(nullable = false, updatable = false)
    public BankCardLogTypeEnum getType() {
        return type;
    }

    public void setType(BankCardLogTypeEnum type) {
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
    public BankCardEntity getBankCard() {
        return bankCard;
    }

    public void setBankCard(BankCardEntity bankCard) {
        this.bankCard = bankCard;
    }

}