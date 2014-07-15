/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.RepaymentStateEnum;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Bean - 还款
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_repayment")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_repayment_sequence")
public class RepaymentEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -7034686975174643226L;

    /** 状态 */
    private RepaymentStateEnum state;

    /** 本金 */
    private BigDecimal capital;

    /** 期数 */
    private Integer period;

    /** 利息 */
    private BigDecimal interest;

    /** 已还本金 */
    private BigDecimal paidCapital;

    /** 已还期数 */
    private Integer paidPeriod;

    /** 已还利息 */
    private BigDecimal paidInterest;

    /** 下一期日期 */
    private Date nextDate;

    /** 结束日期 */
    private Date endDate;

    /** 完成日期 */
    private Date finishDate;

    /** 提前还款费 */
    private BigDecimal prepayFee;

    /** 逾期期限 */
    private Integer overduePeriod;

    /** 逾期利息 */
    private BigDecimal overdueInterest;

    /** 已付逾期利息 */
    private BigDecimal paidOverdueInterest;

    /** 严重逾期期限 */
    private Integer seriousOverduePeriod;

    /** 严重逾期利息 */
    private BigDecimal seriousOverdueInterest;

    /** 已付严重逾期利息 */
    private BigDecimal paidSeriousOverdueInterest;

    /** 服务费 */
    private BigDecimal fee;

    /** 已付服务费 */
    private BigDecimal paidFee;

    /** 已付金额 */
    private BigDecimal paidAmount;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 借款人 */
    private MemberEntity borrower;

    /** 计划 */
    private Set<RepaymentPlanEntity> plans = new HashSet<RepaymentPlanEntity>();

    /** 回收 */
    private Set<RecoveryEntity> recoveries = new HashSet<RecoveryEntity>();

    /** 回收计划 */
    private Set<RecoveryPlanEntity> recoveryPlans = new HashSet<RecoveryPlanEntity>();

    /** 资金 */
    private Set<CapitalEntity> capitals = new HashSet<CapitalEntity>();

    @Enumerated
    @Column(nullable = false)
    public RepaymentStateEnum getState() {
        return state;
    }

    public void setState(RepaymentStateEnum state) {
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
    public BigDecimal getPaidCapital() {
        return paidCapital;
    }

    public void setPaidCapital(BigDecimal paidCapital) {
        this.paidCapital = paidCapital;
    }

    @Column(nullable = false)
    public Integer getPaidPeriod() {
        return paidPeriod;
    }

    public void setPaidPeriod(Integer paidPeriod) {
        this.paidPeriod = paidPeriod;
    }

    @Column(nullable = false)
    public BigDecimal getPaidInterest() {
        return paidInterest;
    }

    public void setPaidInterest(BigDecimal paidInterest) {
        this.paidInterest = paidInterest;
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
    public BigDecimal getPrepayFee() {
        return prepayFee;
    }

    public void setPrepayFee(BigDecimal prepayFee) {
        this.prepayFee = prepayFee;
    }

    @Column(nullable = false)
    public Integer getOverduePeriod() {
        return overduePeriod;
    }

    public void setOverduePeriod(Integer overduePeriod) {
        this.overduePeriod = overduePeriod;
    }

    @Column(nullable = false)
    public BigDecimal getOverdueInterest() {
        return overdueInterest;
    }

    public void setOverdueInterest(BigDecimal overdueInterest) {
        this.overdueInterest = overdueInterest;
    }

    @Column(nullable = false)
    public BigDecimal getPaidOverdueInterest() {
        return paidOverdueInterest;
    }

    public void setPaidOverdueInterest(BigDecimal paidOverdueInterest) {
        this.paidOverdueInterest = paidOverdueInterest;
    }

    @Column(nullable = false)
    public Integer getSeriousOverduePeriod() {
        return seriousOverduePeriod;
    }

    public void setSeriousOverduePeriod(Integer seriousOverduePeriod) {
        this.seriousOverduePeriod = seriousOverduePeriod;
    }

    @Column(nullable = false)
    public BigDecimal getSeriousOverdueInterest() {
        return seriousOverdueInterest;
    }

    public void setSeriousOverdueInterest(BigDecimal seriousOverdueInterest) {
        this.seriousOverdueInterest = seriousOverdueInterest;
    }

    @Column(nullable = false)
    public BigDecimal getPaidSeriousOverdueInterest() {
        return paidSeriousOverdueInterest;
    }

    public void setPaidSeriousOverdueInterest(BigDecimal paidSeriousOverdueInterest) {
        this.paidSeriousOverdueInterest = paidSeriousOverdueInterest;
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

    @Column(nullable = false)
    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
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
    public MemberEntity getBorrower() {
        return borrower;
    }

    public void setBorrower(MemberEntity borrower) {
        this.borrower = borrower;
    }

    @OneToMany(mappedBy = "repayment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id asc")
    public Set<RepaymentPlanEntity> getPlans() {
        return plans;
    }

    public void setPlans(Set<RepaymentPlanEntity> plans) {
        this.plans = plans;
    }

    @OneToMany(mappedBy = "repayment", fetch = FetchType.LAZY)
    public Set<RecoveryEntity> getRecoveries() {
        return recoveries;
    }

    public void setRecoveries(Set<RecoveryEntity> recoveries) {
        this.recoveries = recoveries;
    }

    @OneToMany(mappedBy = "repayment", fetch = FetchType.LAZY)
    public Set<RecoveryPlanEntity> getRecoveryPlans() {
        return recoveryPlans;
    }

    public void setRecoveryPlans(Set<RecoveryPlanEntity> recoveryPlans) {
        this.recoveryPlans = recoveryPlans;
    }

    @OneToMany(mappedBy = "repayment", fetch = FetchType.LAZY)
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
        setState(RepaymentStateEnum.repaying);
        setPaidCapital(BigDecimal.ZERO);
        setPaidPeriod(0);
        setPaidInterest(BigDecimal.ZERO);
        setPrepayFee(BigDecimal.ZERO);
        setOverduePeriod(0);
        setOverdueInterest(BigDecimal.ZERO);
        setPaidOverdueInterest(BigDecimal.ZERO);
        setSeriousOverduePeriod(0);
        setSeriousOverdueInterest(BigDecimal.ZERO);
        setPaidSeriousOverdueInterest(BigDecimal.ZERO);
        if (getFee() == null) {
            setFee(BigDecimal.ZERO);
        }
        if (getPaidFee() == null) {
            setPaidFee(BigDecimal.ZERO);
        }
        setPaidAmount(BigDecimal.ZERO);
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
     * 获取已还本息
     * 
     * @return 已还本息
     */
    @Transient
    public BigDecimal getPaidCapitalInterest() {
        return getPaidCapital().add(getPaidInterest());
    }

    /**
     * 获取剩余本息
     * 
     * @return 剩余本息
     */
    @Transient
    public BigDecimal getSurplusCapitalInterest() {
        return getCapitalInterest().subtract(getPaidCapitalInterest());
    }

    /**
     * 获取剩余期数
     * 
     * @return 剩余期数
     */
    @Transient
    public Integer getSurplusPeriod() {
        return getPeriod() - getPaidPeriod();
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
     * 获取总逾期期限
     * 
     * @return 总逾期期限
     */
    @Transient
    public Integer getTotalOverduePeriod() {
        return getOverduePeriod() + getSeriousOverduePeriod();
    }

    /**
     * 获取总逾期利息
     * 
     * @return 总逾期利息
     */
    @Transient
    public BigDecimal getTotalOverdueInterest() {
        return getOverdueInterest().add(getSeriousOverdueInterest());
    }

    /**
     * 获取已还总逾期利息
     * 
     * @return 已还总逾期利息
     */
    @Transient
    public BigDecimal getPaidTotalOverdueInterest() {
        return getPaidOverdueInterest().add(getPaidSeriousOverdueInterest());
    }

    /**
     * 获取剩余总逾期利息
     * 
     * @return 剩余总逾期利息
     */
    @Transient
    public BigDecimal getSurplusTotalOverdueInterest() {
        return getTotalOverdueInterest().subtract(getPaidTotalOverdueInterest());
    }

    /**
     * 获取计算金额
     */
    @Transient
    public BigDecimal getCountAmount() {
        return getCapitalInterest().add(getTotalOverdueInterest()).add(getFee());
    }

    /**
     * 获取计划支出
     * 
     * @return 计划支出
     */
    @Transient
    public BigDecimal getExpenditure() {
        return getInterest().add(getFee()).add(getTotalOverdueInterest());
    }

    /**
     * 获取已收支出
     * 
     * @return 已收支出
     */
    @Transient
    public BigDecimal getPaidExpenditure() {
        return getPaidInterest().add(getPaidFee()).add(getPaidTotalOverdueInterest());
    }

    /**
     * 验证债务人
     * 
     * @param debtor
     *            债务人
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyDebtor(Long debtor) {
        return getBorrower().getId().equals(debtor);
    }

    /**
     * 计算逾期
     */
    @Transient
    public void countOverdue() {
        if (getState() == RepaymentStateEnum.repaying) {
            for (Iterator<RepaymentPlanEntity> iterator = getPlans().iterator(); iterator.hasNext();) {
                RepaymentPlanEntity pRepaymentPlan = iterator.next();
                // 计算逾期
                pRepaymentPlan.countOverdue();
                setOverduePeriod(getOverduePeriod() + pRepaymentPlan.getOverduePeriod());
                setSeriousOverduePeriod(getSeriousOverduePeriod() + pRepaymentPlan.getSeriousOverduePeriod());
                setOverdueInterest(getOverdueInterest().add(pRepaymentPlan.getOverdueInterest()));
                setSeriousOverdueInterest(getSeriousOverdueInterest().add(pRepaymentPlan.getSeriousOverdueInterest()));
            }
        }
    }

}