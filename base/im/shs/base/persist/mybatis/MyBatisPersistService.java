package im.shs.base.persist.mybatis;

import im.shs.base.exception.FrameworkSysException;
import im.shs.base.persist.BatchExecuteCallback;
import im.shs.base.persist.PaginationSupport;

import java.util.List;

public interface MyBatisPersistService {
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
	public abstract List<?> findList(String id, final Object parameterObject);

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
	public abstract List<?> findList(String id, final Object parameterObject,
			int start, int maxRows);

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
	public abstract PaginationSupport<?> findPaginatedResult(String id,
			final Object parameterObject, int start, int maxRows)
			throws FrameworkSysException;

	/**
	 * 通过SQL Mapping工具从映射文件中根据给定的查询名称ID进行查询.并返回映射后的对象结果集
	 * 
	 * @param id
	 *            在SQL Mapping映射文件中定义的查询名称
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * 
	 * @return 返回唯一一条满足条件的结果对象
	 */
	public abstract Object findObject(String id, final Object parameterObject);

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
	public abstract int update(final String id, final Object parameterObject);

	/**
	 * 删除满足条件的记录.
	 * <P>
	 * 通过SQL Mapping工具从映射文件中执行给定ID对应的DELETE SQL语句.
	 * <P>
	 * <STRONG>[注]:此处更新是通过SQL语句直接删除,会有与hibernate的缓存不同步问题.请特别留意.</STRONG>
	 * 
	 * @param id
	 *            在SQL Mapping映射文件中定义的更新语句标识
	 * @param parameterObject
	 *            SQL执行中所需要的参数绑定对象
	 * 
	 * @return 返回成功删除的数据条数
	 */
	public abstract int delete(final String id, final Object parameterObject);

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
	public abstract int batchExecute(BatchExecuteCallback callback);
}
