package im.shs;

import im.shs.enums.OrderDirectionEnum;

import java.io.Serializable;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;


/**
 * @class : Order
 * @description: 排序
 *
 * @author suhao
 * @date 2014年7月13日 上午12:18:15
 * @version 1.0
 */
public class Order implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = 3004996343395633090L;

    /** 默认方向 */
    private static final OrderDirectionEnum DEFAULT_DIRECTION = OrderDirectionEnum.desc;

    /** 属性 */
    private String property;

    /** 方向 */
    private OrderDirectionEnum direction = DEFAULT_DIRECTION;

    /**
     * @param property
     *            属性
     * @param direction
     *            方向
     */
    public Order(String property, OrderDirectionEnum direction) {
        this.property = property;
        this.direction = direction;
    }

    /**
     * 返回递增排序
     * 
     * @param property
     *            属性
     * @return 递增排序
     */
    public static Order asc(String property) {
        return new Order(property, OrderDirectionEnum.asc);
    }

    /**
     * 返回递减排序
     * 
     * @param property
     *            属性
     * @return 递减排序
     */
    public static Order desc(String property) {
        return new Order(property, OrderDirectionEnum.desc);
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public OrderDirectionEnum getDirection() {
        return direction;
    }

    public void setDirection(OrderDirectionEnum direction) {
        this.direction = direction;
    }

    /**
     * 重写equals方法
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        Order other = (Order) obj;
        return new EqualsBuilder().append(getProperty(), other.getProperty())
                .append(getDirection(), other.getDirection()).isEquals();
    }

    /**
     * 重写hashCode方法
     * 
     * @return hashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getProperty()).append(getDirection()).toHashCode();
    }

}