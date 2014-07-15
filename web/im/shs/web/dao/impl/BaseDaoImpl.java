package im.shs.web.dao.impl;

import im.shs.web.Filter;
import im.shs.web.Page;
import im.shs.web.Pageable;
import im.shs.web.Sequencer;
import im.shs.web.dao.BaseDao;
import im.shs.web.entity.BaseEntity;
import im.shs.web.entity.BaseOrderEntity;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
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
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;

import org.apache.commons.lang3.StringUtils;
/**
 * @class : BaseDaoImpl
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:58:39
 * @version 1.0
 */
public abstract class BaseDaoImpl<T extends BaseEntity, ID extends Serializable> implements BaseDao<T, ID> {

    /** 实体类模版 */
    protected Class<T> entityClass;

    /** 别名前缀 */
    protected static final String aliasPrefix = "ibsGeneratedAlias";

    /** 别名数 */
    protected static volatile long aliasCount = 0;

    @PersistenceContext
    protected EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public BaseDaoImpl() {
        // 获取超类对象类型
        Type type = getClass().getGenericSuperclass();
        // 获取实际类型参数
        Type[] parameterizedType = ((ParameterizedType) type).getActualTypeArguments();
        // 获取实体类模版
        entityClass = (Class<T>) parameterizedType[0];
    }

    @Override
    public T find(ID id) {
        if (id == null) {
            return null;
        }
        return entityManager.find(entityClass, id);
    }

    @Override
    public T find(ID id, LockModeType lockModeType) {
        if (id == null) {
            return null;
        }
        if (lockModeType == null) {
            return entityManager.find(entityClass, id);
        }
        return entityManager.find(entityClass, id, lockModeType);
    }

