/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Entity - 私信会话
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_priv_lette_dialog")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_priv_lette_dialog_sequence")
public class PrivLetteDialogEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 4378264816313416455L;

    /** 内容 */
    private String cont;

    /** IP */
    private String ip;

    /** 日期 */
    private Date date;

    /** 发信人 */
    private MemberEntity sender;

    /** 是否发件人删除 */
    private Boolean senderDeleted;

    /** 发件人删除日期 */
    private Date senderDeletedDate;

    /** 收信人 */
    private MemberEntity receiver;

    /** 是否收件人删除 */
    private Boolean receiverDeleted;

    /** 收件人删除日期 */
    private Date receiverDeletedDate;

    /** 未读数 */
    private Integer unreads;

    /** 私信 */
    private Set<PrivLetteEntity> privLettes = new HashSet<PrivLetteEntity>();

    @Column(nullable = false)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Column(nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
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
    @JoinColumn(nullable = false)
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

    @Column(nullable = false)
    public Integer getUnreads() {
        return unreads;
    }

    public void setUnreads(Integer unreads) {
        this.unreads = unreads;
    }

    @OneToMany(mappedBy = "dialog", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<PrivLetteEntity> getPrivLettes() {
        return privLettes;
    }

    public void setPrivLettes(Set<PrivLetteEntity> privLettes) {
        this.privLettes = privLettes;
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

    /**
     * 验证对话人
     * 
     * @param dialogist
     *            对话人
     * @return 是否为对话人
     */
    @Transient
    public boolean verifyDialogist(Long dialogist) {
        return getSender().getId().equals(dialogist) || getReceiver().getId().equals(dialogist);
    }

    /**
     * 判断是否未读
     * 
     * @return 是否未读
     */
    @Transient
    public boolean unread() {
        return getUnreads() > 0;
    }

}