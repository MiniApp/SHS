package im.shs.web.dao;

import im.shs.web.entity.PluginConfigEntity;

/**
 * @class : PluginConfigDao
 * @description: 插件配置
 *
 * @author suhao
 * @date 2014年7月13日 上午2:46:05
 * @version 1.0
 */
public interface PluginConfigDao extends BaseDao<PluginConfigEntity, Long> {

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