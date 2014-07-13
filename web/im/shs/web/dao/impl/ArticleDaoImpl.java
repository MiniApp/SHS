package im.shs.web.dao.impl;

import im.shs.entity.ArticleEntity;
import im.shs.web.dao.ArticleDao;

import javax.persistence.FlushModeType;
import javax.persistence.NoResultException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

/**
 * @class : ArticleDaoImpl
 * @description: 文章
 *
 * @author suhao
 * @date 2014年7月13日 上午1:59:26
 * @version 1.0
 */
@Repository("articleDaoImpl")
public class ArticleDaoImpl extends BaseDaoImpl<ArticleEntity, Long> implements ArticleDao {

    @Override
    public boolean aliasExists(Long categoryId, String alias) {
        if (StringUtils.isBlank(alias)) {
            return false;
        }

        String jpql = null;
        Long count = null;

        if (categoryId != null) {
            jpql = "select count(*) from ArticleEntity articles where articles.category.id = :categoryId and lower(articles.alias) = lower(:alias)";
            count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("categoryId", categoryId).setParameter("alias", alias).getSingleResult();
        } else {
            jpql = "select count(*) from ArticleEntity articles where articles.category is null and lower(articles.alias) = lower(:alias)";
            count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("alias", alias).getSingleResult();
        }

        return count > 0;
    }

    @Override
    public ArticleEntity findByAlias(Long categoryId, String alias) {
        if (StringUtils.isBlank(alias)) {
            return null;
        }
        try {
            if (categoryId != null) {
                String jpql = "select articles from ArticleEntity articles where articles.category.id = :categoryId and lower(articles.alias) = lower(:alias)";
                return entityManager.createQuery(jpql, ArticleEntity.class).setFlushMode(FlushModeType.COMMIT)
                        .setParameter("categoryId", categoryId).setParameter("alias", alias).getSingleResult();
            } else {
                String jpql = "select articles from ArticleEntity articles where articles.category is null and lower(articles.alias) = lower(:alias)";
                return entityManager.createQuery(jpql, ArticleEntity.class).setFlushMode(FlushModeType.COMMIT)
                        .setParameter("alias", alias).getSingleResult();
            }
        } catch (NoResultException e) {
            return null;
        }
    }

}