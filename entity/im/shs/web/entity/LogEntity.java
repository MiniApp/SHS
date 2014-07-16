/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Entity - 日志
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_log")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_log_sequence")
public class LogEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 7960465034354831599L;

    /** "内容"属性名称 */
    public static final String CONT_ATTR_NAME = LogEntity.class.getName() + ".CONT";

    /** 操作 */
    private String operation;

    /** 操作员 */
    private String operator;

    /** 内容 */
    private String cont;

    /** 请求参数 */
    private String param;

    /** IP */
    private String ip;

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false, updatable = false)
    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    @Length(max = 200)
    @Column(updatable = false)
    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    @Length(max = 200)
    @Column(updatable = false)
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    @Length(max = 3000)
    @Lob
    @Column(updatable = false)
    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    @Length(max = 200)
    @Column(updatable = false)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

}