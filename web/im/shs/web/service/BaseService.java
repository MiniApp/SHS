package im.shs.web.service;

import im.shs.Filter;
import im.shs.Order;
import im.shs.Page;
import im.shs.Pageable;

import java.io.Serializable;
import java.util.List;

/**
 * @class : BaseService
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:12:07
 * @version 1.0
 */
public interface BaseService<T, ID extends Serializable> {

    /**
     * 查找实体对象
     * 
     * @param id
     *            ID
     * @return 实体对象，不存在时返回NULL
     */
    T find(ID id);

    /**
     * 查找实体对象
     * 
     * @param filters
     *            筛选
     * @return 实体对象，不存在时返回NULL
     */
    T find(Filter... filters);

    /**
     * 查找实体对象
     * 
     * @param filters
     *            筛选
     * @return 实体对象，不存在时返回NULL
     */
    T find(List<Filter> filters);

    /**
     * 查找所有实体对象集合
     * 
     * @return 所有实体对象集合
     */
    List<T> findAll();

    /**
     * 查找实体对象集合
     * 
     * @param ids
     *            ID
     * @return 实体对象集合
     */
    @SuppressWarnings("unchecked")
    List<T> findList(ID... ids);

    /**
     * 查找实体对象集合
     * 
     * @param filters
     *            筛选
     * @return 实体对象集合
     */
    List<T> findList(Filter... filters);

    /**
     * 查找实体对象集合
     * 
     * @param filters
     *            筛选
     * @return 实体对象集合
     */
    List<T> findList(List<Filter> filters);

    /**
     * 查找实体对象集合
     * 
     * @param count
     *            数量
     * @param filters
     *            筛选
     * @return 实体对象集合
     */
    List<T> findList(Integer count, Filter... filters);

    /**
     * 查找实体对象集合
     * 
     * @param count
     *            数量
     * @param filters
     *            筛选
     * @return 实体对象集合
     */
    List<T> findList(Integer count, List<Filter> filters);

    /**
     * 查找实体对象集合
     * 
     * @param filters
     *            筛选
     * @param orders
     *            排序
     * @return 实体对象集合
     */
    List<T> findList(List<Filter> filters, List<Order> orders);

    /**
     * 查找实体对象集合
     * 
     * @param count
     *            数量
     * @param filters
     *            筛选
     * @param orders
     *            排序
     * @return 实体对象集合
     */
    List<T> findList(Integer count, List<Filter> filters, List<Order> orders);

    /**
     * 查找实体对象集合
     * 
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
    List<T> findList(Integer first, Integer count, List<Filter> filters, List<Order> orders);

    /**
     * 查找实体对象分页
     * 
     * @param pageable
     *            分页信息
     * @return 实体对象分页
     */
    Page<T> findPage(Pageable pageable);

    /**
     * 查询实体对象总数
     * 
     * @return 实体对象总数
     */
    long count();

    /**
     * 查询实体对象数量
     * 
     * @param filters
     *            筛选
     * @return 实体对象数量
     */
    long count(Filter... filters);

    /**
     * 查询实体对象数量
     * 
     * @param filters
     *            筛选
     * @return 实体对象数量
     */
    long count(List<Filter> filters);

    /**
     * 判断实体对象是否存在
     * 
     * @param id
     *            ID
     * @return 实体对象是否存在
     */
    boolean exists(ID id);

    /**
     * 判断实体对象是否存在
     * 
     * @param filters
     *            筛选
     * @return 实体对象是否存在
     */
    boolean exists(Filter... filters);

    /**
     * 判断实体对象是否存在
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @param ignoreCase
     *            是否忽略大小写
     * @return 实体对象是否存在
     */
    boolean exists(String property, String value, boolean ignoreCase);

    /**
     * 判断实体对象是否唯一
     * 
     * @param property
     *            属性
     * @param previousValue
     *            修改前值
     * @param currentValue
     *            当前值
     * @param ignoreCase
     *            是否忽略大小写
     * @return 实体对象是否唯一
     */
    boolean unique(String property, String previousValue, String currentValue, boolean ignoreCase);

    /**
     * 保存实体对象
     * 
     * @param entity
     *            实体对象
     */
    void save(T entity);

    /**
     * 更新实体对象
     * 
     * @param entity
     *            实体对象
     * @return 实体对象
     */
    T update(T entity);

    /**
     * 更新实体对象
     * 
     * @param entity
     *            实体对象
     * @param ignoreProperties
     *            忽略属性
     * @return 实体对象
     */
    T update(T entity, String... ignoreProperties);

    /**
     * 删除实体对象
     * 
     * @param id
     *            ID
     */
    void delete(ID id);

    /**
     * 删除实体对象
     * 
     * @param entity
     *            实体对象
     */
    void delete(T entity);

    /**
     * 删除实体对象
     * 
     * @param ids
     *            ID
     */
    @SuppressWarnings("unchecked")
    void delete(ID... ids);

}