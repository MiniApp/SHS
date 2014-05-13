/**    
 * Class Name：	
 *			JpaPersistServiceImpl.java
 * Version：	1.1   
 * Date：	2013-8-7       
 * Copyright	
 */
package im.shs.base.persist.jpa;

import im.shs.base.persist.PaginationSupport;
import im.shs.base.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

/**
 * 
 * Class Name： JpaPersistServiceImpl Description： 基于JPA的持久服务实现
 * 
 * @Author： suhao
 * @Date： 2013-8-7 下午6:16:13
 * @version
 * 
 */
@Service("jpaPersistence")
public class JpaPersistServiceImpl implements JpaPersistService {
	protected static final Log logger = LogFactory
			.getLog(JpaPersistServiceImpl.class);
	protected int batchSize = 10;
	@PersistenceContext
	private EntityManager em;

	/**
	 * Method： find
	 * 
	 * Description： 根据给定标识和实体类返回持久化对象的实例，如果没有符合条件的持久化对象实例则返回null
	 * 
	 * @param entityClass
	 *            要加载的实体类
	 * 
	 * @param id
	 *            实体对象在数据表里的主键,该参数的实例类型必须符合对应持久对象的'ID'对应类型,否则无法执行查询
	 * @return 返回符合条件的持久对象
	 * @since
	 */
	@Override
	public <T> T find(Class<T> entityClass, final Object id) {
		return em.find(entityClass, id);
	}

	/**
	 * Method： merge
	 * 
	 * Description： 将给定的对象的状态复制到具有相同标识的持久化对象上
	 * 
	 * @param entity
	 *            要合并的对象
	 * @throws DataAccessException
	 *             当保存数据出现错误时产生
	 * @return T
	 * @since
	 */
	@Override
	public <T> T merge(final T entity) throws DataAccessException {
		return em.merge(entity);
	}

	/**
	 * Method： persist
	 * 
	 * Description： 将一个自由状态（transient）的实例持久化
	 * 
	 * @param objectToSave
	 *            要保存的实体对象实例
	 * @throws DataAccessException
	 *             当保存到数据库发生异常时抛出
	 * @return void
	 * @since
	 */
	@Override
	public void persist(Object objectToSave) throws DataAccessException {
		em.persist(objectToSave);
	}

	/**
	 * Method： remove
	 * 
	 * Description： 从数据库中移除持久化(persistent)对象的实例
	 * 
	 * @param objectToRemove
	 *            要删除的持久对象实例
	 * @throws DataAccessException
	 *             在删除该对象发异常时抛出
	 * @return void
	 * @since
	 */
	@Override
	public void remove(Object objectToRemove) throws DataAccessException {
		em.remove(objectToRemove);
	}

	/**
	 * Method： batchPersist
	 * 
	 * Description： 批量将实体对象插入到数据库中
	 * 
	 * @param objectsToSave
	 *            待插入到数据库的对象集合
	 * @throws DataAccessException
	 *             当保存到数据库中发生异常时抛出
	 * @return void
	 * @since
	 */
	@Override
	public void batchPersist(final List<?> objectsToSave)
			throws DataAccessException {
		if (CollectionUtils.isEmpty(objectsToSave)) {
			return;
		}
		int max = objectsToSave.size();
		for (int i = 0; i < max; i++) {
			em.persist(objectsToSave.get(i));
			if ((i != 0 && i % batchSize == 0) || i == max - 1) {
				em.flush();
			}
		}
	}

	/**
	 * Method： batchMerge
	 * 
	 * Description： 批量将实体对象合并
	 * 
	 * @param objectsToMerge
	 *            待合并的对象集合
	 * @throws DataAccessException
	 *             当更新到数据库中发生异常时抛出
	 * @return void
	 * @since
	 */
	@Override
	public void batchMerge(final List<?> objectsToMerge)
			throws DataAccessException {
		if (CollectionUtils.isEmpty(objectsToMerge)) {
			return;
		}
		int max = objectsToMerge.size();
		for (int i = 0; i < max; i++) {
			em.merge(objectsToMerge.get(i));
			if ((i != 0 && i % batchSize == 0) || i == max - 1) {
				em.flush();
				// em.clear();
			}
		}
		/*
		 * getJpaTemplate().execute(new JpaCallback() {
		 * 
		 * public Object doInJpa(EntityManager em) throws PersistenceException {
		 * int max = objectsToMerge.size(); for (int i = 0; i < max; i++) {
		 * em.merge(objectsToMerge.get(i)); if ((i != 0 && i % batchSize == 0)
		 * || i == max - 1) { em.flush(); // em.clear(); } } return null; }
		 * 
		 * });
		 */
	}

