package im.shs.util;

import im.shs.CommonAttrs;
import im.shs.EnumConverter;
import im.shs.Setting;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.Converter;
import org.apache.commons.beanutils.converters.ArrayConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.io.IOUtils;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.springframework.core.io.ClassPathResource;

/**
 * Utils - 设置
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@SuppressWarnings("unchecked")
public final class SettingUtils {

    /** CacheManager */
    private static final CacheManager cacheManager = CacheManager.create();

    /** BeanUtilsBean */
    private static final BeanUtilsBean beanUtils;

    static {
        ConvertUtilsBean convertUtilsBean = new ConvertUtilsBean() {

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
                            ArrayConverter arrayConverter = new ArrayConverter(type, new EnumConverter(
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
                    super.register(new EnumConverter(clazz.getComponentType()), clazz.getComponentType());
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
                        super.register(new EnumConverter(targetType), targetType);
                    }
                    // 类模版类型：数组
                    // 数组组件类型：枚举
                    else if (targetType.isArray() && targetType.getComponentType().isEnum()) {
                        // 创建数组转换
                        ArrayConverter arrayConverter = new ArrayConverter(targetType, new EnumConverter(
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
        convertUtilsBean.register(dateConverter, Date.class);

        beanUtils = new BeanUtilsBean(convertUtilsBean);
    }

    /**
     * 不可实例化
     */
    private SettingUtils() {
    }

    /**
     * 获取设置
     * 
     * @return 设置
     */
    public static Setting get() {
        /*// 获取缓存
        Ehcache cache = cacheManager.getEhcache(Setting.CACHE_NAME);
        // 获取设置缓存
        net.sf.ehcache.Element cacheElement = cache.get(Setting.CACHE_KEY);

        Setting setting;
        if (cacheElement != null) {
            // 获取缓存中的设置
            setting = (Setting) cacheElement.getObjectValue();
        } else {
            setting = new Setting();
            try {
                File xmlFile = new ClassPathResource(Setting.XML_PATH).getFile();
                Document document = new SAXReader().read(xmlFile);

                // 设置属性
                setProperty(setting.getBasic(), document.selectNodes("/p2p/basicSetting"));
                setProperty(setting.getSecurity(), document.selectNodes("/p2p/securitySetting"));
                setProperty(setting.getDisplay(), document.selectNodes("/p2p/displaySetting"));
                setProperty(setting.getComm(), document.selectNodes("/p2p/commSetting"));
                setProperty(setting.getReferral(), document.selectNodes("/p2p/referralSetting"));

            } catch (Exception e) {
                e.printStackTrace();
            }

            // 插入设置到设置缓存中
            cache.put(new net.sf.ehcache.Element(Setting.CACHE_KEY, setting));
        }
        return setting;*/
    	return null;
    }

    /**
     * 设置
     * 
     * @param setting
     *            设置
     */
    public static void set(Setting setting) {
        try {
            File xmlFile = new ClassPathResource(Setting.XML_PATH).getFile();
            Document document = new SAXReader().read(xmlFile);

            // 获取属性
            getProperty(setting.getBasic(), document.selectNodes("/p2p/basicSetting"));
            getProperty(setting.getSecurity(), document.selectNodes("/p2p/securitySetting"));
            getProperty(setting.getDisplay(), document.selectNodes("/p2p/displaySetting"));
            getProperty(setting.getComm(), document.selectNodes("/p2p/commSetting"));
            getProperty(setting.getReferral(), document.selectNodes("/p2p/referralSetting"));

            FileOutputStream fileOutputStream = null;
            XMLWriter xmlWriter = null;
            try {
                OutputFormat outputFormat = OutputFormat.createPrettyPrint();
                outputFormat.setEncoding("UTF-8");
                outputFormat.setIndent(true);
                outputFormat.setIndent("	");
                outputFormat.setNewlines(true);
                fileOutputStream = new FileOutputStream(xmlFile);
                xmlWriter = new XMLWriter(fileOutputStream, outputFormat);
                xmlWriter.write(document);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (xmlWriter != null) {
                    try {
                        xmlWriter.close();
                    } catch (IOException e) {
                    }
                }
                IOUtils.closeQuietly(fileOutputStream);
            }

            // 获取缓存
            Ehcache cache = cacheManager.getEhcache(Setting.CACHE_NAME);
            // 插入/更新设置到设置缓存中
            cache.put(new net.sf.ehcache.Element(Setting.CACHE_KEY, setting));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 设置属性
     * 
     * @param bean
     *            Bean
     * @param elements
     *            元素集合
     */
    private static void setProperty(Object bean, List<Element> elements) {
        for (Element element : elements) {
            String name = element.attributeValue("name");
            String value = element.attributeValue("value");
            try {
                // 反射根据属性、属性值设置指定对象
                beanUtils.setProperty(bean, name, value);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取属性
     * 
     * @param bean
     *            Bean
     * @param elements
     *            元素集合
     */
    private static void getProperty(Object bean, List<Element> elements) {
        for (Element element : elements) {
            try {
                String name = element.attributeValue("name");
                // 反射根据对象、属性获取属性值
                String value = beanUtils.getProperty(bean, name);
                Attribute attribute = element.attribute("value");
                attribute.setValue(value);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }
    }

}