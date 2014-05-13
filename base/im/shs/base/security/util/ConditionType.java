package im.shs.base.security.util;

import java.util.LinkedList;
import java.util.List;

public class ConditionType {
	
	//操作符
	public static final String OPER_EQ = " = ";
	public static final String OPER_LE = " <= ";
	public static final String OPER_GE = " >= ";
	public static final String OPER_LIKE = " LIKE ";
	public static final String OPER_NULL = " IS NULL ";
	public static final String OPER_NONULL = " IS NOT NULL ";
	public static final String OPER_GT = " > ";
	public static final String OPER_LT = " < ";
	public static final String OPER_NE = " != ";
	public static final String OPER_IN = "in";
	
	public static final int IOPER_EQ = 0;
	public static final int IOPER_LE = 1;
	public static final int IOPER_GE = 2;
	public static final int IOPER_LIKE = 3;
	public static final int IOPER_NULL = 4;
	public static final int IOPER_NONULL = 5;
	public static final int IOPER_GT = 6;
	public static final int IOPER_LT = 7;
	public static final int IOPER_NE = 8;
	public static final int IOPER_IN = 9;
	
	//数据类型
	public static final int DATA_STRING = 1;
	public static final int DATA_NUMBER = 2;
	public static final int DATA_DATE = 3;
	
	//连接类型
	public static final int LINK_AND = 11;
	public static final int LINK_OR = 12;
	
	
	//名-值对
	private String name;
	private Object value;
	private Object[] values;
	
	public Object[] getValues() {
		return values;
	}

	public void setValues(Object[] values) {
		this.values = values;
	}

	private Integer dataType;
	
	private String operator;
	private int ioperator;
	public int getIoperator() {
		return ioperator;
	}

	public void setIoperator(int ioperator) {
		this.ioperator = ioperator;
	}

	private int linkType;
	
	List<ConditionType> conditions = null;
	
	public int getLinkType() {
		return linkType;
	}

	public void setLinkType(int linkType) {
		this.linkType = linkType;
	}

	
	public ConditionType() {
		
	}
	
	public List<ConditionType> getConditions() {
		return conditions;
	}

	public void setConditions(List<ConditionType> conditions) {
		this.conditions = conditions;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public Integer getDataType() {
		return dataType;
	}

	public void setDataType(Integer dataType) {
		this.dataType = dataType;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public ConditionType(String name, Object value,  String operator) {
		this.name = name;
		this.value = value;
		this.operator = operator;
	}
	
	public ConditionType(String name, Object value,  int ioperator) {
		this.name = name;
		this.value = value;
		this.ioperator = ioperator;
	}
	
	
	public ConditionType(String name, Object[] values, String operator) {
		this.name = name;
		this.values = values;
		this.operator = operator;
	}
	
	public ConditionType(String name, Object[] values, int ioperator) {
		this.name = name;
		this.values = values;
		this.ioperator = ioperator;
	}
	
	public static ConditionType eq(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_EQ);
	}
	
	public static ConditionType le(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_LE);
	}
	public static ConditionType ge(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_GE);
	}
	public static ConditionType like(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_LIKE);
	}
	public static ConditionType isNull(String name, Integer dataType) {
		return new ConditionType(name, "", ConditionType.IOPER_NULL);
	}
	public static ConditionType noNull(String name, Integer dataType) {
		return new ConditionType(name, "", ConditionType.IOPER_NONULL);
	}
	public static ConditionType gt(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_GT);
	}
	public static ConditionType lt(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_LT);
	}
	public static ConditionType ne(String name, Object value) {
		return new ConditionType(name, value, ConditionType.IOPER_NE);
	}
	
	public static ConditionType in(String name, Object[] values) {
		return new ConditionType(name, values, ConditionType.IOPER_IN);
	}
	
	public static ConditionType or(ConditionType ...conditionTypes) {
		ConditionType cond = new ConditionType();
		cond.setLinkType(LINK_OR);
		List<ConditionType> conditions = new LinkedList<ConditionType>();
		
		for(ConditionType c : conditionTypes) {
			conditions.add(c);
		}
		cond.setConditions(conditions);
		return cond;
	}
	
}
