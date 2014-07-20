package im.shs.web.action.admin;

import im.shs.web.Message;
import im.shs.web.entity.ArticleCategoryEntity;
import im.shs.web.entity.ArticleEntity;
import im.shs.web.service.ArticleCategoryService;
import im.shs.web.service.ArticleService;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : ArticleController
 * @description: 文章
 *
 * @author suhao
 * @date 2014年7月18日 下午11:01:53
 * @version 1.0
 */
@Controller("adminArticleController")
@RequestMapping("/admin/article")
public class ArticleController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/article";

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/admin/article";

    @Resource(name = "articleServiceImpl")
    private ArticleService articleService;

    @Resource(name = "articleCategoryServiceImpl")
    private ArticleCategoryService articleCategoryService;

    /**
     * 列表
     */
    @RequestMapping(method = RequestMethod.GET)
    public String list(Long articleCategoryId, ModelMap model, RedirectAttributes redirectAttributes) {

        // 验证分类
        ArticleCategoryEntity pArticleCategory = articleCategoryService.find(articleCategoryId);
        if (articleCategoryId != null && pArticleCategory == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        if (articleCategoryId != null) {
            model.addAttribute("articleCategory", pArticleCategory);
            model.addAttribute("list", articleService.findListByCategory(articleCategoryId));
        } else {
            model.addAttribute("list", articleService.findAll());
        }
        return TEMPLATE_PATH + "/list";
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/new", method = RequestMethod.GET)
    public String add(Long articleCategoryId, ModelMap model, RedirectAttributes redirectAttributes) {

        // 验证分类
        ArticleCategoryEntity pArticleCategory = articleCategoryService.find(articleCategoryId);
        if (articleCategoryId != null && pArticleCategory == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        model.addAttribute("articleCategory", pArticleCategory);
        return TEMPLATE_PATH + "/add";
    }

    /**
     * 编辑
     */
    @RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable Long id, Long articleCategoryId, ModelMap model,
            RedirectAttributes redirectAttributes) {

        // 验证分类
        ArticleEntity pArticle = articleService.find(id);
        if (pArticle == null || !pArticle.verifyCategory(articleCategoryId)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        model.addAttribute("article", pArticle);
        model.addAttribute("articleCategoryId", articleCategoryId);
        model.addAttribute("category", pArticle.getCategory());
        return TEMPLATE_PATH + "/edit";
    }

    /**
     * 保存
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String save(ArticleEntity article, Long categoryId, Long articleCategoryId,
            RedirectAttributes redirectAttributes) {

        // 验证分类
        if (articleCategoryId != null && articleCategoryService.find(articleCategoryId) == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        article.setCategory(articleCategoryService.find(categoryId));

        // Bean Validation
        if (!verify(article)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new" + getArticleCategoryUrlParam(articleCategoryId);
        }
        // 验证别名是否存在
        if (articleService.aliasExists(categoryId, article.getAlias())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new" + getArticleCategoryUrlParam(articleCategoryId);
        }

        article.setHits(0L);
        article.setPageNumber(null);
        articleService.save(article);

        // 添加瞬时消息
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + getArticleCategoryUrlParam(articleCategoryId);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public String update(@PathVariable Long id, ArticleEntity article, Long categoryId, Long articleCategoryId,
            RedirectAttributes redirectAttributes) {

        // 验证分类
        if (articleCategoryId != null && articleCategoryService.find(articleCategoryId) == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        article.setCategory(articleCategoryService.find(categoryId));

        // Bean Validation
        if (!verify(article)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit" + getArticleCategoryUrlParam(articleCategoryId);
        }
        // 验证文章是否存在
        ArticleEntity pArticle = articleService.find(id);
        if (pArticle == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + getArticleCategoryUrlParam(articleCategoryId);
        }
        // 验证别名是否唯一
        if (!articleService.aliasUnique(categoryId, pArticle.getAlias(), article.getAlias())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit" + getArticleCategoryUrlParam(articleCategoryId);
        }

        articleService.update(article, "hits", "pageNumber");

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + getArticleCategoryUrlParam(articleCategoryId);
    }

    /**
     * 检查别名
     */
    @RequestMapping(value = "/check_alias", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkAlias(Long categoryId, String alias, String previousAlias) {
        if (StringUtils.isBlank(alias)) {
            return false;
        }
        // 验证别名是否唯一
        if (articleService.aliasUnique(categoryId, previousAlias, alias)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/batch_delete", method = RequestMethod.POST)
    public @ResponseBody
    Message delete(Long[] ids) {
        articleService.deleteList(ids);
        return SUCCESS_MESSAGE;
    }

    /**
     * 获取文章分类URL参数
     * 
     * @param articleCategoryId
     *            文章分类ID
     * @return 文章分类URL参数
     */
    private String getArticleCategoryUrlParam(Long articleCategoryId) {
        return getUrlParam("articleCategoryId", articleCategoryId != null ? articleCategoryId.toString() : null);
    }

}