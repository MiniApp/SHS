package im.shs.web.util;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class StringUtils {

	private final static String[] hex = { "00", "01", "02", "03", "04", "05",
			"06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "10",
			"11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B",
			"1C", "1D", "1E", "1F", "20", "21", "22", "23", "24", "25", "26",
			"27", "28", "29", "2A", "2B", "2C", "2D", "2E", "2F", "30", "31",
			"32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C",
			"3D", "3E", "3F", "40", "41", "42", "43", "44", "45", "46", "47",
			"48", "49", "4A", "4B", "4C", "4D", "4E", "4F", "50", "51", "52",
			"53", "54", "55", "56", "57", "58", "59", "5A", "5B", "5C", "5D",
			"5E", "5F", "60", "61", "62", "63", "64", "65", "66", "67", "68",
			"69", "6A", "6B", "6C", "6D", "6E", "6F", "70", "71", "72", "73",
			"74", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7D", "7E",
			"7F", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89",
			"8A", "8B", "8C", "8D", "8E", "8F", "90", "91", "92", "93", "94",
			"95", "96", "97", "98", "99", "9A", "9B", "9C", "9D", "9E", "9F",
			"A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AA",
			"AB", "AC", "AD", "AE", "AF", "B0", "B1", "B2", "B3", "B4", "B5",
			"B6", "B7", "B8", "B9", "BA", "BB", "BC", "BD", "BE", "BF", "C0",
			"C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "CA", "CB",
			"CC", "CD", "CE", "CF", "D0", "D1", "D2", "D3", "D4", "D5", "D6",
			"D7", "D8", "D9", "DA", "DB", "DC", "DD", "DE", "DF", "E0", "E1",
			"E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EA", "EB", "EC",
			"ED", "EE", "EF", "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
			"F8", "F9", "FA", "FB", "FC", "FD", "FE", "FF" };
	private final static byte[] val = { 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x00, 0x01,
			0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F,
			0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F, 0x3F };

	// private static Log logger = LogService.getLogger(StringUtils.class);

	/**
	 * Check if a String has text. More specifically, returns <code>true</code>
	 * if the string not <code>null<code>, it's <code>length is > 0</code>, and
	 * it has at least one non-whitespace character.
	 * <p><pre>
	 *  StringUtils.hasText(null) = false
	 *  StringUtils.hasText("") = false
	 *  StringUtils.hasText(" ") = false
	 *  StringUtils.hasText("12345") = true
	 *  StringUtils.hasText(" 12345 ") = true
	 * </pre>
	 * @param str the String to check, may be <code>null</code>
	 * @return <code>true</code> if the String is not null, length > 0,
	 *         and not whitespace only
	 * @see java.lang.Character#isWhitespace
	 */
	public static boolean hasText(String str) {
		int strLen;
		if (str == null || (strLen = str.length()) == 0) {
			return false;
		}
		for (int i = 0; i < strLen; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 将给定字符串去掉左右空格
	 * 
	 * <pre>
	 *  StringUtils.trimText(null) = ""
	 *  StringUtils.trimText("") = ""
	 *  StringUtils.trimText(" ") = ""
	 *  StringUtils.trimText("  12345") = "12345"
	 *  StringUtils.trimText(" 12345 ") = "12345"
	 *  StringUtils.trimText("12345  ") = "12345"
	 * </pre>
	 * 
	 * @param str
	 *            要加工的字符串
	 * @return 返回截空的字符串
	 */
	public static String trimText(String str) {
		if (!hasText(str))
			return "";

		char[] c = str.toCharArray();
		int offset = 0, end = 0;
		for (int i = 0; i < c.length; i++) {
			if (!Character.isWhitespace(c[i])) {
				offset = i;
				break;
			}
		}
		for (int i = c.length; i > offset; i--) {
			if (!Character.isWhitespace(c[i - 1])) {
				end = i;
				break;
			}
		}
		return new String(c, offset, (end - offset));
	}

	/**
	 * 去掉字符串左边的空格
	 * 
	 * <pre>
	 *  StringUtils.trimLeft(null) = ""
	 *  StringUtils.trimLeft("") = ""
	 *  StringUtils.trimLeft(" ") = ""
	 *  StringUtils.trimLeft("  12345") = "12345"
	 *  StringUtils.trimLeft(" 12345 ") = "12345 "
	 *  StringUtils.trimLeft("12345  ") = "12345  "
	 * </pre>
	 * 
	 * @param str
	 * @return
	 */
	public static String trimLeft(String str) {
		//
		if (!hasText(str))
			return "";

		char[] c = str.toCharArray();
		int offset = 0;
		for (int i = 0; i < c.length; i++) {
			if (!Character.isWhitespace(c[i])) {
				offset = i;
				break;
			}
		}
		return new String(c, offset, c.length - offset);
	}

	/**
	 * <pre>
	 *  StringUtils.trimRight(null) = ""
	 *  StringUtils.trimRight("") = ""
	 *  StringUtils.trimRight(" ") = ""
	 *  StringUtils.trimRight("  12345") = "  12345"
	 *  StringUtils.trimRight(" 12345 ") = " 12345"
	 *  StringUtils.trimRight("12345  ") = "12345"
	 * </pre>
	 * 
	 * @param str
	 * @return
	 */
	public static String trimRight(String str) {
		if (!hasText(str))
			return "";
		char[] c = str.toCharArray();
		int end = 0;
		for (int i = c.length; i > 0; i--) {
			if (!Character.isWhitespace(c[i - 1])) {
				end = i;
				break;
			}
		}
		return new String(c, 0, end);
	}

	/**
	 * 将字符串根据分割符，转换为字符串数组
	 * <pre>
	 *  StringUtils.tokenizeToStringArray("abc|def","|") = {"abc","def"}
	 * </pre>	 * 
	 * @param str
	 * @param delimiters
	 * @return
	 */
	public static String[] tokenizeToStringArray(String str, String delimiters) {
		if (!hasText(str) || !hasText(delimiters))
			return new String[] { str };

		return tokenizeToStringArray(str, delimiters, true, true);
	}

	public static String[] tokenizeToStringArray(String str, String delimiters,
			boolean trimTokens, boolean ignoreEmptyTokens) {
		StringTokenizer st = new StringTokenizer(str, delimiters);
		List<String> tokens = new ArrayList<String>();
		while (st.hasMoreTokens()) {
			String token = st.nextToken();
			if (trimTokens) {
				token = token.trim();
			}
			if (!ignoreEmptyTokens || token.length() > 0) {
				tokens.add(token);
			}
		}
		return (String[]) tokens.toArray(new String[tokens.size()]);
	}

	/**
	 * 将对象转换为字符串
	 * @param obj
	 * @return
	 */
	public static String toString(Object obj) {
		if(obj == null) 
			return "null";
		
		StringBuffer sb = new StringBuffer();

		Class<?> clazz = obj.getClass();
		Field[] fields = clazz.getDeclaredFields();
		
		sb.append(clazz.getName() + "{");
		try {
			for (Field field : fields) {
				field.setAccessible(true);
				sb.append("\"" + field.getName() + "\" : \"" + field.get(obj) + "\", ");
			}
		} catch (IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		}
		String sbs = sb.substring(0, sb.length() - 2);
		StringBuffer sbf = new StringBuffer(sbs);
		sbf.append("}");
		
		return sbf.toString();

		/*if (obj == null)
			return null;
		Class objClass = obj.getClass();
		if (objClass.getName().startsWith("java.lang"))
			return obj.toString();

		StringBuffer result = new StringBuffer();
		if (isSubClassOf(objClass, "Collection")) {
			result.append(processIterator(((Collection) obj).iterator(),
					objClass));
		} else if (isSubClassOf(objClass, "Map")) {
			result.append(processMap((Map) obj, objClass));
		} else if (isSubClassOf(objClass, "Iterator")) {
			result.append(processIterator((Iterator) obj, objClass));
		} else if (isSubClassOf(objClass, "Enumeration")) {
			result.append(processEnumeration((Enumeration) obj, objClass));
		} else if (objClass.isAssignableFrom(new Object[0].getClass())) {
			Object[] array = (Object[]) obj;

			result.append("[");
			for (int i = 0; i < array.length; i++) {
				result.append(array[i]
						+ ":"
						+ (array[i] != null ? array[i].getClass().getName()
								: "NULL"));
				if (i < array.length - 1) {
					result.append(",");
				}
			}
			result.append("]");
		} else {
			Method[] methods = null;
			Field[] fields = objClass.getDeclaredFields();
			if (!(objClass.getName().startsWith("java")) && fields.length > 0) {
				result.append(obj.getClass().getName()).append(":[");
				for (int i = 0; i < fields.length; i++) {
					result.append(fields[i].getName()).append(":");
					if (fields[i].isAccessible()) {
						try {
							result.append(toString(fields[i].get(obj)));
						} catch (IllegalAccessException iae) {
							iae.printStackTrace();
						}
					} else {
						if (methods == null) {
							methods = objClass.getMethods();
						}
						for (int j = 0; j < methods.length; j++) {
							if (methods[j].getName().equalsIgnoreCase(
									"get" + fields[i].getName())) {
								try {
									result.append(toString(methods[j].invoke(obj, null)));
								} catch (IllegalAccessException iae) {
									iae.printStackTrace();
								} catch (InvocationTargetException ite) {
									ite.printStackTrace();
								}
							}
						}
					}
					result.append("; ");
				}
				result.append(']');
			} else {
				result.append(obj);
				return result.toString();
			}
		}
		return result.toString();*/
	}

	@SuppressWarnings({ "rawtypes", "unused" })
	private static boolean isSubClassOf(Class objClass, String className) {
		do {
			if (isClassOrInterface(objClass, className)) {
				return true;
			}
			objClass = objClass.getSuperclass();
		} while (!(objClass.equals(objClass != null ? objClass
				: (objClass = Object.class))));
		return false;
	}

	@SuppressWarnings("rawtypes")
	private static boolean isClassOrInterface(Class objClass, String className) {
		if (objClass.getClass().getName().equals(className))
			return true;
		Class[] classes = objClass.getInterfaces();
		for (int i = 0; i < classes.length; i++) {
			if (classes[i].getName().equals("java.util." + className))
				return true;
		}
		return false;
	}

	/**
	 * 判断字符串是否为数字
	 * @param str
	 * @return
	 */
	public static boolean isInteger(String str) {

		// 先将字符串左右两边的空格去掉
		str = trimText(str);
		int len = str.length();
		// skip first char if sign char
		char c = str.charAt(0);
		int i = ((c == '-') || (c == '+')) ? 1 : 0;

		if (i >= len) {
			return false;
		}
		do {
			if (!Character.isDigit(str.charAt(i))) {
				return false;
			}
			i++;
		} while (i < len);

		return true;
	}

	/**
	 * 转换字符串代码
	 * @param strIn 源字符串
	 * @param encoding 源字符编码,如果为空,则为系统默认编码
	 * @param targetEncoding 目标字符编码,如果为空,则为系统默认编码
	 * @return 目标字符编码的字符串
	 */
	public static String convertEncode(String strIn, String encoding,
			String targetEncoding) {
		String strOut = strIn;

		if (!hasText(strIn))
			return strOut;

		try {
			if (encoding != null && targetEncoding != null) {
				if (!encoding.equalsIgnoreCase(targetEncoding))
					strOut = new String(strIn.getBytes(encoding),
							targetEncoding);
			} else if (encoding != null) {
				strOut = new String(strIn.getBytes(encoding));
			} else if (targetEncoding != null) {
				strOut = new String(strIn.getBytes(), targetEncoding);
			} else {
				return strOut;
			}
		} catch (UnsupportedEncodingException e) {
			// 当转码出错时,将源字符串返回
			return strIn;
		}
		return strOut;
	}

	/**
	 * JavaScript escape 函数  java版
	 * <p>方法说明:</p>
	 * @auther DuanYong
	 * @since 2012-11-1 下午5:43:25
	 * @param s
	 * @return String
	 */
	public static String escape(String s) {
		StringBuilder sbuf = new StringBuilder();
		int len = s.length();
		for (int i = 0; i < len; i++) {
			int ch = s.charAt(i);
			if (ch == ' ') { // space : map to '+'
				sbuf.append('+');
			} else if ('A' <= ch && ch <= 'Z') { // 'A'..'Z' : as it was
				sbuf.append((char) ch);
			} else if ('a' <= ch && ch <= 'z') { // 'a'..'z' : as it was
				sbuf.append((char) ch);
			} else if ('0' <= ch && ch <= '9') { // '0'..'9' : as it was
				sbuf.append((char) ch);
			} else if (ch == '-'
					|| ch == '_' // unreserved : as it was
					|| ch == '.' || ch == '!' || ch == '~' || ch == '*'
					|| ch == '\'' || ch == '(' || ch == ')') {
				sbuf.append((char) ch);
			} else if (ch <= 0x007F) { // other ASCII : map to %XX
				sbuf.append('%');
				sbuf.append(hex[ch]);
			} else { // unicode : map to %uXXXX
				sbuf.append('%');
				sbuf.append('u');
				sbuf.append(hex[(ch >>> 8)]);
				sbuf.append(hex[(0x00FF & ch)]);
			}
		}
		return sbuf.toString();
	}

	/**
	 * JavaScript unescape 函数  java版
	 * <p>方法说明:</p>
	 * @auther DuanYong
	 * @since 2012-11-1 下午5:44:39
	 * @param s
	 * @return String
	 */
	public static String unescape(String s) {
		StringBuilder sbuf = new StringBuilder();
		int i = 0;
		int len = s.length();
		while (i < len) {
			int ch = s.charAt(i);
			if (ch == '+') { // + : map to ' '
				sbuf.append(' ');
			} else if ('A' <= ch && ch <= 'Z') { // 'A'..'Z' : as it was
				sbuf.append((char) ch);
			} else if ('a' <= ch && ch <= 'z') { // 'a'..'z' : as it was
				sbuf.append((char) ch);
			} else if ('0' <= ch && ch <= '9') { // '0'..'9' : as it was
				sbuf.append((char) ch);
			} else if (ch == '-'
					|| ch == '_' // unreserved : as it was
					|| ch == '.' || ch == '!' || ch == '~' || ch == '*'
					|| ch == '\'' || ch == '(' || ch == ')') {
				sbuf.append((char) ch);
			} else if (ch == '%') {
				int cint = 0;
				if ('u' != s.charAt(i + 1)) { // %XX : map to ascii(XX)
					cint = (cint << 4) | val[s.charAt(i + 1)];
					cint = (cint << 4) | val[s.charAt(i + 2)];
					i += 2;
				} else { // %uXXXX : map to unicode(XXXX)
					cint = (cint << 4) | val[s.charAt(i + 2)];
					cint = (cint << 4) | val[s.charAt(i + 3)];
					cint = (cint << 4) | val[s.charAt(i + 4)];
					cint = (cint << 4) | val[s.charAt(i + 5)];
					i += 5;
				}
				sbuf.append((char) cint);
			}
			i++;
		}
		return sbuf.toString();
	}

}
