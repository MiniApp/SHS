package im.shs.web.template.directive;

import im.shs.Filter;
import im.shs.Order;
import im.shs.enums.OrderDirectionEnum;
import im.shs.util.FreemarkerUtils;

import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

/**
 * @class : BaseDirective
 * @description: 模板指令 - 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:31:00
 * @version 1.0
 */
public abstract class BaseDirective implements TemplateDirectiveModel {

    /** "使用缓存"参数名称 */
    private static final String USE_CACHE_PARAMETER_NAME = "useCache";

    /** "缓存区域"参数名称 */
    private static final String CACHE_REGION_PARAMETER_NAME = "cacheRegion";

    /** "ID"参数名称 */
    private static final String ID_PARAMETER_NAME = "id";

    /** "标识"参数名称 */
    private static final String IDENT_PARAMETER_NAME = "ident";

    /** "别名"参数名称 */
    private static final String ALIAS_PARAMETER_NAME = "alias";

    /** "数量"参数名称 */
    private static final String COUNT_PARAMETER_NAME = "count";

    /** "排序"参数名称 */
    private static final String ORDER_BY_PARAMETER_NAME = "orderBy";

    /** 排序项分隔符 */
    private static final String ORDER_BY_ITEM_SEPARATOR = "\\s*,\\s*";

    /** 排序字段分隔符 */
    private static final String ORDER_BY_FIELD_SEPARATOR = "\\s+";

    /**
     * 使用缓存
     * 
     * @param env
     *            Environment
     * @param params
     *            参数
     * @return 使用缓存
     */
    protected boolean useCache(Environment env, Map<String, TemplateModel> params) throws TemplateModelException {
        Boolean useCache = FreemarkerUtils.getParameter(USE_CACHE_PARAMETER_NAME, Boolean.class, params);
        return useCache != null ? useCache : true;
    }

    /**
     * 获取缓存区域
     * 
     * @param env
     *            Environment
     * @param params
     *            参数
     * @return 缓存区域
     */
    protected String getCacheRegion(Environment env, Map<String, TemplateModel> params) throws TemplateModelException {
        String cacheRegion = FreemarkerUtils.getParameter(CACHE_REGION_PARAMETER_NAME, String.class, params);
        return cacheRegion != null ? cacheRegion : env.getTemplate().getName();
    }

    /**
     * 获取ID
     * 
     * @param params
     *            参数
     * @return ID
     */
    protected Long getId(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(ID_PARAMETER_NAME, Long.class, params);
    }

    /**
     * 获取标识
     * 
     * @param params
     *            参数
     * @return 标识
     */
    protected String getIdent(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(IDENT_PARAMETER_NAME, String.class, params);
    }

    /**
     * 获取别名
     * 
     * @param params
     *            参数
     * @return 别名
     */
    protected String getAlias(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(ALIAS_PARAMETER_NAME, String.class, params);
    }

    /**
     * 获取数量
     * 
     * @param params
     *            参数
     * @return 数量
     */
    protected Integer getCount(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(COUNT_PARAMETER_NAME, Integer.class, params);
    }

    /**
     * 获取筛选
     * 
     * @param params
     *            参数
     * @param type
     *            参数类型
     * @param ignoreProperties
     *            忽略属性
     * @return 筛选
     */
    protected List<Filter> getFilters(Map<String, TemplateModel> params, Class<?> type, String... ignoreProperties)
            throws TemplateModelException {
        List<Filter> filters = new ArrayList<Filter>();
        PropertyDescriptor[] propertyDescriptors = PropertyUtils.getPropertyDescriptors(type);
        for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
            String propertyName = propertyDescriptor.getName();
            Class<?> propertyType = propertyDescriptor.getPropertyType();
            if (!ArrayUtils.contains(ignoreProperties, propertyName) && params.containsKey(propertyName)) {
                Object value = FreemarkerUtils.getParameter(propertyName, propertyType, params);
                filters.add(Filter.eq(propertyName, value));
            }
        }
        return filters;
    }

    /**
     * 获取排序
     * 
     * @param params
     *            参数
     * @param ignoreProperties
     *            忽略属性
     * @return 排序
     */
    protected List<Order> getOrders(Map<String, TemplateModel> params, String... ignoreProperties)
            throws TemplateModelException {
        String orderBy = StringUtils.trim(FreemarkerUtils.getParameter(ORDER_BY_PARAMETER_NAME, String.class, params));
        List<Order> orders = new ArrayList<Order>();
        if (StringUtils.isNotBlank(orderBy)) {
            String[] orderByItems = orderBy.split(ORDER_BY_ITEM_SEPARATOR);
            for (String orderByItem : orderByItems) {
                if (StringUtils.isNotBlank(orderByItem)) {
                    String property = null;
                    OrderDirectionEnum direction = null;
                    String[] orderBys = orderByItem.split(ORDER_BY_FIELD_SEPARATOR);
                    if (orderBys.length == 1) {
                        property = orderBys[0];
                    } else if (orderBys.length >= 2) {
                        property = orderBys[0];
                        try {
                            direction = OrderDirectionEnum.valueOf(orderBys[1]);
                        } catch (IllegalArgumentException e) {
                            continue;
                        }
                    } else {
                        continue;
                    }
                    if (!ArrayUtils.contains(ignoreProperties, property)) {
                        orders.add(new Order(property, direction));
                    }
                }
            }
        }
        return orders;
    }

    /**
     * 设置局部变量
     * 
     * @param name
     *            名称
     * @param value
     *            变量值
     * @param env
     *            Environment
     * @param body
     *            TemplateDirectiveBody
     */
    protected void setLocalVariable(String name, Object value, Environment env, TemplateDirectiveBody body)
            throws TemplateException, IOException {
        TemplateModel sourceVariable = FreemarkerUtils.getVariable(name, env);
        FreemarkerUtils.setVariable(name, value, env);
        body.render(env.getOut());
        FreemarkerUtils.setVariable(name, sourceVariable, env);
    }

    /**
     * 设置局部变量
     * 
     * @param variables
     *            变量
     * @param env
     *            Environment
     * @param body
     *            TemplateDirectiveBody
     */
    protected void setLocalVariables(Map<String, Object> variables, Environment env, TemplateDirectiveBody body)
            throws TemplateException, IOException {
        Map<String, Object> sourceVariables = new HashMap<String, Object>();
        for (String name : variables.keySet()) {
            TemplateModel sourceVariable = FreemarkerUtils.getVariable(name, env);
            sourceVariables.put(name, sourceVariable);
        }
        FreemarkerUtils.setVariables(variables, env);
        body.render(env.getOut());
        FreemarkerUtils.setVariables(sourceVariables, env);
    }

}