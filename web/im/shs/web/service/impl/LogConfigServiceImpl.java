package im.shs.web.service.impl;

import im.shs.web.LogConfig;
import im.shs.web.service.LogConfigService;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.io.SAXReader;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

/**
 * @class : LogConfigServiceImpl
 * @description: 日志配置
 *
 * @author suhao
 * @date 2014年7月14日 下午9:32:03
 * @version 1.0
 */
@Service("logConfigServiceImpl")
public class LogConfigServiceImpl implements LogConfigService {

    @Override
    @SuppressWarnings("unchecked")
    @Cacheable("logConfig")
    public List<LogConfig> getAll() {
        try {
            File logConfigXmlFile = new ClassPathResource(LogConfig.XML_PATH).getFile();
            Document document = new SAXReader().read(logConfigXmlFile);
            List<org.dom4j.Element> elements = document.selectNodes("/logConfigs/logConfig");
            List<LogConfig> logConfigs = new ArrayList<LogConfig>();
            for (org.dom4j.Element element : elements) {

                // 日志配置参数
                String operation = element.attributeValue("operation");
                String urlPattern = element.attributeValue("urlPattern");
                String methodPattern = element.attributeValue("methodPattern");

                // 日志配置实例
                LogConfig logConfig = new LogConfig();
                logConfig.setOperation(operation);
                logConfig.setUrlPattern(urlPattern);
                logConfig.setMethodPattern(methodPattern);
                logConfigs.add(logConfig);
            }
            return logConfigs;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}