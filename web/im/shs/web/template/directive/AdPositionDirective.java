/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.template.directive;

import im.shs.web.entity.AdPositionEntity;
import im.shs.web.service.AdPositionService;

import java.io.IOException;
import java.io.StringReader;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import freemarker.core.Environment;
import freemarker.template.Template;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * 模板指令 - 广告位
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Component("adPositionDirective")
public class AdPositionDirective extends BaseDirective {

    /** 变量名称 */
    private static final String VARIABLE_NAME = "adPosition";

    @Resource(name = "freeMarkerConfigurer")
    private FreeMarkerConfigurer freeMarkerConfigurer;

    @Resource(name = "adPositionServiceImpl")
    private AdPositionService adPositionService;

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
            throws TemplateException, IOException {
        AdPositionEntity adPosition;
        String ident = getIdent(params);
        boolean useCache = useCache(env, params);
        String cacheRegion = getCacheRegion(env, params);
        if (useCache) {
            adPosition = adPositionService.findByIdent(ident, cacheRegion);
        } else {
            adPosition = adPositionService.findByIdent(ident);
        }
        if (body != null) {
            setLocalVariable(VARIABLE_NAME, adPosition, env, body);
        } else {
            if (adPosition != null && adPosition.getTemplate() != null) {
                try {
                    Map<String, Object> model = new HashMap<String, Object>();
                    model.put(VARIABLE_NAME, adPosition);
                    Writer out = env.getOut();
                    new Template("adTemplate", new StringReader(adPosition.getTemplate()),
                            freeMarkerConfigurer.getConfiguration()).process(model, out);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

}