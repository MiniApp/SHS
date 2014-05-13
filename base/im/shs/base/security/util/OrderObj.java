package im.shs.base.security.util;

public class OrderObj {
	
	
	public static final String ORDER_ASC = "asc";
	public static final String ORDER_DESC = "desc";
	private String name;
	private String orderBy;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	
	public OrderObj(String name, String orderBy) {
		this.name = name;
		this.orderBy = orderBy;
	}
	
	public static OrderObj asc(String name) {
		return new OrderObj(name, OrderObj.ORDER_ASC);
	}
	
	public static OrderObj desc(String name) {
		return new OrderObj(name, OrderObj.ORDER_DESC);
	}
}
