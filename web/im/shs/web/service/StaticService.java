package im.shs.web.service;

import im.shs.web.enums.TemplateTypeEnum;

import java.util.Map;

/**
 * @class : StaticService
 * @description: 静态化
 *
 * @author suhao
 * @date 2014年7月13日 上午1:22:21
 * @version 1.0
 */
public interface StaticService {

    /**
     * 解析静态
     * 
     * @param templatePath
     *            模板路径
     * @param model
     *            数据
     * @return 解析的HTML字符
     */
    String parse(String templatePath, Map<String, Object> model);

    /**
     * 生成静态
     * 
     * @param templatePath
     *            模板路径
     * @param staticPath
     *            静态路径
     * @param model
     *            数据
     * @return 生成的静态数量
     */
    int build(String templatePath, String staticPath, Map<String, Object> model);

    /**
     * 生成静态
     * 
     * @param templatePath
     *            模板路径
     * @param staticPath
     *            静态路径
     * @return 生成的静态数量
     */
    int build(String templatePath, String staticPath);

    /**
     * 生成静态
     * 
     * @param templateType
     *            模板类型
     * @return 生成的静态数量
     */
    int build(TemplateTypeEnum templateType);

    /**
     * 生成静态CSS
     * 
     * @param templatePath
     *            模板路径
     * @param staticPath
     *            静态路径
     * @return 生成的静态数量
     */
    int buildCSS(String templatePath, String staticPath);

    /**
     * 生成所有静态CSS
     * 
     * @return 生成的静态数量
     */
    int buildAllCSS();

    /**
     * 生成静态JS
     * 
     * @param templatePath
     *            模板路径
     * @param staticPath
     *            静态路径
     * @return 生成的静态数量
     */
    int buildJS(String templatePath, String staticPath);

    /**
     * 生成所有静态JS
     * 
     * @return 生成的静态数量
     */
    int buildAllJS();

    /**
     * 生成所有静态
     * 
     * @return 生成的静态数量
     */
    int buildAll();

    /**
     * 删除静态
     * 
     * @param staticPath
     *            静态路径
     * @return 删除的静态数量
     */
    int delete(String staticPath);

}