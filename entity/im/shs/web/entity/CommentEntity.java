/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

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

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 评论
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_comment")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_comment_sequence")
public class CommentEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 3964806172151480896L;

    /** 内容 */
    private String cont;

    /** IP */
    private String ip;

    /** 借款 */
    private BorrowingEntity borrowing;

    /** 评论人 */
    private MemberEntity reviewer;

    /** 所属评论 */
    private CommentEntity forComment;

    /** 回复 */
    private Set<CommentEntity> replys = new HashSet<CommentEntity>();

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false, updatable = false)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    @Column(updatable = false)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
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
    public MemberEntity getReviewer() {
        return reviewer;
    }

    public void setReviewer(MemberEntity reviewer) {
        this.reviewer = reviewer;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    public CommentEntity getForComment() {
        return forComment;
    }

    public void setForComment(CommentEntity forComment) {
        this.forComment = forComment;
    }

    @OneToMany(mappedBy = "forComment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    public Set<CommentEntity> getReplys() {
        return replys;
    }

    public void setReplys(Set<CommentEntity> replys) {
        this.replys = replys;
    }

}