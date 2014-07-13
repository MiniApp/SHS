package im.shs.web.template.directive;

import im.shs.web.service.ArticleCategoryService;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * @class : ArticleCategoryRootDirective
 * @description: 模板指令 - 顶级文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:30:16
 * @version 1.0
 */
@Component("articleCategoryRootDirective")
public class ArticleCategoryRootDirective extends BaseDirective {

    /** 变量名称 */
    private static final String VARIABLE_NAME = "articleCategory";

    @Resource(name = "articleCategoryServiceImpl")
    private ArticleCategoryService articleCategoryService;

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
            throws TemplateException, IOException {
        setLocalVariable(VARIABLE_NAME, articleCategoryService.findByAlias(null, getAlias(params)), env, body);
    }

}