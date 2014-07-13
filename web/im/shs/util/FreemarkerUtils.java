package im.shs.util;

import im.shs.CommonAttrs;
import im.shs.EnumConverter;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.Converter;
import org.apache.commons.beanutils.converters.ArrayConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.springframework.context.ApplicationContext;
import org.springframework.util.Assert;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import freemarker.core.Environment;
import freemarker.template.Configuration;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import freemarker.template.utility.DeepUnwrap;

/**
 * Utils - Freemarker
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@SuppressWarnings("unchecked")
public final class FreemarkerUtils {

	/** ConvertUtilsBean */
	private static final ConvertUtilsBean convertUtils;

	static {
		convertUtils = new ConvertUtilsBean() {

			/**
			 * 将枚举转换为字符串
			 * 
			 * @param value
			 *            枚举对象
			 * @return 字符串
			 */
			@Override
			public String convert(Object value) {
				if (value != null) {
					Class<?> type = value.getClass();
					// 类模版类型：枚举
					// 未注册
					if (type.isEnum() && super.lookup(type) == null) {
						// 注册数组
						super.register(new EnumConverter(type), type);
					}
					// 类模版类型：数组
					// 数组组件类型：枚举
					else if (type.isArray() && type.getComponentType().isEnum()) {
						// 未注册
						if (super.lookup(type) == null) {
							// 创建数组转换
							ArrayConverter arrayConverter = new ArrayConverter(
									type, new EnumConverter(
											type.getComponentType()), 0);
							// 设置将数组所有组件对象转换为字符串
							arrayConverter.setOnlyFirstToString(false);
							// 注册枚举数组转换
							super.register(arrayConverter, type);
						}
						// 获取已注册的转换
						Converter converter = super.lookup(type);
						// 将对象转换为字符串
						return ((String) converter.convert(String.class, value));
					}
				}
				// 将对象转换为字符串
				return super.convert(value);
			}

			/**
			 * 将字符串转换为枚举
			 * 
			 * @param value
			 *            字符串
			 * @param clazz
			 *            枚举类模版
			 * @return 枚举
			 */
			@SuppressWarnings("rawtypes")
			@Override
			public Object convert(String value, Class clazz) {
				// 类模版类型：枚举
				// 未注册
				if (clazz.isEnum() && super.lookup(clazz) == null) {
					// 注册枚举转换
					super.register(new EnumConverter(clazz), clazz);
				}
				// 将字符串转换为枚举
				return super.convert(value, clazz);
			}

			/**
			 * 将字符串数组转换为枚举
			 * 
			 * @param values
			 *            字符串数组
			 * @param clazz
			 *            枚举类模版
			 * @return 枚举
			 */
			@SuppressWarnings("rawtypes")
			@Override
			public Object convert(String[] values, Class clazz) {
				// 类模版类型：数组
				// 数组组件类型：枚举
				// 未注册
				if (clazz.isArray() && clazz.getComponentType().isEnum()
						&& super.lookup(clazz.getComponentType()) == null) {
					// 注册枚举数组转换
					super.register(new EnumConverter(clazz.getComponentType()),
							clazz.getComponentType());
				}
				// 将字符串数组转换为枚举
				return super.convert(values, clazz);
			}

			/**
			 * 将字符串转换为枚举
			 * 
			 * @param value
			 *            字符串
			 * @param targetType
			 *            枚举类模版
			 * @return 枚举
			 */
			@SuppressWarnings("rawtypes")
			@Override
			public Object convert(Object value, Class targetType) {
				// 未注册
				if (super.lookup(targetType) == null) {
					// 类模版类型：枚举
					if (targetType.isEnum()) {
						// 注册枚举转换
						super.register(new EnumConverter(targetType),
								targetType);
					}
					// 类模版类型：数组
					// 数组组件类型：枚举
					else if (targetType.isArray()
							&& targetType.getComponentType().isEnum()) {
						// 创建数组转换
						ArrayConverter arrayConverter = new ArrayConverter(
								targetType, new EnumConverter(
										targetType.getComponentType()), 0);
						// 设置将数组所有组件对象转换为字符串
						arrayConverter.setOnlyFirstToString(false);
						// 注册枚举数组转换
						super.register(arrayConverter, targetType);
					}
				}
				// 将字符串转换为枚举
				return super.convert(value, targetType);
			}
		};

		// 创建日期转换
		DateConverter dateConverter = new DateConverter();
		// 设置日期格式
		dateConverter.setPatterns(CommonAttrs.DATE_PATTERNS);
		// 注册日期转换
		convertUtils.register(dateConverter, Date.class);
	}

	/**
	 * 不可实例化
	 */
	private FreemarkerUtils() {
	}

	/**
	 * 解析字符串模板
	 * 
	 * @param template
	 *            字符串模板
	 * @param model
	 *            数据
	 * @return 解析后内容
	 */
	public static String process(String template, Map<String, ?> model)
			throws IOException, TemplateException {
		Configuration configuration = null;
		// Spring 上下文
		ApplicationContext applicationContext = SpringUtils
				.getApplicationContext();
		if (applicationContext != null) {
			// 获取Freemarker配置单例
			FreeMarkerConfigurer freeMarkerConfigurer = SpringUtils.getBean(
					"freeMarkerConfigurer", FreeMarkerConfigurer.class);
			if (freeMarkerConfigurer != null) {
				// 获取配置
				configuration = freeMarkerConfigurer.getConfiguration();
			}
		}
		return process(template, model, configuration);
	}

	/**
	 * 解析字符串模板
	 * 
	 * @param template
	 *            字符串模板
	 * @param model
	 *            数据
	 * @param configuration
	 *            配置
	 * @return 解析后内容
	 */
	public static String process(String template, Map<String, ?> model,
			Configuration configuration) throws IOException, TemplateException {
		if (template == null) {
			return null;
		}
		if (configuration == null) {
			configuration = new Configuration();
		}
		StringWriter out = new StringWriter();
		new Template("template", new StringReader(template), configuration)
				.process(model, out);
		return out.toString();
	}

	/**
	 * 获取参数
	 * 
	 * @param name
	 *            名称
	 * @param type
	 *            类型
	 * @param params
	 *            参数
	 * @return 参数，不存在时返回NULL
	 */
	public static <T> T getParameter(String name, Class<T> type,
			Map<String, TemplateModel> params) throws TemplateModelException {

		Assert.hasText(name);
		Assert.notNull(type);
		Assert.notNull(params);

		TemplateModel templateModel = params.get(name);
		if (templateModel == null) {
			return null;
		}

		// 拆包
		Object value = DeepUnwrap.unwrap(templateModel);
		return (T) convertUtils.convert(value, type);
	}

	/**
	 * 获取变量
	 * 
	 * @param name
	 *            名称
	 * @param env
	 *            Environment
	 * @return 变量
	 */
	public static TemplateModel getVariable(String name, Environment env)
			throws TemplateModelException {
		Assert.hasText(name);
		Assert.notNull(env);

		return env.getVariable(name);
	}

	/**
	 * 设置变量
	 * 
	 * @param name
	 *            名称
	 * @param value
	 *            变量值
	 * @param env
	 *            Environment
	 */
	public static void setVariable(String name, Object value, Environment env)
			throws TemplateException {
		Assert.hasText(name);
		Assert.notNull(env);

		if (value instanceof TemplateModel) {
			env.setVariable(name, (TemplateModel) value);
		} else {
			env.setVariable(name, ObjectWrapper.BEANS_WRAPPER.wrap(value));
		}
	}

	/**
	 * 设置变量
	 * 
	 * @param variables
	 *            变量
	 * @param env
	 *            Environment
	 */
	public static void setVariables(Map<String, Object> variables,
			Environment env) throws TemplateException {
		Assert.notNull(variables);
		Assert.notNull(env);

		for (Entry<String, Object> entry : variables.entrySet()) {
			String name = entry.getKey();
			Object value = entry.getValue();
			if (value instanceof TemplateModel) {
				env.setVariable(name, (TemplateModel) value);
			} else {
				env.setVariable(name, ObjectWrapper.BEANS_WRAPPER.wrap(value));
			}
		}
	}

}