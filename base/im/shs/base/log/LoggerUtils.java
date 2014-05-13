package im.shs.base.log;

/**
 * Logging utility methods
 * 
 * @author Dedong Chen
 *
 */
public class LoggerUtils {

	/**
	 * Formats messages using parameters. For example, the call:
	 * 
	 * <pre>
	 * format(&quot;foo #1&quot;, &quot;bob&quot;);
	 * </pre>
	 * 
	 * will return:
	 * 
	 * <pre>
	 *  foo bob
	 * </pre>
	 * 
	 * @param msg
	 *            The message
	 * @param args
	 *            A list of arguments. A maximum of 10 are supported.
	 * @return The formatted string
	 */
	public static String format(String msg, String... args) {
		if (msg != null && msg.length() > 0 && msg.indexOf('#') > -1) {
			StringBuilder sb = new StringBuilder();
			boolean isArg = false;
			for (int x = 0; x < msg.length(); x++) {
				char c = msg.charAt(x);
				if (isArg) {
					isArg = false;
					if (Character.isDigit(c)) {
						int val = Character.getNumericValue(c);
						if (val >= 1 && val <= args.length) {
							sb.append(args[val - 1]);
							continue;
						}
					}
					sb.append('#');
				}
				if (c == '#') {
					isArg = true;
					continue;
				}
				sb.append(c);
			}
			if (isArg) {
				sb.append('#');
			}
			return sb.toString();
		}
		return msg;
	}
}
