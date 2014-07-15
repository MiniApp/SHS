package im.shs.web.service.impl;

import im.shs.web.Filter;
import im.shs.web.Page;
import im.shs.web.Pageable;
import im.shs.web.Sequencer;
import im.shs.web.dao.BaseDao;
import im.shs.web.entity.BaseEntity;
import im.shs.web.service.BaseService;

import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.transaction.annotation.Transactional;

/**
 * @class : BaseServiceImpl
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:54:24
 * @version 1.0
 */
@Transactional
public class BaseServiceImpl<T extends BaseEntity, ID extends Serializable> implements BaseService<T, ID> {

    /** 更新忽略属性 */
    private static final String[] UPDATE_IGNORE_PROPS = new String[] { BaseEntity.ID_PROP, BaseEntity.CREATE_DATE_PROP,
            BaseEntity.UPDATE_DATE_PROP };

    /** 基类DAO */
    private BaseDao<T, ID> baseDao;

    public void setBaseDao(BaseDao<T, ID> baseDao) {
        this.baseDao = baseDao;
    }

    @Override
    @Transactional(readOnly = true)
    public T find(ID id) {
        if (id == null) {
            return null;
        }
        return baseDao.find(id);
    }

    @Override
    @Transactional(readOnly = true)
    public T find(Filter... filters) {
        if (filters == null) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        return find(Arrays.asList(filters));
    }

