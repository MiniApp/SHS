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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 私信
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_priv_lette")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_priv_lette_sequence")
public class PrivLetteEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -7532497992699384981L;

    /** 内容 */
    private String cont;

    /** IP */
    private String ip;

    /** 发件人 */
    private MemberEntity sender;

    /** 是否发件人删除 */
    private Boolean senderDeleted;

    /** 发件人删除日期 */
    private Date senderDeletedDate;

    /** 收件人 */
    private MemberEntity receiver;

    /** 是否收件人删除 */
    private Boolean receiverDeleted;

    /** 收件人删除日期 */
    private Date receiverDeletedDate;

    /** 会话 */
    private PrivLetteDialogEntity dialog;

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false, updatable = false)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    @Column(nullable = false, updatable = false)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getSender() {
        return sender;
    }

    public void setSender(MemberEntity sender) {
        this.sender = sender;
    }

    @Column(nullable = false)
    public Boolean getSenderDeleted() {
        return senderDeleted;
    }

    public void setSenderDeleted(Boolean senderDeleted) {
        this.senderDeleted = senderDeleted;
    }

    public Date getSenderDeletedDate() {
        return senderDeletedDate;
    }

    public void setSenderDeletedDate(Date senderDeletedDate) {
        this.senderDeletedDate = senderDeletedDate;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public MemberEntity getReceiver() {
        return receiver;
    }

    public void setReceiver(MemberEntity receiver) {
        this.receiver = receiver;
    }

    @Column(nullable = false)
    public Boolean getReceiverDeleted() {
        return receiverDeleted;
    }

    public void setReceiverDeleted(Boolean receiverDeleted) {
        this.receiverDeleted = receiverDeleted;
    }

    public Date getReceiverDeletedDate() {
        return receiverDeletedDate;
    }

    public void setReceiverDeletedDate(Date receiverDeletedDate) {
        this.receiverDeletedDate = receiverDeletedDate;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    public PrivLetteDialogEntity getDialog() {
        return dialog;
    }

    public void setDialog(PrivLetteDialogEntity dialog) {
        this.dialog = dialog;
    }

    /**
     * 重写toString方法
     * 
     * @return 内容
     */
    @Override
    public String toString() {
        return getCont();
    }

    /**
     * 验证发信人
     * 
     * @param sender
     *            发信人
     * @return 是否为发信人
     */
    @Transient
    public boolean verifySender(Long sender) {
        return getSender().getId().equals(sender);
    }

    /**
     * 验证收信人
     * 
     * @param receiver
     *            收信人
     * @return 是否为收信人
     */
    @Transient
    public boolean verifyReceiver(Long receiver) {
        return getReceiver().getId().equals(receiver);
    }

}