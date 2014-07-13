package im.shs.web.dao.impl;

import im.shs.entity.ArticleCategoryEntity;
import im.shs.web.dao.ArticleCategoryDao;

import javax.persistence.FlushModeType;
import javax.persistence.NoResultException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

/**
 * @class : ArticleCategoryDaoImpl
 * @description: 文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:59:44
 * @version 1.0
 */
@Repository("articleCategoryDaoImpl")
public class ArticleCategoryDaoImpl extends BaseDaoImpl<ArticleCategoryEntity, Long> implements ArticleCategoryDao {

    @Override
    public boolean nameExists(Long parentId, String name) {
        if (StringUtils.isBlank(name)) {
            return false;
        }

        String jpql = null;
        Long count = null;

        if (parentId != null) {
            jpql = "select count(*) from ArticleCategoryEntity articleCategorys where articleCategorys.parent.id = :parentId and lower(articleCategorys.name) = lower(:name)";
            count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("parentId", parentId).setParameter("name", name).getSingleResult();
        } else {
            jpql = "select count(*) from ArticleCategoryEntity articleCategorys where articleCategorys.parent is null and lower(articleCategorys.name) = lower(:name)";
            count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("name", name).getSingleResult();
        }

        return count > 0;
    }

    @Override
    public boolean aliasExists(Long parentId, String alias) {
        if (StringUtils.isBlank(alias)) {
            return false;
        }

        String jpql = null;
        Long count = null;

        if (parentId != null) {
            jpql = "select count(*) from ArticleCategoryEntity articleCategorys where articleCategorys.parent.id = :parentId and lower(articleCategorys.alias) = lower(:alias)";
            count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("parentId", parentId).setParameter("alias", alias).getSingleResult();
        } else {
            jpql = "select count(*) from ArticleCategoryEntity articleCategorys where articleCategorys.parent is null and lower(articleCategorys.alias) = lower(:alias)";
            count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("alias", alias).getSingleResult();
        }

        return count > 0;
    }

    @Override
    public ArticleCategoryEntity findByAlias(Long parentId, String alias) {
        if (StringUtils.isBlank(alias)) {
            return null;
        }
        try {
            if (parentId != null) {
                String jpql = "select articleCategorys from ArticleCategoryEntity articleCategorys where articleCategorys.parent.id = :parentId and lower(articleCategorys.alias) = lower(:alias)";
                return entityManager.createQuery(jpql, ArticleCategoryEntity.class).setFlushMode(FlushModeType.COMMIT)
                        .setParameter("parentId", parentId).setParameter("alias", alias).getSingleResult();
            } else {
                String jpql = "select articleCategorys from ArticleCategoryEntity articleCategorys where articleCategorys.parent is null and lower(articleCategorys.alias) = lower(:alias)";
                return entityManager.createQuery(jpql, ArticleCategoryEntity.class).setFlushMode(FlushModeType.COMMIT)
                        .setParameter("alias", alias).getSingleResult();
            }
        } catch (NoResultException e) {
            return null;
        }
    }

}