    @Override
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

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 创建条件查询
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        // 设置查询ROOT
        Root<T> root = criteriaQuery.from(entityClass);
        criteriaQuery.select(root);
        // 设置限制条件
        Predicate restrictions = criteriaBuilder.conjunction();
        // 查找实体集合
        return findList(criteriaBuilder, criteriaQuery, restrictions, root, first, count, filters, sequencers);
    }

    /**
     * 查找实体集合
     * 
     * @param criteriaBuilder
     *            条件构造器
     * @param criteriaQuery
     *            查询条件
     * @param restrictions
     *            限制条件
     * @param root
     *            查询ROOT
     * @param first
     *            起始记录
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @param sequencers
     *            定序器
     * @return 实体集合
     */
    protected List<T> findList(CriteriaBuilder criteriaBuilder, CriteriaQuery<T> criteriaQuery, Predicate restrictions,
            Root<T> root, Integer first, Integer count, List<Filter> filters, List<Sequencer> sequencers) {
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

        // 设置限制条件
        if (filters != null) {
            restrictions = addRestrictions(criteriaBuilder, criteriaQuery, restrictions, root, filters);
        }
        criteriaQuery.where(restrictions);

        // 设置排序条件
        if (sequencers != null) {
            List<Order> orders = new ArrayList<Order>();
            addOrders(criteriaBuilder, criteriaQuery, orders, root, sequencers);
            criteriaQuery.orderBy(orders);
        }
        // 设置默认排序条件
        else {
            if (BaseOrderEntity.class.isAssignableFrom(entityClass)) {
                criteriaQuery.orderBy(criteriaBuilder.asc(root.get(BaseOrderEntity.ORDER_PROP)));
            } else {
                criteriaQuery.orderBy(criteriaBuilder.desc(root.get(BaseEntity.CREATE_DATE_PROP)));
            }
        }

        // 执行查询
        TypedQuery<T> query = entityManager.createQuery(criteriaQuery).setFlushMode(FlushModeType.COMMIT);
        if (first != null) {
            query.setFirstResult(first);
        }
        if (count != null) {
            query.setMaxResults(count);
        }
        return query.getResultList();
    }

    @Override
    public Page<T> findPage(Pageable pageable) {
        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 创建条件查询
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        // 设置查询ROOT
        Root<T> root = criteriaQuery.from(entityClass);
        criteriaQuery.select(root);
        // 设置限制条件
        Predicate restrictions = criteriaBuilder.conjunction();
        // 查找实体分页
        return findPage(criteriaBuilder, criteriaQuery, restrictions, root, pageable);
    }

    /**
     * 查找实体分页
     * 
     * @param criteriaBuilder
     *            条件构造器
     * @param criteriaQuery
     *            查询条件
     * @param restrictions
     *            限制条件
     * @param root
     *            查询ROOT
     * @param pageable
     *            分页信息
     * @return 实体分页
     */
    protected Page<T> findPage(CriteriaBuilder criteriaBuilder, CriteriaQuery<T> criteriaQuery, Predicate restrictions,
            Root<T> root, Pageable pageable) {
        if (criteriaBuilder == null || criteriaQuery == null || restrictions == null || root == null) {
            return new Page<T>();
        }
        if (pageable == null || pageable.isEmpty()) {
            pageable = new Pageable();
        }
        if (StringUtils.isBlank(pageable.getSearchProperty()) || StringUtils.isBlank(pageable.getSearchValue())) {
            pageable.setSearchProperty(null);
            pageable.setSearchValue(null);
        }
        if (pageable.getFilters() != null && pageable.getFilters().isEmpty()) {
            pageable.setFilters(null);
        }
        if (StringUtils.isBlank(pageable.getSortProperty()) || pageable.getSortDirection() == null) {
            pageable.setSortProperty(null);
            pageable.setSortDirection(null);
        }
        if (pageable.getSequencers() != null && pageable.getSequencers().isEmpty()) {
            pageable.setSequencers(null);
        }

        // 设置限制条件
        if (pageable.getSearchProperty() != null && pageable.getSearchValue() != null) {
            restrictions = criteriaBuilder.and(
                    restrictions,
                    criteriaBuilder.like(root.<String> get(pageable.getSearchProperty()),
                            "%" + pageable.getSearchValue() + "%"));
        }
        if (pageable.getFilters() != null) {
            restrictions = addRestrictions(criteriaBuilder, criteriaQuery, restrictions, root, pageable.getFilters());
        }
        criteriaQuery.where(restrictions);

        // 设置排序条件
        if (pageable.getSequencers() != null) {
            List<Order> orders = new ArrayList<Order>();
            addOrders(criteriaBuilder, criteriaQuery, orders, root, pageable.getSequencers());
            criteriaQuery.orderBy(orders);
        }
        // 设置默认排序条件
        else {
            if (BaseOrderEntity.class.isAssignableFrom(entityClass)) {
                criteriaQuery.orderBy(criteriaBuilder.asc(root.get(BaseOrderEntity.ORDER_PROP)));
            } else {
                criteriaQuery.orderBy(criteriaBuilder.desc(root.get(BaseEntity.CREATE_DATE_PROP)));
            }
        }

        // 执行查询
        TypedQuery<T> query = entityManager.createQuery(criteriaQuery).setFlushMode(FlushModeType.COMMIT);
        query.setFirstResult((pageable.getPageNumber() - 1) * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());
        List<T> results = query.getResultList();
        Long total = count(criteriaBuilder, criteriaQuery, root);
        return new Page<T>(pageable, results, total);
    }

    @Override
    public Long count(List<Filter> filters) {
        if (filters != null && filters.isEmpty()) {
            filters = null;
        }

        // 获取条件构造器
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // 创建条件查询
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        // 设置查询ROOT
        Root<T> root = criteriaQuery.from(entityClass);
        criteriaQuery.select(root);

        // 限制条件
        if (filters != null) {
            // 创建限制条件
            Predicate restrictions = criteriaBuilder.conjunction();
            // 添加限制条件
            restrictions = addRestrictions(criteriaBuilder, criteriaQuery, restrictions, root, filters);
            // 设置限制条件
            criteriaQuery.where(restrictions);
        }
        // 查询实体数量
        return count(criteriaBuilder, criteriaQuery, root);
    }

    @Override
    @SuppressWarnings("unchecked")
    public ID getIdentifier(T entity) {
        if (entity == null || entity.isEmpty()) {
            return null;
        }
        // 获取实体管理器、获取持久化装置工具、获取标识符
        return (ID) entityManager.getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(entity);
    }

    @Override
    public boolean contains(T entity) {
        if (entity == null || entity.isEmpty()) {
            return false;
        }
        return entityManager.contains(entity);
    }

    @Override
    public void persist(T entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        entityManager.persist(entity);
    }

    @Override
    public T merge(T entity) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        return entityManager.merge(entity);
    }

    @Override
    public void detach(T entity) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        entityManager.detach(entity);
    }

    @Override
    public void remove(T entity) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        entityManager.remove(entity);
    }

    @Override
    public void lock(T entity, LockModeType lockModeType) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        if (lockModeType == null) {
            throw new IllegalArgumentException("LockModeType must not be null");
        }
        entityManager.lock(entity, lockModeType);
    }

    @Override
    public void refresh(T entity, LockModeType lockModeType) {
        if (entity == null || entity.isEmpty()) {
            throw new IllegalArgumentException("Entity must not be empty");
        }
        if (lockModeType == null) {
            entityManager.refresh(entity);
        } else {
            entityManager.refresh(entity, lockModeType);
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
     * 获取别名
     * 
     * @param selection
     *            选择
     * @return 别名
     */
    private synchronized String getAlias(Selection<?> selection) {
        if (selection == null) {
            return null;
        }
        String alias = selection.getAlias();
        if (alias == null) {
            if (aliasCount >= 1000) {
                aliasCount = 0;
            }
            alias = aliasPrefix + aliasCount++;
            selection.alias(alias);
        }
        return alias;
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
        for (Iterator<?> iterator = from.getJoins().iterator(); iterator.hasNext();) {
            Join<?, ?> join = (Join<?, ?>) iterator.next();
            Join<?, ?> toJoin = to.join(join.getAttribute().getName(), join.getJoinType());
            // 获取并设置别名
            toJoin.alias(getAlias(join));
            copyJoins(join, toJoin);
        }
        for (Iterator<?> iterator = from.getFetches().iterator(); iterator.hasNext();) {
            Fetch<?, ?> fetch = (Fetch<?, ?>) iterator.next();
            Fetch<?, ?> toFetch = to.fetch(fetch.getAttribute().getName());
            // 复制抓取
            copyFetches(fetch, toFetch);
        }
    }

    /**
     * 复制抓取（fetch=FetchType.LAZY）
     * 
     * @param from
     *            主表
     * @param to
     *            子表
     */
    private void copyFetches(Fetch<?, ?> from, Fetch<?, ?> to) {
        for (Iterator<?> iterator = from.getFetches().iterator(); iterator.hasNext();) {
            Fetch<?, ?> fetch = (Fetch<?, ?>) iterator.next();
            Fetch<?, ?> toFetch = to.fetch(fetch.getAttribute().getName());
            copyFetches(fetch, toFetch);
        }
    }

    /**
     * 查询实体数量
     * 
     * @param criteriaBuilder
     *            条件构造器
     * @param criteriaQuery
     *            条件查询
     * @param root
     *            查询ROOT
     * @return 实体数量
     */
    private Long count(CriteriaBuilder criteriaBuilder, CriteriaQuery<T> criteriaQuery, Root<T> root) {
        // 创建计算条件查询
        CriteriaQuery<Long> countCriteriaQuery = criteriaBuilder.createQuery(Long.class);
        for (Iterator<Root<?>> iterator = criteriaQuery.getRoots().iterator(); iterator.hasNext();) {
            Root<?> countRoot = iterator.next();
            Root<?> destCountRoot = countCriteriaQuery.from(countRoot.getJavaType());
            destCountRoot.alias(getAlias(countRoot));
            // 复制联表
            copyJoins(countRoot, destCountRoot);
        }

        // 设置计算查询ROOT
        countCriteriaQuery.select(criteriaBuilder.count(root));

        // 设置默认GROUP分组
        if (criteriaQuery.getGroupList() != null) {
            countCriteriaQuery.groupBy(criteriaQuery.getGroupList());
        }
        // 设置默认GROUP限制条件
        if (criteriaQuery.getGroupRestriction() != null) {
            countCriteriaQuery.having(criteriaQuery.getGroupRestriction());
        }
        // 设置默认WHERE限制条件
        if (criteriaQuery.getRestriction() != null) {
            countCriteriaQuery.where(criteriaQuery.getRestriction());
        }

        // 执行查询
        return entityManager.createQuery(countCriteriaQuery).setFlushMode(FlushModeType.COMMIT).getSingleResult();
    }

    /**
     * 添加限制条件
     * 
     * @param criteriaBuilder
     *            条件构造器
     * @param criteriaQuery
     *            条件查询
     * @param restrictions
     * 
     * @param root
     *            查询ROOT
     * @param filters
     *            过滤器
     * @return 限制条件
     */
    private Predicate addRestrictions(CriteriaBuilder criteriaBuilder, CriteriaQuery<T> criteriaQuery,
            Predicate restrictions, Root<T> root, List<Filter> filters) {
        // 遍历过滤器添加限制条件
        for (Iterator<Filter> iterator = filters.iterator(); iterator.hasNext();) {
            Filter filter = iterator.next();
            if (filter == null || filter.isEmpty()) {
                continue;
            }
            switch (filter.getOperator()) {
                case /** 等于 */
                eq: {
                    if (filter.getIgnoreCase() && filter.getValue() instanceof String) {
                        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(
                                criteriaBuilder.lower(root.<String> get(filter.getProperty())),
                                ((String) filter.getValue()).toLowerCase()));
                    } else {
                        restrictions = criteriaBuilder.and(restrictions,
                                criteriaBuilder.equal(root.get(filter.getProperty()), filter.getValue()));
                    }
                    break;
                }
                case /** 不等于 */
                ne: {
                    if (filter.getIgnoreCase() && filter.getValue() instanceof String) {
                        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.notEqual(
                                criteriaBuilder.lower(root.<String> get(filter.getProperty())),
                                ((String) filter.getValue()).toLowerCase()));
                    } else {
                        restrictions = criteriaBuilder.and(restrictions,
                                criteriaBuilder.notEqual(root.get(filter.getProperty()), filter.getValue()));
                    }
                    break;
                }
                case /** 大于 */
                gt: {
                    if (filter.getValue() instanceof Number) {
                        restrictions = criteriaBuilder
                                .and(restrictions,
                                        criteriaBuilder.gt(root.<Number> get(filter.getProperty()),
                                                (Number) filter.getValue()));
                    } else if (filter.getValue() instanceof Date) {
                        restrictions = criteriaBuilder.and(
                                restrictions,
                                criteriaBuilder.greaterThan(root.<Date> get(filter.getProperty()),
                                        (Date) filter.getValue()));
                    }
                    break;
                }
                case /** 大于等于 */
                ge: {
                    if (filter.getValue() instanceof Number) {
                        restrictions = criteriaBuilder
                                .and(restrictions,
                                        criteriaBuilder.ge(root.<Number> get(filter.getProperty()),
                                                (Number) filter.getValue()));
                    } else if (filter.getValue() instanceof Date) {
                        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.greaterThanOrEqualTo(
                                root.<Date> get(filter.getProperty()), (Date) filter.getValue()));
                    }
                    break;
                }
                case /** 小于 */
                lt: {
                    if (filter.getValue() instanceof Number) {
                        restrictions = criteriaBuilder
                                .and(restrictions,
                                        criteriaBuilder.lt(root.<Number> get(filter.getProperty()),
                                                (Number) filter.getValue()));
                    } else if (filter.getValue() instanceof Date) {
                        restrictions = criteriaBuilder.and(
                                restrictions,
                                criteriaBuilder.lessThan(root.<Date> get(filter.getProperty()),
                                        (Date) filter.getValue()));
                    }
                    break;
                }
                case /** 小于等于 */
                le: {
                    if (filter.getValue() instanceof Number) {
                        restrictions = criteriaBuilder
                                .and(restrictions,
                                        criteriaBuilder.le(root.<Number> get(filter.getProperty()),
                                                (Number) filter.getValue()));
                    } else if (filter.getValue() instanceof Date) {
                        restrictions = criteriaBuilder.and(
                                restrictions,
                                criteriaBuilder.lessThanOrEqualTo(root.<Date> get(filter.getProperty()),
                                        (Date) filter.getValue()));
                    }
                    break;
                }
                case /** 相似 */
                like: {
                    restrictions = criteriaBuilder.and(restrictions,
                            criteriaBuilder.like(root.<String> get(filter.getProperty()), (String) filter.getValue()));
                    break;
                }
                case /** 包含 */
                in: {
                    restrictions = criteriaBuilder.and(restrictions,
                            root.get(filter.getProperty()).in(filter.getValue()));
                    break;
                }
                case /** 为NULL */
                isNull: {
                    restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).isNull());
                    break;
                }
                case /** 不为NULL */
                isNotNull: {
                    restrictions = criteriaBuilder.and(restrictions, root.get(filter.getProperty()).isNotNull());
                    break;
                }
                default: {
                    break;
                }
            }
        }
        return restrictions;
    }

    /**
     * 添加排序条件
     * 
     * @param criteriaBuilder
     *            条件构造器
     * @param criteriaQuery
     *            查询条件
     * @param orders
     *            排序条件
     * @param root
     *            查询ROOT
     * @param sequencers
     *            定序器
     */
    private void addOrders(CriteriaBuilder criteriaBuilder, CriteriaQuery<T> criteriaQuery, List<Order> orders,
            Root<T> root, List<Sequencer> sequencers) {
        // 遍历定序器添加条件排序
        for (Iterator<Sequencer> iterator = sequencers.iterator(); iterator.hasNext();) {
            Sequencer sequencer = iterator.next();
            if (sequencers == null || sequencers.isEmpty()) {
                continue;
            }
            switch (sequencer.getDirection()) {
                case /** 递减 */
                asc: {
                    orders.add(criteriaBuilder.asc(root.get(sequencer.getProperty())));
                    break;
                }
                case /** 递减 */
                desc: {
                    orders.add(criteriaBuilder.desc(root.get(sequencer.getProperty())));
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

}