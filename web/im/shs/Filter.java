package im.shs;

import java.io.Serializable;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import im.shs.enums.FilterOperatorEnum;

/**
 * @class : Filter
 * @description: 筛选
 *
 * @author suhao
 * @date 2014年7月13日 上午12:17:38
 * @version 1.0
 */
public class Filter implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -187751431691732726L;

    /** 默认是否忽略大小写 */
    private static final boolean DEFAULT_IGNORE_CASE = false;

    /** 属性 */
    private String property;

    /** 运算符 */
    private FilterOperatorEnum operator;

    /** 值 */
    private Object value;

    /** 是否忽略大小写 */
    private boolean ignoreCase;

    /**
     * @param property
     *            属性
     * @param operator
     *            运算符
     * @param value
     *            值
     */
    public Filter(String property, FilterOperatorEnum operator, Object value) {
        this.property = property;
        this.operator = operator;
        this.value = value;
        this.ignoreCase = DEFAULT_IGNORE_CASE;
    }

    /**
     * @param property
     *            属性
     * @param operator
     *            运算符
     * @param value
     *            值
     * @param ignoreCase
     *            忽略大小写
     */
    public Filter(String property, FilterOperatorEnum operator, Object value, boolean ignoreCase) {
        this.property = property;
        this.operator = operator;
        this.value = value;
        this.ignoreCase = ignoreCase;
    }

    /**
     * 返回等于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 等于筛选
     */
    public static Filter eq(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.eq, value);
    }

    /**
     * 返回等于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @param ignoreCase
     *            忽略大小写
     * @return 等于筛选
     */
    public static Filter eq(String property, Object value, boolean ignoreCase) {
        return new Filter(property, FilterOperatorEnum.eq, value, ignoreCase);
    }

    /**
     * 返回不等于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 不等于筛选
     */
    public static Filter ne(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.ne, value);
    }

    /**
     * 返回不等于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @param ignoreCase
     *            忽略大小写
     * @return 不等于筛选
     */
    public static Filter ne(String property, Object value, boolean ignoreCase) {
        return new Filter(property, FilterOperatorEnum.ne, value, ignoreCase);
    }

    /**
     * 返回大于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 大于筛选
     */
    public static Filter gt(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.gt, value);
    }

    /**
     * 返回小于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 小于筛选
     */
    public static Filter lt(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.lt, value);
    }

    /**
     * 返回大于等于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 大于等于筛选
     */
    public static Filter ge(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.ge, value);
    }

    /**
     * 返回小于等于筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 小于等于筛选
     */
    public static Filter le(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.le, value);
    }

    /**
     * 返回相似筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 相似筛选
     */
    public static Filter like(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.like, value);
    }

    /**
     * 返回包含筛选
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 包含筛选
     */
    public static Filter in(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.in, value);
    }

    /**
     * 返回为Null筛选
     * 
     * @param property
     *            属性
     * @return 为Null筛选
     */
    public static Filter isNull(String property) {
        return new Filter(property, FilterOperatorEnum.isNull, null);
    }

    /**
     * 返回不为Null筛选
     * 
     * @param property
     *            属性
     * @return 不为Null筛选
     */
    public static Filter isNotNull(String property) {
        return new Filter(property, FilterOperatorEnum.isNotNull, null);
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public FilterOperatorEnum getOperator() {
        return operator;
    }

    public void setOperator(FilterOperatorEnum operator) {
        this.operator = operator;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public boolean getIgnoreCase() {
        return ignoreCase;
    }

    public void setIgnoreCase(boolean ignoreCase) {
        this.ignoreCase = ignoreCase;
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
        Filter other = (Filter) obj;
        return new EqualsBuilder().append(getProperty(), other.getProperty())
                .append(getOperator(), other.getOperator()).append(getValue(), other.getValue()).isEquals();
    }

    /**
     * 重写hashCode方法
     * 
     * @return hashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getProperty()).append(getOperator()).append(getValue()).toHashCode();
    }

}