    @Override
    @Transactional(readOnly = true)
    public T find(List<Filter> filters) {
        if (filters == null || filters.isEmpty()) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        List<T> results = baseDao.findList(null, null, filters, null);
        if (results.size() > 1) {
            throw new IllegalArgumentException("Result must be single");
        }
        return results.isEmpty() ? null : results.get(0);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findAll() {
        return baseDao.findList(null, null, null, null);
    }

    @Override
    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public List<T> findList(ID... ids) {
        if (ids == null) {
            throw new IllegalArgumentException("Ids must not be empty");
        }
        List<T> result = new ArrayList<T>();
        for (ID id : ids) {
            T entity = find(id);
            if (entity != null) {
                result.add(entity);
            }
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Filter... filters) {
        if (filters == null) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        return baseDao.findList(null, null, Arrays.asList(filters), null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(List<Filter> filters) {
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        return baseDao.findList(null, null, filters, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(List<Filter> filters, Sequencer... sequencers) {
        if (sequencers == null) {
            throw new IllegalArgumentException("Sequencers must not be empty");
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        return baseDao.findList(null, null, filters, Arrays.asList(sequencers));
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(List<Filter> filters, List<Sequencer> sequencers) {
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        if (sequencers != null && sequencers.isEmpty()) {
            sequencers = null;
        }
        return baseDao.findList(null, null, filters, sequencers);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count) {
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        return baseDao.findList(null, count, null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, Filter... filters) {
        if (filters == null) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        return baseDao.findList(null, count, Arrays.asList(filters), null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, List<Filter> filters) {
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        return baseDao.findList(null, count, filters, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, List<Filter> filters, Sequencer... sequencers) {
        if (sequencers == null) {
            throw new IllegalArgumentException("Sequencers must not be empty");
        }
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        return baseDao.findList(null, count, filters, Arrays.asList(sequencers));
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, List<Filter> filters, List<Sequencer> sequencers) {
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        if (sequencers != null && sequencers.isEmpty()) {
            sequencers = null;
        }
        return baseDao.findList(null, count, filters, sequencers);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer first, Integer count, Filter... filters) {
        if (filters == null) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (first != null && first < 0) {
            first = null;
        }
        return baseDao.findList(first, count, Arrays.asList(filters), null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer first, Integer count, List<Filter> filters) {
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (first != null && first < 0) {
            first = null;
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        return baseDao.findList(first, count, filters, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer first, Integer count, List<Filter> filters, Sequencer... sequencers) {
        if (sequencers == null) {
            throw new IllegalArgumentException("Sequencers must not be empty");
        }
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (first != null && first < 0) {
            first = null;
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        return baseDao.findList(first, count, filters, Arrays.asList(sequencers));
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer first, Integer count, List<Filter> filters, List<Sequencer> sequencers) {
        if (count != null && count < 1) {
            return Collections.<T> emptyList();
        }
        if (first != null && first < 0) {
            first = null;
        }
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }
        if (sequencers != null && sequencers.isEmpty()) {
            sequencers = null;
        }
        return baseDao.findList(first, count, filters, sequencers);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<T> findPage(Pageable pageable) {
        if (pageable == null || pageable.isEmpty()) {
            pageable = new Pageable();
        }
        return baseDao.findPage(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public long count() {
        return baseDao.count(null);
    }

    @Override
    @Transactional(readOnly = true)
    public long count(Filter... filters) {
        if (filters == null) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        return count(Arrays.asList(filters));
    }

    @Override
    @Transactional(readOnly = true)
    public long count(List<Filter> filters) {
        return baseDao.count(filters);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(ID id) {
        return find(id) != null;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(Filter... filters) {
        if (filters == null) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        return exists(Arrays.asList(filters));
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(List<Filter> filters) {
        if (filters == null || filters.isEmpty()) {
            throw new IllegalArgumentException("Filters must not be empty");
        }
        return count(filters) > 0;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(String property, String value) {
        if (StringUtils.isBlank(property) || StringUtils.isBlank(value)) {
            return false;
        }
        return exists(property, value, false);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(String property, String value, boolean ignoreCase) {
        if (StringUtils.isBlank(property) || StringUtils.isBlank(value)) {
            return false;
        }
        return count(Filter.eq(property, value, ignoreCase)) > 0;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean unique(String property, String previousValue, String currentValue) {
        return StringUtils.isBlank(property) || StringUtils.isBlank(previousValue) || StringUtils.isBlank(currentValue)
                || unique(property, previousValue, currentValue, false);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean unique(String property, String previousValue, String currentValue, boolean ignoreCase) {
        if (StringUtils.isBlank(property) || StringUtils.isBlank(previousValue) || StringUtils.isBlank(currentValue)) {
            return true;
        }
        if (ignoreCase) {
            return StringUtils.equalsIgnoreCase(previousValue, currentValue)
                    || count(Filter.eq(property, currentValue, true)) == 0;
        } else {
            return StringUtils.equals(previousValue, currentValue)
                    || count(Filter.eq(property, currentValue, false)) == 0;
        }
    }

    @Override
    @Transactional
    public T save(T entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity must not be null");
        }
        baseDao.persist(entity);
        return entity;
    }

    @Override
    @Transactional
    public T update(T entityBean, String... ignoreProps) {
        if (ignoreProps == null) {
            throw new IllegalArgumentException("IgnoreProps must not be empty");
        }
        if (entityBean == null || entityBean.isEmpty()) {
            throw new IllegalArgumentException("EntityBean must not be empty");
        }
        T pEntity = baseDao.find(baseDao.getIdentifier(entityBean));
        copyProperties(entityBean, pEntity, ArrayUtils.addAll(ignoreProps, UPDATE_IGNORE_PROPS));
        return update(pEntity);
    }

    @Override
    @Transactional
    public T update(T entity) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        return baseDao.merge(entity);
    }
    
    
    
    

    @Override
    @Transactional
    public void delete(ID id) {
        if (id == null) {
            throw new IllegalArgumentException("Id must not be null");
        }
        delete(find(id));
    }

    @Override
    @Transactional
    public void delete(T entity) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        baseDao.remove(entity);
    }

    @Override
    @Transactional
    @SuppressWarnings("unchecked")
    public void deleteList(ID... ids) {
        if (ids == null) {
            throw new IllegalArgumentException("Ids must not be empty");
        }
        for (ID id : ids) {
            delete(id);
        }
    }

    @Override
    @Transactional
    public void deleteList(List<T> entities) {
        if (entities == null || entities.isEmpty()) {
            throw new IllegalArgumentException("Entities must not be empty");
        }
        for (Iterator<T> iterator = entities.iterator(); iterator.hasNext();) {
            T entity = iterator.next();
            delete(entity);
        }
    }

    /**
     * 复制属性值
     * 
     * @param source
     *            来源类
     * @param target
     *            目标类
     * @param ignoreProperties
     *            忽略属性
     * @throws BeansException
     *             可能抛出的异常
     */
    @SuppressWarnings({ "unchecked" })
    private void copyProperties(Object source, Object target, String[] ignoreProperties) throws BeansException {
        // 忽略属性集合
        List<String> ignorePropertyList = Arrays.asList(ignoreProperties);

        // 遍历目标类属性数组
        PropertyDescriptor[] targetProperties = BeanUtils.getPropertyDescriptors(target.getClass());
        for (PropertyDescriptor targetProperty : targetProperties) {

            // 判断是否目标类属性包含Set方法、忽略属性集合是否未包含该类属性
            if (targetProperty.getWriteMethod() != null && !ignorePropertyList.contains(targetProperty.getName())) {

                // 判断来源类属性是否包含Get方法
                PropertyDescriptor sourceProperty = BeanUtils.getPropertyDescriptor(source.getClass(),
                        targetProperty.getName());
                if (sourceProperty != null && sourceProperty.getReadMethod() != null) {
                    try {
                        // 设置来源类属性Get方法修饰符为Public
                        Method readMethod = sourceProperty.getReadMethod();
                        if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
                            readMethod.setAccessible(true);
                        }

                        // 来源类属性值、目标类属性值
                        Object sourceValue = readMethod.invoke(source), targetValue = readMethod.invoke(target);

                        // 判断是否目标类属性值为集合
                        if (sourceValue != null && targetValue != null && targetValue instanceof Collection) {
                            // 目标类属性值（集合）
                            Collection<Object> targetValueCollection = (Collection<Object>) targetValue;
                            // 目标类属性值（集合）重新赋值
                            targetValueCollection.clear();
                            targetValueCollection.addAll((Collection<Object>) sourceValue);
                        } else {
                            // 设置目标类属性Get方法修饰符为Public
                            Method writeMethod = targetProperty.getWriteMethod();
                            if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
                                writeMethod.setAccessible(true);
                            }
                            // 设置目标类属性值
                            writeMethod.invoke(target, sourceValue);
                        }
                    } catch (Throwable e) {
                        throw new FatalBeanException("Could not copy properties from source to target", e);
                    }
                }
            }
        }
    }

}