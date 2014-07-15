package im.shs.web.service.impl;

import im.shs.web.plugin.storage.StoragePlugin;
import im.shs.web.service.PluginService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.springframework.stereotype.Service;

/**
 * @class : PluginServiceImpl
 * @description: 插件
 *
 * @author suhao
 * @date 2014年7月13日 上午2:45:03
 * @version 1.0
 */
@Service("pluginServiceImpl")
public class PluginServiceImpl implements PluginService {


    @Resource
    private List<StoragePlugin> storagePlugins = new ArrayList<StoragePlugin>();


    @Resource
    private Map<String, StoragePlugin> storagePluginMap = new HashMap<String, StoragePlugin>();


    @Override
    public List<StoragePlugin> getStoragePlugins() {
        Collections.sort(storagePlugins);
        return storagePlugins;
    }


    @Override
    public List<StoragePlugin> getStoragePlugins(final boolean enabled) {
        List<StoragePlugin> result = new ArrayList<StoragePlugin>();
        CollectionUtils.select(storagePlugins, new Predicate() {
            public boolean evaluate(Object object) {
                StoragePlugin storagePlugin = (StoragePlugin) object;
                return storagePlugin.getEnabled() == enabled;
            }
        }, result);
        Collections.sort(result);
        return result;
    }


    @Override
    public StoragePlugin getStoragePlugin(String id) {
        return storagePluginMap.get(id);
    }

}