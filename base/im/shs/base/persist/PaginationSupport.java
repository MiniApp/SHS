package im.shs.base.persist;

import java.io.Serializable;
import java.util.Collection;


/**
 * 
 * 支持分页导航的结果集对象
 * 
 * @author GuoJian Zhang
 * @since 2.0
 * @version 1.0
 * @Created on 2008-12-31
 * @Last Modified 2008-12-31
 *
 */
public class PaginationSupport<T> implements Serializable {

	private static final long serialVersionUID = 1L;

	// 数据结果集
	private Collection<T> data;

	private int totalCount;


	public PaginationSupport(Collection<T> data, int totalCount) {
		setTotalCount(totalCount);
		setData(data);
	}

	/**
	 * 得到已分页好的结果集 
	 * @return
	 */
	public Collection<T> getData() {
		return data;
	}

	public void setData(Collection<T> data) {
		this.data = data;
	}
	/**
	 * 得到总结果数
	 * @return
	 */
	public int getTotalCount() {
		return totalCount;
	}
	


	public void setTotalCount(int totalCount) {
		if (totalCount > 0) {
			this.totalCount = totalCount;
		}
		else {
			this.totalCount = 0;
		}
	}
}
