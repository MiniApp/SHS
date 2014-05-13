/**    
 * Class Name：	
 *			MyJpaPersistService.java
 * Version：	1.1   
 * Date：	2013-8-7       
 * Copyright	
 */
package im.shs.base.persist.jpa;

import im.shs.base.persist.PaginationSupport;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

/**    
 *         
 * Class Name：
 *			MyJpaPersistService    
 * Description：    
 *			基于JPA的ORM操作接口
 * @Author：	suhao    
 * @Date：	2013-8-7 下午6:10:03    
 * @version	
 *     
 */
public interface JpaPersistService {
	/**    
	 * Method：	find
	 * 
	 * Description：	
	 *			根据给定标识和实体类返回持久化对象的实例，如果没有符合条件的持久化对象实例则返回null
	 * @param  	entityClass
	 *			要加载的实体类
	 *
	 * @param  	id
	 *			实体对象在数据表里的主键,该参数的实例类型必须符合对应持久对象的'ID'对应类型,否则无法执行查询
	 * @return	返回符合条件的持久对象
	 * @since   
	 */
	public <T> T find(Class<T> entityClass, final Object id);
	
	/**    
	 * Method：	merge
	 * 
	 * Description：	
	 *			将给定的对象的状态复制到具有相同标识的持久化对象上
	 * @param  	entity
	 *			要合并的对象 
	 * @throws 	DataAccessException
	 *          当保存数据出现错误时产生
	 * @return	T
	 * @since   
	 */
	public abstract <T> T merge(final T entity);
	
	/**    
	 * Method：	persist
	 * 
	 * Description：	
	 *			将一个自由状态（transient）的实例持久化
	 * @param  	objectToSave
	 *			要保存的实体对象实例
	 * @throws 	DataAccessException
	 *          当保存到数据库发生异常时抛出
	 * @return	void
	 * @since   
	 */
	public abstract void persist(Object objectToSave);
	
	/**    
	 * Method：	remove
	 *
	 * Description：	
	 *			从数据库中移除持久化(persistent)对象的实例
	 * @param  	objectToRemove
	 *			要删除的持久对象实例
	 * @throws 	DataAccessException
	 *          在删除该对象发异常时抛出
	 * @return	void  
	 * @since   
	 */
	public abstract void remove(final Object objectToRemove);

	/**    
	 * Method：	batchPersist
	 *
	 * Description：	
	 *			批量将实体对象插入到数据库中
	 * @param  	objectsToSave
	 *			待插入到数据库的对象集合
	 * @throws 	DataAccessException
	 *          当保存到数据库中发生异常时抛出
	 * @return	void
	 * @since   
	 */
	public abstract void batchPersist(final List<?> objectsToSave);

	/**    
	 * Method：	batchMerge
	 *
	 * Description：	
	 *			批量将实体对象合并
	 * @param  	objectsToMerge
	 *			待合并的对象集合
	 * @throws 	DataAccessException
	 *          当更新到数据库中发生异常时抛出
	 * @return	void
	 * @since   
	 */
	public abstract void batchMerge(final List<?> objectsToMerge);

	/**
	 * 
	 * 从数据库里批量删除实体对象
	 * 
	 * @param objectsToRemove
	 *            待删除的对象集合
	 * @throws DataAccessException
	 *             当删除数据库中相应记录发生异常时抛出
	 */
	public abstract void batchRemove(final List<?> objectsToRemove);

	/**
	 * 
	 * 根据给定字段条件进行查询,返回所有满足条件的结果集
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param field
	 *            查询条件中的字段名
	 * @param value
	 *            查询条件中对应字段的值
	 * 
	 * @return 查询结果集合
	 */
	public abstract <T> List<T> findListByField(Class<T> entityClass, String field, Object value);

	/**
	 * 
	 * 根据给定字段条件进行查询,返回所有满足条件的结果集
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param field
	 *            查询条件中的字段名
	 * @param value
	 *            查询条件中对应字段的值
	 * @param start
	 *            返回查询结果集的起始位置
	 * @param maxRows
	 *            返回查询结果集最大记录数
	 * 
	 * @return 查询结果集合
	 */
	public abstract <T> List<T> findListByField(Class<T> entityClass, String field, Object value, final int start, final int maxRows);

