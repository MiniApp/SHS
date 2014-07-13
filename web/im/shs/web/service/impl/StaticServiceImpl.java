package im.shs.web.service.impl;

import im.shs.Template;
import im.shs.enums.TemplateTypeEnum;
import im.shs.util.CompressorUtils;
import im.shs.web.service.FileService;
import im.shs.web.service.StaticService;
import im.shs.web.service.TemplateService;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

/**
 * @class : StaticServiceImpl
 * @description: 静态化
 *
 * @author suhao
 * @date 2014年7月13日 上午4:15:27
 * @version 1.0
 */
@Service("staticServiceImpl")
public class StaticServiceImpl implements StaticService, ServletContextAware {

    /** servletContext */
    private ServletContext servletContext;

    /** 是否为开发模式 */
    @Value("${system.development}")
    private Boolean systemDevelopment;

    @Resource(name = "freeMarkerConfigurer")
    private FreeMarkerConfigurer freeMarkerConfigurer;

    @Resource(name = "templateServiceImpl")
    private TemplateService templateService;

    @Resource(name = "fileServiceImpl")
    private FileService fileService;

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Override
    @Transactional(readOnly = true)
    public String parse(String templatePath, Map<String, Object> model) {
        Assert.hasText(templatePath);

        StringWriter stringWriter = null;
        BufferedWriter writer = null;
        try {
            freemarker.template.Template template = freeMarkerConfigurer.getConfiguration().getTemplate(templatePath);
            stringWriter = new StringWriter();
            writer = new BufferedWriter(stringWriter);
            template.process(model, writer);
            writer.flush();
            return stringWriter.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(writer);
            IOUtils.closeQuietly(stringWriter);
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public int build(String templatePath, String staticPath, Map<String, Object> model) {
        Assert.hasText(templatePath);
        Assert.hasText(staticPath);

        FileOutputStream fileOutputStream = null;
        OutputStreamWriter outputStreamWriter = null;
        Writer writer = null;
        try {
            freemarker.template.Template template = freeMarkerConfigurer.getConfiguration().getTemplate(templatePath);
            File staticFile = new File(servletContext.getRealPath(staticPath));
            File staticDirectory = staticFile.getParentFile();
            if (!staticDirectory.exists()) {
                staticDirectory.mkdirs();
            }
            fileOutputStream = new FileOutputStream(staticFile);
            outputStreamWriter = new OutputStreamWriter(fileOutputStream, "UTF-8");
            writer = new BufferedWriter(outputStreamWriter);
            template.process(model, writer);
            writer.flush();
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(writer);
            IOUtils.closeQuietly(outputStreamWriter);
            IOUtils.closeQuietly(fileOutputStream);
        }
        return 0;
    }

    @Override
    @Transactional(readOnly = true)
    public int build(String templatePath, String staticPath) {
        return build(templatePath, staticPath, null);
    }

    @Override
    @Transactional(readOnly = true)
    public int build(TemplateTypeEnum templateType) {
        int buildCount = 0;

        List<Template> templates = templateService.getList(templateType);
        for (Template template : templates) {
            buildCount += build(template.getTemplatePath(), template.getStaticPath());
        }

        return buildCount;
    }

    @Override
    @Transactional(readOnly = true)
    public int buildCSS(String templatePath, String staticPath) {

        // 生成静态
        int buildCount = build(templatePath, staticPath);

        try {
            // 发布模式时
            if (!systemDevelopment) {
                // 压缩文件
                CompressorUtils.CSSFileCompress(servletContext.getRealPath(staticPath));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return buildCount;
    }

    @Override
    @Transactional(readOnly = true)
    public int buildAllCSS() {
        int buildCount = 0;

        List<Template> templates = templateService.getList(TemplateTypeEnum.css);
        for (Template template : templates) {
            buildCount += buildCSS(template.getTemplatePath(), template.getStaticPath());
        }

        return buildCount;
    }

    @Override
    @Transactional(readOnly = true)
    public int buildJS(String templatePath, String staticPath) {

        // 生成静态
        int buildCount = build(templatePath, staticPath, null);

        try {
            // 发布模式时
            if (!systemDevelopment) {
                // 压缩文件
                CompressorUtils.JSFileCompress(servletContext.getRealPath(staticPath));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return buildCount;
    }

    @Override
    @Transactional(readOnly = true)
    public int buildAllJS() {
        int buildCount = 0;

        List<Template> templates = templateService.getList(TemplateTypeEnum.js);
        for (Template template : templates) {
            buildCount += buildJS(template.getTemplatePath(), template.getStaticPath());
        }

        return buildCount;
    }

    @Override
    @Transactional(readOnly = true)
    public int buildAll() {
        int buildCount = 0;

        buildCount += buildAllCSS();
        buildCount += buildAllJS();

        return buildCount;
    }

    @Override
    @Transactional(readOnly = true)
    public int delete(String staticPath) {
        return fileService.deleteLocal(staticPath) ? 1 : 0;
    }

}