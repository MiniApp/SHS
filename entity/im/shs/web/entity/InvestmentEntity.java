/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.InvestmentStateEnum;

import java.math.BigDecimal;
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
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;

/**
 * Bean - 投资
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_investment")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_investment_sequence")
public class InvestmentEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -4087982048749706554L;

    /** 状态 */
    private InvestmentStateEnum state;

    /** 额度 */
    private BigDecimal amount;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 回收 */
    private RecoveryEntity recovery;

    /** 投资人 */
    private MemberEntity investor;

    /** 记录 */
    private Set<InvestmentRecordEntity> records = new HashSet<InvestmentRecordEntity>();

    /** 资金 */
    private Set<CapitalEntity> capitals = new HashSet<CapitalEntity>();

    @Enumerated
    @Column(nullable = false)
    public InvestmentStateEnum getState() {
        return state;
    }

    public void setState(InvestmentStateEnum state) {
        this.state = state;
    }

    @Min(0)
    @Digits(integer = 19, fraction = 2)
    @Column(nullable = false)
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public BorrowingEntity getBorrowing() {
        return borrowing;
    }

    public void setBorrowing(BorrowingEntity borrowing) {
        this.borrowing = borrowing;
    }

    @OneToOne(mappedBy = "investment", fetch = FetchType.LAZY)
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

    @OneToMany(mappedBy = "investment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<InvestmentRecordEntity> getRecords() {
        return records;
    }

    public void setRecords(Set<InvestmentRecordEntity> records) {
        this.records = records;
    }

    @OneToMany(mappedBy = "investment", fetch = FetchType.LAZY)
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
        setState(InvestmentStateEnum.investing);
    }

    /**
     * 添加额度
     * 
     * @param amount
     *            额度
     */
    @Transient
    public void addAmount(BigDecimal amount) {
        setAmount(getAmount().add(amount));
    }

}