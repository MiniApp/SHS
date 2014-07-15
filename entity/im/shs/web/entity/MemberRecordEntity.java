/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity - 会员记录
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_member_record")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_member_record_sequence")
public class MemberRecordEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -1559069018502630420L;

    /** 已使用信用额度 */
    private BigDecimal usedCreditAmount;

    /** 已申请借款次数 */
    private Integer appliedBorrowingCount;

    /** 成功借款次数 */
    private Integer borrowedCount;

    /** 成功借款金额 */
    private BigDecimal borrowedSum;

    /** 已还借款次数 */
    private Integer repaidBorrowingCount;

    /** 已还借款金额 */
    private BigDecimal repaidBorrowingSum;

    /** 总还款次数 */
    private Integer repaymentCount;

    /** 总还款额度 */
    private BigDecimal repaymentSum;

    /** 已付还款次数 */
    private Integer paidRepaymentCount;

    /** 已付还款额度 */
    private BigDecimal paidRepaymentSum;

    /** 已逾期次数 */
    private Integer overdueCount;

    /** 已逾期期数 */
    private Integer overduePeriodSum;

    /** 已逾期额度 */
    private BigDecimal overdueAmountSum;

    /** 已逾期利息 */
    private BigDecimal overdueInterestSum;

    /** 已严重逾期次数 */
    private Integer seriousOverdueCount;

    /** 已严重逾期数 */
    private Integer seriousOverduePeriodSum;

    /** 已严重逾期额度 */
    private BigDecimal seriousOverdueAmountSum;

    /** 已严重逾期利息 */
    private BigDecimal seriousOverdueInterestSum;

    /** 总投资次数 */
    private Integer investedCount;

    /** 总投资额度 */
    private BigDecimal investedSum;

    /** 总回收额度 */
    private BigDecimal recoverySum;

    /** 已回收额度 */
    private BigDecimal recoveredSum;

    /** 会员 */
    private MemberEntity member;

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getUsedCreditAmount() {
        return usedCreditAmount;
    }

    public void setUsedCreditAmount(BigDecimal usedCreditAmount) {
        this.usedCreditAmount = usedCreditAmount;
    }

    @Column(nullable = false)
    public Integer getAppliedBorrowingCount() {
        return appliedBorrowingCount;
    }

    public void setAppliedBorrowingCount(Integer appliedBorrowingCount) {
        this.appliedBorrowingCount = appliedBorrowingCount;
    }

    @Column(nullable = false)
    public Integer getBorrowedCount() {
        return borrowedCount;
    }

    public void setBorrowedCount(Integer borrowedCount) {
        this.borrowedCount = borrowedCount;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getBorrowedSum() {
        return borrowedSum;
    }

    public void setBorrowedSum(BigDecimal borrowedSum) {
        this.borrowedSum = borrowedSum;
    }

    @Column(nullable = false)
    public Integer getRepaidBorrowingCount() {
        return repaidBorrowingCount;
    }

    public void setRepaidBorrowingCount(Integer repaidBorrowingCount) {
        this.repaidBorrowingCount = repaidBorrowingCount;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getRepaidBorrowingSum() {
        return repaidBorrowingSum;
    }

    public void setRepaidBorrowingSum(BigDecimal repaidBorrowingSum) {
        this.repaidBorrowingSum = repaidBorrowingSum;
    }

    @Column(nullable = false)
    public Integer getRepaymentCount() {
        return repaymentCount;
    }

    public void setRepaymentCount(Integer repaymentCount) {
        this.repaymentCount = repaymentCount;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getRepaymentSum() {
        return repaymentSum;
    }

    public void setRepaymentSum(BigDecimal repaymentSum) {
        this.repaymentSum = repaymentSum;
    }

    @Column(nullable = false)
    public Integer getPaidRepaymentCount() {
        return paidRepaymentCount;
    }

    public void setPaidRepaymentCount(Integer paidRepaymentCount) {
        this.paidRepaymentCount = paidRepaymentCount;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getPaidRepaymentSum() {
        return paidRepaymentSum;
    }

    public void setPaidRepaymentSum(BigDecimal paidRepaymentSum) {
        this.paidRepaymentSum = paidRepaymentSum;
    }

    @Column(nullable = false)
    public Integer getOverdueCount() {
        return overdueCount;
    }

    public void setOverdueCount(Integer overdueCount) {
        this.overdueCount = overdueCount;
    }

    @Column(nullable = false)
    public Integer getOverduePeriodSum() {
        return overduePeriodSum;
    }

    public void setOverduePeriodSum(Integer overduePeriodSum) {
        this.overduePeriodSum = overduePeriodSum;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getOverdueAmountSum() {
        return overdueAmountSum;
    }

    public void setOverdueAmountSum(BigDecimal overdueAmountSum) {
        this.overdueAmountSum = overdueAmountSum;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getOverdueInterestSum() {
        return overdueInterestSum;
    }

    public void setOverdueInterestSum(BigDecimal overdueInterestSum) {
        this.overdueInterestSum = overdueInterestSum;
    }

    @Column(nullable = false)
    public Integer getSeriousOverdueCount() {
        return seriousOverdueCount;
    }

    public void setSeriousOverdueCount(Integer seriousOverdueCount) {
        this.seriousOverdueCount = seriousOverdueCount;
    }

    @Column(nullable = false)
    public Integer getSeriousOverduePeriodSum() {
        return seriousOverduePeriodSum;
    }

    public void setSeriousOverduePeriodSum(Integer seriousOverduePeriodSum) {
        this.seriousOverduePeriodSum = seriousOverduePeriodSum;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getSeriousOverdueAmountSum() {
        return seriousOverdueAmountSum;
    }

    public void setSeriousOverdueAmountSum(BigDecimal seriousOverdueAmountSum) {
        this.seriousOverdueAmountSum = seriousOverdueAmountSum;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getSeriousOverdueInterestSum() {
        return seriousOverdueInterestSum;
    }

    public void setSeriousOverdueInterestSum(BigDecimal seriousOverdueInterestSum) {
        this.seriousOverdueInterestSum = seriousOverdueInterestSum;
    }

    @Column(nullable = false)
    public Integer getInvestedCount() {
        return investedCount;
    }

    public void setInvestedCount(Integer investedCount) {
        this.investedCount = investedCount;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getInvestedSum() {
        return investedSum;
    }

    public void setInvestedSum(BigDecimal investedSum) {
        this.investedSum = investedSum;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getRecoverySum() {
        return recoverySum;
    }

    public void setRecoverySum(BigDecimal recoverySum) {
        this.recoverySum = recoverySum;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getRecoveredSum() {
        return recoveredSum;
    }

    public void setRecoveredSum(BigDecimal recoveredSum) {
        this.recoveredSum = recoveredSum;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getMember() {
        return member;
    }

    public void setMember(MemberEntity member) {
        this.member = member;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        setUsedCreditAmount(BigDecimal.ZERO);
        setAppliedBorrowingCount(0);
        setBorrowedCount(0);
        setBorrowedSum(BigDecimal.ZERO);
        setRepaidBorrowingCount(0);
        setRepaidBorrowingSum(BigDecimal.ZERO);
        setRepaymentCount(0);
        setRepaymentSum(BigDecimal.ZERO);
        setPaidRepaymentCount(0);
        setPaidRepaymentSum(BigDecimal.ZERO);
        setOverdueCount(0);
        setOverduePeriodSum(0);
        setOverdueAmountSum(BigDecimal.ZERO);
        setOverdueInterestSum(BigDecimal.ZERO);
        setSeriousOverdueCount(0);
        setSeriousOverduePeriodSum(0);
        setSeriousOverdueAmountSum(BigDecimal.ZERO);
        setSeriousOverdueInterestSum(BigDecimal.ZERO);
        setInvestedCount(0);
        setInvestedSum(BigDecimal.ZERO);
        setRecoverySum(BigDecimal.ZERO);
        setRecoveredSum(BigDecimal.ZERO);
    }

}