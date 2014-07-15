package im.shs.web.service;

import im.shs.web.Template;
import im.shs.web.enums.TemplateTypeEnum;

import java.io.File;
import java.util.List;

/**
 * @class : TemplateService
 * @description: 模板
 *
 * @author suhao
 * @date 2014年7月13日 上午4:16:32
 * @version 1.0
 */
public interface TemplateService {

    /**
     * 获取所有模板
     * 
     * @return 所有模板
     */
    List<Template> getAll();

    /**
     * 获取模板
     * 
     * @param type
     *            类型
     * @return 模板
     */
    List<Template> getList(TemplateTypeEnum type);

    /**
     * 获取模板
     * 
     * @param id
     *            ID
     * @return 模板
     */
    Template get(String id);

    /**
     * 获取模板文件
     * 
     * @param templatePath
     *            模板路径
     * @return 模板文件
     */
    File getTemplateFile(String templatePath);

    /**
     * 读取模板内容
     * 
     * @param template
     *            模板
     * @return 模板内容
     */
    String read(Template template);

    /**
     * 写入模板内容
     * 
     * @param template
     *            模板
     * @param cont
     *            模板内容
     */
    void write(Template template, String cont);

}