package im.shs.web.service.impl;

import im.shs.web.Filter;
import im.shs.web.dao.ArticleCategoryDao;
import im.shs.web.entity.ArticleCategoryEntity;
import im.shs.web.service.ArticleCategoryService;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

/**
 * @class : ArticleCategoryServiceImpl
 * @description: 文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午2:00:19
 * @version 1.0
 */
@Service("articleCategoryServiceImpl")
public class ArticleCategoryServiceImpl extends BaseServiceImpl<ArticleCategoryEntity, Long> implements
        ArticleCategoryService {

    @Resource(name = "articleCategoryDaoImpl")
    private ArticleCategoryDao articleCategoryDao;

    @Resource(name = "articleCategoryDaoImpl")
    public void setBaseDao(ArticleCategoryDao articleCategoryDao) {
        super.setBaseDao(articleCategoryDao);
    }

    @Override
    public boolean nameExists(Long parentId, String name) {
        return articleCategoryDao.nameExists(parentId, name);
    }

    @Override
    public boolean nameUnique(Long parentId, String previousName, String currentName) {
        if (StringUtils.equalsIgnoreCase(previousName, currentName)) {
            return true;
        } else {
            if (articleCategoryDao.nameExists(parentId, currentName)) {
                return false;
            } else {
                return true;
            }
        }
    }

    @Override
    public boolean aliasExists(Long parentId, String alias) {
        return articleCategoryDao.aliasExists(parentId, alias);
    }

    @Override
    public boolean aliasUnique(Long parentId, String previousAlias, String currentAlias) {
        if (StringUtils.equalsIgnoreCase(previousAlias, currentAlias)) {
            return true;
        } else {
            if (articleCategoryDao.aliasExists(parentId, currentAlias)) {
                return false;
            } else {
                return true;
            }
        }
    }

    @Override
    // @Cacheable("articleCategory")
    public ArticleCategoryEntity findByAlias(Long parentId, String alias) {
        return articleCategoryDao.findByAlias(parentId, alias);
    }

    @Override
    // @Cacheable("articleCategory")
    public List<ArticleCategoryEntity> findRoots() {
        return findList(Filter.isNull("parent"));
    }

    @Override
    // @Cacheable("articleCategory")
    public List<ArticleCategoryEntity> findChildren(Long parentId) {
        return findChildren(null, parentId);
    }

    @Override
    // @Cacheable("articleCategory")
    public List<ArticleCategoryEntity> findChildren(Integer count, Long parentId) {
        return findList(count, Filter.eq("parent", parentId));
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public ArticleCategoryEntity save(ArticleCategoryEntity articleCategory) {
        return super.save(articleCategory);
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public ArticleCategoryEntity update(ArticleCategoryEntity articleCategory) {
        return super.update(articleCategory);
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public ArticleCategoryEntity update(ArticleCategoryEntity articleCategory, String... ignoreProperties) {
        return super.update(articleCategory, ignoreProperties);
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public void delete(ArticleCategoryEntity articleCategory) {
        super.delete(articleCategory);
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public void deleteList(Long... ids) {
        super.deleteList(ids);
    }

    @Override
    @CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
    public void deleteList(List<ArticleCategoryEntity> articleCategories) {
        super.deleteList(articleCategories);
    }

}