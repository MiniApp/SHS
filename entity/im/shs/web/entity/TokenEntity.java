/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.enums.RandomStringTypeEnum;
import im.shs.web.enums.TokenMethodEnum;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 令牌
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_token")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_token_sequence")
public class TokenEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = -8045331549391799824L;

    /** 类型 */
    private RandomStringTypeEnum type;

    /** 方式 */
    private TokenMethodEnum method;

    /** 通讯地址 */
    private String addr;

    /** 代码 */
    private String code;

    /** 到期时间 */
    private Date expiry;

    /** 重发时间 */
    private Date retry;

    @Enumerated
    @Column(nullable = false)
    public RandomStringTypeEnum getType() {
        return type;
    }

    public void setType(RandomStringTypeEnum type) {
        this.type = type;
    }

    @Enumerated
    @Column(nullable = false)
    public TokenMethodEnum getMethod() {
        return method;
    }

    public void setMethod(TokenMethodEnum method) {
        this.method = method;
    }

    @Column(nullable = false, unique = true)
    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getExpiry() {
        return expiry;
    }

    public void setExpiry(Date expiry) {
        this.expiry = expiry;
    }

    public Date getRetry() {
        return retry;
    }

    public void setRetry(Date retry) {
        this.retry = retry;
    }

    /**
     * 判断是否过期
     * 
     * @return 是否过期
     */
    @Transient
    public boolean getExpired() {
        return getExpiry() != null && getExpiry().before(new Date());
    }

    /**
     * 判断是否可重发
     * 
     * @return 是否可重发
     */
    @Transient
    public boolean getRetried() {
        return getRetry() == null || getRetry().before(new Date());
    }

    /**
     * 验证重发
     * 
     * @param method
     *            方式
     * @return 重发是否允许
     */
    @Transient
    public boolean verifyRetry(TokenMethodEnum method) {
        return getMethod() != method || getRetried();
    }

    /**
     * 验证
     * 
     * @param method
     *            方式
     * @param addr
     *            通讯地址
     * @param code
     *            代码
     * @return 验证是否通过
     */
    @Transient
    public boolean verify(TokenMethodEnum method, String addr, String code) {
        return getMethod() == method && !getExpired() && StringUtils.equals(getCode(), code);
    }

}