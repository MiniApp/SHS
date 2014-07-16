/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.AuditStateEnum;
import im.shs.web.enums.BankCardStateEnum;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

/**
 * Entity - 银行支行
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_bank_branch")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_bank_branch_sequence")
public class BankBranchEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -4613429237435653720L;

    /** 名称 */
    private String name;

    /** 所在地 */
    private AreaEntity locality;

    /** 银行 */
    private BankEntity bank;

    /** 描述 */
    private String description;

    /** 银行卡 */
    private Set<BankCardEntity> cards = new HashSet<BankCardEntity>();

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    public AreaEntity getLocality() {
        return locality;
    }

    public void setLocality(AreaEntity locality) {
        this.locality = locality;
    }

    @NotNull(groups = Save.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    public BankEntity getBank() {
        return bank;
    }

    public void setBank(BankEntity bank) {
        this.bank = bank;
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @OneToMany(mappedBy = "branch", fetch = FetchType.LAZY)
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
                card.setBranch(null);
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

    /**
     * 验证银行
     * 
     * @param bankId
     *            银行ID
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyBank(Long bankId) {
        return bankId == null || getBank() == null || getBank().getId().equals(bankId);
    }

    /**
     * 验证所在地
     * 
     * @param localityId
     *            所在地ID
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyLocality(Long localityId) {
        return localityId == null || getLocality() == null || getLocality().getId().equals(localityId);
    }

}