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

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;

/**
 * Bean - 回收
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_recovery")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_recovery_sequence")
public class RecoveryEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 7477309364417984642L;

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

    /** 已回收期数 */
    private Integer recoveredPeriod;

    /** 已回收利息 */
    private BigDecimal recoveredInterest;

    /** 下一期日期 */
    private Date nextDate;

    /** 结束日期 */
    private Date endDate;

    /** 完成日期 */
    private Date finishDate;

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

    /** 投资人 */
    private MemberEntity investor;

    /** 借款人 */
    private MemberEntity borrower;

    /** 计划 */
    private Set<RecoveryPlanEntity> plans = new HashSet<RecoveryPlanEntity>();

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

    @Min(0)
    @Digits(integer = 19, fraction = 2)
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
    public Integer getRecoveredPeriod() {
        return recoveredPeriod;
    }

    public void setRecoveredPeriod(Integer recoveredPeriod) {
        this.recoveredPeriod = recoveredPeriod;
    }

    @Column(nullable = false)
    public BigDecimal getRecoveredInterest() {
        return recoveredInterest;
    }

    public void setRecoveredInterest(BigDecimal recoveredInterest) {
        this.recoveredInterest = recoveredInterest;
    }

    public Date getNextDate() {
        return nextDate;
    }

    public void setNextDate(Date nextDate) {
        this.nextDate = nextDate;
    }

    @Column(nullable = false)
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
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

    @OneToOne(fetch = FetchType.LAZY)
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

    @OneToMany(mappedBy = "recovery", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id asc")
    public Set<RecoveryPlanEntity> getPlans() {
        return plans;
    }

    public void setPlans(Set<RecoveryPlanEntity> plans) {
        this.plans = plans;
    }

    @OneToMany(mappedBy = "recovery", fetch = FetchType.LAZY)
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
        setRecoveredPeriod(0);
        setRecoveredInterest(BigDecimal.ZERO);
        if (getFee() == null) {
            setFee(BigDecimal.ZERO);
        }
        if (getPaidFee() == null) {
            setPaidFee(BigDecimal.ZERO);
        }
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
     * 获取剩余本息
     * 
     * @return 剩余本息
     */
    @Transient
    public BigDecimal getSurplusCapitalInterest() {
        return getCapitalInterest().subtract(getRecoveredCapitalInterest());
    }

    /**
     * 获取剩余期数
     * 
     * @return 剩余期数
     */
    @Transient
    public Integer getSurplusPeriod() {
        return getPeriod() - getRecoveredPeriod();
    }

    /**
     * 获取剩余服务费
     * 
     * @return 剩余服务费
     */
    @Transient
    public BigDecimal getSurplusFee() {
        return getFee().subtract(getPaidFee());
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

    /**
     * 获取剩余收入
     * 
     * @return 剩余收入
     */
    @Transient
    public BigDecimal getSurplusIncome() {
        return getIncome().subtract(getRecoveredIncome());
    }

    /**
     * 验证投资人
     * 
     * @param debtor
     *            投资人
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyInvestor(Long investor) {
        return getInvestor().getId().equals(investor);
    }

}