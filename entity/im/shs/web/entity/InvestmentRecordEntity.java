/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.OperationMethodEnum;

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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.Length;

/**
 * Bean - 投资记录
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_investment_record")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_investment_record_sequence")
public class InvestmentRecordEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 1519089134797613786L;

    /** 操作方式 */
    private OperationMethodEnum operationMethod;

    /** 额度 */
    private BigDecimal amount;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 投资 */
    private InvestmentEntity investment;

    /** 投资人 */
    private MemberEntity investor;

    /** 备注 */
    private String memo;

    /** 操作员 */
    private String operator;

    /** IP */
    private String ip;

    /** 资金 */
    private Set<CapitalEntity> capitals = new HashSet<CapitalEntity>();
    
    /** 托管 */
    private EscrowEntity escrow;

    @Enumerated
    @Column(nullable = false, updatable = false)
    public OperationMethodEnum getOperationMethod() {
        return operationMethod;
    }

    public void setOperationMethod(OperationMethodEnum operationMethod) {
        this.operationMethod = operationMethod;
    }

    @Min(0)
    @Digits(integer = 12, fraction = 3)
    @Column(nullable = false, updatable = false)
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
    public MemberEntity getInvestor() {
        return investor;
    }

    public void setInvestor(MemberEntity investor) {
        this.investor = investor;
    }

    @Length(max = 200)
    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
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

    @OneToMany(mappedBy = "investmentRecord", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<CapitalEntity> getCapitals() {
        return capitals;
    }

    public void setCapitals(Set<CapitalEntity> capitals) {
        this.capitals = capitals;
    }

    @OneToOne(fetch = FetchType.LAZY)
    public EscrowEntity getEscrow() {
        return escrow;
    }

    public void setEscrow(EscrowEntity escrow) {
        this.escrow = escrow;
    }
}