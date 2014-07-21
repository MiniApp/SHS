package im.shs.web.action.admin;

import im.shs.web.Template;
import im.shs.web.enums.TemplateTypeEnum;
import im.shs.web.plugin.storage.oss.OssStoragePlugin;
import im.shs.web.service.TemplateService;
import im.shs.web.util.DateTimeUtil;

import java.io.File;
import java.util.Date;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

/**
 * @class : TemplateController
 * @description: 模板
 *
 * @author suhao
 * @date 2014年7月20日 上午8:49:28
 * @version 1.0
 */
@Controller("adminTemplateController")
@RequestMapping("/admin/template")
public class TemplateController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/template";

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/admin/template";

    @Resource(name = "freeMarkerConfigurer")
    private FreeMarkerConfigurer freeMarkerConfigurer;

    @Resource(name = "templateServiceImpl")
    private TemplateService templateService;
    
    @Resource(name = "ossStoragePlugin")
    private OssStoragePlugin ossStoragePlugin;

    /**
     * 列表
     */
    @RequestMapping(value = "/{templateType}", method = RequestMethod.GET)
    public String list(@PathVariable TemplateTypeEnum templateType, ModelMap model) {
        model.addAttribute("list", templateService.getList(templateType));
        return TEMPLATE_PATH + "/list";
    }

    /**
     * 编辑
     */
    @RequestMapping(value = "/{templateType}/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable TemplateTypeEnum templateType, @PathVariable String id, ModelMap model,
            RedirectAttributes redirectAttributes) {

        // 验证模板类型
        Template sTemplate = templateService.get(id);
        if (sTemplate.getType() != templateType) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{templateType}";
        }

        model.addAttribute("template", sTemplate);
        model.addAttribute("cont", templateService.read(sTemplate));
        return TEMPLATE_PATH + "/edit";
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/{templateType}/{id}", method = RequestMethod.POST)
    public String update(@PathVariable TemplateTypeEnum templateType, @PathVariable String id, String cont,
            RedirectAttributes redirectAttributes) {

        // 验证模板类型
        Template sTemplate = templateService.get(id);
        if (sTemplate.getType() != templateType) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{templateType}";
        }
        templateService.write(sTemplate, cont);
        freeMarkerConfigurer.getConfiguration().clearTemplateCache();
        
        // OSS备份
        if(ossStoragePlugin.getEnabled()) {
            File templateFile = templateService.getTemplateFile(sTemplate.getTemplatePath());
            String templateFilePath = "/template" + StringUtils.substringBefore(sTemplate.getTemplatePath(), ".") + "/" + DateTimeUtil.formatDateTimetoString(new Date(), "yyyyMMddHHmmssS") + ".ftl";
            ossStoragePlugin.upload(templateFilePath, templateFile, "ftl");
        }

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + "/{templateType}";
    }

}