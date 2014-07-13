package im.shs.web.dao;

import im.shs.entity.ArticleCategoryEntity;

/**
 * @class : ArticleCategoryDao
 * @description: 文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:52:16
 * @version 1.0
 */
public interface ArticleCategoryDao extends BaseDao<ArticleCategoryEntity, Long> {

    /**
     * 判断名称是否存在（忽略大小写）
     * 
     * @param parentId
     *            上级ID
     * @param name
     *            名称
     * @return 名称是否存在
     */
    boolean nameExists(Long parentId, String name);

    /**
     * 判断别名是否存在（忽略大小写）
     * 
     * @param parentId
     *            上级ID
     * @param alias
     *            别名
     * @return 别名是否存在
     */
    boolean aliasExists(Long parentId, String alias);

    /**
     * 根据别名查找文章分类（忽略大小写）
     * 
     * @param parentId
     *            上级ID
     * @param alias
     *            别名
     * @return 文章分类，若不存在则返回null
     */
    ArticleCategoryEntity findByAlias(Long parentId, String alias);

}