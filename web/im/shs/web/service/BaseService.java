package im.shs.web.service;

import im.shs.web.Filter;
import im.shs.web.Page;
import im.shs.web.Pageable;
import im.shs.web.Sequencer;

import java.io.Serializable;
import java.util.List;

/**
 * @class : BaseService
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月14日 下午10:47:44
 * @version 1.0
 */
public interface BaseService<T, ID extends Serializable> {

    /**
     * 查找实体
     * 
     * @param id
     *            ID
     * @return 实体
     */
    T find(ID id);

    /**
     * 查找实体
     * 
     * @param filters
     *            过滤器
     * @return 实体
     */
    T find(Filter... filters);

    /**
     * 查找实体
     * 
     * @param filters
     *            过滤器
     * @return 实体
     */
    T find(List<Filter> filters);

    /**
     * 查找所有实体集合
     * 
     * @return 所有实体集合
     */
    List<T> findAll();

    /**
     * 查找实体集合
     * 
     * @param ids
     *            ID
     * @return 实体集合
     */
    @SuppressWarnings("unchecked")
    List<T> findList(ID... ids);

    /**
     * 查找实体集合
     * 
     * @param filters
     *            过滤器
     * @return 实体集合
     */
    List<T> findList(Filter... filters);

    /**
     * 查找实体集合
     * 
     * @param filters
     *            过滤器
     * @return 实体集合
     */
    List<T> findList(List<Filter> filters);

    /**
     * 查找实体集合
     * 
     * @param filters
     *            过滤器
     * @param sequencers
     *            定序器
     * @return 实体集合
     */
    List<T> findList(List<Filter> filters, Sequencer... sequencers);

    /**
     * 查找实体集合
     * 
     * @param filters
     *            过滤器
     * @param sequencers
     *            定序器
     * @return 实体集合
     */
    List<T> findList(List<Filter> filters, List<Sequencer> sequencers);

    /**
     * 查找实体集合
     * 
     * @param count
     *            查询数量
     * @return 实体集合
     */
    List<T> findList(Integer count);

    /**
     * 查找实体集合
     * 
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @return 实体集合
     */
    List<T> findList(Integer count, Filter... filters);

    /**
     * 查找实体集合
     * 
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @return 实体集合
     */
    List<T> findList(Integer count, List<Filter> filters);

    /**
     * 查找实体集合
     * 
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @param sequencers
     *            定序器
     * @return 实体集合
     */
    List<T> findList(Integer count, List<Filter> filters, Sequencer... sequencers);

    /**
     * 查找实体集合
     * 
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @param sequencers
     *            定序器
     * @return 实体集合
     */
    List<T> findList(Integer count, List<Filter> filters, List<Sequencer> sequencers);

    /**
     * 查找实体集合
     * 
     * @param first
     *            起始记录
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @return 实体集合
     */
    List<T> findList(Integer first, Integer count, Filter... filters);

    /**
     * 查找实体集合
     * 
     * @param first
     *            起始记录
     * @param count
     *            查询数量
     * @param filters
     *            过滤器
     * @return 实体集合
     */
    List<T> findList(Integer first, Integer count, List<Filter> filters);

    /**
     * 查找实体集合
     * 
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
    List<T> findList(Integer first, Integer count, List<Filter> filters, Sequencer... sequencers);

    /**
     * 查找实体集合
     * 
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
    List<T> findList(Integer first, Integer count, List<Filter> filters, List<Sequencer> sequencers);

    /**
     * 查找实体分页
     * 
     * @param pageable
     *            分页信息
     * @return 实体分页
     */
    Page<T> findPage(Pageable pageable);

    /**
     * 查询实体数量
     * 
     * @return 实体数量
     */
    long count();

    /**
     * 查询实体数量
     * 
     * @param filters
     *            过滤器
     * @return 实体数量
     */
    long count(Filter... filters);

    /**
     * 查询实体数量
     * 
     * @param filters
     *            过滤器
     * @return 实体数量
     */
    long count(List<Filter> filters);

    /**
     * 判断实体是否存在
     * 
     * @param id
     *            ID
     * @return 实体是否存在
     */
    boolean exists(ID id);

    /**
     * 判断实体是否存在
     * 
     * @param filters
     *            过滤器
     * @return 实体是否存在
     */
    boolean exists(Filter... filters);

    /**
     * 判断实体是否存在
     * 
     * @param filters
     *            过滤器
     * @return 实体是否存在
     */
    boolean exists(List<Filter> filters);

    /**
     * 判断实体是否存在
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @return 实体是否存在
     */
    boolean exists(String property, String value);

    /**
     * 判断实体是否存在
     * 
     * @param property
     *            属性
     * @param value
     *            值
     * @param ignoreCase
     *            是否忽略大小写
     * @return 实体是否存在
     */
    boolean exists(String property, String value, boolean ignoreCase);

    /**
     * 判断实体是否唯一
     * 
     * @param property
     *            属性
     * @param previousValue
     *            修改前值
     * @param currentValue
     *            当前值
     * @return 实体是否唯一
     */
    boolean unique(String property, String previousValue, String currentValue);

    /**
     * 判断实体是否唯一
     * 
     * @param property
     *            属性
     * @param previousValue
     *            修改前值
     * @param currentValue
     *            当前值
     * @param ignoreCase
     *            是否忽略大小写
     * @return 实体是否唯一
     */
    boolean unique(String property, String previousValue, String currentValue, boolean ignoreCase);

    /**
     * 保存实体
     * 
     * @param entity
     *            实体
     */
    T save(T entity);

    /**
     * 更新实体
     * 
     * @param entityBean
     *            实体Bean
     * @param ignoreProps
     *            忽略属性
     * @return 实体
     */
    T update(T entityBean, String... ignoreProps);

    /**
     * 更新实体
     * 
     * @param entity
     *            实体
     * @return 实体
     */
    T update(T entity);

    
    
    /**
     * 删除实体
     * 
     * @param id
     *            ID
     */
    void delete(ID id);

    /**
     * 删除实体
     * 
     * @param entity
     *            实体
     */
    void delete(T entity);

    /**
     * 删除实体对象集合
     * 
     * @param ids
     *            ID
     */
    @SuppressWarnings("unchecked")
    void deleteList(ID... ids);

    /**
     * 删除实体集合
     * 
     * @param entities
     *            实体集合
     */
    void deleteList(List<T> entities);

}