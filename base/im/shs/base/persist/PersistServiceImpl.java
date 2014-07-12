package im.shs.base.persist;

import im.shs.base.persist.jpa.JpaPersistService;
import im.shs.base.persist.mybatis.MyBatisPersistService;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("persist")
public class PersistServiceImpl implements PersistService {
	@Resource(name = "mybatisPersistence")
	private MyBatisPersistService mybatisPersistence;

	@Resource(name = "jpaPersistence")
	private JpaPersistService jpaPersistence;

	@Override
	public void batchMerge(List<?> objectsToMerge) {
		jpaPersistence.batchMerge(objectsToMerge);
	}

	@Override
	public void batchPersist(List<?> objectsToSave) {
		jpaPersistence.batchPersist(objectsToSave);
	}

	@Override
	public void batchRemove(List<?> objectsToRemove) {
		jpaPersistence.batchRemove(objectsToRemove);
	}

	@Override
	public int countByField(Class<?> entityClass, String field, Object value) {
		return jpaPersistence.countByField(entityClass, field, value);
	}

	@Override
	public int countByFields(Class<?> entityClass, Map<String, ?> params) {
		return jpaPersistence.countByFields(entityClass, params);
	}

	@Override
	public int deleteBySqlMap(String id, Object parameterObject) {
		return mybatisPersistence.delete(id, parameterObject);
	}

	@Override
	public <T> T find(Class<T> entityClass, Object id) {
		return jpaPersistence.find(entityClass, id);
	}

	@Override
	public <T> List<T> findListByField(Class<T> entityClass, String field,
			Object value) {
		return jpaPersistence.findListByField(entityClass, field, value);
	}

	@Override
	public <T> List<T> findListByField(Class<T> entityClass, String field,
			Object value, int start, int maxRows) {
		return jpaPersistence.findListByField(entityClass, field, value, start,
				maxRows);
	}

	@Override
	public <T> List<T> findListByFields(Class<T> entityClass,
			Map<String, ?> params, int start, int maxRows) {
		return jpaPersistence.findListByFields(entityClass, params, start,
				maxRows);
	}

	@Override
	public <T> List<T> findListByFields(Class<T> entityClass,
			Map<String, ?> params) {
		return jpaPersistence.findListByFields(entityClass, params);
	}

	@Override
	public List<?> findListBySqlMap(String id, Object parameterObject) {
		return mybatisPersistence.findList(id, parameterObject);
	}

	@Override
	public List<?> findListBySqlMap(String id, Object parameterObject,
			int start, int maxRows) {
		return mybatisPersistence.findList(id, parameterObject, start, maxRows);
	}

	@Override
	public <T> T findObjectByField(Class<T> entityClass, String field,
			Object value) {
		return jpaPersistence.findObjectByField(entityClass, field, value);
	}

	@Override
	public <T> T findObjectByFields(Class<T> entityClass, Map<String, ?> params) {
		return jpaPersistence.findObjectByFields(entityClass, params);
	}

	public <T> T findObjectByNativeQuery(Class<T> returnClass,
			String queryString, Object... values) {
		return jpaPersistence.findObjectByNativeQuery(returnClass, queryString,
				values);
	}

	public <T> T findObjectByNativeQueryAndNamedParams(Class<T> returnClass,
			String queryString, Map<String, ?> params) {
		return jpaPersistence.findObjectByNativeQueryAndNamedParams(
				returnClass, queryString, params);
	}

	public Object findObjectBySqlMap(String id, Object parameterObject) {
		return mybatisPersistence.findObject(id, parameterObject);
	}

	public <T> T merge(T entity) {
		return jpaPersistence.merge(entity);
	}

	public void persist(Object objectToSave) {
		jpaPersistence.persist(objectToSave);
	}

	public void remove(Object objectToRemove) {
		jpaPersistence.remove(objectToRemove);
	}

	public int updateBySqlMap(String id, Object parameterObject) {
		return mybatisPersistence.update(id, parameterObject);
	}

	public int batchExecuteBySqlMap(BatchExecuteCallback callback) {
		return mybatisPersistence.batchExecute(callback);
	}

	public PaginationSupport<?> findPaginatedBySqlMap(String id,
			Object parameterObject, int start, int maxRows) {
		return mybatisPersistence.findPaginatedResult(id, parameterObject,
				start, maxRows);
	}

	public <T> PaginationSupport<T> findPaginatedByField(Class<T> entityClass,
			String field, Object value, int start, int maxRows) {
		return jpaPersistence.findPaginatedByField(entityClass, field, value,
				start, maxRows);
	}

	public <T> PaginationSupport<T> findPaginatedByFields(Class<T> entityClass,
			Map<String, ?> params, int start, int maxRows) {
		return jpaPersistence.findPaginatedByFields(entityClass, params, start,
				maxRows);
	}
	
	public List<?> findByNativeQueryAndNamedParams(final String queryString,
			final Map<String, ?> params) {
		return jpaPersistence.findByNativeQueryAndNamedParams(queryString, params);
	}

	/**
	 * 强制提交刷新缓存 同步数据库 非特殊情况不建议使用此方法
	 * 
	 * @author
	 */
	public void flush() {
		jpaPersistence.flush();
	}

	/**
	 * 清除缓存 非特殊情况不建议使用此方法
	 * 
	 * @author
	 */
	public void clear() {
		jpaPersistence.clear();
	}

	/**
	 * 将持久化对象(persistent)与数据库进行同步
	 * 
	 * @param objectToRefresh
	 *            待同步的持久对象
	 * @author
	 */
	public void refresh(Object objectToRefresh) {
		jpaPersistence.refresh(objectToRefresh);
	}

}
