package im.shs.web.service.impl;

import im.shs.web.dao.PluginConfigDao;
import im.shs.web.entity.PluginConfigEntity;
import im.shs.web.service.PluginConfigService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @class : PluginConfigServiceImpl
 * @description: 插件配置
 *
 * @author suhao
 * @date 2014年7月13日 上午2:44:29
 * @version 1.0
 */
@Service("pluginConfigServiceImpl")
public class PluginConfigServiceImpl extends BaseServiceImpl<PluginConfigEntity, Long> implements PluginConfigService {

    @Resource(name = "pluginConfigDaoImpl")
    private PluginConfigDao pluginConfigDao;

    @Resource(name = "pluginConfigDaoImpl")
    public void setBaseDao(PluginConfigDao pluginConfigDao) {
        super.setBaseDao(pluginConfigDao);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean pluginExists(String plugin) {
        return pluginConfigDao.pluginExists(plugin);
    }

    @Override
    @Transactional(readOnly = true)
    public PluginConfigEntity findByPlugin(String plugin) {
        return pluginConfigDao.findByPlugin(plugin);
    }

}