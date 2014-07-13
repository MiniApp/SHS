package im.shs.web.template.directive;

import im.shs.entity.ArticleCategoryEntity;
import im.shs.web.service.ArticleCategoryService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * @class : ArticleCategoryChildrenDirective
 * @description: 模板指令 - 下级文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:07:41
 * @version 1.0
 */
@Component("articleCategoryChildrenDirective")
public class ArticleCategoryChildrenDirective extends BaseDirective {

    /** 变量名称 */
    private static final String VARIABLE_NAME = "articleCategories";

    @Resource(name = "articleCategoryServiceImpl")
    private ArticleCategoryService articleCategoryService;

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
            throws TemplateException, IOException {

        ArticleCategoryEntity rootArticleCategory = articleCategoryService.findByAlias(null, getAlias(params));
        List<ArticleCategoryEntity> articleCategories = null;
        if (rootArticleCategory == null) {
            articleCategories = new ArrayList<ArticleCategoryEntity>();
        } else {
            articleCategories = articleCategoryService.findChildren(getCount(params), rootArticleCategory.getId());
        }
        setLocalVariable(VARIABLE_NAME, articleCategories, env, body);
    }

}