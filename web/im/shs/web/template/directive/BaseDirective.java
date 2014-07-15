package im.shs.web.template.directive;

import im.shs.web.Filter;
import im.shs.web.Sequencer;
import im.shs.web.enums.SequencerDirectionEnum;
import im.shs.web.util.FreemarkerUtils;

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

    /** "使用缓存"参数 */
    private static final String USE_CACHE_PARAM = "useCache";

    /** "缓存区域"参数 */
    private static final String CACHE_REGION_PARAM = "cacheRegion";

    /** "ID"参数 */
    private static final String ID_PARAM = "id";

    /** "标识"参数 */
    private static final String IDENT_PARAM = "ident";

    /** "别名"参数 */
    private static final String ALIAS_PARAM = "alias";

    /** "数量"参数 */
    private static final String COUNT_PARAM = "count";

    /** "排序"参数 */
    private static final String SORT_BY_PARAM = "sortBy";

    /** 排序项分隔符 */
    private static final String SORT_BY_ITEM_SEPARATOR = "\\s*,\\s*";

    /** 排序字段分隔符 */
    private static final String SORT_BY_FIELD_SEPARATOR = "\\s+";

    /**
     * 判断是否使用缓存
     * 
     * @param env
     *            环境
     * @param params
     *            参数
     * @return 是否使用缓存
     */
    protected boolean useCache(Environment env, Map<String, TemplateModel> params) throws TemplateModelException {
        Boolean useCache = FreemarkerUtils.getParameter(USE_CACHE_PARAM, Boolean.class, params);
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
        String cacheRegion = FreemarkerUtils.getParameter(CACHE_REGION_PARAM, String.class, params);
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
        return FreemarkerUtils.getParameter(ID_PARAM, Long.class, params);
    }

    /**
     * 获取标识
     * 
     * @param params
     *            参数
     * @return 标识
     */
    protected String getIdent(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(IDENT_PARAM, String.class, params);
    }

    /**
     * 获取别名
     * 
     * @param params
     *            参数
     * @return 别名
     */
    protected String getAlias(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(ALIAS_PARAM, String.class, params);
    }

    /**
     * 获取数量
     * 
     * @param params
     *            参数
     * @return 数量
     */
    protected Integer getCount(Map<String, TemplateModel> params) throws TemplateModelException {
        return FreemarkerUtils.getParameter(COUNT_PARAM, Integer.class, params);
    }

    /**
     * 获取过滤器
     * 
     * @param params
     *            参数
     * @param type
     *            参数类型
     * @param ignoreProperties
     *            忽略属性
     * @return 过滤器
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
                if (value == null) {
                    filters.add(Filter.isNull(propertyName));
                } else {
                    filters.add(Filter.eq(propertyName, value));
                }
            }
        }
        return filters;
    }

    /**
     * 获取定序器
     * 
     * @param params
     *            参数
     * @param ignoreProperties
     *            忽略属性
     * @return 定序器
     */
    protected List<Sequencer> getSequencers(Map<String, TemplateModel> params, String... ignoreProperties)
            throws TemplateModelException {
        String sortBy = StringUtils.trim(FreemarkerUtils.getParameter(SORT_BY_PARAM, String.class, params));
        List<Sequencer> sequencers = new ArrayList<Sequencer>();
        if (StringUtils.isNotBlank(sortBy)) {
            String[] sortByItems = sortBy.split(SORT_BY_ITEM_SEPARATOR);
            for (String sortByItem : sortByItems) {
                if (StringUtils.isNotBlank(sortByItem)) {
                    String property = null;
                    SequencerDirectionEnum direction = null;
                    String[] sortBys = sortByItem.split(SORT_BY_FIELD_SEPARATOR);
                    if (sortBys.length == 1) {
                        property = sortBys[0];
                    } else if (sortBys.length >= 2) {
                        property = sortBys[0];
                        try {
                            direction = SequencerDirectionEnum.valueOf(sortBys[1]);
                        } catch (IllegalArgumentException e) {
                            continue;
                        }
                    } else {
                        continue;
                    }
                    if (!ArrayUtils.contains(ignoreProperties, property)) {
                        sequencers.add(new Sequencer(property, direction));
                    }
                }
            }
        }
        return sequencers;
    }

    /**
     * 设置局部变量
     * 
     * @param name
     *            名称
     * @param value
     *            变量值
     * @param env
     *            环境
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
     *            环境
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