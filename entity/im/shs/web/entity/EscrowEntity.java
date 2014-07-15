/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.EscrowStateEnum;
import im.shs.web.enums.EscrowTypeEnum;
import im.shs.web.enums.OperationMethodEnum;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Entity - 托管
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_escrow")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_escrow_sequence")
public class EscrowEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 3093343051003117852L;

    /** 状态 */
    private EscrowStateEnum state;

    /** 类型 */
    private EscrowTypeEnum type;

    /** 编号 */
    private String sn;

    /** 托管编号 */
    private String escrowSn;

    /** 重定向URL */
    private String redirectUrl;

    /** 托管方式名称 */
    private String escrowName;

    /** 托管插件 */
    private String escrowPlugin;

    /** 到期时间 */
    private Date expiry;

    /** 备注 */
    private String memo;

    /** 是否批准 */
    private Boolean approved;

    /** 金额 */
    private BigDecimal amount;

    /** 操作方式 */
    private OperationMethodEnum operationMethod;

    /** 手续费 */
    private BigDecimal fee;

    /** 会员 */
    private MemberEntity member;

    /** 托管 */
    private EscrowEntity escrow;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 投资记录 */
    private InvestmentRecordEntity investmentRecord;

    /** 回收记录 */
    private RecoveryPlanEntity recoveryPlan;

    /** 还款记录 */
    private RepaymentPlanEntity repaymentPlan;

    /** 支付 */
    private PaymentEntity payment;

    @Enumerated
    @Column(nullable = false)
    public EscrowStateEnum getState() {
        return state;
    }

    public void setState(EscrowStateEnum state) {
        this.state = state;
    }

    @Enumerated
    @Column(nullable = false)
    public EscrowTypeEnum getType() {
        return type;
    }

    public void setType(EscrowTypeEnum type) {
        this.type = type;
    }

    @Column(nullable = false, updatable = false, unique = true, length = 100)
    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getEscrowSn() {
        return escrowSn;
    }

    public void setEscrowSn(String escrowSn) {
        this.escrowSn = escrowSn;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getEscrowName() {
        return escrowName;
    }

    public void setEscrowName(String escrowName) {
        this.escrowName = escrowName;
    }

    public String getEscrowPlugin() {
        return escrowPlugin;
    }

    public void setEscrowPlugin(String escrowPlugin) {
        this.escrowPlugin = escrowPlugin;
    }

    public Date getExpiry() {
        return expiry;
    }

    public void setExpiry(Date expiry) {
        this.expiry = expiry;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getMember() {
        return member;
    }

    public void setMember(MemberEntity member) {
        this.member = member;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public EscrowEntity getEscrow() {
        return escrow;
    }

    public void setEscrow(EscrowEntity escrow) {
        this.escrow = escrow;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public BorrowingEntity getBorrowing() {
        return borrowing;
    }

    public void setBorrowing(BorrowingEntity borrowing) {
        this.borrowing = borrowing;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public InvestmentRecordEntity getInvestmentRecord() {
        return investmentRecord;
    }

    public void setInvestmentRecord(InvestmentRecordEntity investmentRecord) {
        this.investmentRecord = investmentRecord;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RecoveryPlanEntity getRecoveryPlan() {
        return recoveryPlan;
    }

    public void setRecoveryPlan(RecoveryPlanEntity recoveryPlan) {
        this.recoveryPlan = recoveryPlan;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public RepaymentPlanEntity getRepaymentPlan() {
        return repaymentPlan;
    }

    public void setRepaymentPlan(RepaymentPlanEntity repaymentPlan) {
        this.repaymentPlan = repaymentPlan;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public PaymentEntity getPayment() {
        return payment;
    }

    public void setPayment(PaymentEntity payment) {
        this.payment = payment;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        if (getState() == null) {
            setState(EscrowStateEnum.wait);
        }
    }

    /**
     * 判断是否过期
     * 
     * @return 是否过期
     */
    @Transient
    public boolean getExpired() {
        return getExpiry() != null && getExpiry().before(new Date());
    }

    /**
     * 验证金额
     * 
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyAmount(String amount) {
        try {
            return getAmount().compareTo(new BigDecimal(amount)) == 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public OperationMethodEnum getOperationMethod() {
        return operationMethod;
    }

    public void setOperationMethod(OperationMethodEnum operationMethod) {
        this.operationMethod = operationMethod;
    }
    
}