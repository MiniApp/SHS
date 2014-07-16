/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 通知
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_notice")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_notice_sequence")
public class NoticeEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -5886245230701345880L;

    /** 分隔符 */
    public static final String SEPARATOR = ",";

    /** 标题 */
    private String title;

    /** 内容 */
    private String cont;

    /** 发布人 */
    private String publisher;

    /** IP */
    private String ip;

    /** 收件人 */
    private String receivers;

    /** 收件人 */
    private List<String> receiverList = new ArrayList<String>();

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @NotBlank
    @Length(max = 500)
    @Column(nullable = false, updatable = false, length = 500)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    @Column(nullable = false, updatable = false)
    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    @Column(nullable = false, updatable = false)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getReceivers() {
        return receivers;
    }

    public void setReceivers(String receivers) {
        this.receivers = receivers;
    }

    @Transient
    public List<String> getReceiverList() {
        return receiverList;
    }

    public void setReceiverList(List<String> receiverList) {
        this.receiverList = receiverList;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        if (!getReceiverList().isEmpty()) {
            String receivers = StringUtils.join(getReceiverList(), SEPARATOR);
            if (StringUtils.isNotBlank(receivers)) {
                setReceivers(receivers + SEPARATOR);
            }
        }
    }

    /**
     * 验证收信人
     * 
     * @param receiver
     *            收信人
     * @return 是否为收信人
     */
    @Transient
    public boolean verifyReceiver(String receiver) {
        return StringUtils.isBlank(getReceivers()) || StringUtils.contains(getReceivers(), receiver + SEPARATOR);
    }

}