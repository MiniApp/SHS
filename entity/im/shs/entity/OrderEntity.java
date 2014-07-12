/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.entity;

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
public abstract class OrderEntity extends BaseEntity implements Comparable<OrderEntity> {

    /** serialVersionUID */
    private static final long serialVersionUID = -5313593550313952762L;

    /** “排序”属性名称 */
    public static final String ORDER_PROPERTY_NAME = "order";

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
    public int compareTo(OrderEntity orderEntity) {
        return new CompareToBuilder().append(getOrder(), orderEntity.getOrder()).append(getId(), orderEntity.getId())
                .toComparison();
    }

}