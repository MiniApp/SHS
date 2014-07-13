package im.shs.web.dao;

import im.shs.Filter;
import im.shs.Order;
import im.shs.Page;
import im.shs.Pageable;

import java.io.Serializable;
import java.util.List;

import javax.persistence.LockModeType;

/**
 * @class : BaseDao
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:52:51
 * @version 1.0
 */
public interface BaseDao<T, ID extends Serializable> {

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
     * @param id
     *            ID
     * @param lockModeType
     *            锁定方式
     * @return 实体对象，不存在时返回NULL
     */
    T find(ID id, LockModeType lockModeType);

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
     * 查询实体对象数量
     * 
     * @param filters
     *            筛选
     * @return 实体对象数量
     */
    long count(List<Filter> filters);

    /**
     * 持久化实体对象
     * 
     * @param entity
     *            实体对象
     */
    void persist(T entity);

    /**
     * 合并实体对象
     * 
     * @param entity
     *            实体对象
     * @return 实体对象
     */
    T merge(T entity);

    /**
     * 移除实体对象
     * 
     * @param entity
     *            实体对象
     */
    void remove(T entity);

    /**
     * 刷新实体对象
     * 
     * @param entity
     *            实体对象
     */
    void refresh(T entity);

    /**
     * 刷新实体对象
     * 
     * @param entity
     *            实体对象
     * @param lockModeType
     *            锁定方式
     */
    void refresh(T entity, LockModeType lockModeType);

    /**
     * 获取实体对象ID
     * 
     * @param entity
     *            实体对象
     * @return 实体对象ID
     */
    ID getIdentifier(T entity);

    /**
     * 判断是否为托管状态
     * 
     * @param entity
     *            实体对象
     * @return 是否为托管状态
     */
    boolean managed(T entity);

    /**
     * 设置为游离状态
     * 
     * @param entity
     *            实体对象
     */
    void detach(T entity);

    /**
     * 锁定实体对象
     * 
     * @param entity
     *            实体对象
     * @param lockModeType
     *            锁定方式
     */
    void lock(T entity, LockModeType lockModeType);

    /**
     * 清除缓存
     */
    void clear();

    /**
     * 同步数据
     */
    void flush();

}