/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Bean - 自动投资
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_auto_investment")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_auto_investment_sequence")
public class AutoInvestmentEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -1348978243842516593L;

    /** 每次投资金额 */
    private BigDecimal amount;

    /** 最低利率 */
    private BigDecimal interestRateMinimum;

    /** 最高利率 */
    private BigDecimal interestRateMaximum;

    /** 最低期限 */
    private Integer periodMinimum;

    /** 最高期限 */
    private Integer periodMaximum;

    /** 储备金 */
    private BigDecimal reserve;

    /** 是否启用 */
    private Boolean enabled;
    
    /** 日期 */
    private Date date;

    /** 投资人 */
    private MemberEntity investor;

    @Column(nullable = false)
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Column(nullable = false)
    public BigDecimal getInterestRateMinimum() {
        return interestRateMinimum;
    }

    public void setInterestRateMinimum(BigDecimal interestRateMinimum) {
        this.interestRateMinimum = interestRateMinimum;
    }

    @Column(nullable = false)
    public BigDecimal getInterestRateMaximum() {
        return interestRateMaximum;
    }

    public void setInterestRateMaximum(BigDecimal interestRateMaximum) {
        this.interestRateMaximum = interestRateMaximum;
    }

    @Column(nullable = false)
    public Integer getPeriodMinimum() {
        return periodMinimum;
    }

    public void setPeriodMinimum(Integer periodMinimum) {
        this.periodMinimum = periodMinimum;
    }

    @Column(nullable = false)
    public Integer getPeriodMaximum() {
        return periodMaximum;
    }

    public void setPeriodMaximum(Integer periodMaximum) {
        this.periodMaximum = periodMaximum;
    }

    @Column(nullable = false)
    public BigDecimal getReserve() {
        return reserve;
    }

    public void setReserve(BigDecimal reserve) {
        this.reserve = reserve;
    }

    @Column(nullable = false)
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Column(nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getInvestor() {
        return investor;
    }

    public void setInvestor(MemberEntity investor) {
        this.investor = investor;
    }

}