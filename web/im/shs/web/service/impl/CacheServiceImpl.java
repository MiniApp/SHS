package im.shs.web.service.impl;

import im.shs.web.service.CacheService;
import im.shs.web.util.SettingUtils;

import javax.annotation.Resource;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import freemarker.template.Configuration;
import freemarker.template.TemplateModelException;

/**
 * @class : CacheServiceImpl
 * @description: 缓存
 *
 * @author suhao
 * @date 2014年7月13日 上午3:16:59
 * @version 1.0
 */
@Service("cacheServiceImpl")
public class CacheServiceImpl implements CacheService {

    @Resource(name = "ehCacheManager")
    private CacheManager cacheManager;

    @Resource(name = "messageSource")
    private ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;

    @Resource(name = "freeMarkerConfigurer")
    private FreeMarkerConfigurer freeMarkerConfigurer;

    @Override
    public String getDiskStorePath() {
        return cacheManager.getConfiguration().getDiskStoreConfiguration().getPath();
    }

    @Override
    public int getCacheSize() {
        int cacheSize = 0;
        String[] cacheNames = cacheManager.getCacheNames();
        if (cacheNames != null) {
            for (String cacheName : cacheNames) {
                Ehcache cache = cacheManager.getEhcache(cacheName);
                if (cache != null) {
                    cacheSize += cache.getSize();
                }
            }
        }
        return cacheSize;
    }

    @Override
    @CacheEvict(value = { "setting", "authorization", "logConfig", "area", "bank", "bankBranch", "dict", "dictWord",
            "template", "adPosition", "ad", "friendLink", "articleCategory", "article" }, allEntries = true)
    public void clear() {
        reloadableResourceBundleMessageSource.clearCache();
        try {
            Configuration configuration = freeMarkerConfigurer.getConfiguration();
            configuration.setSharedVariable("setting", SettingUtils.get());
        } catch (TemplateModelException e) {
            e.printStackTrace();
        }
        freeMarkerConfigurer.getConfiguration().clearTemplateCache();
    }
}