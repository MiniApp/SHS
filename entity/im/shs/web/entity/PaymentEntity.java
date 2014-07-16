/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.AuditStateEnum;
import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentStateEnum;
import im.shs.web.enums.PaymentTypeEnum;

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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Entity - 支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_payment")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_payment_sequence")
public class PaymentEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 7195930647997359171L;

    /** 状态 */
    private PaymentStateEnum state;

    /** 审核状态 */
    private AuditStateEnum auditState;

    /** 类型 */
    private PaymentTypeEnum type;

    /** 编号 */
    private String sn;

    /** 金额 */
    private BigDecimal amount;

    /** 服务费 */
    private BigDecimal fee;

    /** 银行 */
    private String bank;

    /** 账户 */
    private String account;

    /** 收款人 */
    private String payee;

    /** 付款人 */
    private String payer;

    /** 付款时间 */
    private Date time;

    /** 支付方式 */
    private PaymentMethodEnum paymentMethod;

    /** 支付方式名称 */
    private String paymentName;

    /** 支付插件 */
    private String paymentPlugin;

    /** 到期时间 */
    private Date expiry;

    /** 备注 */
    private String memo;

    /** 会员 */
    private MemberEntity member;

    /** 银行卡 */
    private BankCardEntity bankCard;
    
    /** 托管 */
    private EscrowEntity escrow;

    /** 日志 */
    private Set<PaymentLogEntity> logs = new HashSet<PaymentLogEntity>();

    /** 资金 */
    private Set<CapitalEntity> capitals = new HashSet<CapitalEntity>();

    @Enumerated
    @Column(nullable = false)
    public PaymentStateEnum getState() {
        return state;
    }

    public void setState(PaymentStateEnum state) {
        this.state = state;
    }

    @Enumerated
    @Column(nullable = false)
    public AuditStateEnum getAuditState() {
        return auditState;
    }

    public void setAuditState(AuditStateEnum auditState) {
        this.auditState = auditState;
    }

    @Enumerated
    @Column(nullable = false)
    public PaymentTypeEnum getType() {
        return type;
    }

    public void setType(PaymentTypeEnum type) {
        this.type = type;
    }

    @Column(nullable = false, updatable = false, unique = true, length = 100)
    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    @Column(nullable = false, precision = 21, scale = 6)
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Column(nullable = false, precision = 21, scale = 6)
    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPayee() {
        return payee;
    }

    public void setPayee(String payee) {
        this.payee = payee;
    }

    public String getPayer() {
        return payer;
    }

    public void setPayer(String payer) {
        this.payer = payer;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Enumerated
    @Column(nullable = false)
    public PaymentMethodEnum getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethodEnum paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentName() {
        return paymentName;
    }

    public void setPaymentName(String paymentName) {
        this.paymentName = paymentName;
    }

    public String getPaymentPlugin() {
        return paymentPlugin;
    }

    public void setPaymentPlugin(String paymentPlugin) {
        this.paymentPlugin = paymentPlugin;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getMember() {
        return member;
    }

    public void setMember(MemberEntity member) {
        this.member = member;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public BankCardEntity getBankCard() {
        return bankCard;
    }

    public void setBankCard(BankCardEntity bankCard) {
        this.bankCard = bankCard;
    }
    
    @OneToOne(fetch = FetchType.LAZY)
    public EscrowEntity getEscrow() {
        return escrow;
    }

    public void setEscrow(EscrowEntity escrow) {
        this.escrow = escrow;
    }

    @OneToMany(mappedBy = "payment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<PaymentLogEntity> getLogs() {
        return logs;
    }

    public void setLogs(Set<PaymentLogEntity> logs) {
        this.logs = logs;
    }

    @OneToMany(mappedBy = "payment", fetch = FetchType.LAZY)
    public Set<CapitalEntity> getCapitals() {
        return capitals;
    }

    public void setCapitals(Set<CapitalEntity> capitals) {
        this.capitals = capitals;
    }

    /**
     * 获取有效金额
     * 
     * @return 有效金额
     */
    @Transient
    public BigDecimal getEffectiveAmount() {
        return getAmount().compareTo(BigDecimal.ZERO) > 0 ? (getFee().compareTo(BigDecimal.ZERO) > 0 ? getAmount()
                .subtract(getFee()) : getAmount()) : BigDecimal.ZERO;
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

}