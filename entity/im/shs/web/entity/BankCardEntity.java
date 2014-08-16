/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.AuditStateEnum;
import im.shs.web.enums.BankCardStateEnum;

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
import javax.persistence.OrderBy;
import javax.persistence.PreRemove;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Entity - 银行卡
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_bank_card")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_bank_card_sequence")
public class BankCardEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 1246849415007937300L;

    /** 状态 */
    private BankCardStateEnum state;

    /** 审核状态 */
    private AuditStateEnum auditState;

    /** 银行 */
    private BankEntity bank;

    /** 银行名称 */
    private String bankName;

    /** 支行 */
    private BankBranchEntity branch;

    /** 支行名称 */
    private String branchName;

    /** 所在地 */
    private AreaEntity locality;

    /** 所在地名称 */
    private String localityName;

    /** 卡号 */
    private String card;

    /** 是否默认 */
    private Boolean isDefault;

    /** 备注 */
    private String memo;

    /** 持卡人 */
    private MemberEntity cardholder;

    /** 日志 */
    private Set<BankCardLogEntity> logs = new HashSet<BankCardLogEntity>();

    /** 支付 */
    private Set<PaymentEntity> payments = new HashSet<PaymentEntity>();

    @Enumerated
    @Column(nullable = false)
    public BankCardStateEnum getState() {
        return state;
    }

    public void setState(BankCardStateEnum state) {
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

    @ManyToOne(fetch = FetchType.LAZY)
    public BankEntity getBank() {
        return bank;
    }

    public void setBank(BankEntity bank) {
        this.bank = bank;
    }

    @Column(nullable = false)
    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public BankBranchEntity getBranch() {
        return branch;
    }

    public void setBranch(BankBranchEntity branch) {
        this.branch = branch;
    }

    @Column(nullable = false)
    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public AreaEntity getLocality() {
        return locality;
    }

    public void setLocality(AreaEntity locality) {
        this.locality = locality;
    }

    public String getLocalityName() {
        return localityName;
    }

    public void setLocalityName(String localityName) {
        this.localityName = localityName;
    }

    @Column(nullable = false)
    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    @Column(nullable = false)
    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getCardholder() {
        return cardholder;
    }

    public void setCardholder(MemberEntity cardholder) {
        this.cardholder = cardholder;
    }

    @OneToMany(mappedBy = "bankCard", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id desc")
    public Set<BankCardLogEntity> getLogs() {
        return logs;
    }

    public void setLogs(Set<BankCardLogEntity> logs) {
        this.logs = logs;
    }

    @OneToMany(mappedBy = "bankCard", fetch = FetchType.LAZY)
    public Set<PaymentEntity> getPayments() {
        return payments;
    }

    public void setPayments(Set<PaymentEntity> payments) {
        this.payments = payments;
    }

    /**
     * 删除前处理
     */
    @PreRemove
    public void preRemove() {
        Set<PaymentEntity> payments = getPayments();
        if (payments != null) {
            for (PaymentEntity payment : payments) {
                payment.setBankCard(null);
            }
        }
    }

    /**
     * 验证持卡人
     * 
     * @param cardholderId
     *            持卡人ID
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyCardholder(Long cardholderId) {
        return cardholderId != null && getCardholder() != null && getCardholder().getId().equals(cardholderId);
    }

}