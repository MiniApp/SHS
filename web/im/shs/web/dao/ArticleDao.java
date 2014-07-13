package im.shs.web.dao;

import im.shs.entity.ArticleEntity;

/**
 * @class : ArticleDao
 * @description: 文章
 *
 * @author suhao
 * @date 2014年7月13日 上午1:57:18
 * @version 1.0
 */
public interface ArticleDao extends BaseDao<ArticleEntity, Long> {

    /**
     * 判断别名是否存在（忽略大小写）
     * 
     * @param categoryId
     *            分类ID
     * @param alias
     *            别名
     * @return 别名是否存在
     */
    boolean aliasExists(Long categoryId, String alias);

    /**
     * 根据别名查找文章（忽略大小写）
     * 
     * @param categoryId
     *            分类ID
     * @param alias
     *            别名
     * @return 文章，若不存在则返回null
     */
    ArticleEntity findByAlias(Long categoryId, String alias);

}