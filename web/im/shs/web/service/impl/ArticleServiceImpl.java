package im.shs.web.service.impl;

import im.shs.web.Filter;
import im.shs.web.dao.ArticleDao;
import im.shs.web.entity.ArticleEntity;
import im.shs.web.service.ArticleService;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * @class : ArticleServiceImpl
 * @description: 文章
 * 
 * @author suhao
 * @date 2014年7月13日 上午2:00:07
 * @version 1.0
 */
@Service("articleServiceImpl")
public class ArticleServiceImpl extends BaseServiceImpl<ArticleEntity, Long>
		implements ArticleService {

	@Resource(name = "articleDaoImpl")
	private ArticleDao articleDao;

	@Resource(name = "articleDaoImpl")
	public void setBaseDao(ArticleDao articleDao) {
		super.setBaseDao(articleDao);
	}

	@Override
	public boolean aliasExists(Long categoryId, String alias) {
		return articleDao.aliasExists(categoryId, alias);
	}

	@Override
	public boolean aliasUnique(Long categoryId, String previousAlias,
			String currentAlias) {
		if (StringUtils.equalsIgnoreCase(previousAlias, currentAlias)) {
			return true;
		} else {
			if (articleDao.aliasExists(categoryId, currentAlias)) {
				return false;
			} else {
				return true;
			}
		}
	}

	@Override
	@Cacheable("article")
	public ArticleEntity findByAlias(Long categoryId, String alias) {
		return articleDao.findByAlias(categoryId, alias);
	}

	@Override
	@Cacheable("article")
	public List<ArticleEntity> findListByCategory(Long categoryId) {
		return findList(Filter.eq("category", categoryId));
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public ArticleEntity save(ArticleEntity article) {
		return super.save(article);
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public ArticleEntity update(ArticleEntity article) {
		return super.update(article);
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public ArticleEntity update(ArticleEntity article,
			String... ignoreProperties) {
		return super.update(article, ignoreProperties);
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public void delete(Long id) {
		super.delete(id);
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public void delete(ArticleEntity article) {
		super.delete(article);
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public void deleteList(Long... ids) {
		super.deleteList(ids);
	}

	@Override
	@CacheEvict(value = { "article", "articleCategory" }, allEntries = true)
	public void deleteList(List<ArticleEntity> articles) {
		super.deleteList(articles);
	}

}