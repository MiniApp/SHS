package im.shs.web;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import im.shs.web.enums.FilterOperatorEnum;

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
    private static final long serialVersionUID = -5363234287319504888L;

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
     * 生成等于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 等于过滤器
     */
    public static Filter eq(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.eq, value);
    }

    /**
     * 生成等于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @param ignoreCase
     *            忽略大小写
     * @return 等于过滤器
     */
    public static Filter eq(String property, Object value, boolean ignoreCase) {
        return new Filter(property, FilterOperatorEnum.eq, value, ignoreCase);
    }

    /**
     * 生成不等于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 不等于过滤器
     */
    public static Filter ne(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.ne, value);
    }

    /**
     * 生成不等于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @param ignoreCase
     *            忽略大小写
     * @return 不等于过滤器
     */
    public static Filter ne(String property, Object value, boolean ignoreCase) {
        return new Filter(property, FilterOperatorEnum.ne, value, ignoreCase);
    }

    /**
     * 生成大于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 大于过滤器
     */
    public static Filter gt(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.gt, value);
    }

    /**
     * 生成小于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 小于过滤器
     */
    public static Filter lt(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.lt, value);
    }

    /**
     * 生成大于等于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 大于等于过滤器
     */
    public static Filter ge(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.ge, value);
    }

    /**
     * 生成小于等于过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 小于等于过滤器
     */
    public static Filter le(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.le, value);
    }

    /**
     * 生成相似过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 相似过滤器
     */
    public static Filter like(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.like, value);
    }

    /**
     * 生成包含过滤器
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 包含过滤器
     */
    public static Filter in(String property, Object value) {
        return new Filter(property, FilterOperatorEnum.in, value);
    }

    /**
     * 生成为Null过滤器
     * 
     * @param property
     *            属性
     * @return 为Null过滤器
     */
    public static Filter isNull(String property) {
        return new Filter(property, FilterOperatorEnum.isNull, null);
    }

    /**
     * 生成不为Null过滤器
     * 
     * @param property
     *            属性
     * @return 不为Null过滤器
     */
    public static Filter isNotNull(String property) {
        return new Filter(property, FilterOperatorEnum.isNotNull, null);
    }

    /**
     * 生成HashCode
     * 
     * @return HashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getProperty()).append(getOperator()).append(getValue()).toHashCode();
    }

    /**
     * 判断是否相等
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (isEmpty() || obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Filter filter = (Filter) obj;
        if (filter.isEmpty()) {
            return false;
        }
        return new EqualsBuilder().append(getProperty(), filter.getProperty())
                .append(getOperator(), filter.getOperator()).append(getValue(), filter.getValue()).isEquals();
    }

    /**
     * 判断是否为空
     * 
     * @return 是否为空
     */
    public boolean isEmpty() {
        return StringUtils.isBlank(getProperty()) || getOperator() == null;
    }

}