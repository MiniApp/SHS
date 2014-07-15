package im.shs.web.service;

import im.shs.web.plugin.storage.StoragePlugin;

import java.util.List;

/**
 * @class : PluginService
 * @description: 插件
 * 
 * @author suhao
 * @date 2014年7月13日 上午2:43:24
 * @version 1.0
 */
public interface PluginService {

	/**
	 * 获取存储插件
	 * 
	 * @return 存储插件
	 */
	List<StoragePlugin> getStoragePlugins();

	/**
	 * 获取存储插件
	 * 
	 * @param enabled
	 *            是否启用
	 * @return 存储插件
	 */
	List<StoragePlugin> getStoragePlugins(boolean enabled);

	/**
	 * 获取存储插件
	 * 
	 * @param id
	 *            ID
	 * @return 存储插件
	 */
	StoragePlugin getStoragePlugin(String id);

}