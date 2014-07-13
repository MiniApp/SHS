package im.shs.web.service.impl;

import im.shs.Filter;
import im.shs.Order;
import im.shs.Page;
import im.shs.Pageable;
import im.shs.entity.BaseEntity;
import im.shs.web.dao.BaseDao;
import im.shs.web.service.BaseService;

import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

/**
 * @class : BaseServiceImpl
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:54:24
 * @version 1.0
 */
@Transactional
public class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {

    /** 更新忽略属性 */
    private static final String[] UPDATE_IGNORE_PROPERTIES = new String[] { BaseEntity.ID_PROPERTY_NAME,
            BaseEntity.CREATE_DATE_PROPERTY_NAME, BaseEntity.MODIFY_DATE_PROPERTY_NAME };

    /** 基类DAO */
    private BaseDao<T, ID> baseDao;

    public void setBaseDao(BaseDao<T, ID> baseDao) {
        this.baseDao = baseDao;
    }

    @Override
    @Transactional(readOnly = true)
    public T find(ID id) {
        return baseDao.find(id);
    }

    @Override
    @Transactional(readOnly = true)
    public T find(Filter... filters) {
        List<T> list = findList(null, null, filters != null ? Arrays.asList(filters) : null, null);
        return list.size() > 0 ? list.get(0) : null;
    }