	/**
	 * 
	 * 根据给定字段条件进行查询,返回所有满足条件的分页结果对象
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param field
	 *            查询条件中的字段名
	 * @param value
	 *            查询条件中对应字段的值
	 * @param start
	 *            返回查询结果集的起始位置
	 * @param maxRows
	 *            返回查询结果集最大记录数
	 * 
	 * @return 分页结果对象
	 */
	public abstract <T> PaginationSupport<T> findPaginatedByField(Class<T> entityClass, String field, Object value, final int start, final int maxRows);

	/**
	 * 
	 * 根据给定字段条件进行查询,返回所有满足条件的结果总数
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param field
	 *            查询条件中的字段名
	 * @param value
	 *            查询条件中对应字段的值
	 * 
	 * @return 查询结果总数
	 */
	public abstract int countByField(Class<?> entityClass, String field, Object value);

	/**
	 * 
	 * 根据给定字段条件进行查询,返回所有唯一满足条件的记录
	 * <p/>
	 * [注]:如果查询结果集中有多个实体满足条件,则抛出运行期异常.
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param field
	 *            查询条件中的字段名
	 * @param value
	 *            查询条件中对应字段的值
	 * 
	 * @return 唯一的查询结果记录
	 */
	public abstract <T> T findObjectByField(Class<T> entityClass, String field, Object value);

	/**
	 * 
	 * 根据给定字段过滤条件进行查询,返回唯一满足条件的实体对象
	 * <p>
	 * [注]:如果查询结果集中有多个实体满足条件,则抛出运行期异常.
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param filter
	 *            查询条件字段-值MAP
	 * 
	 * @return 成功找到的结果对象
	 */
	public abstract <T> T findObjectByFields(Class<T> entityClass, Map<String, ?> params);

	/**
	 * 
	 * 根据给定字段过滤条件进行查询,返回给定范围内满足条件的实体集合
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param params
	 *            查询条件字段-值MAP
	 * @param start
	 *            获取的结果集起始位置
	 * @param maxRows
	 *            获取的最大结果集总数
	 * 
	 * @return 已分好页的查询结果
	 */
	public abstract <T> List<T> findListByFields(Class<T> entityClass, Map<String, ?> params, final int start, final int maxRows);

	/**
	 * 
	 * 根据给定字段过滤条件进行查询,返回给定范围内满足条件的分页对象
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param params
	 *            查询条件字段-值MAP
	 * @param start
	 *            获取的结果集起始位置
	 * @param maxRows
	 *            获取的最大结果集总数
	 * 
	 * @return 已分好页的分页结果对象
	 */
	public abstract <T> PaginationSupport<T> findPaginatedByFields(Class<T> entityClass, Map<String, ?> params, final int start, final int maxRows);

	/**
	 * 
	 * 根据给定字段过滤条件进行查询,返回所有满足条件的实体集合
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param params
	 *            查询条件字段-值MAP
	 * @return 查询结果
	 */
	public abstract <T> List<T> findListByFields(Class<T> entityClass, Map<String, ?> params);

	/**
	 * 
	 * 根据给定实体属性过滤条件进行查询,返回所有满足条件的实体总数
	 * 
	 * @param entityClass
	 *            要查询的实体类
	 * @param params
	 *            查询条件字段-值MAP
	 * @return 统计结果
	 */
	public abstract int countByFields(Class<?> entityClass, Map<String, ?> params);

	/**
	 * 
	 * 从映射文件中根据给定的查询的名称字符串获取一个Query(查询)实例。
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Named Query
	 * 
	 * @param queryName
	 *            已定义的查询名称
	 */
	public abstract List<?> findByNamedQuery(String queryName);

	/**
	 * 
	 * 从映射文件中根据给定的查询的名称字符串获取一个Query(查询)实例。
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Named Query
	 * 
	 * @param queryName
	 *            已定义的查询名称
	 * @param values
	 *            QL中的查询参数值
	 */
	public abstract List<?> findByNamedQuery(String queryName, final Object... values);

