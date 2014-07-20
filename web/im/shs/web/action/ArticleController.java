package im.shs.web.action;

import im.shs.web.entity.ArticleCategoryEntity;
import im.shs.web.entity.ArticleEntity;
import im.shs.web.service.ArticleCategoryService;
import im.shs.web.service.ArticleService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @class : ArticleController
 * @description: 文章
 *
 * @author suhao
 * @date 2014年7月20日 下午1:28:14
 * @version 1.0
 */
@Controller("articleController")
@RequestMapping("/article")
public class ArticleController extends BaseController {

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/article";

    @Resource(name = "articleServiceImpl")
    private ArticleService articleService;

    @Resource(name = "articleCategoryServiceImpl")
    private ArticleCategoryService articleCategoryService;

    /**
     * 列表
     */
    @RequestMapping(value = "/{firstCategoryAlias}", method = RequestMethod.GET)
    public String list(@PathVariable String firstCategoryAlias, ModelMap model) {

        // 验证第一级分类
        ArticleCategoryEntity firstCategory = articleCategoryService.findByAlias(null, firstCategoryAlias);
        if (firstCategory == null) {
            return ERROR_VIEW;
        }

        // 获取第二级分类集合
        ArticleCategoryEntity secondCategory = null;
        List<ArticleCategoryEntity> secondCategories = articleCategoryService.findChildren(firstCategory.getId());
        if (!secondCategories.isEmpty()) {
            secondCategory = secondCategories.get(0);
        }

        // 获取文章
        ArticleEntity article = null;
        List<ArticleEntity> articles = null;
        if (secondCategory != null) {
            articles = articleService.findListByCategory(secondCategory.getId());
            if (articles.size() == 1) {
                article = articles.get(0);
            }
        }

        model.addAttribute("firstCategory", firstCategory);
        model.addAttribute("secondCategoryAlias", secondCategory != null ? secondCategory.getAlias() : null);
        model.addAttribute("secondCategory", secondCategory);
        model.addAttribute("secondCategories", secondCategories);
        if (article != null) {
            model.addAttribute("alias", article.getAlias());
            model.addAttribute("article", article);
        } else {
            model.addAttribute("articles", articles);
        }
        return TEMPLATE_PATH + "/" + firstCategory.getTemplate();
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/{firstCategoryAlias}/{secondCategoryAlias}", method = RequestMethod.GET)
    public String list(@PathVariable String firstCategoryAlias, @PathVariable String secondCategoryAlias, ModelMap model) {

        // 验证第一级文章分类
        ArticleCategoryEntity firstCategory = articleCategoryService.findByAlias(null, firstCategoryAlias);
        if (firstCategory == null) {
            return ERROR_VIEW;
        }

        // 获取第二级文章分类集合
        ArticleCategoryEntity secondCategory = articleCategoryService.findByAlias(firstCategory.getId(),
                secondCategoryAlias);
        List<ArticleCategoryEntity> secondCategories = articleCategoryService.findChildren(firstCategory.getId());
        if (secondCategory == null && !secondCategories.isEmpty()) {
            secondCategory = secondCategories.get(0);
        }

        // 获取文章
        ArticleEntity article = null;
        List<ArticleEntity> articles = null;
        if (secondCategory != null) {
            articles = articleService.findListByCategory(secondCategory.getId());
            if (articles.size() == 1) {
                article = articles.get(0);
            }
        }

        model.addAttribute("firstCategory", firstCategory);
        model.addAttribute("secondCategoryAlias", secondCategory != null ? secondCategory.getAlias() : null);
        model.addAttribute("secondCategory", secondCategory);
        model.addAttribute("secondCategories", secondCategories);
        if (article != null) {
            model.addAttribute("alias", article.getAlias());
            model.addAttribute("article", article);
        } else {
            model.addAttribute("articles", articles);
        }
        return TEMPLATE_PATH + "/" + secondCategory.getTemplate();
    }

    /**
     * 查看
     */
    @RequestMapping(value = "/{firstCategoryAlias}/{secondCategoryAlias}/{alias}", method = RequestMethod.GET)
    public String view(@PathVariable String firstCategoryAlias, @PathVariable String secondCategoryAlias,
            @PathVariable String alias, ModelMap model) {

        // 验证第一级文章分类
        ArticleCategoryEntity firstCategory = articleCategoryService.findByAlias(null, firstCategoryAlias);
        if (firstCategory == null) {
            return ERROR_VIEW;
        }

        // 获取第二级文章分类集合
        ArticleCategoryEntity secondCategory = articleCategoryService.findByAlias(firstCategory.getId(),
                secondCategoryAlias);
        List<ArticleCategoryEntity> secondCategories = articleCategoryService.findChildren(firstCategory.getId());
        if (secondCategory == null && !secondCategories.isEmpty()) {
            secondCategory = secondCategories.get(0);
        }

        // 获取文章
        ArticleEntity article = null;
        List<ArticleEntity> articles = null;
        if (secondCategory != null) {
            article = articleService.findByAlias(secondCategory.getId(), alias);
            articles = articleService.findListByCategory(secondCategory.getId());
        }

        model.addAttribute("firstCategory", firstCategory);
        model.addAttribute("secondCategoryAlias", secondCategory != null ? secondCategory.getAlias() : null);
        model.addAttribute("secondCategory", secondCategory);
        model.addAttribute("secondCategories", secondCategories);
        if (article != null) {
            model.addAttribute("alias", article.getAlias());
            model.addAttribute("article", article);
        } else {
            model.addAttribute("articles", articles);
        }
        return TEMPLATE_PATH + "/" + secondCategory.getTemplate();
    }

}