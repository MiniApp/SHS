package im.shs;

import im.shs.enums.OrderDirectionEnum;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @class : Page
 * @description: 分页
 * 
 * @author suhao
 * @date 2014年7月13日 上午12:18:34
 * @version 1.0
 */
public class Page<T> implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 973350653494827020L;

	/** 总记录数 */
	private final long total;

	/** 分页信息 */
	private final Pageable pageable;

	/** 内容 */
	private final List<T> cont = new ArrayList<T>();

	public Page() {
		this.total = 0L;
		this.pageable = new Pageable();
	}

	/**
	 * @param total
	 *            总记录数
	 * @param pageable
	 *            分页信息
	 * @param cont
	 *            内容
	 */
	public Page(long total, Pageable pageable, List<T> cont) {
		this.total = total;
		this.pageable = pageable;
		this.cont.addAll(cont);
	}

	public int getPageNumber() {
		return pageable.getPageNumber();
	}

	public int getPageSize() {
		return pageable.getPageSize();
	}

	public String getSearchProperty() {
		return pageable.getSearchProperty();
	}

	public String getSearchValue() {
		return pageable.getSearchValue();
	}

	public String getOrderProperty() {
		return pageable.getOrderProperty();
	}

	public OrderDirectionEnum getOrderDirection() {
		return pageable.getOrderDirection();
	}

	public List<Order> getOrders() {
		return pageable.getOrders();
	}

	public List<Filter> getFilters() {
		return pageable.getFilters();
	}

	public long getTotal() {
		return total;
	}

	public Pageable getPageable() {
		return pageable;
	}

	public List<T> getCont() {
		return cont;
	}

	/**
	 * 获取总页数
	 * 
	 * @return 总页数
	 */
	public int getTotalPages() {
		return (int) Math.ceil((double) getTotal() / (double) getPageSize());
	}

}