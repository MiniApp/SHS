package im.shs.web.service;

import im.shs.entity.PluginConfigEntity;

/**
 * @class : PluginConfigService
 * @description: 插件配置
 *
 * @author suhao
 * @date 2014年7月13日 上午2:42:55
 * @version 1.0
 */
public interface PluginConfigService extends BaseService<PluginConfigEntity, Long> {

    /**
     * 判断插件是否存在
     * 
     * @param plugin
     *            插件
     * @return 插件是否存在
     */
    boolean pluginExists(String plugin);

    /**
     * 查找插件配置
     * 
     * @param plugin
     *            插件
     * @return 插件配置，不存在时返回NULL
     */
    PluginConfigEntity findByPlugin(String plugin);

}