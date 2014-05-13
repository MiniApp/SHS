package im.shs.base.persist;

import java.io.Serializable;

/**
 * 分页支持的规则定义
 * 
 * @author GuoJian Zhang
 * @since 2.0
 * @version 1.0
 * @Created on 2008-12-31
 * @Last Modified 2008-12-31
 *
 */
public class PaginationCriteria implements Serializable {
	
	private static final long serialVersionUID = -5130495753390862448L;
	
	//跳转页面命令
	private final static String GOTO_PAGE_COMMAND = "GoToPageCommand";
	//页面查询命令
	private final static String QUERY_COMMAND = "QueryCommand";
	
	private static final String DEFAULT_CMD = "Pagination";
	
	public final static int PAGESIZE = 10; 
	
	private int startIndex;
	private int pageSize = PAGESIZE;
	
	private int gotoPageIndex;
	
	/**
	 * 排序属性
	 */
	private String sortProperty;
	
	/**
	 * 排序方式:是否升序排列
	 */
	private boolean sortAscending;
	
	private String command = DEFAULT_CMD;
	
	private String pageChangeFlag;
	
	private String currPageIndex;
	
	public PaginationCriteria() {
		this.startIndex = 0;
		this.pageSize = 10;
		
		this.gotoPageIndex = -1;
	}
	
	public int getGotoPageIndex() {
		return gotoPageIndex;
	}

	public void setGotoPageIndex(int gotoPageIndex) {
		this.gotoPageIndex = gotoPageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getStartIndex() {
		if(gotoPageIndex < 1)gotoPageIndex = 1;
		
		//计算查询记录起始位置
		if (GOTO_PAGE_COMMAND.equalsIgnoreCase(getCommand()))
		{
			this.startIndex = (gotoPageIndex - 1) * pageSize;
		}
		else if (QUERY_COMMAND.equalsIgnoreCase(getCommand()))
		{
			this.startIndex = 0;
		}
		
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	/**
	 * @return the ascending
	 */
	public boolean isSortAscending() {
		return sortAscending;
	}

	/**
	 * @param sortAscending the ascending to set
	 */
	public void setSortAscending(boolean sortAscending) {
		this.sortAscending = sortAscending;
	}

	/**
	 * @return the sortProperty
	 */
	public String getSortProperty() {
		return sortProperty;
	}

	/**
	 * @param sortProperty the sortProperty to set
	 */
	public void setSortProperty(String sortProperty) {
		this.sortProperty = sortProperty;
	}

	public String getCommand() {
		return command;
	}

	public void setCommand(String command) {
		this.command = command;
	}

	public String getPageChangeFlag() {
		return pageChangeFlag;
	}

	public void setPageChangeFlag(String pageChangeFlag) {
		this.pageChangeFlag = pageChangeFlag;
	}

	public String getCurrPageIndex() {
		return currPageIndex;
	}

	public void setCurrPageIndex(String currPageIndex) {
		this.currPageIndex = currPageIndex;
	}
	
	
}
