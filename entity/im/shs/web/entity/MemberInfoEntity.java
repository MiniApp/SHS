/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity - 会员信息
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_member_info")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_member_info_sequence")
public class MemberInfoEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 8482873899057516140L;

    /** “学历”标识 */
    public static final String EDUC_IDENT = "EDUC";

    /** “职业状态”标识 */
    public static final String OCCUP_IDENT = "OCCUP";

    /** “公司类别”标识 */
    public static final String CORP_TYPE_IDENT = "CORP_TYPE";

    /** “公司行业”标识 */
    public static final String CORP_DOMAIN_IDENT = "CORP_DOMAIN";

    /** “公司人员规模”标识 */
    public static final String CORP_STAFF_SIZE_IDENT = "CORP_STAFF_SIZE";

    /** “公司资产规模”标识 */
    public static final String CORP_ASSET_SIZE_IDENT = "CORP_ASSET_SIZE";

    /** “公司上年度经营额”标识 */
    public static final String CORP_PREV_YEAR_OPERATED_REVENUE_IDENT = "CORP_PREV_YEAR_OPERATED_REVENUE";

    /** “公司注册资金”标识 */
    public static final String CORP_REGISTERED_CAPITAL_IDENT = "CORP_REGISTERED_CAPITAL";

    /** “工作年限/公司经营年限”标识 */
    public static final String WORK_PERIOD_IDENT = "WORK_PERIOD";

    /** “职位月收入/公司月收入”标识 */
    public static final String MONTHLY_INCOME_IDENT = "MONTHLY_INCOME";

    /** “每月信用卡账单”标识 */
    public static final String MONTHLY_CREDIT_CARD_STATEMENT_IDENT = "MONTHLY_CREDIT_CARD_STATEMENT";

    /** 身份证签发日期 */
    private Date idIssueDate;

    /** 身份证到期日期 */
    private Date idExpiryDate;

    /** 电话号码 */
    private String phone;

    /** QQ号码 */
    private String qq;

    /** 入校日期 */
    private Date univEnrolDate;

    /** 直系亲属姓名 */
    private String directRelativeName;

    /** 直系亲属关系 */
    private String directRelativeRelation;

    /** 直系亲属手机 */
    private String directRelativeMobile;

    /** 其他联系人姓名 */
    private String otherContactName;

    /** 其他联系人关系 */
    private String otherContactRelation;

    /** 其他联系人手机 */
    private String otherContactMobile;

    /** 更多联系人手机 */
    private String moreContactName;

    /** 更多联系人关系 */
    private String moreContactRelation;

    /** 更多联系人手机 */
    private String moreContactMobile;

    /** 公司资产规模 */
    private String corpAssetSize;

    /** 公司上年度经营额 */
    private String corpPrevYearOperatedRevenue;

    /** 公司注册资金 */
    private String corpRegisteredCapital;

    /** 公司所在地 */
    private AreaEntity corpLocality;

    /** 公司地址 */
    private String corpAddr;

    /** 公司邮编 */
    private String corpZipcode;

    /** 公司执照编号 */
    private String corpLicenseNo;

    /** 公司执照签发日期 */
    private Date corpLicenseIssueDate;

    /** 公司执照到期日期 */
    private Date corpLicenseExpiryDate;

    /** 公司国税登记证编号 */
    private String corpNationalTaxNo;

    /** 公司地税登记证编号 */
    private String corpLandTaxNo;

    /** 工作邮箱 */
    private String workEmail;

    /** 工作手机 */
    private String workMobile;

    /** 工作电话/公司电话 */
    private String workPhone;

    /** 工作QQ */
    private String workQq;

    /** 有无房产 */
    private Boolean ownHouse;

    /** 有无房贷 */
    private Boolean withHouseLoan;

    /** 有无车产 */
    private Boolean ownCar;

    /** 有无车贷 */
    private Boolean withCarLoan;

    /** 每月信用卡账单 */
    private String monthlyCreditCardStatement;

    /** 会员 */
    private MemberEntity member;

    public Date getIdIssueDate() {
        return idIssueDate;
    }

    public void setIdIssueDate(Date idIssueDate) {
        this.idIssueDate = idIssueDate;
    }

    public Date getIdExpiryDate() {
        return idExpiryDate;
    }

    public void setIdExpiryDate(Date idExpiryDate) {
        this.idExpiryDate = idExpiryDate;
    }

    @Column(length = 20)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Column(length = 20)
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public Date getUnivEnrolDate() {
        return univEnrolDate;
    }

    public void setUnivEnrolDate(Date univEnrolDate) {
        this.univEnrolDate = univEnrolDate;
    }

    @Column(length = 50)
    public String getDirectRelativeName() {
        return directRelativeName;
    }

    public void setDirectRelativeName(String directRelativeName) {
        this.directRelativeName = directRelativeName;
    }

    @Column(length = 50)
    public String getDirectRelativeRelation() {
        return directRelativeRelation;
    }

    public void setDirectRelativeRelation(String directRelativeRelation) {
        this.directRelativeRelation = directRelativeRelation;
    }

    @Column(length = 20)
    public String getDirectRelativeMobile() {
        return directRelativeMobile;
    }

    public void setDirectRelativeMobile(String directRelativeMobile) {
        this.directRelativeMobile = directRelativeMobile;
    }

    @Column(length = 50)
    public String getOtherContactName() {
        return otherContactName;
    }

    public void setOtherContactName(String otherContactName) {
        this.otherContactName = otherContactName;
    }

    @Column(length = 50)
    public String getOtherContactRelation() {
        return otherContactRelation;
    }

    public void setOtherContactRelation(String otherContactRelation) {
        this.otherContactRelation = otherContactRelation;
    }

    @Column(length = 20)
    public String getOtherContactMobile() {
        return otherContactMobile;
    }

    public void setOtherContactMobile(String otherContactMobile) {
        this.otherContactMobile = otherContactMobile;
    }

    @Column(length = 50)
    public String getMoreContactName() {
        return moreContactName;
    }

    public void setMoreContactName(String moreContactName) {
        this.moreContactName = moreContactName;
    }

    @Column(length = 50)
    public String getMoreContactRelation() {
        return moreContactRelation;
    }

    public void setMoreContactRelation(String moreContactRelation) {
        this.moreContactRelation = moreContactRelation;
    }

    @Column(length = 20)
    public String getMoreContactMobile() {
        return moreContactMobile;
    }

    public void setMoreContactMobile(String moreContactMobile) {
        this.moreContactMobile = moreContactMobile;
    }

    @Column(length = 50)
    public String getCorpAssetSize() {
        return corpAssetSize;
    }

    public void setCorpAssetSize(String corpAssetSize) {
        this.corpAssetSize = corpAssetSize;
    }

    @Column(length = 50)
    public String getCorpPrevYearOperatedRevenue() {
        return corpPrevYearOperatedRevenue;
    }

    public void setCorpPrevYearOperatedRevenue(String corpPrevYearOperatedRevenue) {
        this.corpPrevYearOperatedRevenue = corpPrevYearOperatedRevenue;
    }

    @Column(length = 50)
    public String getCorpRegisteredCapital() {
        return corpRegisteredCapital;
    }

    public void setCorpRegisteredCapital(String corpRegisteredCapital) {
        this.corpRegisteredCapital = corpRegisteredCapital;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public AreaEntity getCorpLocality() {
        return corpLocality;
    }

    public void setCorpLocality(AreaEntity corpLocality) {
        this.corpLocality = corpLocality;
    }

    @Column(length = 200)
    public String getCorpAddr() {
        return corpAddr;
    }

    public void setCorpAddr(String corpAddr) {
        this.corpAddr = corpAddr;
    }

    @Column(length = 20)
    public String getCorpZipcode() {
        return corpZipcode;
    }

    public void setCorpZipcode(String corpZipcode) {
        this.corpZipcode = corpZipcode;
    }

    @Column(length = 20)
    public String getCorpLicenseNo() {
        return corpLicenseNo;
    }

    public void setCorpLicenseNo(String corpLicenseNo) {
        this.corpLicenseNo = corpLicenseNo;
    }

    public Date getCorpLicenseIssueDate() {
        return corpLicenseIssueDate;
    }

    public void setCorpLicenseIssueDate(Date corpLicenseIssueDate) {
        this.corpLicenseIssueDate = corpLicenseIssueDate;
    }

    public Date getCorpLicenseExpiryDate() {
        return corpLicenseExpiryDate;
    }

    public void setCorpLicenseExpiryDate(Date corpLicenseExpiryDate) {
        this.corpLicenseExpiryDate = corpLicenseExpiryDate;
    }

    @Column(length = 20)
    public String getCorpNationalTaxNo() {
        return corpNationalTaxNo;
    }

    public void setCorpNationalTaxNo(String corpNationalTaxNo) {
        this.corpNationalTaxNo = corpNationalTaxNo;
    }

    @Column(length = 20)
    public String getCorpLandTaxNo() {
        return corpLandTaxNo;
    }

    public void setCorpLandTaxNo(String corpLandTaxNo) {
        this.corpLandTaxNo = corpLandTaxNo;
    }

    @Column(length = 200)
    public String getWorkEmail() {
        return workEmail;
    }

    public void setWorkEmail(String workEmail) {
        this.workEmail = workEmail;
    }

    @Column(length = 20)
    public String getWorkMobile() {
        return workMobile;
    }

    public void setWorkMobile(String workMobile) {
        this.workMobile = workMobile;
    }

    @Column(length = 20)
    public String getWorkPhone() {
        return workPhone;
    }

    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }

    @Column(length = 20)
    public String getWorkQq() {
        return workQq;
    }

    public void setWorkQq(String workQq) {
        this.workQq = workQq;
    }

    public Boolean getOwnHouse() {
        return ownHouse;
    }

    public void setOwnHouse(Boolean ownHouse) {
        this.ownHouse = ownHouse;
    }

    public Boolean getWithHouseLoan() {
        return withHouseLoan;
    }

    public void setWithHouseLoan(Boolean withHouseLoan) {
        this.withHouseLoan = withHouseLoan;
    }

    public Boolean getOwnCar() {
        return ownCar;
    }

    public void setOwnCar(Boolean ownCar) {
        this.ownCar = ownCar;
    }

    public Boolean getWithCarLoan() {
        return withCarLoan;
    }

    public void setWithCarLoan(Boolean withCarLoan) {
        this.withCarLoan = withCarLoan;
    }

    @Column(length = 50)
    public String getMonthlyCreditCardStatement() {
        return monthlyCreditCardStatement;
    }

    public void setMonthlyCreditCardStatement(String monthlyCreditCardStatement) {
        this.monthlyCreditCardStatement = monthlyCreditCardStatement;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getMember() {
        return member;
    }

    public void setMember(MemberEntity member) {
        this.member = member;
    }

}