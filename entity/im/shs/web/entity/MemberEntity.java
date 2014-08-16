/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.ChildEnum;
import im.shs.web.enums.CreditRatingEnum;
import im.shs.web.enums.GenderEnum;
import im.shs.web.enums.MarriageEnum;
import im.shs.web.interceptor.MemberInterceptor;
import im.shs.web.util.DateTimeUtil;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Pattern;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;

/**
 * Entity - 会员
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_member")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_member_sequence")
public class MemberEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 3398058230264615523L;

    /** “身份信息”参数名称 */
    public static final String PRINCIPAL_ATTR_NAME = MemberInterceptor.class.getName() + ".PRINCIPAL";

    /** “密钥”参数 */
    public static final String KEY_ATTR = "P2PKey";

    /** “用户名”Cookie名称 */
    public static final String USERNAME_COOKIE_NAME = "P2PUsername";

    /** 用户名 */
    private String username;

    /** 密码 */
    private String password;

    /** 姓名 */
    private String name;

    /** 身份证号码 */
    private String idNo;

    /** 性别 */
    private GenderEnum gender;

    /** 出生日期 */
    private Date birth;

    /** 邮箱地址 */
    private String email;

    /** 手机号码 */
    private String mobile;

    /** 最高学历 */
    private String educ;

    /** 毕业院校 */
    private String univ;

    /** 婚姻状况 */
    private MarriageEnum marriage;

    /** 子女情况 */
    private ChildEnum child;

    /** 籍贯 */
    private AreaEntity birthplace;

    /** 户籍 */
    private AreaEntity domicilePlace;

    /** 居住地 */
    private AreaEntity abodePlace;

    /** 地址 */
    private String addr;

    /** 邮编 */
    private String zipcode;

    /** 电话 */
    private String phone;

    /** 职业状态 */
    private String occup;

    /** 公司名称 */
    private String corpName;

    /** 公司类别 */
    private String corpType;

    /** 公司行业 */
    private String corpDomain;

    /** 公司规模 */
    private String corpScale;

    /** 公司有无担保资质 */
    private Boolean corpWithGuarantee;

    /** 是否为法人代表 */
    private Boolean corporator;

    /** 职位 */
    private String post;

    /** 工作年限/公司经营年限 */
    private String period;

    /** 月收入 */
    private String income;

    /** 简介 */
    private String intro;
    
    /** 托管帐号 */
    private String escrowAccount;

    /** 托管户名 */
    private String escrowAccountName;

    /** 余额 */
    private BigDecimal balance;

    /** 待收金额 */
    private BigDecimal credit;

    /** 待还金额 */
    private BigDecimal debit;

    /** 冻结金额 */
    private BigDecimal frozen;

    /** 支付密码 */
    private String payPassword;

    /** 信用评级 */
    private CreditRatingEnum creditRating;

    /** 信用分 */
    private Integer creditScore;

    /** 信用额度 */
    private BigDecimal creditAmount;

    /** 是否启用 */
    private Boolean enabled;

    /** 是否锁定 */
    private Boolean locked;

    /** 连续登录失败次数 */
    private Integer loginFailureCount;

    /** 锁定日期 */
    private Date lockedDate;

    /** 注册IP */
    private String registIp;

    /** 最后登录IP */
    private String loginIp;

    /** 最后登录日期 */
    private Date loginDate;

    /** 信息 */
    private MemberInfoEntity info;

    /** 记录 */
    private MemberRecordEntity record;

    /** 自动投资 */
    private AutoInvestmentEntity autoInvestment;

    /** 日志 */
    private Set<MemberLogEntity> logs = new HashSet<MemberLogEntity>();

    /** 银行卡 */
    private Set<BankCardEntity> bankCards = new HashSet<BankCardEntity>();

    /** 推荐人 */
    private MemberEntity referrer;

    /** 被推荐人 */
    private Set<MemberEntity> referrals = new HashSet<MemberEntity>();

    /** 借款总金额 */
    private BigDecimal borrowingAmts;

    /** 投资总金额 */
    private BigDecimal investmentAmts;

    /** 充值总金额 */
    private BigDecimal rechargeAmts;

    /** 提现总金额 */
    private BigDecimal withdrawalAmts;
    
    /** 微信号 */
    private String openid;

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    @Pattern(regexp = "^[0-9a-z_A-Z\\u4e00-\\u9fa5]+$")
    @Length(min = 2, max = 20)
    @Column(nullable = false, updatable = false, unique = true, length = 100)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Pattern(regexp = "^[^\\s&\"<>]+$")
    @Length(min = 4, max = 20)
    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Pattern(regexp = "^[\\u4e00-\\u9fa5]+$")
    @Length(max = 50)
    @Column(length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Pattern(regexp = "^([1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3})|([1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}(x|X)))$")
    @Column(unique = true, length = 20)
    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    @Enumerated
    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    @Email
    @Length(max = 200)
    @Column(unique = true, length = 200)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Pattern(regexp = "^1[3,5,8]\\d{9}$")
    @Column(unique = true, length = 20)
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Column(length = 20)
    public String getEduc() {
        return educ;
    }

    public void setEduc(String educ) {
        this.educ = educ;
    }

    @Column(length = 50)
    public String getUniv() {
        return univ;
    }

    public void setUniv(String univ) {
        this.univ = univ;
    }

    @Enumerated
    public MarriageEnum getMarriage() {
        return marriage;
    }

    public void setMarriage(MarriageEnum marriage) {
        this.marriage = marriage;
    }

    @Enumerated
    public ChildEnum getChild() {
        return child;
    }

    public void setChild(ChildEnum child) {
        this.child = child;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public AreaEntity getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(AreaEntity birthplace) {
        this.birthplace = birthplace;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public AreaEntity getDomicilePlace() {
        return domicilePlace;
    }

    public void setDomicilePlace(AreaEntity domicilePlace) {
        this.domicilePlace = domicilePlace;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public AreaEntity getAbodePlace() {
        return abodePlace;
    }

    public void setAbodePlace(AreaEntity abodePlace) {
        this.abodePlace = abodePlace;
    }

    @Column(length = 200)
    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    @Column(length = 20)
    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    @Column(length = 20)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Column(length = 20)
    public String getOccup() {
        return occup;
    }

    public void setOccup(String occup) {
        this.occup = occup;
    }

    @Column(length = 50)
    public String getCorpName() {
        return corpName;
    }

    public void setCorpName(String corpName) {
        this.corpName = corpName;
    }

    @Column(length = 50)
    public String getCorpType() {
        return corpType;
    }

    public void setCorpType(String corpType) {
        this.corpType = corpType;
    }

    @Column(length = 50)
    public String getCorpDomain() {
        return corpDomain;
    }

    public void setCorpDomain(String corpDomain) {
        this.corpDomain = corpDomain;
    }

    @Column(length = 50)
    public String getCorpScale() {
        return corpScale;
    }

    public void setCorpScale(String corpScale) {
        this.corpScale = corpScale;
    }

    @Column(nullable = false)
    public Boolean getCorpWithGuarantee() {
        return corpWithGuarantee;
    }

    public void setCorpWithGuarantee(Boolean corpWithGuarantee) {
        this.corpWithGuarantee = corpWithGuarantee;
    }

    @Column(nullable = false)
    public Boolean getCorporator() {
        return corporator;
    }

    public void setCorporator(Boolean corporator) {
        this.corporator = corporator;
    }

    @Column(length = 20)
    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    @Column(length = 20)
    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    @Column(length = 20)
    public String getIncome() {
        return income;
    }

    public void setIncome(String income) {
        this.income = income;
    }

    @Column(length = 200)
    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }
    
    public String getEscrowAccount() {
        return escrowAccount;
    }

    public void setEscrowAccount(String escrowAccount) {
        this.escrowAccount = escrowAccount;
    }

    public String getEscrowAccountName() {
        return escrowAccountName;
    }

    public void setEscrowAccountName(String escrowAccountName) {
        this.escrowAccountName = escrowAccountName;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getCredit() {
        return credit;
    }

    public void setCredit(BigDecimal credit) {
        this.credit = credit;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getDebit() {
        return debit;
    }

    public void setDebit(BigDecimal debit) {
        this.debit = debit;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getFrozen() {
        return frozen;
    }

    public void setFrozen(BigDecimal frozen) {
        this.frozen = frozen;
    }

    @Pattern(regexp = "^[^\\s&\"<>]+$")
    public String getPayPassword() {
        return payPassword;
    }

    public void setPayPassword(String payPassword) {
        this.payPassword = payPassword;
    }

    @Enumerated
    @Column(nullable = false)
    public CreditRatingEnum getCreditRating() {
        return creditRating;
    }

    public void setCreditRating(CreditRatingEnum creditRating) {
        this.creditRating = creditRating;
    }

    @Column(nullable = false)
    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(BigDecimal creditAmount) {
        this.creditAmount = creditAmount;
    }

    @Column(nullable = false)
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Column(nullable = false)
    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    @Column(nullable = false)
    public Integer getLoginFailureCount() {
        return loginFailureCount;
    }

    public void setLoginFailureCount(Integer loginFailureCount) {
        this.loginFailureCount = loginFailureCount;
    }

    public Date getLockedDate() {
        return lockedDate;
    }

    public void setLockedDate(Date lockedDate) {
        this.lockedDate = lockedDate;
    }

    @Column(nullable = false, updatable = false)
    public String getRegistIp() {
        return registIp;
    }

    public void setRegistIp(String registIp) {
        this.registIp = registIp;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    public MemberInfoEntity getInfo() {
        return info;
    }

    public void setInfo(MemberInfoEntity info) {
        this.info = info;
    }

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    public MemberRecordEntity getRecord() {
        return record;
    }

    public void setRecord(MemberRecordEntity record) {
        this.record = record;
    }

    @OneToOne(mappedBy = "investor", fetch = FetchType.LAZY)
    public AutoInvestmentEntity getAutoInvestment() {
        return autoInvestment;
    }

    public void setAutoInvestment(AutoInvestmentEntity autoInvestment) {
        this.autoInvestment = autoInvestment;
    }

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id desc")
    public Set<MemberLogEntity> getLogs() {
        return logs;
    }

    public void setLogs(Set<MemberLogEntity> logs) {
        this.logs = logs;
    }

    @OneToMany(mappedBy = "cardholder", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<BankCardEntity> getBankCards() {
        return bankCards;
    }

    public void setBankCards(Set<BankCardEntity> bankCards) {
        this.bankCards = bankCards;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public MemberEntity getReferrer() {
        return referrer;
    }

    public void setReferrer(MemberEntity referrer) {
        this.referrer = referrer;
    }

    @OneToMany(mappedBy = "referrer", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<MemberEntity> getReferrals() {
        return referrals;
    }

    public void setReferrals(Set<MemberEntity> referrals) {
        this.referrals = referrals;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getBorrowingAmts() {
        if (borrowingAmts == null) {
            return new BigDecimal("0");
        }
        return borrowingAmts;
    }

    public void setBorrowingAmts(BigDecimal borrowingAmts) {
        this.borrowingAmts = borrowingAmts;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getInvestmentAmts() {
        if (investmentAmts == null) {
            return new BigDecimal("0");
        }
        return investmentAmts;
    }

    public void setInvestmentAmts(BigDecimal investmentAmts) {
        this.investmentAmts = investmentAmts;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getRechargeAmts() {
        if (rechargeAmts == null) {
            return new BigDecimal("0");
        }
        return rechargeAmts;
    }

    public void setRechargeAmts(BigDecimal rechargeAmts) {
        this.rechargeAmts = rechargeAmts;
    }

    @Column(nullable = false, precision = 27, scale = 12)
    public BigDecimal getWithdrawalAmts() {
        if (withdrawalAmts == null) {
            return new BigDecimal("0");
        }
        return withdrawalAmts;
    }

    public void setWithdrawalAmts(BigDecimal withdrawalAmts) {
        this.withdrawalAmts = withdrawalAmts;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        setCorpWithGuarantee(false);
        setCorporator(false);
        setBalance(BigDecimal.ZERO);
        setCredit(BigDecimal.ZERO);
        setDebit(BigDecimal.ZERO);
        setFrozen(BigDecimal.ZERO);
        setCreditRating(CreditRatingEnum.HR);
        setCreditScore(0);
        setCreditAmount(BigDecimal.ZERO);
        if (getEnabled() == null) {
            setEnabled(true);
        }
        setLocked(false);
        setLoginFailureCount(0);
        setBorrowingAmts(BigDecimal.ZERO);
        setInvestmentAmts(BigDecimal.ZERO);
        setRechargeAmts(BigDecimal.ZERO);
        setWithdrawalAmts(BigDecimal.ZERO);
    }

    /**
     * 验证登录密码
     * 
     * @param password
     *            密码
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyLoginPassword(String password) {
        return StringUtils.equals(DigestUtils.md5Hex(password), getPassword());
    }

    /**
     * 设置新密码
     * 
     * @param password
     *            密码
     */
    @Transient
    public void setNewPassword(String password) {
        setPassword(DigestUtils.md5Hex(password));
    }

    /**
     * 获取可用余额
     * 
     * @return 可用余额
     */
    @Transient
    public BigDecimal getAvailable() {
        return getBalance().compareTo(BigDecimal.ZERO) > 0 ? getBalance().subtract(getFrozen()) : BigDecimal.ZERO;
    }

    /**
     * 验证可用余额
     * 
     * @param amount
     *            金额
     * @return 是否可用
     */
    @Transient
    public boolean verifyAvailable(BigDecimal amount) {
        return !(amount.compareTo(getAvailable()) > 0);
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
     * 添加冻结资金
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addFrozen(BigDecimal amount) {
        setFrozen(getFrozen().add(amount));
    }

    /**
     * 减去冻结资金
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractFrozen(BigDecimal amount) {
        setFrozen(getFrozen().subtract(amount));
    }

    /**
     * 验证冻结资金
     * 
     * @param amount
     *            金额
     * @return 是否有效
     */
    @Transient
    public boolean verifyFrozen(BigDecimal amount) {
        return !(amount.compareTo(getFrozen()) > 0);
    }

    /**
     * 添加待收金额
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addCredit(BigDecimal amount) {
        setCredit(getCredit().add(amount));
    }

    /**
     * 减去待收金额
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractCredit(BigDecimal amount) {
        setCredit(getCredit().subtract(amount));
    }

    /**
     * 添加待还金额
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void addDebit(BigDecimal amount) {
        setDebit(getDebit().add(amount));
    }

    /**
     * 减去待还金额
     * 
     * @param amount
     *            金额
     */
    @Transient
    public void subtractDebit(BigDecimal amount) {
        setDebit(getDebit().subtract(amount));
    }

    /**
     * 获取净资产
     * 
     * @return 净资产
     */
    @Transient
    public BigDecimal getEquity() {
        return getCredit().subtract(getDebit()).add(getBalance());
    }

    /**
     * 验证支付密码
     * 
     * @param password
     *            密码
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyPayPassword(String password) {
        return StringUtils.equals(DigestUtils.md5Hex(password), getPayPassword());
    }

    /**
     * 设置新支付密码
     * 
     * @param password
     *            密码
     */
    @Transient
    public void setNewPayPassword(String password) {
        setPayPassword(DigestUtils.md5Hex(password));
    }

    /**
     * 获取年龄
     * 
     * @return 年龄
     */
    @Transient
    public Integer getAge() {
        if (getBirth() == null) {
            return null;
        }
        return DateTimeUtil.getYearCount(getBirth(), new Date());
    }

    /**
     * 判断身份信息是否完善
     * 
     * @return 身份信息是否完善
     */
    @Transient
    public boolean perfectIdentity() {
        return StringUtils.isNotBlank(getIdNo());
    }

    /**
     * 判断邮箱地址是否完善
     * 
     * @return 邮箱地址是否完善
     */
    @Transient
    public boolean perfectEmail() {
        return StringUtils.isNotBlank(getEmail());
    }

    /**
     * 判断手机号码是否完善
     * 
     * @return 手机号码是否完善
     */
    @Transient
    public boolean perfectMobile() {
        return StringUtils.isNotBlank(getMobile());
    }

    /**
     * 判断支付密码是否完善
     * 
     * @return 支付密码是否完善
     */
    @Transient
    public boolean perfectPayPassword() {
        return StringUtils.isNotBlank(getPayPassword());
    }
    
    /**
     * 判断托管账号是否完善
     * 
     * @return 托管账号是否完善
     */
    @Transient
    public boolean perfectEscrowAccount() {
        return StringUtils.isNotBlank(getEscrowAccount());
    }

    /**
     * 获取安全等级
     * 
     * @return 安全等级
     */
    @Transient
    public float getSecurityLevel() {
        int sum = 0;
        int current = 0;

        // 设置用户名
        if (StringUtils.isNotBlank(getUsername())) {
            current++;
        }
        sum++;

        // 设置登录密码
        if (StringUtils.isNotBlank(getPassword())) {
            current++;
        }
        sum++;

        // 设置身份证号码
        if (StringUtils.isNotBlank(getIdNo())) {
            current++;
        }
        sum++;

        // 设置邮箱地址
        if (StringUtils.isNotBlank(getEmail())) {
            current++;
        }
        sum++;

        // 设置手机号码
        if (StringUtils.isNotBlank(getMobile())) {
            current++;
        }
        sum++;
        
        // 设置托管账户
        if (StringUtils.isNotBlank(getEscrowAccount())) {
            current++;
        }
        sum++;

        // 设置支付密码
        /*if (StringUtils.isNotBlank(getPayPassword())) {
            current++;
        }
        sum++;*/

        return (float) current / sum;
    }

    /**
     * 重写toString方法
     * 
     * @return 用户名
     */
    @Override
    public String toString() {
        return getUsername();
    }

}