/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.ReferralFeeStateEnum;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity - 推荐费
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_referral_fee")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_referral_fee_sequence")
public class ReferralFeeEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 5108529236844459305L;

    /** 状态 */
    private ReferralFeeStateEnum state;

    /** 推荐金额 */
    private BigDecimal referralAmt;

    /** 推荐费率 */
    private BigDecimal referralFeeRate;

    /** 推荐费 */
    private BigDecimal referralFee;

    /** 计划结算日期 */
    private Date planPaymentDate;

    /** 实际结算日期 */
    private Date paymentDate;

    /** 备注 */
    private String memo;

    /** 操作员 */
    private String operator;

    /** IP */
    private String ip;

    /** 推荐人 */
    private MemberEntity referrer;

    /** 被推荐人 */
    private MemberEntity referral;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 投资 */
    private InvestmentEntity investment;

    @Enumerated
    @Column(nullable = false)
    public ReferralFeeStateEnum getState() {
        return state;
    }

    public void setState(ReferralFeeStateEnum state) {
        this.state = state;
    }

    @Column(nullable = false)
    public BigDecimal getReferralAmt() {
        return referralAmt;
    }

    public void setReferralAmt(BigDecimal referralAmt) {
        this.referralAmt = referralAmt;
    }

    public BigDecimal getReferralFeeRate() {
        return referralFeeRate;
    }

    public void setReferralFeeRate(BigDecimal referralFeeRate) {
        this.referralFeeRate = referralFeeRate;
    }

    @Column(nullable = false)
    public BigDecimal getReferralFee() {
        return referralFee;
    }

    public void setReferralFee(BigDecimal referralFee) {
        this.referralFee = referralFee;
    }

    @Column(nullable = false)
    public Date getPlanPaymentDate() {
        return planPaymentDate;
    }

    public void setPlanPaymentDate(Date planPaymentDate) {
        this.planPaymentDate = planPaymentDate;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getReferrer() {
        return referrer;
    }

    public void setReferrer(MemberEntity referrer) {
        this.referrer = referrer;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getReferral() {
        return referral;
    }

    public void setReferral(MemberEntity referral) {
        this.referral = referral;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public BorrowingEntity getBorrowing() {
        return borrowing;
    }

    public void setBorrowing(BorrowingEntity borrowing) {
        this.borrowing = borrowing;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public InvestmentEntity getInvestment() {
        return investment;
    }

    public void setInvestment(InvestmentEntity investment) {
        this.investment = investment;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        setState(ReferralFeeStateEnum.paying);
        setReferralFee(getReferralAmt().multiply(getReferralFeeRate().divide(BigDecimal.TEN).divide(BigDecimal.TEN)));
    }

}