package im.shs.base.persist;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

public interface PersistService {


	
	/**
	 * 根据给定标识和实体类返回持久化对象的实例，如果没有符合条件的持久化对象实例则返回null。
	 * 
	 * @param entityClass
	 *            要加载的实体类
	 * @param id
	 *            实体对象在数据表里的主键,该参数的实例类型必须符合对应持久对象的'ID'对应类型,否则无法执行查询.
	 * 
	 * @return 返回符合条件的持久对象
	 */
	public abstract <T> T find(Class<T> entityClass, final Object id);

	/**
	 * 将给定的对象的状态复制到具有相同标识的持久化对象上。
	 * 
	 * @param entity
	 *            要合并的对象
	 * @throws DataAccessException
	 *             当保存数据出现错误时产生
	 */
	public abstract <T> T merge(final T entity);

	/**
	 * 将一个自由状态（transient）的实例持久化。
	 * 
	 * @param objectToSave
	 *            要保存的实体对象实例
	 * @throws DataAccessException
	 *             当保存到数据库发生异常时抛出
	 */
	public abstract void persist(Object objectToSave);

	/**
	 * 
	 * 从数据库中移除持久化(persistent)对象的实例。
	 * 
	 * @param objectToRemove
	 *            要删除的持久对象实例
	 * @throws DataAccessException
	 *             在删除该对象发异常时抛出
	 */
	public abstract void remove(final Object objectToRemove);

	/**
	 * 
	 * 批量将实体对象插入到数据库中
	 * 
	 * @param objectsToSave
	 *            待插入到数据库的对象集合
	 * @throws DataAccessException
	 *             当保存到数据库中发生异常时抛出
	 * 
	 */
	public abstract void batchPersist(final List<?> objectsToSave);

	/**
	 * 
	 * 批量将实体对象合并
	 * 
	 * @param objectsToMerge
	 *            待合并的对象集合
	 * @throws DataAccessException
	 *             当更新到数据库中发生异常时抛出
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
	 * 强制提交刷新缓存 同步数据库 非特殊情况不建议使用此方法
	 * 
	 * @author Ganhua
	 */
	public abstract void flush();

	/**
	 * 清除缓存 非特殊情况不建议使用此方法
	 * 
	 * @author Ganhua
	 */
	public abstract void clear();

	/**
	 * 将持久化对象(persistent)与数据库进行同步
	 * 
	 * @param objectToRefresh
	 *            待同步的持久对象
	 * @author Ganhua
	 */
	public abstract void refresh(Object objectToRefresh);

	/**
	 * 通过SQL Mapping工具从映射文件中根据给定的查询名称ID进行查询.并返回映射后的对象结果集
	 * 
	 * @param name
	 *            在SQL Mapping映射文件中定义的查询名称
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * 
	 * @return 满足条件的对象集合
	 */
	public abstract List<?> findListBySqlMap(String id, final Object parameterObject);

	/**
	 * 通过SQL Mapping工具从映射文件中根据给定的查询名称ID进行查询.并返回映射后的对象结果集
	 * 
	 * @param id
	 *            在SQL Mapping映射文件中定义的查询名称
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * @param start
	 *            查询的起始行数
	 * @param maxRows
	 *            返回的最大行数
	 * 
	 * @return 返回分好页的对象结果集
	 */
	public abstract List<?> findListBySqlMap(String id, final Object parameterObject, int start, int maxRows);

	/**
	 * 通过SQL Mapping工具从映射文件中根据给定的查询名称ID进行查询.并返回映射后的分页结果对象
	 * 
	 * @param id
	 *            在SQL Mapping映射文件中定义的查询名称
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * @param start
	 *            查询的起始行数
	 * @param maxRows
	 *            返回的最大行数
	 * 
	 * @return 返回分页结果对象
	 */
	public abstract PaginationSupport<?> findPaginatedBySqlMap(String id, final Object parameterObject, int start, int maxRows);


	/**
	 * 通过SQL Mapping执行更新操作. 通过SQL Mapping工具从映射文件中执行给定ID对应的UPDATE SQL语句.
	 * <P>
	 * <STRONG>[注]:此处更新是通过SQL语句直接更新,会有与Hibernate的缓存不同步问题.请特别留意.</STRONG>
	 * 
	 * @param id
	 *            在SQL Mapping映射文件中定义的更新语句标识
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * 
	 * @return 返回更新数据记录数
	 */
	public abstract int updateBySqlMap(final String id, final Object parameterObject);

	/**
	 * 删除满足条件的记录.
	 * <P/>
	 * 通过SQL Mapping工具从映射文件中执行给定ID对应的DELETE SQL语句.
	 * <P/>
	 * <STRONG>[注]:此处更新是通过SQL语句直接删除,会有与hibernate的缓存不同步问题.请特别留意.</STRONG>
	 * 
	 * @param id
	 *            在SQL Mapping映射文件中定义的更新语句标识
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * 
	 * @return 返回成功删除的数据条数
	 */
	public abstract int deleteBySqlMap(final String id, final Object parameterObject);

	/**
	 * 批量执行SQL
	 * <P/>
	 * 通过本方法完成批量SQL提交，以提升SQL执行效率。 在<code>BatchExecuteCallback#doInBatch()</code>
	 * 方法中所有与SqlMap有关的数据操作均会被延迟到最后统一执行。 且保证所有操作均在同一事务中进行.
	 * 
	 * @param callback
	 *            具体SQL执行逻辑回调
	 * @return 返回成功影响的数据总条数
	 * @throws BatchDataAccessException
	 *             如果有任一个缓存中的SQL语句执行失败时抛出异常。
	 */
	public abstract int batchExecuteBySqlMap(BatchExecuteCallback callback);
}
