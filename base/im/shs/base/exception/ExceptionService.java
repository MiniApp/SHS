package im.shs.base.exception;

import im.shs.base.log.LogService;
import im.shs.base.log.LoggerUtils;
import im.shs.base.util.StringUtils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.PropertyResourceBundle;

import org.apache.commons.logging.Log;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

public class ExceptionService {

	private static Log logger = LogService.getLogger(ExceptionService.class);

	private static String DEFAULT_FILE = "ApplicationError.properties";

	private static HashMap<String, String> p_map = new HashMap<String,String>();

	private String configfile;

	public void init() {
		logger.info("开始初始化异常信息");
//		String[] cfgFiles = genRealConfigFile();
		URL[] cfgFiles = genRealConfigFile();
		logger.debug(LoggerUtils.format("共#1个配置文件", cfgFiles.length + ""));
		//for (String file : cfgFiles) {
		for (URL file : cfgFiles) {
			loadCfgFromFile(file);
		}
		logger.info(LoggerUtils.format("异常信息初始化完成,共#1条异常信息配置", p_map.size()
				+ ""));
	}

//	private String[] genRealConfigFile() {
	private URL[] genRealConfigFile() {

		String[] aryConfigFile = null;
		if (!StringUtils.hasText(configfile))
			aryConfigFile = new String[] { DEFAULT_FILE };
		else
			aryConfigFile = StringUtils.tokenizeToStringArray(configfile, ",");
		//ArrayList<String> tmpList = new ArrayList<String>();
		ArrayList<URL> tmpList = new ArrayList<URL>();
		for (String strResource : aryConfigFile) {
			ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
			try {
				Resource[] resources = resourcePatternResolver
						.getResources(strResource);
				for (int i = 0; i < resources.length; i++) {
					//tmpList.add(resources[i].getURL().getPath());
					tmpList.add(resources[i].getURL());
					logger.debug("Resource's URL="+resources[i].getURL());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	//	String[] ret = new String[tmpList.size()];
		URL[] ret = new URL[tmpList.size()];
		return tmpList.toArray(ret);
	}

//	private void loadCfgFromFile(String file) {
	@SuppressWarnings("rawtypes")
	private void loadCfgFromFile(URL file) {
		PropertyResourceBundle bundle = null;
		try {
		//	bundle = new PropertyResourceBundle(new FileInputStream(file));
			bundle = new PropertyResourceBundle(file.openStream());
		} catch (FileNotFoundException e) {
			logger.error("异常信息配置文件[" + file + "]没有找到!初始化异常信息失败");
			return;
		} catch (IOException e) {
			logger.error("读取异常信息配置文件[" + file + "]发生异常!初始化异常信息失败");
			return;
		}
		if (bundle != null) {
			Enumeration keys = bundle.getKeys();
			while (keys.hasMoreElements()) {
				if (p_map == null)
					p_map = new HashMap<String, String>();
				String key = (String) keys.nextElement();
				if (p_map.containsKey(key))
					logger.error("错误代码[" + key + "]重复定义,采用了覆盖原则");
				p_map.put(key, (String) bundle.handleGetObject(key));
			}
		}
	}

	public String getconfigfile() {
		return configfile;
	}

	public void setconfigfile(String configfile) {
		this.configfile = configfile;
	}

	/**
	 * 当在ExceptionConfig中没找到对应的错误码时，将返回输入的错误码
	 * 
	 * @param code
	 * @return
	 */
	public static String code2Message(String code) {
		String str = p_map.get(code);
		if (str == null) {
			logger.error(LoggerUtils.format("未找到错误码[#1]对应的错误信息", code));
			return code;
		} else
			return str;
	}

	/**
	 * 当在ExceptionConfig中没找到对应的错误码时，将返回输入的错误码
	 * 
	 * @param code
	 * @param description
	 * @return
	 */
	public static String code2Message(String code, String description) {
		return code2Message(code, new String[] { description });
	}

	/**
	 * 当在ExceptionConfig中没找到对应的错误码时，将返回输入的错误码
	 * 
	 * @param code
	 * @param messageArgs
	 * @return
	 */
	public static String code2Message(String code, String[] messageArgs) {
		if (p_map.get(code) != null) {
			
			return MessageFormat
					.format(p_map.get(code), (Object[]) messageArgs);
		} else{
			logger.error(LoggerUtils.format("未找到错误码[#1]对应的错误信息", code));
			return MessageFormat
			.format(p_map.get("FS000"), new Object[]{code});
		}
	}
}
