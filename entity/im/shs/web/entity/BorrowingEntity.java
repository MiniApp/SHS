/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.elem.ImageElem;
import im.shs.web.enums.AmountScopeEnum;
import im.shs.web.enums.BorrowingProgressEnum;
import im.shs.web.enums.BorrowingStateEnum;
import im.shs.web.enums.BorrowingTypeEnum;
import im.shs.web.enums.CreditRatingEnum;
import im.shs.web.enums.GuaranteeMethodEnum;
import im.shs.web.enums.InterestRateScopeEnum;
import im.shs.web.enums.InvestmentMethodEnum;
import im.shs.web.enums.LendingTimeEnum;
import im.shs.web.enums.PeriodScopeEnum;
import im.shs.web.enums.RepaymentMethodEnum;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Entity - 借款
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_borrowing")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_borrowing_sequence")
public class BorrowingEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -1979865949417874129L;

    /** 借款类型 */
    public static final BorrowingTypeEnum[] borrowingTypes = { BorrowingTypeEnum.credit, BorrowingTypeEnum.guarantee,
            BorrowingTypeEnum.mortgage };

    /** 转让类型 */
    public static final BorrowingTypeEnum[] assignmentTypes = { BorrowingTypeEnum.transfer };

    /** 进度 */
    private BorrowingProgressEnum progress;

    /** 状态 */
    private BorrowingStateEnum state;

    /** 类型 */
    private BorrowingTypeEnum type;

    /** 标题 */
    private String title;

    /** 额度 */
    private BigDecimal amount;

    /** 额度范围 */
    private AmountScopeEnum amountScope;

    /** 期限 */
    private Integer period;

    /** 期限范围 */
    private PeriodScopeEnum periodScope;

    /** 利率 */
    private BigDecimal interestRate;

    /** 利率范围 */
    private InterestRateScopeEnum interestRateScope;

    /** 利息 */
    private BigDecimal interest;

    /** 描述 */
    private String description;

    /** 借款日期 */
    private Date borrowingDate;

    /** 借款公司 */
    private String borrowingCorp;

    /** 用途 */
    private String purpose;

    /** 实地调查 */
    private String fieldInquiry;

    /** 信用调查 */
    private String creditInquiry;

    /** 还款调查 */
    private String repaymentInquiry;

    /** 担保方式 */
    private GuaranteeMethodEnum guaranteeMethod;

    /** 担保金 */
    private BigDecimal guaranteeCapital;

    /** 担保公司 */
    private MemberEntity guaranteeCorp;

    /** 担保措施 */
    private String guarantee;

    /** 风险分析 */
    private String riskAnalysis;

    /** 风险度 */
    private BigDecimal riskDegree;

    /** 信用评级 */
    private CreditRatingEnum creditRating;

    /** 投资方式 */
    private InvestmentMethodEnum investmentMethod;

    /** 最低投资 */
    private BigDecimal investmentMinimum;

    /** 最高投资 */
    private BigDecimal investmentMaximum;

    /** 投资期限 */
    private Integer investmentPeriod;

    /** 已投资 */
    private BigDecimal investedAmount;

    /** 投资开始日期 */
    private Date investmentStartDate;

    /** 投资结束日期 */
    private Date investmentEndDate;

    /** 投资完成日期 */
    private Date investmentFinishDate;

    /** 出借时间 */
    private LendingTimeEnum lendingTime;

    /** 还款方式 */
    private RepaymentMethodEnum repaymentMethod;

    /** 提前还款费率 */
    private BigDecimal prepaymentFeeRate;

    /** （借款）服务费率 */
    private BigDecimal feeRate;

    /** （借款）服务费 */
    private BigDecimal fee;

    /** （借款）已付服务费 */
    private BigDecimal paidFee;

    /** 还款服务费率 */
    private BigDecimal repaymentFeeRate;

    /** 回收服务费率 */
    private BigDecimal recoveryFeeRate;

    /** 逾期利率 */
    private BigDecimal overdueInterestRate;

    /** 严重逾期开始期限 */
    private Integer seriousOverdueStartPeriod;

    /** 严重逾期利率 */
    private BigDecimal seriousOverdueInterestRate;

    /** 借款人 */
    private MemberEntity borrower;

    /** IP */
    private String ip;

    /** 材料 */
    private List<ImageElem> materials = new ArrayList<ImageElem>();

    /** 意见 */
    private Set<BorrowingOpinionEntity> opinions = new HashSet<BorrowingOpinionEntity>();

    /** 投资 */
    private Set<InvestmentEntity> investments = new HashSet<InvestmentEntity>();

    /** 投资记录 */
    private Set<InvestmentRecordEntity> investmentRecords = new HashSet<InvestmentRecordEntity>();

    /** 还款 */
    private Set<RepaymentEntity> repayments = new HashSet<RepaymentEntity>();

    /** 还款计划 */
    private Set<RepaymentPlanEntity> repaymentPlans = new HashSet<RepaymentPlanEntity>();

    /** 回收 */
    private Set<RecoveryEntity> recoveries = new HashSet<RecoveryEntity>();

    /** 回收计划 */
    private Set<RecoveryPlanEntity> recoveryPlans = new HashSet<RecoveryPlanEntity>();

    /** 资金 */
    private Set<CapitalEntity> capitals = new HashSet<CapitalEntity>();

    /** 评论 */
    private Set<CommentEntity> comments = new HashSet<CommentEntity>();

    @Enumerated
    public BorrowingProgressEnum getProgress() {
        return progress;
    }

    public void setProgress(BorrowingProgressEnum progress) {
        this.progress = progress;
    }

    @Enumerated
    @Column(nullable = false)
    public BorrowingStateEnum getState() {
        return state;
    }

    public void setState(BorrowingStateEnum state) {
        this.state = state;
    }

    @Enumerated
    public BorrowingTypeEnum getType() {
        return type;
    }

    public void setType(BorrowingTypeEnum type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(nullable = false)
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Enumerated
    @Column(nullable = false)
    public AmountScopeEnum getAmountScope() {
        return amountScope;
    }

    public void setAmountScope(AmountScopeEnum amountScope) {
        this.amountScope = amountScope;
    }

    @Column(nullable = false)
    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    @Enumerated
    @Column(nullable = false)
    public PeriodScopeEnum getPeriodScope() {
        return periodScope;
    }

    public void setPeriodScope(PeriodScopeEnum periodScope) {
        this.periodScope = periodScope;
    }

    @Column(nullable = false)
    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    @Enumerated
    @Column(nullable = false)
    public InterestRateScopeEnum getInterestRateScope() {
        return interestRateScope;
    }

    public void setInterestRateScope(InterestRateScopeEnum interestRateScope) {
        this.interestRateScope = interestRateScope;
    }

    @Column(nullable = false)
    public BigDecimal getInterest() {
        return interest;
    }

    public void setInterest(BigDecimal interest) {
        this.interest = interest;
    }

    @Column(length = 500)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getBorrowingDate() {
        return borrowingDate;
    }

    public void setBorrowingDate(Date borrowingDate) {
        this.borrowingDate = borrowingDate;
    }

    public String getBorrowingCorp() {
        return borrowingCorp;
    }

    public void setBorrowingCorp(String borrowingCorp) {
        this.borrowingCorp = borrowingCorp;
    }

    @Column(length = 500)
    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    @Column(length = 500)
    public String getFieldInquiry() {
        return fieldInquiry;
    }

    public void setFieldInquiry(String fieldInquiry) {
        this.fieldInquiry = fieldInquiry;
    }

    @Column(length = 500)
    public String getCreditInquiry() {
        return creditInquiry;
    }

    public void setCreditInquiry(String creditInquiry) {
        this.creditInquiry = creditInquiry;
    }

    @Column(length = 500)
    public String getRepaymentInquiry() {
        return repaymentInquiry;
    }

    public void setRepaymentInquiry(String repaymentInquiry) {
        this.repaymentInquiry = repaymentInquiry;
    }

    @Enumerated
    public GuaranteeMethodEnum getGuaranteeMethod() {
        return guaranteeMethod;
    }

    public void setGuaranteeMethod(GuaranteeMethodEnum guaranteeMethod) {
        this.guaranteeMethod = guaranteeMethod;
    }

    @Column(nullable = false)
    public BigDecimal getGuaranteeCapital() {
        return guaranteeCapital;
    }

    public void setGuaranteeCapital(BigDecimal guaranteeCapital) {
        this.guaranteeCapital = guaranteeCapital;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public MemberEntity getGuaranteeCorp() {
        return guaranteeCorp;
    }

    public void setGuaranteeCorp(MemberEntity guaranteeCorp) {
        this.guaranteeCorp = guaranteeCorp;
    }

    @Column(length = 500)
    public String getGuarantee() {
        return guarantee;
    }

    public void setGuarantee(String guarantee) {
        this.guarantee = guarantee;
    }

    @Column(length = 500)
    public String getRiskAnalysis() {
        return riskAnalysis;
    }

    public void setRiskAnalysis(String riskAnalysis) {
        this.riskAnalysis = riskAnalysis;
    }

    @Column(nullable = false)
    public BigDecimal getRiskDegree() {
        return riskDegree;
    }

    public void setRiskDegree(BigDecimal riskDegree) {
        this.riskDegree = riskDegree;
    }

    @Enumerated
    public CreditRatingEnum getCreditRating() {
        return creditRating;
    }

    public void setCreditRating(CreditRatingEnum creditRating) {
        this.creditRating = creditRating;
    }

    @Enumerated
    public InvestmentMethodEnum getInvestmentMethod() {
        return investmentMethod;
    }

    public void setInvestmentMethod(InvestmentMethodEnum investmentMethod) {
        this.investmentMethod = investmentMethod;
    }

    @Column(nullable = false)
    public BigDecimal getInvestmentMinimum() {
        return investmentMinimum;
    }

    public void setInvestmentMinimum(BigDecimal investmentMinimum) {
        this.investmentMinimum = investmentMinimum;
    }

    public BigDecimal getInvestmentMaximum() {
        return investmentMaximum;
    }

    public void setInvestmentMaximum(BigDecimal investmentMaximum) {
        this.investmentMaximum = investmentMaximum;
    }

    public Integer getInvestmentPeriod() {
        return investmentPeriod;
    }

    public void setInvestmentPeriod(Integer investmentPeriod) {
        this.investmentPeriod = investmentPeriod;
    }

    @Column(nullable = false)
    public BigDecimal getInvestedAmount() {
        return investedAmount;
    }

    public void setInvestedAmount(BigDecimal investedAmount) {
        this.investedAmount = investedAmount;
    }

    public Date getInvestmentStartDate() {
        return investmentStartDate;
    }

    public void setInvestmentStartDate(Date investmentStartDate) {
        this.investmentStartDate = investmentStartDate;
    }

    public Date getInvestmentEndDate() {
        return investmentEndDate;
    }

    public void setInvestmentEndDate(Date investmentEndDate) {
        this.investmentEndDate = investmentEndDate;
    }

    public Date getInvestmentFinishDate() {
        return investmentFinishDate;
    }

    public void setInvestmentFinishDate(Date investmentFinishDate) {
        this.investmentFinishDate = investmentFinishDate;
    }

    @Enumerated
    public LendingTimeEnum getLendingTime() {
        return lendingTime;
    }

    public void setLendingTime(LendingTimeEnum lendingTime) {
        this.lendingTime = lendingTime;
    }

    @Enumerated
    public RepaymentMethodEnum getRepaymentMethod() {
        return repaymentMethod;
    }

    public void setRepaymentMethod(RepaymentMethodEnum repaymentMethod) {
        this.repaymentMethod = repaymentMethod;
    }

    @Column(nullable = false)
    public BigDecimal getPrepaymentFeeRate() {
        return prepaymentFeeRate;
    }

    public void setPrepaymentFeeRate(BigDecimal prepaymentFeeRate) {
        this.prepaymentFeeRate = prepaymentFeeRate;
    }

    @Column(nullable = false)
    public BigDecimal getFeeRate() {
        return feeRate;
    }

    public void setFeeRate(BigDecimal feeRate) {
        this.feeRate = feeRate;
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
    public BigDecimal getRepaymentFeeRate() {
        return repaymentFeeRate;
    }

    public void setRepaymentFeeRate(BigDecimal repaymentFeeRate) {
        this.repaymentFeeRate = repaymentFeeRate;
    }

    @Column(nullable = false)
    public BigDecimal getOverdueInterestRate() {
        return overdueInterestRate;
    }

    public void setOverdueInterestRate(BigDecimal overdueInterestRate) {
        this.overdueInterestRate = overdueInterestRate;
    }

    @Column(nullable = false)
    public Integer getSeriousOverdueStartPeriod() {
        return seriousOverdueStartPeriod;
    }

    public void setSeriousOverdueStartPeriod(Integer seriousOverdueStartPeriod) {
        this.seriousOverdueStartPeriod = seriousOverdueStartPeriod;
    }

    @Column(nullable = false)
    public BigDecimal getSeriousOverdueInterestRate() {
        return seriousOverdueInterestRate;
    }

    public void setSeriousOverdueInterestRate(BigDecimal seriousOverdueInterestRate) {
        this.seriousOverdueInterestRate = seriousOverdueInterestRate;
    }

    @Column(nullable = false)
    public BigDecimal getRecoveryFeeRate() {
        return recoveryFeeRate;
    }

    public void setRecoveryFeeRate(BigDecimal recoveryFeeRate) {
        this.recoveryFeeRate = recoveryFeeRate;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getBorrower() {
        return borrower;
    }

    public void setBorrower(MemberEntity borrower) {
        this.borrower = borrower;
    }

    @Column(updatable = false)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @ElementCollection
    @CollectionTable(name = "shs_borrowing_material", joinColumns = @JoinColumn(name = "borrowing"))
    public List<ImageElem> getMaterials() {
        return materials;
    }

    public void setMaterials(List<ImageElem> materials) {
        this.materials = materials;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id desc")
    public Set<BorrowingOpinionEntity> getOpinions() {
        return opinions;
    }

    public void setOpinions(Set<BorrowingOpinionEntity> opinions) {
        this.opinions = opinions;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<InvestmentEntity> getInvestments() {
        return investments;
    }

    public void setInvestments(Set<InvestmentEntity> investments) {
        this.investments = investments;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY)
    public Set<InvestmentRecordEntity> getInvestmentRecords() {
        return investmentRecords;
    }

    public void setInvestmentRecords(Set<InvestmentRecordEntity> investmentRecords) {
        this.investmentRecords = investmentRecords;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<RepaymentEntity> getRepayments() {
        return repayments;
    }

    public void setRepayments(Set<RepaymentEntity> repayments) {
        this.repayments = repayments;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("date asc")
    public Set<RepaymentPlanEntity> getRepaymentPlans() {
        return repaymentPlans;
    }

    public void setRepaymentPlans(Set<RepaymentPlanEntity> repaymentPlans) {
        this.repaymentPlans = repaymentPlans;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY)
    public Set<RecoveryEntity> getRecoveries() {
        return recoveries;
    }

    public void setRecoveries(Set<RecoveryEntity> recoveries) {
        this.recoveries = recoveries;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY)
    @OrderBy("date asc")
    public Set<RecoveryPlanEntity> getRecoveryPlans() {
        return recoveryPlans;
    }

    public void setRecoveryPlans(Set<RecoveryPlanEntity> recoveryPlans) {
        this.recoveryPlans = recoveryPlans;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY)
    public Set<CapitalEntity> getCapitals() {
        return capitals;
    }

    public void setCapitals(Set<CapitalEntity> capitals) {
        this.capitals = capitals;
    }

    @OneToMany(mappedBy = "borrowing", fetch = FetchType.LAZY)
    public Set<CommentEntity> getComments() {
        return comments;
    }

    public void setComments(Set<CommentEntity> comments) {
        this.comments = comments;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        setInterest(BigDecimal.ZERO);
        if (getRiskDegree() == null) {
            setRiskDegree(BigDecimal.ZERO);
        }
        if (getInvestmentMinimum() == null) {
            setInvestmentMinimum(BigDecimal.ZERO);
        }
        // 借款担保
        if (getGuaranteeMethod() == null) {
            setGuaranteeMethod(null);
            setGuaranteeCapital(BigDecimal.ZERO);
            setGuaranteeCorp(null);
        }
        setInvestedAmount(BigDecimal.ZERO);
        if (getPrepaymentFeeRate() == null) {
            setPrepaymentFeeRate(BigDecimal.ZERO);
        }
        if (getFeeRate() == null) {
            setFeeRate(BigDecimal.ZERO);
        }
        if (getFee() == null) {
            setFee(BigDecimal.ZERO);
        }
        if (getPaidFee() == null) {
            setPaidFee(BigDecimal.ZERO);
        }
        if (getRepaymentFeeRate() == null) {
            setRepaymentFeeRate(BigDecimal.ZERO);
        }
        if (getOverdueInterestRate() == null) {
            setOverdueInterestRate(BigDecimal.ZERO);
        }
        if (getSeriousOverdueStartPeriod() == null) {
            setSeriousOverdueStartPeriod(0);
        }
        if (getSeriousOverdueInterestRate() == null) {
            setSeriousOverdueInterestRate(BigDecimal.ZERO);
        }
        if (getRecoveryFeeRate() == null) {
            setRecoveryFeeRate(BigDecimal.ZERO);
        }
    }

    /**
     * 更新前处理
     */
    @PreUpdate
    public void preUpdate() {
        // 借款担保
        if (getGuaranteeMethod() == null) {
            setGuaranteeMethod(null);
            setGuaranteeCapital(BigDecimal.ZERO);
            setGuaranteeCorp(null);
        }
    }

    /**
     * 获取风险额
     * 
     * @return 风险额
     */
    @Transient
    public BigDecimal getRiskAmount() {
        return getRiskDegree().compareTo(BigDecimal.ZERO) > 0 ? getRiskDegree().divide(BigDecimal.TEN)
                .divide(BigDecimal.TEN).multiply(getAmount()).setScale(2, BigDecimal.ROUND_DOWN) : BigDecimal.ZERO;
    }

    /**
     * 判断是否失败
     * 
     * @return 是否失败
     */
    @Transient
    public boolean getIsFailure() {
        if (getState() == BorrowingStateEnum.failure) {
            return true;
        }
        if (getProgress() == BorrowingProgressEnum.investing && getState() == BorrowingStateEnum.wait
                && getInvestmentEndDate() != null && getInvestmentEndDate().before(new Date())) {
            return true;
        }
        return false;
    }

    /**
     * 验证投资
     * 
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyInvest() {
        return getProgress() == BorrowingProgressEnum.investing && getState() == BorrowingStateEnum.wait
                && (getInvestmentEndDate() == null || getInvestmentEndDate().after(new Date()))
                && getAmount().compareTo(getInvestedAmount()) > 0;
    }

    /**
     * 验证投资
     * 
     * @param amount
     *            投资额度
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyInvest(BigDecimal investment) {
        return getProgress() == BorrowingProgressEnum.investing && getState() == BorrowingStateEnum.wait
                && getInvestmentMinimum().compareTo(investment) <= 0
                && (getInvestmentMaximum() == null || getInvestmentMaximum().compareTo(investment) >= 0)
                && (getInvestmentEndDate() == null || getInvestmentEndDate().after(new Date()))
                && getAmount().compareTo(getInvestedAmount().add(investment)) >= 0;
    }

    /**
     * 获取剩余投资金额
     * 
     * @return 剩余投资金额
     */
    @Transient
    public BigDecimal getSurplusInvestmentAmount() {
        return getAmount().subtract(getInvestedAmount());
    }

    /**
     * 验证剩余投资金额
     * 
     * @param amount
     *            投资额度
     * @return 验证是否通过
     */
    @Transient
    public boolean verifySurplusInvestmentAmount(BigDecimal investment) {
        return getAmount().subtract(getInvestedAmount()).compareTo(investment) >= 0;
    }

    /**
     * 获取投资进度
     * 
     * @return 投资进度
     */
    @Transient
    public BigDecimal getInvestmentProgress() {
        return getInvestedAmount().divide(getAmount(), 2, BigDecimal.ROUND_HALF_UP);
    }

    /**
     * 判断是否投资满额
     * 
     * @return 是否投资满额
     */
    @Transient
    public boolean getIsInvestmentFull() {
        return getAmount().compareTo(getInvestedAmount()) == 0;
    }

    /**
     * 获取份数
     * 
     * @return 份数
     */
    @Transient
    public Integer getQuantity() {
        return getAmount().divide(getInvestmentMinimum()).intValueExact();
    }

    /**
     * 获取已投资份数
     * 
     * @return 已投资份数
     */
    @Transient
    public Integer getInvestedQuantity() {
        return getInvestedAmount().compareTo(BigDecimal.ZERO) != 0 ? getInvestedAmount().divide(getInvestmentMinimum())
                .intValueExact() : 0;
    }

    /**
     * 获取剩余投资份数
     * 
     * @return 剩余投资份数
     */
    @Transient
    public Integer getSurplusQuantity() {
        return getQuantity() - getInvestedQuantity();
    }

    /**
     * 获取投资额度
     * 
     * @param quantity
     *            份数
     * @return 投资额度
     */
    @Transient
    public BigDecimal getInvestmentAmount(int quantity) {
        return getInvestmentMinimum().multiply(new BigDecimal(quantity));
    }

    /**
     * 添加投资额度
     * 
     * @param amount
     *            投资额度
     * @return 是否有效
     */
    @Transient
    public void addInvestedAmount(BigDecimal amount) {
        setInvestedAmount(getInvestedAmount().add(amount));
    }

    /**
     * 计算借款服务费
     * 
     * @param amount
     *            金额
     * @return 借款服务费
     */
    @Transient
    public BigDecimal computeFee(BigDecimal amount) {
        return getFeeRate().compareTo(BigDecimal.ZERO) > 0 ? getFeeRate().divide(BigDecimal.TEN).divide(BigDecimal.TEN)
                .multiply(amount).setScale(2, BigDecimal.ROUND_DOWN) : BigDecimal.ZERO;
    }

    /**
     * 计算还款服务费
     * 
     * @param amount
     *            金额
     * @return 还款服务费
     */
    @Transient
    public BigDecimal computeRepaymentFee(BigDecimal amount) {
        return getRepaymentFeeRate().compareTo(BigDecimal.ZERO) > 0 ? getRepaymentFeeRate().divide(BigDecimal.TEN)
                .divide(BigDecimal.TEN).multiply(amount).setScale(2, BigDecimal.ROUND_DOWN) : BigDecimal.ZERO;
    }

    /**
     * 计算回收服务费
     * 
     * @param amount
     *            金额
     * @return 回收服务费
     */
    @Transient
    public BigDecimal computeRecoveryFee(BigDecimal amount) {
        return getRecoveryFeeRate().compareTo(BigDecimal.ZERO) > 0 ? getRecoveryFeeRate().divide(BigDecimal.TEN)
                .divide(BigDecimal.TEN).multiply(amount).setScale(2, BigDecimal.ROUND_DOWN) : BigDecimal.ZERO;
    }

    /**
     * 获取逾期期限
     * 
     * @param overduePeriod
     *            逾期期限
     * @return 还款逾期期限
     */
    @Transient
    public Integer getOverduePeriod(Integer overduePeriod) {
        return overduePeriod > 0 ? (overduePeriod - getSeriousOverdueStartPeriod() > 0 ? getSeriousOverdueStartPeriod()
                : overduePeriod) : 0;
    }

    /**
     * 获取严重逾期期限
     * 
     * @param overduePeriod
     *            逾期期限
     * @return 严重逾期期限
     */
    @Transient
    public Integer getSeriousOverduePeriod(Integer overduePeriod) {
        return overduePeriod > 0 ? (overduePeriod - getSeriousOverdueStartPeriod() > 0 ? overduePeriod
                - getSeriousOverdueStartPeriod() : 0) : 0;
    }

    /**
     * 获取逾期利息
     * 
     * @param amount
     *            额度
     * @param overduePeriod
     *            逾期期限
     * @return 逾期利息
     */
    @Transient
    public BigDecimal getOverdueInterest(BigDecimal amount, Integer overduePeriod) {
        return getOverdueInterestRate().compareTo(BigDecimal.ZERO) > 0 ? getOverdueInterestRate()
                .divide(BigDecimal.TEN).divide(BigDecimal.TEN).multiply(amount)
                .multiply(new BigDecimal(overduePeriod.toString())).setScale(2, BigDecimal.ROUND_DOWN)
                : BigDecimal.ZERO;
    }

    /**
     * 获取严重逾期利息
     * 
     * @param amount
     *            额度
     * @param overduePeriod
     *            逾期期限
     * @return 严重逾期利息
     */
    @Transient
    public BigDecimal getSeriousOverdueInterest(BigDecimal amount, Integer overduePeriod) {
        return getSeriousOverdueInterestRate().compareTo(BigDecimal.ZERO) > 0 ? getSeriousOverdueInterestRate()
                .divide(BigDecimal.TEN).divide(BigDecimal.TEN).multiply(amount)
                .multiply(new BigDecimal(overduePeriod.toString())).setScale(2, BigDecimal.ROUND_DOWN)
                : BigDecimal.ZERO;
    }
    
    /**
     * 获取投资是否满额
     * 
     * @return 是否满额
     */
    @Transient
    public boolean investmentFull() {
        return getInvestedAmount().compareTo(getAmount()) == 0;
    }

}