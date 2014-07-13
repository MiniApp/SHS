package im.shs.web.dao.impl;

import im.shs.Filter;
import im.shs.Order;
import im.shs.Page;
import im.shs.Pageable;
import im.shs.entity.OrderEntity;
import im.shs.enums.FilterOperatorEnum;
import im.shs.enums.OrderDirectionEnum;
import im.shs.web.dao.BaseDao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.FlushModeType;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Fetch;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Assert;

/**
 * @class : BaseDaoImpl
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:58:39
 * @version 1.0
 */
public abstract class BaseDaoImpl<T, ID extends Serializable> implements BaseDao<T, ID> {

    /** 实体类类型 */
    protected Class<T> entityClass;

    /** 别名前缀 */
    protected static final String aliasPrefix = "p2pGeneratedAlias";

    /** 别名数 */
    protected static volatile long aliasCount = 0;

    @PersistenceContext
    protected EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public BaseDaoImpl() {

        // 获取表示此 Class 所表示的实体（类、接口、基本类型或 void）的直接超类的 Type
        Type type = getClass().getGenericSuperclass();
        // 获取表示此类型实际类型参数的 Type 对象的数组
        Type[] parameterizedType = ((ParameterizedType) type).getActualTypeArguments();

        // 获取实体类类型
        entityClass = (Class<T>) parameterizedType[0];
    }

    @Override
    public T find(ID id) {
        if (id != null) {
            return entityManager.find(entityClass, id);
        }
        return null;
    }

    @Override
    public T find(ID id, LockModeType lockModeType) {
        if (id != null) {
            if (lockModeType != null) {
                return entityManager.find(entityClass, id, lockModeType);
            } else {
                return entityManager.find(entityClass, id);
            }
        }
        return null;
    }

    @Override
    public List<T> findList(Integer first, Integer count, List<Filter> filters, List<Order> orders) {

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 创建条件查询
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        // 获取并选择实体查询ROOT
        criteriaQuery.select(criteriaQuery.from(entityClass));

        return findList(criteriaQuery, first, count, filters, orders);
    }

    @Override
    public Page<T> findPage(Pageable pageable) {

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 创建条件查询
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        // 获取并选择实体查询ROOT
        criteriaQuery.select(criteriaQuery.from(entityClass));

        return findPage(criteriaQuery, pageable);
    }

    @Override
    public long count(List<Filter> filters) {

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 创建条件查询
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        // 获取并选择实体查询ROOT
        criteriaQuery.select(criteriaQuery.from(entityClass));

        return count(criteriaQuery, filters);
    }

    @Override
    public void persist(T entity) {
        Assert.notNull(entity);
        entityManager.persist(entity);
    }

    @Override
    public T merge(T entity) {
        Assert.notNull(entity);
        return entityManager.merge(entity);
    }

    @Override
    public void remove(T entity) {
        Assert.notNull(entity);
        entityManager.remove(entity);
    }

    @Override
    public void refresh(T entity) {
        if (entity != null) {
            entityManager.refresh(entity);
        }
    }

