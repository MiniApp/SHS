package im.shs.base.log;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 直接使用apache的common-logging
 * 
 * @author Dedong Chen
 * 
 */
public abstract class LogService {

	public static Log getLogger(Class<?> cls) {
		return LogFactory.getFactory().getInstance(cls);
	}

	public static Log getLogger(String name) {
		return LogFactory.getFactory().getInstance(name);
	}

	public static Log getLogger() {
		return getLogger("");
	}
}
