package im.shs.base.persist.mybatis;

import im.shs.base.exception.FrameworkSysException;
import im.shs.base.persist.BatchExecuteCallback;
import im.shs.base.persist.PaginationSupport;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

/**    
 *         
 * Class Name：
 *			MyBatisPersistServiceImpl    
 * Description：    
 *			描述
 * @Author：	suhao    
 * @Date：	2013-8-28 下午2:54:32    
 * @version	
 *     
 */
@Service("mybatisPersistence")
public class MyBatisPersistServiceImpl implements MyBatisPersistService {
    @Resource(name = "sqlSession")
    private SqlSessionTemplate sqlSession;

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
    @Override
    public List<?> findList(String id, Object parameterObject) {
        return sqlSession.selectList(id, parameterObject);
    }

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
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public List<?> findList(String id, final Object parameterObject, int start, int maxRows) {
        Map params = new HashMap();
        params.put("startRow", new Integer(start));
        params.put("endRow", new Integer(maxRows));
        //return sqlSession.selectList(id, params, new RowBounds(start, maxRows));
        return sqlSession.selectList(id, params);
    }

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
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public PaginationSupport<?> findPaginatedResult(String id, final Object parameterObject, int start, int maxRows) {
        Assert.isTrue(maxRows != 0, "传入的结果返回数'maxRows'参数不允许为0.");
        Assert.hasText(id, "传入的SQL配置ID不能为空.");

        Integer count = null;

        try {
            count = (Integer) sqlSession.selectOne(id + "_COUNT", parameterObject);
        } catch (Exception e) {
            String msg = "配置文件中不存在COUNT语句或发生其它例外,无法执行总数统计. SqlMap id:" + id;
            // logger.warn(msg, e);
            throw new FrameworkSysException(msg, id, e);
        }

        int tmpOffset = (start < 0 ? 0 : start);
        int tmpMaxRows = (maxRows <= 0 ? 1 : maxRows);

        if (count == null || count.intValue() <= 0) {
            // logger.trace("执行COUNT后,返回的结果数为0,表示该SQL执行无结果数据返回.因此提前终止其数据查询并立即返回空集.");
            // return new PaginationSupport(new LinkedList(), 0, tmpMaxRows,
            // tmpOffset);//tmpMaxRows tmpOffset 暂时无用 先注释掉
            return new PaginationSupport(new LinkedList(), 0);
        }

        try {
            if (id.endsWith("_FORCE")) {
                IBatisExecuteContextUtil.setIsForced(Boolean.TRUE);
            }
            List<?> resultList = sqlSession.selectList(id, parameterObject, new RowBounds(tmpOffset, tmpMaxRows));

            return new PaginationSupport(resultList, count.intValue());
        } finally {
            IBatisExecuteContextUtil.setIsForced(Boolean.FALSE);
        }
    }

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
    public Object findObject(String id, final Object parameterObject) {
        return sqlSession.selectOne(id, parameterObject);
    }

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
    public int update(final String id, final Object parameterObject) {
        return sqlSession.update(id, parameterObject);
    }

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
    public int delete(final String id, final Object parameterObject) {
        return sqlSession.delete(id, parameterObject);
    }

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
    public int batchExecute(final BatchExecuteCallback callback) {
        try {
            return (Integer) sqlSession.flushStatements().size();
        } catch (Exception e) {
            // logger.error("通过SqlMap批量执行数据操作时发生异常.",e);
            throw new FrameworkSysException("FS208", e);
        }
    }
}
