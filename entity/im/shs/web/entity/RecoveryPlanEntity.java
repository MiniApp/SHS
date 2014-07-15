/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.RecoveryStateEnum;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Bean - 回收计划
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_recovery_plan")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_recovery_plan_sequence")
public class RecoveryPlanEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 2980656910293607697L;

    /** 状态 */
    private RecoveryStateEnum state;

    /** 本金 */
    private BigDecimal capital;

    /** 期数 */
    private Integer period;

    /** 利息 */
    private BigDecimal interest;

    /** 已回收本金 */
    private BigDecimal recoveredCapital;

    /** 已回收利息 */
    private BigDecimal recoveredInterest;

    /** 计划回收日期 */
    private Date date;

    /** 实际回收日期 */
    private Date recoveredDate;

    /** 服务费 */
    private BigDecimal fee;

    /** 已付服务费 */
    private BigDecimal paidFee;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 投资 */
    private InvestmentEntity investment;

    /** 还款 */
    private RepaymentEntity repayment;

    /** 还款计划 */
    private RepaymentPlanEntity repaymentPlan;

    /** 回收 */
    private RecoveryEntity recovery;

    /** 投资人 */
    private MemberEntity investor;

    /** 还款人 */
    private MemberEntity borrower;

    /** 资金 */
    private Set<CapitalEntity> capitals = new HashSet<CapitalEntity>();

    @Enumerated
    @Column(nullable = false)
    public RecoveryStateEnum getState() {
        return state;
    }

    public void setState(RecoveryStateEnum state) {
        this.state = state;
    }

    @Column(nullable = false)
    public BigDecimal getCapital() {
        return capital;
    }

    public void setCapital(BigDecimal capital) {
        this.capital = capital;
    }

    @Column(nullable = false)
    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    @Column(nullable = false)
    public BigDecimal getInterest() {
        return interest;
    }

    public void setInterest(BigDecimal interest) {
        this.interest = interest;
    }

    @Column(nullable = false)
    public BigDecimal getRecoveredCapital() {
        return recoveredCapital;
    }

    public void setRecoveredCapital(BigDecimal recoveredCapital) {
        this.recoveredCapital = recoveredCapital;
    }

    @Column(nullable = false)
    public BigDecimal getRecoveredInterest() {
        return recoveredInterest;
    }

    public void setRecoveredInterest(BigDecimal recoveredInterest) {
        this.recoveredInterest = recoveredInterest;
    }

    @Column(nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getRecoveredDate() {
        return recoveredDate;
    }

    public void setRecoveredDate(Date recoveredDate) {
        this.recoveredDate = recoveredDate;
    }

    @Column(nullable = false)
    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    @Column(nullable = false)
    public BigDecimal getPaidFee() {
        return paidFee;
    }

    public void setPaidFee(BigDecimal paidFee) {
        this.paidFee = paidFee;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public BorrowingEntity getBorrowing() {
        return borrowing;
    }

    public void setBorrowing(BorrowingEntity borrowing) {
        this.borrowing = borrowing;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public InvestmentEntity getInvestment() {
        return investment;
    }

    public void setInvestment(InvestmentEntity investment) {
        this.investment = investment;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public RepaymentEntity getRepayment() {
        return repayment;
    }

    public void setRepayment(RepaymentEntity repayment) {
        this.repayment = repayment;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public RepaymentPlanEntity getRepaymentPlan() {
        return repaymentPlan;
    }

    public void setRepaymentPlan(RepaymentPlanEntity repaymentPlan) {
        this.repaymentPlan = repaymentPlan;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public RecoveryEntity getRecovery() {
        return recovery;
    }

    public void setRecovery(RecoveryEntity recovery) {
        this.recovery = recovery;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getInvestor() {
        return investor;
    }

    public void setInvestor(MemberEntity investor) {
        this.investor = investor;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getBorrower() {
        return borrower;
    }

    public void setBorrower(MemberEntity borrower) {
        this.borrower = borrower;
    }

    @OneToMany(mappedBy = "recoveryPlan", fetch = FetchType.LAZY)
    public Set<CapitalEntity> getCapitals() {
        return capitals;
    }

    public void setCapitals(Set<CapitalEntity> capitals) {
        this.capitals = capitals;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        setState(RecoveryStateEnum.recovering);
        setRecoveredCapital(BigDecimal.ZERO);
        setRecoveredInterest(BigDecimal.ZERO);
        setPaidFee(BigDecimal.ZERO);
    }

    /**
     * 获取本息
     * 
     * @return 本息
     */
    @Transient
    public BigDecimal getCapitalInterest() {
        return getCapital().add(getInterest());
    }

    /**
     * 获取已回收本息
     * 
     * @return 已回收本息
     */
    @Transient
    public BigDecimal getRecoveredCapitalInterest() {
        return getRecoveredCapital().add(getRecoveredInterest());
    }

    /**
     * 获取计算金额
     */
    @Transient
    public BigDecimal getCountAmount() {
        return getCapitalInterest().subtract(getFee());
    }

    /**
     * 获取已收金额
     */
    @Transient
    public BigDecimal getRecoveredAmount() {
        return getRecoveredCapitalInterest().subtract(getPaidFee());
    }

    /**
     * 获取计划收入
     * 
     * @return 计划收入
     */
    @Transient
    public BigDecimal getIncome() {
        return getInterest().subtract(getFee());
    }

    /**
     * 获取已收收入
     * 
     * @return 已收收入
     */
    @Transient
    public BigDecimal getRecoveredIncome() {
        return getRecoveredInterest().subtract(getPaidFee());
    }

}