	/**
	 * 
	 * 从数据库里批量删除实体对象
	 * 
	 * @param objectsToRemove
	 *            待删除的对象集合
	 * @throws DataAccessException
	 *             当删除数据库中相应记录发生异常时抛出
	 */
	@Override
	public void batchRemove(final List<?> objectsToRemove)
			throws DataAccessException {
		if (CollectionUtils.isEmpty(objectsToRemove)) {
			return;
		}
		int max = objectsToRemove.size();
		for (int i = 0; i < max; i++) {
			em.refresh(objectsToRemove.get(i));
			em.remove(objectsToRemove.get(i));
			if ((i != 0 && i % batchSize == 0) || i == max - 1) {
				em.flush();
				// em.clear();
			}
		}
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findListByField(final Class<T> entityClass,
			final String field, final Object value) {
		String queryString = buildQueryString(entityClass, field).toString();
		Query query = em.createQuery(queryString);
		query.setParameter(1, value);
		return (List<T>) query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findListByField(final Class<T> entityClass,
			final String field, final Object value, final int start,
			final int maxRows) {
		String queryString = buildQueryString(entityClass, field).toString();
		Query query = em.createQuery(queryString);

		query.setParameter(1, value);

		if (maxRows >= 0) {
			query.setMaxResults(maxRows);
		}
		if (start >= 0) {
			query.setFirstResult(start);
		}

		return query.getResultList();
	}

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
	@SuppressWarnings("unused")
	@Override
	public <T> PaginationSupport<T> findPaginatedByField(Class<T> entityClass,
			String field, Object value, final int start, final int maxRows) {
		int tmpMaxRows = maxRows >= 0 ? maxRows : 0;
		int tmpStart = start >= 0 ? start : 0;

		Integer count = countByField(entityClass, field, value);
		if (count == null || count <= 0) {
			return new PaginationSupport<T>(new ArrayList<T>(0), 0);
		}

		List<T> result = findListByField(entityClass, field, value, start,
				maxRows);

		return new PaginationSupport<T>(result, count);
	}

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
	@SuppressWarnings("serial")
	@Override
	public int countByField(final Class<?> entityClass, final String field,
			final Object value) {
		String queryString = "select count(*) "
				+ buildQueryString(entityClass, field).toString();
		Query query = em.createQuery(queryString);

		query.setParameter(1, value);
		Number result = new Number() {

			@Override
			public long longValue() {
				return 0;
			}

			@Override
			public int intValue() {
				return 0;
			}

			@Override
			public float floatValue() {
				return 0;
			}

			@Override
			public double doubleValue() {
				return 0;
			}
		};
		try {
			result = (Number) query.getSingleResult();
			return result.intValue();
		}
		// 忽略结果集
		catch (EmptyResultDataAccessException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		} catch (EntityNotFoundException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		} catch (NoResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		} catch (NonUniqueResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		}
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> T findObjectByField(final Class<T> entityClass,
			final String field, final Object value) {
		String queryString = buildQueryString(entityClass, field).toString();
		Query query = em.createQuery(queryString);

		query.setParameter(1, value);

		try {
			return (T) query.getSingleResult();
		}
		// 忽略结果集
		catch (EmptyResultDataAccessException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (EntityNotFoundException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NoResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NonUniqueResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		}
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> T findObjectByFields(final Class<T> entityClass,
			final Map<String, ?> params) {
		String queryString = buildQueryStringWithNamedParams(entityClass,
				params).toString();
		Query query = em.createQuery(queryString);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		try {
			return (T) query.getSingleResult();
		}
		// 忽略结果集
		catch (EmptyResultDataAccessException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (EntityNotFoundException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NoResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NonUniqueResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		}
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findListByFields(final Class<T> entityClass,
			final Map<String, ?> params, final int start, final int maxRows) {
		String queryString = buildQueryStringWithNamedParams(entityClass,
				params).toString();
		Query query = em.createQuery(queryString);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		if (maxRows >= 0) {
			query.setMaxResults(maxRows);
		}
		if (start >= 0) {
			query.setFirstResult(start);
		}

		return query.getResultList();
	}

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
	@SuppressWarnings("unused")
	@Override
	public <T> PaginationSupport<T> findPaginatedByFields(Class<T> entityClass,
			Map<String, ?> params, final int start, final int maxRows) {
		int tmpMaxRows = maxRows >= 0 ? maxRows : 0;
		int tmpStart = start >= 0 ? start : 0;

		Integer count = countByFields(entityClass, params);
		if (count == null || count <= 0) {
			return new PaginationSupport<T>(new ArrayList<T>(0), 0);
		}

		List<T> result = findListByFields(entityClass, params, start, maxRows);

		return new PaginationSupport<T>(result, count);
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findListByFields(final Class<T> entityClass,
			final Map<String, ?> params) {
		String queryString = buildQueryStringWithNamedParams(entityClass,
				params).toString();
		Query query = em.createQuery(queryString);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		return query.getResultList();
	}

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
	@Override
	public int countByFields(final Class<?> entityClass,
			final Map<String, ?> params) {
		String queryString = "select count(*) "
				+ buildQueryStringWithNamedParams(entityClass, params)
						.toString();
		Query query = em.createQuery(queryString);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		try {
			return (Integer) query.getSingleResult();
		}
		// 忽略结果集
		catch (EmptyResultDataAccessException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		} catch (EntityNotFoundException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		} catch (NoResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		} catch (NonUniqueResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return (Integer) null;
		}
	}

	/**
	 * 
	 * 从映射文件中根据给定的查询的名称字符串获取一个Query(查询)实例。
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Named Query
	 * 
	 * @param queryName
	 *            已定义的查询名称
	 */
	@Override
	public List<?> findByNamedQuery(String queryName) {
		return ((JpaPersistServiceImpl) em).findByNamedQuery(queryName);
	}

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
	@Override
	public List<?> findByNamedQuery(String queryName, final Object... values) {
		return ((JpaPersistServiceImpl) em).findByNamedQuery(queryName, values);
	}

	/**
	 * 
	 * 从映射文件中根据给定的查询的名称字符串获取一个Query(查询)实例。
	 * <p>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Named Query
	 * 
	 * @param queryName
	 *            在映射文件中定义的查询名称
	 * @param params
	 *            QL中的查询参数值
	 */
	@Override
	public List<?> findByNamedQueryAndNamedParams(String queryName,
			Map<String, ?> params) {
		return ((JpaPersistServiceImpl) em).findByNamedQuery(queryName, params);
	}

	/**
	 * 
	 * 根据传入的Native SQL语句进行查询
	 * <p/>
	 * [注]:该方法是抽象的,并不特指某一OR工具的Native Query
	 * 
	 * @param queryString
	 *            SQL语句串
	 */
	@Override
	public List<?> findByNativeQuery(final String queryString) {
		return em.createNativeQuery(queryString).getResultList();
	}

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
	@Override
	public List<?> findByNativeQuery(final String queryString,
			final Object... values) {
		Query query = em.createNativeQuery(queryString);

		for (int i = 0; i < values.length; i++) {
			query.setParameter(i + 1, values[i]);
		}
		return query.getResultList();
	}

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
	@Override
	public List<?> findByNativeQuery(final String queryString, final int start,
			final int maxRows, final Object... values) {
		Query query = em.createNativeQuery(queryString);

		for (int i = 0; i < values.length; i++) {
			query.setParameter(i + 1, values[i]);
		}

		if (maxRows >= 0) {
			query.setMaxResults(maxRows);
		}
		if (start >= 0) {
			query.setFirstResult(start);
		}

		return query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findByNativeQuery(final Class<T> returnClass,
			final String queryString, final Object... values) {
		Query query = em.createNativeQuery(queryString, returnClass);

		for (int i = 0; i < values.length; i++) {
			query.setParameter(i + 1, values[i]);
		}

		return query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findByNativeQuery(final Class<T> returnClass,
			final String queryString, final int start, final int maxRows,
			final Object... values) {
		Query query = em.createNativeQuery(queryString, returnClass);

		for (int i = 0; i < values.length; i++) {
			query.setParameter(i + 1, values[i]);
		}

		return query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> T findObjectByNativeQuery(final Class<T> returnClass,
			final String queryString, final Object... values) {
		Query query = em.createNativeQuery(queryString, returnClass);

		for (int i = 0; i < values.length; i++) {
			query.setParameter(i + 1, values[i]);
		}

		try {
			return (T) query.getSingleResult();
		}
		// 忽略结果集
		catch (EmptyResultDataAccessException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (EntityNotFoundException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NoResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NonUniqueResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		}
	}

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
	@Override
	public List<?> findByNativeQueryAndNamedParams(final String queryString,
			final Map<String, ?> params) {
		Query query = em.createNativeQuery(queryString);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		return query.getResultList();
	}

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
	@Override
	public List<?> findByNativeQueryAndNamedParams(final String queryString,
			final int start, final int maxRows, final Map<String, ?> params) {
		Query query = em.createNativeQuery(queryString);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		if (maxRows >= 0) {
			query.setMaxResults(maxRows);
		}
		if (start >= 0) {
			query.setFirstResult(start);
		}
		return query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findByNativeQueryAndNamedParams(
			final Class<T> returnClass, final String queryString,
			final Map<String, ?> params) {
		Query query = em.createNativeQuery(queryString, returnClass);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}
		return query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> List<T> findByNativeQueryAndNamedParams(
			final Class<T> returnClass, final String queryString,
			final int start, final int maxRows, final Map<String, ?> params) {
		Query query = em.createNativeQuery(queryString, returnClass);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		if (maxRows >= 0) {
			query.setMaxResults(maxRows);
		}
		if (start >= 0) {
			query.setFirstResult(start);
		}
		return query.getResultList();
	}

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
	@SuppressWarnings("unchecked")
	@Override
	public <T> T findObjectByNativeQueryAndNamedParams(
			final Class<T> returnClass, final String queryString,
			final Map<String, ?> params) {
		Query query = em.createNativeQuery(queryString, returnClass);

		for (Map.Entry<String, ?> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		try {
			return (T) query.getSingleResult();
		}
		// 忽略结果集
		catch (EmptyResultDataAccessException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (EntityNotFoundException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NoResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		} catch (NonUniqueResultException e) {
			logger.warn("No entity found for query. But be ignored.", e);
			return null;
		}
	}

	/**
	 * 构造EJB-QL查询串
	 * 
	 * @param entityClass
	 *            查询的实体类
	 * @param fields
	 *            字段集合
	 * @return 返回构建好的EJB-QL串
	 */
	private StringBuilder buildQueryString(final Class<?> entityClass,
			final String... fields) {
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append("from ").append(entityClass.getName());

		if (fields != null && fields.length > 0) {
			queryBuilder.append(" where ");
			for (String field : fields) {
				queryBuilder.append(field).append(" = ? and ");
			}

			/**
			 * 去除末尾多余的"and"串
			 */
			if (queryBuilder.lastIndexOf(" and ") == (queryBuilder.length() - 5)) {
				queryBuilder.delete(queryBuilder.length() - 5,
						queryBuilder.length());
			}
		}

		return queryBuilder;
	}

	/**
	 * 构造EJB-QL查询串
	 * 
	 * @param entityClass
	 *            查询的实体类
	 * @param fields
	 *            字段集合
	 * @return 返回构建好的EJB-QL串
	 */
	private StringBuilder buildQueryStringWithNamedParams(
			final Class<?> entityClass, final Map<String, ?> params) {
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append("from ").append(entityClass.getName());

		if (!CollectionUtils.isEmpty(params)) {
			queryBuilder.append(" where ");

			for (Map.Entry<String, ?> entry : params.entrySet()) {
				queryBuilder.append(entry.getKey()).append(" = :")
						.append(entry.getKey()).append(" and ");
			}

			/**
			 * 去除末尾多余的"and"串
			 */
			if (queryBuilder.lastIndexOf(" and ") == (queryBuilder.length() - 5)) {
				queryBuilder.delete(queryBuilder.length() - 5,
						queryBuilder.length());
			}
		}

		return queryBuilder;
	}

	public void setBatchSize(int batchSize) {
		this.batchSize = batchSize;
	}

	/**
	 * 清除缓存 非特殊情况不建议使用此方法
	 */
	public void clear() {
		em.clear();
	}

	/**
	 * 强制提交刷新缓存 同步数据库 非特殊情况不建议使用此方法
	 */
	public void flush() {
		em.flush();
	}

	/**
	 * 将持久化对象(persistent)与数据库进行同步
	 * 
	 * @param objectToRefresh
	 */
	public void refresh(Object objectToRefresh) {
		em.refresh(objectToRefresh);
	}
}
