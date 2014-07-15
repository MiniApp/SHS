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
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 银行
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_bank")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_bank_sequence")
public class BankEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 4726974233006380989L;

    /** 名称 */
    private String name;

    /** 代码 */
    private String code;

    /** LOGO */
    private String logo;

    /** 描述 */
    private String description;

    /** 是否为支付银行 */
    private Boolean payable;

    /** 支行 */
    private Set<BankBranchEntity> branchs = new HashSet<BankBranchEntity>();

    /** 银行卡 */
    private Set<BankCardEntity> cards = new HashSet<BankCardEntity>();

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false, unique = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false, unique = true)
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(nullable = false)
    public Boolean getPayable() {
        return payable;
    }

    public void setPayable(Boolean payable) {
        this.payable = payable;
    }

    @OneToMany(mappedBy = "bank", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<BankBranchEntity> getBranchs() {
        return branchs;
    }

    public void setBranchs(Set<BankBranchEntity> branchs) {
        this.branchs = branchs;
    }

    @OneToMany(mappedBy = "bank", fetch = FetchType.LAZY)
    public Set<BankCardEntity> getCards() {
        return cards;
    }

    public void setCards(Set<BankCardEntity> cards) {
        this.cards = cards;
    }

    /**
     * 删除前处理
     */
    @PreRemove
    public void preRemove() {
        Set<BankCardEntity> cards = getCards();
        if (cards != null) {
            for (BankCardEntity card : cards) {
                card.setState(BankCardStateEnum.auditing);
                card.setAuditState(AuditStateEnum.unaudited);
                card.setBank(null);
            }
        }
    }

    /**
     * 重写toString方法
     * 
     * @return 名称
     */
    @Override
    public String toString() {
        return getName();
    }

}