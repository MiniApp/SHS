/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;
import im.shs.web.enums.RepaymentStateEnum;
import im.shs.web.util.DateTimeUtil;

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
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.time.DateUtils;

/**
 * Bean - 还款计划
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_repayment_plan")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_repayment_plan_sequence")
public class RepaymentPlanEntity extends BaseEntity implements Comparable<RepaymentPlanEntity> {

    /** serialVersionUID */
    private static final long serialVersionUID = -5588985754199451105L;

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

    /** 已还利息 */
    private BigDecimal paidInterest;

    /** 计划还款日期 */
    private Date date;

    /** 实际还款日期 */
    private Date paidDate;

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

    /** 还款 */
    private RepaymentEntity repayment;

    /** 借款人 */
    private MemberEntity borrower;

    /** 上一期 */
    private RepaymentPlanEntity prev;

    /** 下一期 */
    private RepaymentPlanEntity next;

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
    public BigDecimal getPaidInterest() {
        return paidInterest;
    }

    public void setPaidInterest(BigDecimal paidInterest) {
        this.paidInterest = paidInterest;
    }

    @Column(nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(Date paidDate) {
        this.paidDate = paidDate;
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
    public RepaymentEntity getRepayment() {
        return repayment;
    }

    public void setRepayment(RepaymentEntity repayment) {
        this.repayment = repayment;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getBorrower() {
        return borrower;
    }

    public void setBorrower(MemberEntity borrower) {
        this.borrower = borrower;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RepaymentPlanEntity getPrev() {
        return prev;
    }

    public void setPrev(RepaymentPlanEntity prev) {
        this.prev = prev;
    }

    @OneToOne(mappedBy = "prev", fetch = FetchType.LAZY)
    public RepaymentPlanEntity getNext() {
        return next;
    }

    public void setNext(RepaymentPlanEntity next) {
        this.next = next;
    }

    @OneToMany(mappedBy = "repaymentPlan", fetch = FetchType.LAZY)
    public Set<RecoveryPlanEntity> getRecoveryPlans() {
        return recoveryPlans;
    }

    public void setRecoveryPlans(Set<RecoveryPlanEntity> recoveryPlans) {
        this.recoveryPlans = recoveryPlans;
    }

    @OneToMany(mappedBy = "repaymentPlan", fetch = FetchType.LAZY)
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
        setPaidInterest(BigDecimal.ZERO);
        setOverduePeriod(0);
        setOverdueInterest(BigDecimal.ZERO);
        setPaidOverdueInterest(BigDecimal.ZERO);
        setSeriousOverduePeriod(0);
        setSeriousOverdueInterest(BigDecimal.ZERO);
        setPaidSeriousOverdueInterest(BigDecimal.ZERO);
        setPaidFee(BigDecimal.ZERO);
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
     * 获取已付总逾期利息
     * 
     * @return 已付总逾期利息
     */
    @Transient
    public BigDecimal getPaidTotalOverdueInterest() {
        return getPaidOverdueInterest().add(getPaidSeriousOverdueInterest());
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
        return getInterest().add(getTotalOverdueInterest()).add(getFee());
    }

    /**
     * 获取已收支出
     * 
     * @return 已收支出
     */
    @Transient
    public BigDecimal getPaidExpenditure() {
        return getPaidInterest().add(getPaidTotalOverdueInterest()).add(getPaidFee());
    }

    /**
     * 获取下一期日期
     */
    @Transient
    public Date getNextDate() {
        return getNext() != null ? getNext().getDate() : null;
    }

    /**
     * 验证债务人
     * 
     * @param debtor
     *            债务人
     * @return 是否为债务人
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
            // 计算逾期天数
            BigDecimal totalOverdueDays = getPaidDate() == null ? BigDecimal.valueOf(DateTimeUtil.getDaysOfTwoDate(
                    new Date(), DateUtils.addDays(getDate(), 1))) : BigDecimal.valueOf(DateTimeUtil.getDaysOfTwoDate(
                    getPaidDate(), DateUtils.addDays(getDate(), 1)));
            // 判断是否逾期
            Integer totalOverduePeriod = (totalOverdueDays.compareTo(BigDecimal.ZERO) > 0 ? totalOverdueDays.setScale(
                    0, BigDecimal.ROUND_UP).intValue() : 0);
            if (totalOverduePeriod > 0) {
                // 计算逾期
                setOverduePeriod(getBorrowing().getOverduePeriod(totalOverduePeriod));
                setOverdueInterest(getBorrowing().getOverdueInterest(getCapitalInterest(), getOverduePeriod()));
                // 计算严重逾期
                setSeriousOverduePeriod(getBorrowing().getSeriousOverduePeriod(totalOverduePeriod));
                if (getSeriousOverduePeriod() > 0) {
                    setSeriousOverdueInterest(getBorrowing().getSeriousOverdueInterest(getCapitalInterest(),
                            getSeriousOverduePeriod()));
                }
            }
        }
    }

    /**
     * 实现compareTo方法
     * 
     * @param repaymentPlan
     *            还款计划
     * @return 比较结果
     */
    @Override
    public int compareTo(RepaymentPlanEntity repaymentPlan) {
        return new CompareToBuilder().append(getDate(), repaymentPlan.getDate()).toComparison();
    }

}