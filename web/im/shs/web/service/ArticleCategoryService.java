package im.shs.web.service;

import im.shs.web.entity.ArticleCategoryEntity;

import java.util.List;

/**
 * @class : ArticleCategoryService
 * @description: 文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:09:41
 * @version 1.0
 */
public interface ArticleCategoryService extends BaseService<ArticleCategoryEntity, Long> {

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
     * 判断名称是否唯一（忽略大小写）
     * 
     * @param parentId
     *            上级ID
     * @param previousName
     *            修改前名称
     * @param currentName
     *            当前名称
     * @return 名称是否唯一
     */
    boolean nameUnique(Long parentId, String previousName, String currentName);

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
     * 判断别名是否唯一（忽略大小写）
     * 
     * @param parentId
     *            上级ID
     * @param previousAlias
     *            修改前别名
     * @param currentAlias
     *            当前别名
     * @return 别名是否唯一
     */
    boolean aliasUnique(Long parentId, String previousAlias, String currentAlias);

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

    /**
     * 查找顶级文章分类集合
     * 
     * @return 文章分类集合
     */
    List<ArticleCategoryEntity> findRoots();

    /**
     * 查找下级文章分类集合
     * 
     * @param parentId
     *            上级ID
     * @return 下级文章分类集合
     */
    List<ArticleCategoryEntity> findChildren(Long parentId);

    /**
     * 查找下级文章分类集合
     * 
     * @param count
     *            数量
     * @param parentId
     *            上级ID
     * @return 下级文章分类集合
     */
    List<ArticleCategoryEntity> findChildren(Integer count, Long parentId);

}