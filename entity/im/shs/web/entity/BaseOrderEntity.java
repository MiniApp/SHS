/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.Min;

import org.apache.commons.lang3.builder.CompareToBuilder;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Entity - 排序基类
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@MappedSuperclass
public abstract class BaseOrderEntity extends BaseEntity implements Comparable<BaseOrderEntity> {

    /** serialVersionUID */
    private static final long serialVersionUID = 528488769206407257L;

    /** “排序”属性 */
    public static final String ORDER_PROP = "order";

    /** 排序 */
    private Integer order;

    @JsonProperty
    @Min(0)
    @Column(name = "orders")
    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    /**
     * 重写compareTo方法
     * 
     * @param orderEntity
     *            排序基类及其子类
     * @return 比较结果
     */
    @Override
    public int compareTo(BaseOrderEntity orderEntity) {
        return new CompareToBuilder().append(getOrder(), orderEntity.getOrder()).append(getId(), orderEntity.getId())
                .toComparison();
    }

}