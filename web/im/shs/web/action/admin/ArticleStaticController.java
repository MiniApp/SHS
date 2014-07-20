package im.shs.web.action.admin;

import im.shs.web.Message;
import im.shs.web.entity.ArticleCategoryEntity;
import im.shs.web.service.ArticleCategoryService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
 * @class : ArticleStaticController
 * @description: 文章静态处理
 *
 * @author suhao
 * @date 2014年7月20日 下午6:14:59
 * @version 1.0
 */
@Controller("adminArticleStaticController")
@RequestMapping("/admin/article_static")
public class ArticleStaticController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/article_static";

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/admin/article_static";

    @Resource(name = "articleCategoryServiceImpl")
    private ArticleCategoryService articleCategoryService;

    /**
     * JSON列表
     */
    @RequestMapping(value = "/jsons", method = RequestMethod.GET)
    public @ResponseBody
    Map<Long, String> jsons(Long parentId) {
        List<ArticleCategoryEntity> articleCategories = new ArrayList<ArticleCategoryEntity>();
        if (parentId != null) {
            articleCategories = articleCategoryService.findChildren(parentId);
        } else {
            articleCategories = articleCategoryService.findRoots();
        }
        Map<Long, String> options = new HashMap<Long, String>();
        for (ArticleCategoryEntity articleCategory : articleCategories) {
            options.put(articleCategory.getId(), articleCategory.getName());
        }
        return options;
    }

    /**
     * 列表
     */
    @RequestMapping(method = RequestMethod.GET)
    public String list(Long parentId, ModelMap model) {
        if (parentId != null) {
            model.addAttribute("parent", articleCategoryService.find(parentId));
            model.addAttribute("list", articleCategoryService.findChildren(parentId));
        } else {
            model.addAttribute("list", articleCategoryService.findRoots());
        }
        return TEMPLATE_PATH + "/list";
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/new", method = RequestMethod.GET)
    public String add(Long parentId, ModelMap model) {
        model.addAttribute("parent", articleCategoryService.find(parentId));
        return TEMPLATE_PATH + "/add";
    }

    /**
     * 编辑
     */
    @RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable Long id, ModelMap model) {
        ArticleCategoryEntity articleCategory = articleCategoryService.find(id);
        model.addAttribute("articleCategory", articleCategory);
        model.addAttribute("parent", articleCategory.getParent());
        return TEMPLATE_PATH + "/edit";
    }

    /**
     * 保存
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String save(ArticleCategoryEntity articleCategory, Long parentId, RedirectAttributes redirectAttributes) {

        articleCategory.setParent(articleCategoryService.find(parentId));

        // Bean Validation
        if (!verify(articleCategory)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new" + getParentUrlParam(parentId);
        }
        // 验证名称是否存在
        if (articleCategoryService.nameExists(parentId, articleCategory.getName())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new" + getParentUrlParam(parentId);
        }
        // 验证别名是否存在
        if (articleCategoryService.aliasExists(parentId, articleCategory.getAlias())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new" + getParentUrlParam(parentId);
        }

        articleCategory.setBuiltin(false);
        articleCategoryService.save(articleCategory);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + getParentUrlParam(parentId);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public String update(@PathVariable Long id, ArticleCategoryEntity articleCategory,
            RedirectAttributes redirectAttributes) {

        ArticleCategoryEntity pArticleCategory = articleCategoryService.find(id);
        Long parentId = pArticleCategory != null && pArticleCategory.getParent() != null ? pArticleCategory.getParent()
                .getId() : null;

        // Bean Validation
        if (!verify(articleCategory)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit" + getParentUrlParam(parentId);
        }
        // 验证文章分类是否存在
        if (pArticleCategory == null || pArticleCategory.getBuiltin()) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + getParentUrlParam(parentId);
        }
        // 验证名称是否唯一
        if (!articleCategoryService.nameUnique(parentId, pArticleCategory.getName(), articleCategory.getName())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit" + getParentUrlParam(parentId);
        }
        // 验证别名是否唯一
        if (!articleCategoryService.aliasUnique(parentId, pArticleCategory.getAlias(), articleCategory.getAlias())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit" + getParentUrlParam(parentId);
        }

        articleCategoryService.update(articleCategory, "builtin", "treePath", "grade", "parent", "articles");

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + getParentUrlParam(parentId);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    Message delete(Long id) {
        ArticleCategoryEntity pArticleCategory = articleCategoryService.find(id);
        if (pArticleCategory == null) {
            return ERROR_MESSAGE;
        }
        // 验证文章分类是否存在下级
        if (pArticleCategory != null
                && (pArticleCategory.getBuiltin() || !pArticleCategory.getChildren().isEmpty() || !pArticleCategory
                        .getArticles().isEmpty())) {
            return Message.error("删除失败，文章分类“" + pArticleCategory.getName() + "”存在下级");
        }
        articleCategoryService.delete(pArticleCategory);
        return SUCCESS_MESSAGE;
    }

    /**
     * 检查名称
     */
    @RequestMapping(value = "/check_name", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkName(Long parentId, String name, String previousName) {
        if (StringUtils.isBlank(name)) {
            return false;
        }
        // 验证名称是否唯一
        if (articleCategoryService.nameUnique(parentId, previousName, name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 检查别名
     */
    @RequestMapping(value = "/check_alias", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkAlias(Long parentId, String alias, String previousAlias) {
        if (StringUtils.isBlank(alias)) {
            return false;
        }
        // 验证别名是否唯一
        if (articleCategoryService.aliasUnique(parentId, previousAlias, alias)) {
            return true;
        } else {
            return false;
        }
    }

}