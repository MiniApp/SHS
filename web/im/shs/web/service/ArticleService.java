package im.shs.web.service;

import im.shs.web.entity.ArticleEntity;

import java.util.List;

/**
 * @class : ArticleService
 * @description: 文章
 *
 * @author suhao
 * @date 2014年7月13日 上午1:55:48
 * @version 1.0
 */
public interface ArticleService extends BaseService<ArticleEntity, Long> {

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
     * 判断别名是否唯一（忽略大小写）
     * 
     * @param categoryId
     *            分类ID
     * @param previousAlias
     *            修改前别名
     * @param currentAlias
     *            当前别名
     * @return 别名是否唯一
     */
    boolean aliasUnique(Long categoryId, String previousAlias, String currentAlias);

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

    /**
     * 根据分类查找文章集合
     * 
     * @param categoryId
     *            分类ID
     * @return 文章集合
     */
    List<ArticleEntity> findListByCategory(Long categoryId);

}