    @Override
    public void refresh(T entity, LockModeType lockModeType) {
        if (entity != null) {
            if (lockModeType != null) {
                entityManager.refresh(entity, lockModeType);
            } else {
                entityManager.refresh(entity);
            }
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public ID getIdentifier(T entity) {
        Assert.notNull(entity);

        // 获取实体管理器、获取持久化装置工具、获取标识符
        return (ID) entityManager.getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(entity);
    }

    @Override
    public boolean managed(T entity) {
        Assert.notNull(entity);
        return entityManager.contains(entity);
    }

    @Override
    public void detach(T entity) {
        Assert.notNull(entity);
        entityManager.detach(entity);
    }

    @Override
    public void lock(T entity, LockModeType lockModeType) {
        if (entity != null && lockModeType != null) {
            entityManager.lock(entity, lockModeType);
        }
    }

    @Override
    public void clear() {
        entityManager.clear();
    }

    @Override
    public void flush() {
        entityManager.flush();
    }

    /**
     * 查找实体对象集合
     * 
     * @param criteriaQuery
     *            条件查询
     * @param first
     *            起始记录
     * @param count
     *            数量
     * @param filters
     *            筛选
     * @param orders
     *            排序
     * @return 实体对象集合
     */
    protected List<T> findList(CriteriaQuery<T> criteriaQuery, Integer first, Integer count, List<Filter> filters,
            List<Order> orders) {

        Assert.notNull(criteriaQuery);
        Assert.notNull(criteriaQuery.getSelection());
        Assert.notEmpty(criteriaQuery.getRoots());

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 获取实体查询ROOT
        Root<T> root = getRoot(criteriaQuery);

        // 查询条件添加限制条件
        addRestrictions(criteriaQuery, filters);
        // 查询条件添加排序
        addOrders(criteriaQuery, orders);

        // 查询条件未添加排序时
        if (criteriaQuery.getOrderList().isEmpty()) {
            // 实体继承 OrderEntity 时（并拥有“排序”字段）
            if (OrderEntity.class.isAssignableFrom(entityClass)) {
                // 使用“排序”字段升序排序
                criteriaQuery.orderBy(criteriaBuilder.asc(root.get(OrderEntity.ORDER_PROPERTY_NAME)));
            }
            // 实体未继承 OrderEntity 时
            else {
                // 使用“创建日期”字段降序排序
                criteriaQuery.orderBy(criteriaBuilder.desc(root.get(OrderEntity.CREATE_DATE_PROPERTY_NAME)));
            }
        }

        // 创建并获取查询（刷新方式：COMMIT）
        TypedQuery<T> query = entityManager.createQuery(criteriaQuery).setFlushMode(FlushModeType.COMMIT);

        // 起始记录
        if (first != null) {
            query.setFirstResult(first);
        }
        // 数量
        if (count != null) {
            query.setMaxResults(count);
        }

        return query.getResultList();
    }

    /**
     * 查找实体对象分页
     * 
     * @param criteriaQuery
     *            条件查询
     * @param pageable
     *            分页信息
     * @return 实体对象分页
     */
    protected Page<T> findPage(CriteriaQuery<T> criteriaQuery, Pageable pageable) {

        Assert.notNull(criteriaQuery);
        Assert.notNull(criteriaQuery.getSelection());
        Assert.notEmpty(criteriaQuery.getRoots());

        if (pageable == null) {
            pageable = new Pageable();
        }

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 获取实体查询ROOT
        Root<T> root = getRoot(criteriaQuery);

        // 查询条件添加限制条件
        addRestrictions(criteriaQuery, pageable);
        // 查询条件添加排序
        addOrders(criteriaQuery, pageable);

        // 查询条件未添加排序时
        if (criteriaQuery.getOrderList().isEmpty()) {
            // 实体继承 OrderEntity 时（并拥有“排序”字段）
            if (OrderEntity.class.isAssignableFrom(entityClass)) {
                // 使用“排序”字段升序排序
                criteriaQuery.orderBy(criteriaBuilder.asc(root.get(OrderEntity.ORDER_PROPERTY_NAME)));
            }
            // 实体未继承 OrderEntity 时
            else {
                // 使用“创建日期”字段降序排序
                criteriaQuery.orderBy(criteriaBuilder.desc(root.get(OrderEntity.CREATE_DATE_PROPERTY_NAME)));
            }
        }

        // 查询实体对象数量
        long total = count(criteriaQuery, null);
        // 计算分页总页数
        int totalPages = (int) Math.ceil((double) total / (double) pageable.getPageSize());
        // 分页总页数 小于 分页页码时
        if (totalPages < pageable.getPageNumber()) {
            // 设置页码（根据总页数）
            pageable.setPageNumber(totalPages);
        }

        // 创建并获取查询（刷新方式：COMMIT）
        TypedQuery<T> query = entityManager.createQuery(criteriaQuery).setFlushMode(FlushModeType.COMMIT);

        // 起始结果
        query.setFirstResult((pageable.getPageNumber() - 1) * pageable.getPageSize());
        // 最大结果数
        query.setMaxResults(pageable.getPageSize());

        return new Page<T>(total, pageable, query.getResultList());
    }

    /**
     * 查询实体对象数量
     * 
     * @param criteriaQuery
     *            条件查询
     * @param filters
     *            筛选
     * @return 实体对象数量
     */
    protected Long count(CriteriaQuery<T> criteriaQuery, List<Filter> filters) {

        Assert.notNull(criteriaQuery);
        Assert.notNull(criteriaQuery.getSelection());
        Assert.notEmpty(criteriaQuery.getRoots());

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // 查询条件添加限制条件
        addRestrictions(criteriaQuery, filters);

        // 创建条件查询
        CriteriaQuery<Long> countCriteriaQuery = criteriaBuilder.createQuery(Long.class);
        for (Root<?> root : criteriaQuery.getRoots()) {
            Root<?> dest = countCriteriaQuery.from(root.getJavaType());
            dest.alias(getAlias(root));
            copyJoins(root, dest);
        }

        // 获取统计ROOT
        Root<?> countRoot = getRoot(countCriteriaQuery, criteriaQuery.getResultType());
        // 选择统计ROOT
        countCriteriaQuery.select(criteriaBuilder.count(countRoot));

        // 查询条件未添加GROUP BY分组时
        if (criteriaQuery.getGroupList() != null) {
            countCriteriaQuery.groupBy(criteriaQuery.getGroupList());
        }
        // 查询条件未添加HAVING筛选时
        if (criteriaQuery.getGroupRestriction() != null) {
            countCriteriaQuery.having(criteriaQuery.getGroupRestriction());
        }
        // 查询条件未添加WHERE筛选时
        if (criteriaQuery.getRestriction() != null) {
            countCriteriaQuery.where(criteriaQuery.getRestriction());
        }
        return entityManager.createQuery(countCriteriaQuery).setFlushMode(FlushModeType.COMMIT).getSingleResult();
    }

    /**
     * 获取别名
     * 
     * @param selection
     *            选择
     * @return 别名
     */
    private synchronized String getAlias(Selection<?> selection) {
        if (selection != null) {

            // 获取别名
            String alias = selection.getAlias();
            if (alias == null) {
                if (aliasCount >= 1000) {
                    aliasCount = 0;
                }
                alias = aliasPrefix + aliasCount++;
                // 创建别名
                selection.alias(alias);
            }
            return alias;

        }
        return null;
    }

    /**
     * 获取根
     * 
     * @param criteriaQuery
     *            条件查询
     * @return 根
     */
    private Root<T> getRoot(CriteriaQuery<T> criteriaQuery) {
        if (criteriaQuery != null) {
            return getRoot(criteriaQuery, criteriaQuery.getResultType());
        }
        return null;
    }

    /**
     * 获取根
     * 
     * @param criteriaQuery
     *            条件查询
     * @param clazz
     *            类模版
     * @return 根
     */
    private Root<T> getRoot(CriteriaQuery<?> criteriaQuery, Class<T> clazz) {
        if (criteriaQuery != null && criteriaQuery.getRoots() != null && clazz != null) {
            // 遍历条件查询ROOT
            for (Root<?> root : criteriaQuery.getRoots()) {
                // ROOT的JavaType匹配类模版时
                if (clazz.equals(root.getJavaType())) {
                    return (Root<T>) root.as(clazz);
                }
            }
        }
        return null;
    }

    /**
     * 复制联表
     * 
     * @param from
     *            主表
     * @param to
     *            子表
     */
    private void copyJoins(From<?, ?> from, From<?, ?> to) {
        // 遍历联表
        for (Join<?, ?> join : from.getJoins()) {
            Join<?, ?> toJoin = to.join(join.getAttribute().getName(), join.getJoinType());
            // 获取并设置别名
            toJoin.alias(getAlias(join));
            // 复制联表
            copyJoins(join, toJoin);
        }
        // 遍历获取
        for (Fetch<?, ?> fetch : from.getFetches()) {
            Fetch<?, ?> toFetch = to.fetch(fetch.getAttribute().getName());
            // 复制获取
            copyFetches(fetch, toFetch);
        }
    }

    /**
     * 复制获取（关联对象的抓取/获取方式，如 fetch=FetchType.LAZY 延迟加载）
     * 
     * @param from
     *            主表
     * @param to
     *            子表
     */
    private void copyFetches(Fetch<?, ?> from, Fetch<?, ?> to) {
        for (Fetch<?, ?> fetch : from.getFetches()) {
            Fetch<?, ?> toFetch = to.fetch(fetch.getAttribute().getName());
            // 复制获取
            copyFetches(fetch, toFetch);
        }
    }

    /**
     * 添加限制条件
     * 
     * @param criteriaQuery
     *            条件查询
     * @param filters
     *            筛选
     */
    private void addRestrictions(CriteriaQuery<T> criteriaQuery, List<Filter> filters) {
        if (criteriaQuery == null || filters == null || filters.isEmpty()) {
            return;
        }
        Root<T> root = getRoot(criteriaQuery);
        if (root == null) {
            return;
        }

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // 获取限制条件
        Predicate restrictions = criteriaQuery.getRestriction() != null ? criteriaQuery.getRestriction()
                : criteriaBuilder.conjunction();

        // 遍历筛选
        for (Filter filter : filters) {
            if (filter == null || StringUtils.isBlank(filter.getProperty())) {
                continue;
            }

            // eq 筛选
            if (filter.getOperator() == FilterOperatorEnum.eq && filter.getValue() != null) {
                // 忽略大小写、查询参数为字符串时
                if (BooleanUtils.isTrue(filter.getIgnoreCase()) && filter.getValue() instanceof String) {
                    restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(
                            criteriaBuilder.lower(root.<String> get(filter.getProperty())),
                            ((String) filter.getValue()).toLowerCase()));
                }
                // 全匹配查询
                else {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.equal(root.get(filter.getProperty()), filter.getValue()));
                }
            }
            // ne 筛选
            else if (filter.getOperator() == FilterOperatorEnum.ne && filter.getValue() != null) {
                // 忽略大小写、查询参数为字符串时
                if (BooleanUtils.isTrue(filter.getIgnoreCase()) && filter.getValue() instanceof String) {
                    restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.notEqual(
                            criteriaBuilder.lower(root.<String> get(filter.getProperty())),
                            ((String) filter.getValue()).toLowerCase()));
                }
                // 全匹配查询
                else {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.notEqual(root.get(filter.getProperty()), filter.getValue()));
                }
            }
            // gt 筛选（数字）
            else if (filter.getOperator() == FilterOperatorEnum.gt && filter.getValue() != null
                    && filter.getValue() instanceof Number) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.gt(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
            }
            // gt 筛选（日期）
            else if (filter.getOperator() == FilterOperatorEnum.gt && filter.getValue() != null
                    && filter.getValue() instanceof Date) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.greaterThan(root.<Date> get(filter.getProperty()), (Date) filter.getValue()));
            }
            // lt 筛选（数字）
            else if (filter.getOperator() == FilterOperatorEnum.lt && filter.getValue() != null
                    && filter.getValue() instanceof Number) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.lt(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
            }
            // lt 筛选（日期）
            else if (filter.getOperator() == FilterOperatorEnum.lt && filter.getValue() != null
                    && filter.getValue() instanceof Date) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.lessThan(root.<Date> get(filter.getProperty()), (Date) filter.getValue()));
            }
            // ge 筛选（数字）
            else if (filter.getOperator() == FilterOperatorEnum.ge && filter.getValue() != null
                    && filter.getValue() instanceof Number) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.ge(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
            }
            // ge 筛选（日期）
            else if (filter.getOperator() == FilterOperatorEnum.ge && filter.getValue() != null
                    && filter.getValue() instanceof Date) {
                restrictions = criteriaBuilder.and(
                        restrictions,
                        criteriaBuilder.greaterThanOrEqualTo(root.<Date> get(filter.getProperty()),
                                (Date) filter.getValue()));
            }
            // le 筛选（数字）
            else if (filter.getOperator() == FilterOperatorEnum.le && filter.getValue() != null
                    && filter.getValue() instanceof Number) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.le(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
            }
            // le 筛选（日期）
            else if (filter.getOperator() == FilterOperatorEnum.le && filter.getValue() != null
                    && filter.getValue() instanceof Date) {
                restrictions = criteriaBuilder.and(
                        restrictions,
                        criteriaBuilder.lessThanOrEqualTo(root.<Date> get(filter.getProperty()),
                                (Date) filter.getValue()));
            }
            // like 筛选
            else if (filter.getOperator() == FilterOperatorEnum.like && filter.getValue() != null
                    && filter.getValue() instanceof String) {
                restrictions = criteriaBuilder.and(restrictions,
                        criteriaBuilder.like(root.<String> get(filter.getProperty()), (String) filter.getValue()));
            }
            // in 筛选
            else if (filter.getOperator() == FilterOperatorEnum.in && filter.getValue() != null) {
                restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).in(filter.getValue()));
            }
            // isNull 筛选
            else if (filter.getOperator() == FilterOperatorEnum.isNull) {
                restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).isNull());
            }
            // isNotNull 筛选
            else if (filter.getOperator() == FilterOperatorEnum.isNotNull) {
                restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).isNotNull());
            }
        }

        criteriaQuery.where(restrictions);
    }

    /**
     * 添加限制条件
     * 
     * @param criteriaQuery
     *            条件查询
     * @param pageable
     *            分页信息
     */
    private void addRestrictions(CriteriaQuery<T> criteriaQuery, Pageable pageable) {
        if (criteriaQuery == null || pageable == null) {
            return;
        }
        Root<T> root = getRoot(criteriaQuery);
        if (root == null) {
            return;
        }

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // 获取限制条件
        Predicate restrictions = criteriaQuery.getRestriction() != null ? criteriaQuery.getRestriction()
                : criteriaBuilder.conjunction();

        // 分页设定关键字查询时（模糊查询）
        if (StringUtils.isNotBlank(pageable.getSearchProperty()) && StringUtils.isNotBlank(pageable.getSearchValue())) {
            // 关键字属性模糊查询
            restrictions = criteriaBuilder.and(
                    restrictions,
                    criteriaBuilder.like(root.<String> get(pageable.getSearchProperty()),
                            "%" + pageable.getSearchValue() + "%"));
        }

        // 分页设定筛选时
        if (pageable.getFilters() != null) {
            // 遍历筛选
            for (Filter filter : pageable.getFilters()) {
                if (filter == null || StringUtils.isBlank(filter.getProperty())) {
                    continue;
                }

                // eq 筛选
                if (filter.getOperator() == FilterOperatorEnum.eq && filter.getValue() != null) {
                    // 忽略大小写、查询参数为字符串时
                    if (BooleanUtils.isTrue(filter.getIgnoreCase()) && filter.getValue() instanceof String) {
                        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(
                                criteriaBuilder.lower(root.<String> get(filter.getProperty())),
                                ((String) filter.getValue()).toLowerCase()));
                    }
                    // 全匹配查询
                    else {
                        restrictions = criteriaBuilder.and(restrictions,
                                criteriaBuilder.equal(root.get(filter.getProperty()), filter.getValue()));
                    }
                }
                // ne 筛选
                else if (filter.getOperator() == FilterOperatorEnum.ne && filter.getValue() != null) {
                    // 忽略大小写、查询参数为字符串时
                    if (BooleanUtils.isTrue(filter.getIgnoreCase()) && filter.getValue() instanceof String) {
                        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.notEqual(
                                criteriaBuilder.lower(root.<String> get(filter.getProperty())),
                                ((String) filter.getValue()).toLowerCase()));
                    }
                    // 全匹配查询
                    else {
                        restrictions = criteriaBuilder.and(restrictions,
                                criteriaBuilder.notEqual(root.get(filter.getProperty()), filter.getValue()));
                    }
                }
                // gt 筛选（数字）
                else if (filter.getOperator() == FilterOperatorEnum.gt && filter.getValue() != null
                        && filter.getValue() instanceof Number) {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.gt(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
                }
                // gt 筛选（日期）
                else if (filter.getOperator() == FilterOperatorEnum.gt && filter.getValue() != null
                        && filter.getValue() instanceof Date) {
                    restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.greaterThan(
                            root.<Date> get(filter.getProperty()), (Date) filter.getValue()));
                }
                // lt 筛选（数字）
                else if (filter.getOperator() == FilterOperatorEnum.lt && filter.getValue() != null
                        && filter.getValue() instanceof Number) {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.lt(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
                }
                // lt 筛选（日期）
                else if (filter.getOperator() == FilterOperatorEnum.lt && filter.getValue() != null
                        && filter.getValue() instanceof Date) {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.lessThan(root.<Date> get(filter.getProperty()), (Date) filter.getValue()));
                }
                // ge 筛选（数字）
                else if (filter.getOperator() == FilterOperatorEnum.ge && filter.getValue() != null
                        && filter.getValue() instanceof Number) {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.ge(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
                }
                // ge 筛选（日期）
                else if (filter.getOperator() == FilterOperatorEnum.ge && filter.getValue() != null
                        && filter.getValue() instanceof Date) {
                    restrictions = criteriaBuilder.and(
                            restrictions,
                            criteriaBuilder.greaterThanOrEqualTo(root.<Date> get(filter.getProperty()),
                                    (Date) filter.getValue()));
                }
                // le 筛选（数字）
                else if (filter.getOperator() == FilterOperatorEnum.le && filter.getValue() != null
                        && filter.getValue() instanceof Number) {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.le(root.<Number> get(filter.getProperty()), (Number) filter.getValue()));
                }
                // le 筛选（日期）
                else if (filter.getOperator() == FilterOperatorEnum.le && filter.getValue() != null
                        && filter.getValue() instanceof Date) {
                    restrictions = criteriaBuilder.and(
                            restrictions,
                            criteriaBuilder.lessThanOrEqualTo(root.<Date> get(filter.getProperty()),
                                    (Date) filter.getValue()));
                }
                // like 筛选
                else if (filter.getOperator() == FilterOperatorEnum.like && filter.getValue() != null
                        && filter.getValue() instanceof String) {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.like(root.<String> get(filter.getProperty()), (String) filter.getValue()));
                }
                // in 筛选
                else if (filter.getOperator() == FilterOperatorEnum.in && filter.getValue() != null) {
                    restrictions = criteriaBuilder.and(restrictions,
                            root.get(filter.getProperty()).in(filter.getValue()));
                }
                // isNull 筛选
                else if (filter.getOperator() == FilterOperatorEnum.isNull) {
                    restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).isNull());
                }
                // isNotNull 筛选
                else if (filter.getOperator() == FilterOperatorEnum.isNotNull) {
                    restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).isNotNull());
                }
            }
        }

        criteriaQuery.where(restrictions);
    }

    /**
     * 添加排序
     * 
     * @param criteriaQuery
     *            查询条件
     * @param orders
     *            排序
     */
    private void addOrders(CriteriaQuery<T> criteriaQuery, List<Order> orders) {
        if (criteriaQuery == null || orders == null || orders.isEmpty()) {
            return;
        }
        Root<T> root = getRoot(criteriaQuery);
        if (root == null) {
            return;
        }

        // 排序集合
        List<javax.persistence.criteria.Order> orderList = new ArrayList<javax.persistence.criteria.Order>();

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // 查询条件已添加排序时
        if (!criteriaQuery.getOrderList().isEmpty()) {
            // 添加到排序集合
            orderList.addAll(criteriaQuery.getOrderList());
        }

        // 遍历排序
        for (Order order : orders) {
            // 升序
            if (order.getDirection() == OrderDirectionEnum.asc) {
                // 添加到排序集合
                orderList.add(criteriaBuilder.asc(root.get(order.getProperty())));
            }
            // 降序
            else if (order.getDirection() == OrderDirectionEnum.desc) {
                // 添加到排序集合
                orderList.add(criteriaBuilder.desc(root.get(order.getProperty())));
            }
        }

        criteriaQuery.orderBy(orderList);
    }

    /**
     * 添加排序
     * 
     * @param criteriaQuery
     *            查询条件
     * @param pageable
     *            分页信息
     */
    private void addOrders(CriteriaQuery<T> criteriaQuery, Pageable pageable) {
        if (criteriaQuery == null || pageable == null) {
            return;
        }
        Root<T> root = getRoot(criteriaQuery);
        if (root == null) {
            return;
        }

        // 排序集合
        List<javax.persistence.criteria.Order> orderList = new ArrayList<javax.persistence.criteria.Order>();

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // 查询条件已添加排序时
        if (!criteriaQuery.getOrderList().isEmpty()) {
            // 添加到排序集合
            orderList.addAll(criteriaQuery.getOrderList());
        }

        // 分页设定排序属性、排序方向时
        if (pageable.getOrderDirection() != null && StringUtils.isNotBlank(pageable.getOrderProperty())) {
            // 升序
            if (pageable.getOrderDirection() == OrderDirectionEnum.asc) {
                // 添加到排序集合
                orderList.add(criteriaBuilder.asc(root.get(pageable.getOrderProperty())));
            }
            // 降序
            else if (pageable.getOrderDirection() == OrderDirectionEnum.desc) {
                // 添加到排序集合
                orderList.add(criteriaBuilder.desc(root.get(pageable.getOrderProperty())));
            }
        }

        // 分页设定排序时
        if (pageable.getOrders() != null) {
            // 遍历排序
            for (Order order : pageable.getOrders()) {
                // 升序
                if (order.getDirection() == OrderDirectionEnum.asc) {
                    // 添加到排序集合
                    orderList.add(criteriaBuilder.asc(root.get(order.getProperty())));
                }
                // 降序
                else if (order.getDirection() == OrderDirectionEnum.desc) {
                    // 添加到排序集合
                    orderList.add(criteriaBuilder.desc(root.get(order.getProperty())));
                }
            }
        }

        criteriaQuery.orderBy(orderList);
    }

}