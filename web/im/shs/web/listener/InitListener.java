package im.shs.web.listener;

import im.shs.web.service.CacheService;
import im.shs.web.service.StaticService;

import java.io.File;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

/**
 * @class : InitListener
 * @description: 初始化
 *
 * @author suhao
 * @date 2014年7月16日 下午10:09:02
 * @version 1.0
 */
@Component("initListener")
public class InitListener implements ServletContextAware, ApplicationListener<ContextRefreshedEvent> {

    /** 安装初始化配置文件 */
    private static final String INSTALL_INIT_CONFIG_FILE_PATH = "/init.conf";

    /** logger */
    private static final Logger logger = Logger.getLogger(InitListener.class.getName());

    /** servletContext */
    private ServletContext servletContext;

    @Value("${system.name}")
    private String systemName;

    @Value("${system.version}")
    private String systemVersion;

    @Resource(name = "staticServiceImpl")
    private StaticService staticService;

    @Resource(name = "cacheServiceImpl")
    private CacheService cacheService;

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (servletContext != null && contextRefreshedEvent.getApplicationContext().getParent() == null) {
            logger.info("Initializing " + systemName + " " + systemVersion);
            File installInitConfigFile = new File(servletContext.getRealPath(INSTALL_INIT_CONFIG_FILE_PATH));
            if (installInitConfigFile.exists()) {
                cacheService.clear();
                staticService.buildAll();
                installInitConfigFile.delete();
            }
        }
    }

}