	/**
	 * 
	 * 从映射文件中根据给定的查询的名称字符串获取一个Query(查询)实例。
	 * <p>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Named Query
	 * 
	 * @param name
	 *            在映射文件中定义的查询名称
	 * @param params
	 *            QL中的查询参数值
	 */
	public abstract List<?> findByNamedQueryAndNamedParams(String name, Map<String, ?> params);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param queryString
	 *            SQL语句串
	 */
	public abstract List<?> findByNativeQuery(String queryString);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param queryString
	 *            SQL语句串
	 * @param values
	 *            查询语句中的参数值
	 */
	public abstract List<?> findByNativeQuery(String queryString, final Object... values);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询，并返回指定范围的结果集
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param queryString
	 *            SQL语句串
	 * @param values
	 *            查询语句中的参数值
	 * @param start
	 *            查询起始行数
	 * @param maxRows
	 *            返回的最大行数
	 * @return 返回满足条件的实体集合
	 */
	public abstract List<?> findByNativeQuery(String queryString, int start, int maxRows, final Object... values);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param returnClass
	 *            要返回的实体类型
	 * @param queryString
	 *            SQL语句串
	 * @param values
	 *            查询语句中的参数值
	 * @return 返回满足条件的结果集
	 */
	public abstract <T> List<T> findByNativeQuery(Class<T> returnClass, String queryString, final Object... values);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询，并返回指定范围的结果集
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param returnClass
	 *            要返回的实体类型
	 * @param queryString
	 *            SQL语句串
	 * @param values
	 *            查询语句中的参数值
	 * @param start
	 *            查询起始行数
	 * @param maxRows
	 *            返回的最大行数
	 * @return 返回满足条件的实体集合
	 */
	public abstract <T> List<T> findByNativeQuery(Class<T> returnClass, String queryString, int start, int maxRows, final Object... values);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param returnClass
	 *            要返回的实体类型
	 * @param queryString
	 *            SQL语句串
	 * @param values
	 *            查询语句中的参数值
	 * 
	 * @return 返回唯一满足条件的实体
	 */
	public abstract <T> T findObjectByNativeQuery(Class<T> returnClass, String queryString, final Object... values);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param queryString
	 *            SQL语句串
	 * @param params
	 *            查询语句中的参数值集合
	 */
	public abstract List<?> findByNativeQueryAndNamedParams(String queryString, final Map<String, ?> params);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询，并返回指定范围的结果集
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param queryString
	 *            SQL语句串
	 * @param params
	 *            查询语句中的参数值集合
	 * @param start
	 *            查询起始行数
	 * @param maxRows
	 *            返回的最大行数
	 * @return 返回满足条件的实体集合
	 */
	public abstract List<?> findByNativeQueryAndNamedParams(String queryString, int start, int maxRows, final Map<String, ?> params);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param returnClass
	 *            要返回的实体类型
	 * @param queryString
	 *            SQL语句串
	 * @param params
	 *            查询语句中的参数
	 */
	public abstract <T> List<T> findByNativeQueryAndNamedParams(Class<T> returnClass, String queryString, final Map<String, ?> params);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询，并返回指定范围的结果集
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param returnClass
	 *            要返回的实体类型
	 * @param queryString
	 *            SQL语句串
	 * @param params
	 *            查询语句中的参数
	 * @param start
	 *            查询起始行数
	 * @param maxRows
	 *            返回的最大行数
	 * @return 返回满足条件的实体集合
	 */
	public abstract <T> List<T> findByNativeQueryAndNamedParams(Class<T> returnClass, String queryString, int start, int maxRows, final Map<String, ?> params);

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询，返回唯一的结果对象
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param returnClass
	 *            要返回的实体类型
	 * @param queryString
	 *            SQL语句串
	 * @param params
	 *            查询语句中的参数
	 * @return 唯一满足条件的实体
	 */
	public abstract <T> T findObjectByNativeQueryAndNamedParams(Class<T> returnClass, String queryString, final Map<String, ?> params);

	/**
	 * 强制提交刷新缓存 同步数据库 非特殊情况不建议使用此方法
	 * 
	 * @author 
	 */
	public abstract void flush();

	/**
	 * 清除缓存 非特殊情况不建议使用此方法
	 * 
	 * @author 
	 */
	public abstract void clear();

	/**
	 * 将持久化对象(persistent)与数据库进行同步
	 * 
	 * @param objectToRefresh
	 *            待同步的持久对象
	 * @author 
	 */
	public abstract void refresh(Object objectToRefresh);
}
