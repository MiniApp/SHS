/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.CapitalMethodEnum;
import im.shs.web.enums.CapitalTypeEnum;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

/**
 * Entity - 资金
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_capital")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_capital_sequence")
public class CapitalEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -5378733759170824030L;

    /** 投资方式 */
    public static final CapitalMethodEnum[] investmentMethods = { CapitalMethodEnum.investment,
            CapitalMethodEnum.investment_fee };

    /** 借款方式 */
    public static final CapitalMethodEnum[] borrowingMethods = { CapitalMethodEnum.borrowing,
            CapitalMethodEnum.borrowing_fee };

    /** 还款方式 */
    public static final CapitalMethodEnum[] repaymentMethods = { CapitalMethodEnum.repayment,
            CapitalMethodEnum.repayment_fee, CapitalMethodEnum.repayment_overdue_interest };

    /** 回收方式 */
    public static final CapitalMethodEnum[] recoveryMethods = { CapitalMethodEnum.recovery,
            CapitalMethodEnum.recovery_fee };

    /** 类型 */
    private CapitalTypeEnum type;

    /** 方式 */
    private CapitalMethodEnum method;

    /** 收入 */
    private BigDecimal credit;

    /** 支出 */
    private BigDecimal debit;

    /** 冻结 */
    private BigDecimal frozen;

    /** 解冻 */
    private BigDecimal unfrozen;

    /** 待收 */
    private BigDecimal credits;

    /** 待还 */
    private BigDecimal debits;

    /** 已冻结 */
    private BigDecimal frozens;

    /** 余额 */
    private BigDecimal balance;

    /** 备注 */
    private String memo;

    /** 会员 */
    private MemberEntity member;

    /** 支付 */
    private PaymentEntity payment;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 投资 */
    private InvestmentEntity investment;

    /** 投资记录 */
    private InvestmentRecordEntity investmentRecord;

    /** 还款 */
    private RepaymentEntity repayment;

    /** 还款计划 */
    private RepaymentPlanEntity repaymentPlan;

    /** 回收 */
    private RecoveryEntity recovery;

    /** 回收计划 */
    private RecoveryPlanEntity recoveryPlan;

    /** 推荐费 */
    private ReferralFeeEntity referralFee;

    /** 操作员 */
    private String operator;

    /** IP */
    private String ip;

    @Enumerated
    @Column(nullable = false, updatable = false)
    public CapitalTypeEnum getType() {
        return type;
    }

    public void setType(CapitalTypeEnum type) {
        this.type = type;
    }

    @Enumerated
    @Column(nullable = false, updatable = false)
    public CapitalMethodEnum getMethod() {
        return method;
    }

    public void setMethod(CapitalMethodEnum method) {
        this.method = method;
    }

    @NotNull
    @Min(0)
    @Digits(integer = 12, fraction = 3)
    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getCredit() {
        return credit;
    }

    public void setCredit(BigDecimal credit) {
        this.credit = credit;
    }

    @NotNull
    @Min(0)
    @Digits(integer = 12, fraction = 3)
    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getDebit() {
        return debit;
    }

    public void setDebit(BigDecimal debit) {
        this.debit = debit;
    }

    @Min(0)
    @Digits(integer = 12, fraction = 3)
    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getFrozen() {
        return frozen;
    }

    public void setFrozen(BigDecimal frozen) {
        this.frozen = frozen;
    }

    @Min(0)
    @Digits(integer = 12, fraction = 3)
    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getUnfrozen() {
        return unfrozen;
    }

    public void setUnfrozen(BigDecimal unfrozen) {
        this.unfrozen = unfrozen;
    }

    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getCredits() {
        return credits;
    }

    public void setCredits(BigDecimal credits) {
        this.credits = credits;
    }

    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getDebits() {
        return debits;
    }

    public void setDebits(BigDecimal debits) {
        this.debits = debits;
    }

    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getFrozens() {
        return frozens;
    }

    public void setFrozens(BigDecimal frozens) {
        this.frozens = frozens;
    }

    @Column(nullable = false, updatable = false, precision = 21, scale = 6)
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Length(max = 200)
    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getMember() {
        return member;
    }

    public void setMember(MemberEntity member) {
        this.member = member;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public PaymentEntity getPayment() {
        return payment;
    }

    public void setPayment(PaymentEntity payment) {
        this.payment = payment;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public BorrowingEntity getBorrowing() {
        return borrowing;
    }

    public void setBorrowing(BorrowingEntity borrowing) {
        this.borrowing = borrowing;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public InvestmentEntity getInvestment() {
        return investment;
    }

    public void setInvestment(InvestmentEntity investment) {
        this.investment = investment;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public InvestmentRecordEntity getInvestmentRecord() {
        return investmentRecord;
    }

    public void setInvestmentRecord(InvestmentRecordEntity investmentRecord) {
        this.investmentRecord = investmentRecord;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RepaymentEntity getRepayment() {
        return repayment;
    }

    public void setRepayment(RepaymentEntity repayment) {
        this.repayment = repayment;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RepaymentPlanEntity getRepaymentPlan() {
        return repaymentPlan;
    }

    public void setRepaymentPlan(RepaymentPlanEntity repaymentPlan) {
        this.repaymentPlan = repaymentPlan;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RecoveryEntity getRecovery() {
        return recovery;
    }

    public void setRecovery(RecoveryEntity recovery) {
        this.recovery = recovery;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RecoveryPlanEntity getRecoveryPlan() {
        return recoveryPlan;
    }

    public void setRecoveryPlan(RecoveryPlanEntity recoveryPlan) {
        this.recoveryPlan = recoveryPlan;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public ReferralFeeEntity getReferralFee() {
        return referralFee;
    }

    public void setReferralFee(ReferralFeeEntity referralFee) {
        this.referralFee = referralFee;
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

    /**
     * 添加待收
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addCredits(BigDecimal amount) {
        setCredits(getCredits().add(amount));
    }

    /**
     * 减去待收
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractCredits(BigDecimal amount) {
        setCredits(getCredits().subtract(amount));
    }

    /**
     * 添加待还
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addDebits(BigDecimal amount) {
        setDebits(getDebits().add(amount));
    }

    /**
     * 减去待还
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractDebits(BigDecimal amount) {
        setDebits(getDebits().subtract(amount));
    }

    /**
     * 添加已冻结
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addFrozens(BigDecimal amount) {
        setFrozens(getFrozens().add(amount));
    }

    /**
     * 减去已冻结
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractFrozens(BigDecimal amount) {
        setFrozens(getFrozens().subtract(amount));
    }

    /**
     * 添加余额
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addBalance(BigDecimal amount) {
        setBalance(getBalance().add(amount));
    }

    /**
     * 减去余额
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractBalance(BigDecimal amount) {
        setBalance(getBalance().subtract(amount));
    }

    /**
     * 获取可用余额
     * 
     * @return 可用余额
     */
    @Transient
    public BigDecimal getAvailable() {
        return getBalance().subtract(getFrozens());
    }

}