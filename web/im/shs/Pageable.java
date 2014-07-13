package im.shs;

import im.shs.enums.OrderDirectionEnum;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

/**
 * @class : Pageable
 * @description: 分页信息
 * 
 * @author suhao
 * @date 2014年7月13日 上午12:18:48
 * @version 1.0
 */
public class Pageable implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 8586153372403021890L;

	/** 默认页码 */
	private static final int DEFAULT_PAGE_NUMBER = 1;

	/** 默认每页记录数 */
	private static final int DEFAULT_PAGE_SIZE = 20;

	/** 最大每页记录数 */
	private static final int MAX_PAGE_SIZE = 1000;

	/** 页码 */
	private int pageNumber = DEFAULT_PAGE_NUMBER;

	/** 每页记录数 */
	private int pageSize = DEFAULT_PAGE_SIZE;

	/** 搜索属性 */
	private String searchProperty;

	/** 搜索值 */
	private String searchValue;

	/** 排序属性 */
	private String orderProperty;

	/** 排序方向 */
	private OrderDirectionEnum orderDirection;

	/** 筛选 */
	private List<Filter> filters = new ArrayList<Filter>();

	/** 排序 */
	private List<Order> orders = new ArrayList<Order>();

	public Pageable() {
	}

	/**
	 * @param pageSize
	 *            每页记录数
	 */
	public Pageable(Integer pageSize) {
		if (pageSize != null && pageSize >= 1 && pageSize <= MAX_PAGE_SIZE) {
			this.pageSize = pageSize;
		}
	}

	/**
	 * @param pageNumber
	 *            页码
	 * @param pageSize
	 *            每页记录数
	 */
	public Pageable(Integer pageNumber, Integer pageSize) {
		if (pageNumber != null && pageNumber >= 1) {
			this.pageNumber = pageNumber;
		}
		if (pageSize != null && pageSize >= 1 && pageSize <= MAX_PAGE_SIZE) {
			this.pageSize = pageSize;
		}
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		if (pageNumber < 1) {
			pageNumber = DEFAULT_PAGE_NUMBER;
		}
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
			pageSize = DEFAULT_PAGE_SIZE;
		}
		this.pageSize = pageSize;
	}

	public String getSearchProperty() {
		return searchProperty;
	}

	public void setSearchProperty(String searchProperty) {
		this.searchProperty = searchProperty;
	}

	public String getSearchValue() {
		return searchValue;
	}

	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}

	public String getOrderProperty() {
		return orderProperty;
	}

	public void setOrderProperty(String orderProperty) {
		this.orderProperty = orderProperty;
	}

	public OrderDirectionEnum getOrderDirection() {
		return orderDirection;
	}

	public void setOrderDirection(OrderDirectionEnum orderDirection) {
		this.orderDirection = orderDirection;
	}

	public List<Filter> getFilters() {
		return filters;
	}

	public void setFilters(List<Filter> filters) {
		this.filters = filters;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
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
		Pageable other = (Pageable) obj;
		return new EqualsBuilder()
				.append(getPageNumber(), other.getPageNumber())
				.append(getPageSize(), other.getPageSize())
				.append(getSearchProperty(), other.getSearchProperty())
				.append(getSearchValue(), other.getSearchValue())
				.append(getOrderProperty(), other.getOrderProperty())
				.append(getOrderDirection(), other.getOrderDirection())
				.append(getFilters(), other.getFilters())
				.append(getOrders(), other.getOrders()).isEquals();
	}

	/**
	 * 重写hashCode方法
	 * 
	 * @return hashCode
	 */
	@Override
	public int hashCode() {
		return new HashCodeBuilder(17, 37).append(getPageNumber())
				.append(getPageSize()).append(getSearchProperty())
				.append(getSearchValue()).append(getOrderProperty())
				.append(getOrderDirection()).append(getFilters())
				.append(getOrders()).toHashCode();
	}

}