    @Override
    @Transactional(readOnly = true)
    public T find(List<Filter> filters) {
        List<T> list = findList(null, null, filters, null);
        return list.size() > 0 ? list.get(0) : null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findAll() {
        return findList(null, null, null, null);
    }

    @Override
    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public List<T> findList(ID... ids) {
        List<T> result = new ArrayList<T>();
        if (ids != null) {
            for (ID id : ids) {
                T entity = find(id);
                if (entity != null) {
                    result.add(entity);
                }
            }
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Filter... filters) {
        return findList(null, null, filters != null ? Arrays.asList(filters) : null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(List<Filter> filters) {
        return findList(null, null, filters, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, Filter... filters) {
        return findList(null, count, filters != null ? Arrays.asList(filters) : null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, List<Filter> filters) {
        return findList(null, count, filters, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(List<Filter> filters, List<Order> orders) {
        return findList(null, null, filters, orders);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer count, List<Filter> filters, List<Order> orders) {
        return findList(null, count, filters, orders);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> findList(Integer first, Integer count, List<Filter> filters, List<Order> orders) {
        if (first != null && first < 0) {
            first = null;
        }
        if (count != null && count < 0) {
            count = null;
        }
        if (filters != null && filters.size() == 0) {
            filters = null;
        }
        if (orders != null && orders.size() == 0) {
            orders = null;
        }
        return baseDao.findList(first, count, filters, orders);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<T> findPage(Pageable pageable) {
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
        return count(filters != null ? Arrays.asList(filters) : null);
    }

    @Override
    @Transactional(readOnly = true)
    public long count(List<Filter> filters) {
        return baseDao.count(filters);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(ID id) {
        return baseDao.find(id) != null;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(Filter... filters) {
        return baseDao.count(filters != null ? Arrays.asList(filters) : null) > 0;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(String property, String value, boolean ignoreCase) {
        if (StringUtils.isNotBlank(property) && StringUtils.isNotBlank(value)) {
            return count(Filter.eq(property, value, ignoreCase)) > 0;
        } else {
            return count() > 0;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean unique(String property, String previousValue, String currentValue, boolean ignoreCase) {

        // 忽略大小写判断
        if (ignoreCase && StringUtils.equalsIgnoreCase(previousValue, currentValue)) {
            return true;
        }
        // 非忽略大小写判断
        else if (!ignoreCase && StringUtils.equals(previousValue, currentValue)) {
            return true;
        }
        // 统计数判断
        else {
            return count(Filter.eq(property, currentValue, ignoreCase)) == 0;
        }
    }

    @Override
    @Transactional
    public void save(T entity) {
        baseDao.persist(entity);
    }

    @Override
    @Transactional
    public T update(T entity) {
        return baseDao.merge(entity);
    }

    @Override
    @Transactional
    public T update(T entity, String... ignoreProperties) {
        Assert.notNull(entity);
        if (baseDao.managed(entity)) {
            throw new IllegalArgumentException("Entity must not be managed");
        }
        T persistant = baseDao.find(baseDao.getIdentifier(entity));
        if (persistant != null) {
            copyProperties(entity, persistant, (String[]) ArrayUtils.addAll(ignoreProperties, UPDATE_IGNORE_PROPERTIES));
            return update(persistant);
        } else {
            return update(entity);
        }
    }

    @Override
    @Transactional
    public void delete(ID id) {
        delete(baseDao.find(id));
    }

    @Override
    @Transactional
    public void delete(T entity) {
        baseDao.remove(entity);
    }

    @Override
    @Transactional
    @SuppressWarnings("unchecked")
    public void delete(ID... ids) {
        if (ids != null) {
            for (ID id : ids) {
                T entity = baseDao.find(id);
                if (entity != null) {
                    delete(entity);
                }
            }
        }
    }

    /**
     * 复制属性值
     * 
     * @param source
     *            来源
     * @param target
     *            目标
     * @param ignoreProperties
     *            忽略属性
     * @throws BeansException
     *             可能抛出的异常
     */
    @SuppressWarnings({ "unchecked" })
    private void copyProperties(Object source, Object target, String[] ignoreProperties) throws BeansException {
        Assert.notNull(source, "Source must not be null");
        Assert.notNull(target, "Target must not be null");

        // 获取目标（类）属性数组
        PropertyDescriptor[] targetPropertyDescriptors = BeanUtils.getPropertyDescriptors(target.getClass());
        // 转换忽略属性为集合
        List<String> ignorePropertieList = (ignoreProperties != null) ? Arrays.asList(ignoreProperties) : null;

        // 遍历目标（类）属性数组
        for (PropertyDescriptor targetPropertyDescriptor : targetPropertyDescriptors) {

            // 判断目标（类）属性是否包含Set方法、忽略属性集合是否包含该类属性
            if (targetPropertyDescriptor.getWriteMethod() != null
                    && (ignoreProperties == null || (!ignorePropertieList.contains(targetPropertyDescriptor.getName())))) {

                // 获取来源（类）属性
                PropertyDescriptor sourcePropertyDescriptor = BeanUtils.getPropertyDescriptor(source.getClass(),
                        targetPropertyDescriptor.getName());

                // 判断来源（类）属性是否包含Get方法
                if (sourcePropertyDescriptor != null && sourcePropertyDescriptor.getReadMethod() != null) {
                    try {

                        // 获取来源（类）属性Get方法
                        Method readMethod = sourcePropertyDescriptor.getReadMethod();
                        // 强制设置来源（类）属性Get方法修饰符为Public
                        if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
                            readMethod.setAccessible(true);
                        }

                        // 获取来源（类）属性值
                        Object sourceValue = readMethod.invoke(source);
                        // 获取目标（类）属性值
                        Object targetValue = readMethod.invoke(target);

                        // 当来源（类）属性值、目标（类）属性值不为空，并且目标（类）属性值为集合时
                        if (sourceValue != null && targetValue != null && targetValue instanceof Collection) {

                            // 来源（类）属性值（集合）
                            Collection<Object> sourceValueCollection = (Collection<Object>) sourceValue;
                            // 目标（类）属性值（集合）
                            Collection<Object> targetValueCollection = (Collection<Object>) targetValue;

                            // 清空来源（类）属性值（集合）并添加（设置）为目标（类）属性值（集合）
                            targetValueCollection.clear();
                            targetValueCollection.addAll(sourceValueCollection);

                        }
                        // 属性值类型为一般数据类型时
                        else {

                            // 获取目标（类）属性Set方法
                            Method writeMethod = targetPropertyDescriptor.getWriteMethod();
                            // 强制设置目标（类）属性Get方法修饰符为Public
                            if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
                                writeMethod.setAccessible(true);
                            }

                            // 调用目标（类）属性Set方法，并传递来源（类）属性值
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