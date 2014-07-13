package im.shs.web.service.impl;

import im.shs.Template;
import im.shs.enums.TemplateTypeEnum;
import im.shs.web.service.TemplateService;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.ServletContextAware;

/**
 * @class : TemplateServiceImpl
 * @description: 模板
 *
 * @author suhao
 * @date 2014年7月13日 上午4:17:23
 * @version 1.0
 */
@Service("templateServiceImpl")
public class TemplateServiceImpl implements TemplateService, ServletContextAware {

    /** servletContext */
    private ServletContext servletContext;

    /** 模板加载路径 */
    @Value("${template.web_loader_path}")
    private String[] templateLoaderPaths;

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Override
    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    @Cacheable("template")
    public List<Template> getAll() {
        try {
            List<Template> templates = new ArrayList<Template>();
            List<Element> elements = getDocument().selectNodes("/templates/template");
            for (Element element : elements) {
                Template template = getTemplate(element);
                templates.add(template);
            }
            return templates;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.<Template> emptyList();
        }
    }

    @Override
    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    @Cacheable("template")
    public List<Template> getList(TemplateTypeEnum type) {
        if (type == null) {
            return Collections.<Template> emptyList();
        }
        try {
            List<Element> elements = getDocument().selectNodes("/templates/template[@type='" + type + "']");
            List<Template> templates = new ArrayList<Template>();
            for (Element element : elements) {
                Template template = getTemplate(element);
                templates.add(template);
            }
            return templates;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.<Template> emptyList();
        }
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable("template")
    public Template get(String id) {
        try {
            Element element = (Element) getDocument().selectSingleNode("/templates/template[@id='" + id + "']");
            return getTemplate(element);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public File getTemplateFile(String templatePath) {
        return new File(servletContext.getRealPath(templateLoaderPaths[0] + templatePath));
    }

    @Override
    @Transactional(readOnly = true)
    public String read(Template template) {
        try {
            File templateFile = getTemplateFile(template.getTemplatePath());
            return FileUtils.readFileToString(templateFile, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public void write(Template template, String cont) {
        try {
            File templateFile = getTemplateFile(template.getTemplatePath());
            FileUtils.writeStringToFile(templateFile, cont, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取文档
     * 
     * @return 文档
     * @throws Exception
     */
    private Document getDocument() throws Exception {
        return new SAXReader().read(new ClassPathResource(Template.XML_PATH).getFile());
    }

    /**
     * 获取模板
     * 
     * @param element
     *            元素
     */
    private Template getTemplate(Element element) {

        // 获取模板参数
        String id = element.attributeValue("id");
        String type = element.attributeValue("type");
        String name = element.attributeValue("name");
        String templatePath = element.attributeValue("templatePath");
        String staticPath = element.attributeValue("staticPath");
        String description = element.attributeValue("description");

        // 封装模板实例
        Template template = new Template();
        template.setId(id);
        template.setType(TemplateTypeEnum.valueOf(type));
        template.setName(name);
        template.setTemplatePath(templatePath);
        template.setStaticPath(staticPath);
        template.setDescription(description);

        return template;
    }

}